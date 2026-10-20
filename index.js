#!/usr/bin/env node

// ^ Command the OS to hand the execution of this progarm/file to node

import "dotenv/config";

import { performance } from "perf_hooks";
import logUpdate from "log-update";
import chalk from "chalk";
import { program } from "commander";

//lyris is a global command - using bin in package.json
program
  .name("lyrics")
  .description("A terminal-based synchronized lyrics engine.")
  .version("1.0.0");
// command syntax looks like: lyrics play "song-name" "artist-name"
program
  .command("play <song> <artist>") // <song> and <artist>  are required arguments
  .description("Play a song and display synchronized lyrics")
  .action((song, artist) => {
    main(artist, song); // call the main function as the user enters the correct command
  });

program.parse(process.argv);

async function main(artist, song) {
  // Change the parameters here: (artistName, songName)
  const lyrics = await fetchLyrics(artist, song);
  if (!lyrics) {
    throw new Error("Error during fetching lyrics from Lrclib");
  }

  const parsedLyrics = parseLRC(lyrics);
  if (!parsedLyrics) {
    throw new Error("Error parsing the lryics");
  }

  const startTime = performance.now();
  let currentLyricIndex = 0;

  // Run a loop constantly (every 16ms is roughly 60 frames per second)
  const syncLoop = setInterval(() => {
    // If we ran out of lyrics, stop the loop
    if (currentLyricIndex >= parsedLyrics.length) {
      clearInterval(syncLoop);
      logUpdate.done();
      return;
    }
    // Calculate exactly how much time has passed since the song started
    const timeElapsed = performance.now() - startTime;

    const prev =
      currentLyricIndex === 0 ? "" : parsedLyrics[currentLyricIndex - 1];
    const next =
      currentLyricIndex === parsedLyrics.length - 1
        ? ""
        : parsedLyrics[currentLyricIndex + 1];
    const curr = parsedLyrics[currentLyricIndex];

    // Check if it is time to print the next lyric
    if (timeElapsed >= curr.time) {
      logUpdate(`
            ${chalk.dim(prev.text || "")}\n
            ${chalk.bold.blue(curr.text)}\n
            ${chalk.dim(next.text || "")}
        `);
      currentLyricIndex++; // Move to the next line
    }
  }, 16);
}

// fetch the lyrics - REST /api/get request on lrclib.net
async function fetchLyrics(artist, song) {
  const response = await fetch(
    `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(song)}`,
  );

  if (response.statusCode === 404) {
    throw new Error(
      "Unable to find the song, try specifying song or artist name.",
    );
  }

  if (!response) {
    throw new Error("Error fetching song");
  }

  const data = await response.json();

  return data.syncedLyrics;
}

// Parse the returned lyrics
function parseLRC(lrcString) {
  if (!lrcString) {
    return null;
  }

  const lines = lrcString.trim().split("\n");
  const lyricsArray = [];

  // Regex for [MM:SS.XX]
  const timeRegex = /\[(\d{2}):(\d{2}\.\d{2,3})\](.*)/;

  lines.forEach((line) => {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseFloat(match[2]);
      const text = match[3].trim();

      // Convert minutes and seconds to total milliseconds
      const timeInMs = (minutes * 60 + seconds) * 1000;

      lyricsArray.push({ time: timeInMs, text: text });
    }
  });
  return lyricsArray;
}

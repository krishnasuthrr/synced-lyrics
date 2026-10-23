import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import ytSearch from "yt-search";
import { parseLRC } from '../utils/app.util.js';

const app = express()
const port = Number(process.env.PORT) || 3000

app.disable("x-powered-by");
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get("/api/search", async (req, res) => {
  const { song, artist } = req.query;

  const lrcResponse = await fetch(
    `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(song)}`,
  );

  if (lrcResponse.status >= 400 && lrcResponse.status < 600) {
    return res.status(404).json({
      error: "Could not find lyrics for this track.",
      statusCode: 404,
    });
  }

  const lrcData = await lrcResponse.json();

  if (!lrcData.syncedLyrics) {
    return res
      .status(404)
      .json({ error: "Only unsynced lyrics are available for this track." });
  }

  const targetDuration = lrcData.duration; // this is in seconds

  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const artistNormalized = normalize(lrcData.artistName);

  const ytResults = await ytSearch(
    `${lrcData.trackName} ${lrcData.artistName}`,
  );

  const videos = ytResults.all
    .filter((result) => {
      return (
        result.type === "video" &&
        Math.abs(result.duration.seconds - targetDuration) <= 1
      );
    })
    .slice(0, 5);

  // Sort the candidates based on channel authenticity
  const sortedVideos = videos.sort((a, b) => {
    const authorANormalized = normalize(a.author.name);
    const authorBNormalized = normalize(b.author.name);

    const isAOfficial =
      authorANormalized.includes(artistNormalized) ||
      authorANormalized.includes("vevo") ||
      authorANormalized.includes("topic");

    const isBOfficial =
      authorBNormalized.includes(artistNormalized) ||
      authorBNormalized.includes("vevo") ||
      authorBNormalized.includes("topic");

    // If A is official and B is not, A moves up the list (-1)
    if (isAOfficial && !isBOfficial) return -1;
    // If B is official and A is not, B moves up the list (1)
    if (!isAOfficial && isBOfficial) return 1;

    // If both are official (or both unofficial), leave their order as-is (0)
    return 0;
  });

  const video = sortedVideos[0];

  const syncedLyrics = parseLRC(lrcData.syncedLyrics)

  // console.log(ytResults)
  // console.log(videos)
  // console.log(sortedVideos)

  const payload = {
    title: lrcData.trackName,
    artist: lrcData.artistName,
    duration: targetDuration,
    thumbnail: video?.thumbnail,
    url: video?.url,
    lyrics: syncedLyrics,
  };

  res.status(200).json(payload);
})

app.get("/api/test", (req, res) => {
  res.send("Test API")
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
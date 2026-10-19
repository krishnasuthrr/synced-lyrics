# Terminal Synced Lyrics

A small Node.js terminal app that fetches a song's synchronized lyrics from
[LRCLIB](https://lrclib.net/) and highlights each line as its timestamp arrives.

## Getting started

### Requirements

- Node.js with the built-in `fetch` API (Node.js 18 or newer)
- npm
- An internet connection to reach LRCLIB

### Install and run

```sh
npm install
npm start
```

The demo song is currently set directly in `index.js`. To display another
track, edit the artist and title passed to `fetchLyrics` in `main()`:

```js
const lyrics = await fetchLyrics("Bruno Mars", "That's What I Like");
```

There are no command-line options or audio-player controls in the current
version. The lyric timer starts after the lyrics have been fetched and parsed;
it is not synchronized to music playing elsewhere.

## How it works

The application runs in this order:

1. **Start:** `index.js` calls the asynchronous `main()` function.
2. **Fetch lyrics:** `main()` passes the configured artist and track name to
   `fetchLyrics()`. The function URL-encodes both values and sends a GET request
   to LRCLIB's `/api/get` endpoint. It reads the JSON response and returns its
   `syncedLyrics` field.
3. **Parse timestamps:** `parseLRC()` splits the LRC text into lines and looks
   for timestamps in `[MM:SS.xx]` or `[MM:SS.xxx]` form. It converts each
   timestamp to milliseconds and returns entries containing a time and lyric
   text. Lines without a matching timestamp are skipped.
4. **Run the display clock:** Once parsing succeeds, `main()` records a start
   time with Node's `perf_hooks` high-resolution clock and checks the elapsed
   time approximately every 16 milliseconds (about 60 checks per second).
5. **Refresh the terminal:** When the current lyric's timestamp is reached,
   `log-update` redraws the same terminal area with the previous, current, and
   next lyric. `chalk` dims neighboring lines and makes the active line bold
   blue. The loop advances through the parsed lyrics and calls
   `logUpdate.done()` when it reaches the end.

If the fetch returns no synced lyric text, `main()` stops with an error instead
of trying to display unsynchronized lyrics. Fetching and parsing happen before
the timer begins, so any delay contacting LRCLIB does not shift the lyric
timestamps relative to the start of the display.

## Project structure and components

- **`index.js`** contains the entry point, LRCLIB request, LRC parser, and timed
  terminal display.
- **`package.json`** defines the project as an ES module, sets `index.js` as
  its main file, and provides the `npm start` script.
- **`perf_hooks`** is built into Node.js and supplies the elapsed-time clock.
- **`log-update`** updates the existing terminal output instead of printing a
  new block for every timer check.
- **`chalk`** adds visual emphasis to the active and neighboring lyrics.
- **Other declared dependencies:** `commander`, `lrc-file-parser`, and
  `play-sound` are listed in `package.json` but are not currently imported by
  this implementation. LRC parsing is handled by the local `parseLRC()`
  function, and the application does not play audio.


## LRCLIB credit and considerate use

Lyrics data is provided by [LRCLIB](https://lrclib.net/). Please respect
LRCLIB's [rate-limit policies](https://lrclib.net/) and avoid excessive or
unnecessary requests so the service remains available to everyone.
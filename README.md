# Terminal Synced Lyrics

A small Node.js terminal app that fetches a song's synchronized lyrics from
[LRCLIB](https://lrclib.net/) and highlights each line as its timestamp arrives.

## Getting started

### Requirements

- Node.js with the built-in `fetch` API (Node.js 18 or newer)
- npm
- An internet connection to reach LRCLIB

---

Update v2: Integrated CLI by creating a global command which fetches and displays lyrics in the terminal

### Install and run

```bash
git clone https://github.com/krishnasuthrr/synced-lyrics
cd synced-lyrics
npm install
npm link
```
---
`npm link` makes the command global, so you can run it from anywhere in your terminal

## IMPORTANT: Command Syntax and Conventions:

```bash
lyrics play <song-name> <artist-name>
```

### Conventions:
- `<song-name>` & `<artist-name>` - must be written within double quotes - "text"
- NOTE: The song and artist name must accurately match the YouTube video title of the official song and the artist. Check for the most accurate YT video title of the song and artist name

An example command looks like:
`lyrics play "Billie Jean" "Michael Jackson"`

## How it works

1. User runs the command - `lyrics play "Billie Jean" "Michael Jackson"`
2. `fetchLyrics()` - API call to [lrclib.net](https://lrclib.net/) - finds the most accurate match of the song on YouTube and returns the lyrics in (.lrc) format
3. `parseLRC()` - refines the string recieved by lrclib into a specified structure
4. `syncLoop` - a setInterval loop which runs every 16ms (60fps) - the actual engine for the sync logic

## LRCLIB credit and considerate use

Lyrics data is provided by [LRCLIB](https://lrclib.net/). Please respect
LRCLIB's [rate-limit policies](https://lrclib.net/) and avoid excessive or
unnecessary requests so the service remains available to everyone.

### You might see an error "Could'nt fetch lyrics" even if you've entered the correct song and artist name.
## It's because lrclib lags sometimes, try again 
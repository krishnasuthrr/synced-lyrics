import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import ytSearch from "yt-search";


const app = express()
const port = Number(process.env.PORT) || 3000

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
    return res
      .status(404)
      .json({
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

  const video = videos[0];

  const payload = {
    title: lrcData.trackName,
    artist: lrcData.artistName,
    duration: lrcData.duration,
    thumbnail: video.thumbnail,
    url: video.url,
    lyrics: lrcData.syncedLyrics
  }

  res.status(200).json(payload)
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
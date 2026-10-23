export function parseLRC(lrcString) {
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

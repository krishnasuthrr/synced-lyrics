export function normalizeSyncedLyrics(lyrics) {
  if (!Array.isArray(lyrics)) return []

  return lyrics
    .map((line, order) => ({
      time: Number(line?.time),
      text: typeof line?.text === 'string' ? line.text : '',
      order,
    }))
    .filter((line) => Number.isFinite(line.time) && line.time >= 0)
    .sort((first, second) => first.time - second.time || first.order - second.order)
    .map(({ time, text }) => ({ time, text }))
}

export function findActiveLyricIndex(lyrics, elapsedMs) {
  let low = 0
  let high = lyrics.length

  while (low < high) {
    const middle = Math.floor((low + high) / 2)
    if (lyrics[middle].time <= elapsedMs) low = middle + 1
    else high = middle
  }

  return low - 1
}

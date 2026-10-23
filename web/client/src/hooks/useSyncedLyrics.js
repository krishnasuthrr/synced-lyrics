import { useMemo } from 'react'
import { findActiveLyricIndex, normalizeSyncedLyrics } from '../utils/lyrics.util.js'

function useSyncedLyrics(rawLyrics, playbackTimeSeconds = 0) {
  const lyrics = useMemo(() => normalizeSyncedLyrics(rawLyrics), [rawLyrics])
  const elapsedMs = Math.max(0, playbackTimeSeconds * 1000)
  const currentIndex = useMemo(
    () => findActiveLyricIndex(lyrics, elapsedMs),
    [lyrics, elapsedMs],
  )

  return { lyrics, currentIndex }
}

export default useSyncedLyrics

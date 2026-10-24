function LyricsWindow({ lyrics, currentIndex, className = '' }) {
  if (lyrics.length === 0) {
    return (
      <div className={`relative mx-auto mt-16 grid min-h-60 w-full max-w-3xl place-items-center rounded-[2rem] border border-white/90 bg-white/55 px-5 py-10 text-center shadow-[0_24px_80px_rgba(62,51,31,0.055)] sm:mt-20 sm:min-h-64 sm:px-12 sm:py-16 ${className}`}>
        <p className="font-work text-sm text-stone-500">No synced lyrics are available for this song.</p>
      </div>
    )
  }

  // Before the first timestamp, show the first upcoming line in the center.
  const displayIndex = Math.max(0, currentIndex)
  const previousLine = lyrics[displayIndex - 1]?.text ?? ''
  const currentLine = lyrics[displayIndex]?.text ?? ''
  const nextLine = lyrics[displayIndex + 1]?.text ?? ''
  const hasCurrentLyric = currentIndex >= 0

  return (
    <div className={`relative mx-auto mt-16 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/90 bg-white/55 px-5 py-10 shadow-[0_24px_80px_rgba(62,51,31,0.055)] sm:mt-20 sm:px-12 sm:py-16 ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/80 to-transparent" />
      <div
        key={`${displayIndex}-${hasCurrentLyric}`}
        className="lyric-window-slide relative flex min-h-60 flex-col items-center justify-center gap-8 text-center sm:min-h-64 sm:gap-9"
      >
        <p className="min-h-[1.5em] max-w-2xl font-work text-lg leading-relaxed text-stone-300 sm:text-2xl">
          {previousLine}
        </p>
        <div className="relative isolate py-1">
          {hasCurrentLyric && (
            <span className="absolute inset-x-0 inset-y-[-0.75rem] z-0 rounded-2xl bg-stone-100/80 sm:-inset-x-4" />
          )}
          <p
            aria-current={hasCurrentLyric ? 'true' : undefined}
            className={`relative z-10 max-w-2xl font-work text-[1.35rem] leading-snug tracking-[-0.02em] sm:text-[2rem] ${
              hasCurrentLyric ? 'font-semibold text-stone-950' : 'text-stone-400'
            }`}
          >
            {currentLine || '\u00a0'}
          </p>
        </div>
        <p className="min-h-[1.5em] max-w-2xl font-work text-lg leading-relaxed text-stone-300 sm:text-2xl">
          {nextLine}
        </p>
      </div>
    </div>
  )
}

export default LyricsWindow

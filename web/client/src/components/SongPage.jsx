import { getLyricPreview } from '../utils/lyrics.util.js'

function SongPage({ song, onBack }) {
  const [previousLine, currentLine, nextLine] = getLyricPreview(song.lyrics)

  return (
    <main className="flex min-h-[calc(100svh-5rem)] flex-col items-center px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <button
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-work text-xs font-medium text-stone-500 transition hover:bg-white/70 hover:text-stone-900"
          onClick={onBack}
          type="button"
        >
          <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
            <path d="M15.833 10H4.167m0 0L10 4.167M4.167 10 10 15.833" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
          Back to search
        </button>
        <span className="hidden items-center gap-2 font-work text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400 sm:flex">
          Your listening room
        </span>
      </div>

      <section className="flex w-full max-w-5xl flex-1 flex-col justify-center pb-6 pt-16 sm:pb-14 sm:pt-20">
        <div className="text-center">
          <h1 className="font-display text-[clamp(2.8rem,4vw,5.5rem)] leading-none tracking-[-0.06em] text-stone-950">
            {song.title}
          </h1>
          <p className="mt-4 font-montserrat text-sm font-medium tracking-wide text-stone-600 sm:text-base">
            {song.artist}
          </p>
        </div>

        <div className="relative mx-auto mt-16 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/90 bg-white/55 px-5 py-10 shadow-[0_24px_80px_rgba(62,51,31,0.055)] sm:mt-20 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/80 to-transparent" />
          <div className="relative flex min-h-60 flex-col items-center justify-center gap-8 text-center sm:min-h-64 sm:gap-9">
            <p className="max-w-2xl font-display text-lg leading-relaxed text-stone-300 sm:text-2xl">
              {previousLine}
            </p>
            <div className="relative isolate py-1">
              <span className="absolute inset-x-0 inset-y-[-0.75rem] z-0 rounded-2xl bg-stone-100/80 sm:-inset-x-4" />
              <p aria-current="true" className="relative z-10 max-w-2xl font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-stone-950 sm:text-[2rem]">
                {currentLine}
              </p>
            </div>
            <p className="max-w-2xl font-display text-lg leading-relaxed text-stone-300 sm:text-2xl">
              {nextLine}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SongPage

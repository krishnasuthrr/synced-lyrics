import { useEffect, useState } from 'react'
import { fetchSong } from './utils/app.util'

function Wordmark({ onClick, disabled = false }) {
  return (
    <button
      className="group inline-flex items-center gap-3 text-left"
      onClick={onClick}
      type="button"
      disabled={disabled}
      aria-label="Go to home page"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-stone-950 text-sm font-semibold tracking-tight text-white transition-transform group-hover:-rotate-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-audio-lines preview-icon"
        >
          <path d="M2 10v3" />
          <path d="M6 6v11" />
          <path d="M10 3v18" />
          <path d="M14 8v7" />
          <path d="M18 5v13" />
          <path d="M22 10v3" />
        </svg>
      </span>
      <span className="font-work text-sm font-semibold tracking-[-0.04em] text-stone-900">
        lyrisync
      </span>
    </button>
  );
}

function HomePage({ onSearch, isLoading, error, onDismissError, onHome }) {
  const [songName, setSongName] = useState('')
  const [artistName, setArtistName] = useState('')
  const [showSearchConventions, setShowSearchConventions] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setShowSearchConventions(false)
    onSearch(songName.trim(), artistName.trim())
  }

  return (
    <main className="relative flex min-h-[calc(100svh-5rem)] items-center justify-between flex-col px-5  sm:px-8">
      <header className="relative z-20 mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Wordmark disabled={isLoading} onClick={onHome} />
        <p className="font-work text-[10px] sm:text-6px font-medium uppercase tracking-[0.15em] text-stone-400 sm:text-[11px]">
          Words with feeling
        </p>
      </header>
      <div className="absolute left-1/2 top-[17%] -z-0 size-72 -translate-x-1/2 rounded-full bg-white/70 blur-3xl sm:size-[30rem]" />
      <section className="relative z-10 w-full max-w-2xl text-center">
        <h1 className="font-display text-[clamp(3.4rem,10vw,6.6rem)] leading-[0.94] tracking-[-0.065em] text-stone-950">
          Every Lyric,
          <br />
          <span className="italic text-stone-400">in its time.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md font-work text-sm leading-7 text-stone-500 sm:text-base">
          Find the song you love. Settle in, and let the lyrics find their
          rhythm.
        </p>

        <form
          className="mx-auto mt-11 grid max-w-[30rem] gap-3 text-left sm:mt-14"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="songName">
            Song name
          </label>
          <input
            autoComplete="off"
            disabled={isLoading}
            className="h-[3.65rem] w-full rounded-2xl border border-stone-200/90 bg-white/75 px-5 font-montserrat text-sm text-stone-900 shadow-[0_5px_20px_rgba(40,35,24,0.025)] outline-none transition placeholder:text-stone-400 hover:border-stone-300 focus:border-stone-500 focus:bg-white focus:ring-4 focus:ring-stone-900/[0.04]"
            id="songName"
            onChange={(event) => setSongName(event.target.value)}
            placeholder="Song name"
            value={songName}
          />
          <label className="sr-only" htmlFor="artistName">
            Artist name
          </label>
          <input
            autoComplete="off"
            disabled={isLoading}
            className="h-[3.65rem] w-full rounded-2xl border border-stone-200/90 bg-white/75 px-5 font-montserrat text-sm text-stone-900 shadow-[0_5px_20px_rgba(40,35,24,0.025)] outline-none transition placeholder:text-stone-400 hover:border-stone-300 focus:border-stone-500 focus:bg-white focus:ring-4 focus:ring-stone-900/[0.04]"
            id="artistName"
            onChange={(event) => setArtistName(event.target.value)}
            placeholder="Artist name"
            value={artistName}
          />
          <button
            className="mt-1 flex h-[3.65rem] items-center justify-center gap-3 rounded-2xl bg-stone-950 px-6 font-work text-sm font-medium text-white shadow-lg shadow-stone-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-xl hover:shadow-stone-900/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-900/20 active:translate-y-0 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2" role="status" aria-label="Searching">
                <span className="size-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                <span className="size-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] [animation-delay:150ms]" />
                <span className="size-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] [animation-delay:300ms]" />
              </span>
            ) : (
              <>
                Search
                <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
                  <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </>
            )}
          </button>
          <button
            className="mx-auto max-w-md font-work text-sm leading-7 text-stone-500 underline decoration-stone-300 cursor-pointer underline-offset-4 transition hover:text-stone-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-900/10 sm:text-base"
            onClick={() => setShowSearchConventions(true)}
            type="button"
            disabled={isLoading}
          >
            Searching Conventions
          </button>
        </form>
      </section>

      {error && (
        <div className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2" role="alert">
          <div className="flex items-start gap-3 rounded-2xl border border-stone-200/90 bg-[#fdfcf9] px-4 py-4 text-left shadow-[0_16px_50px_rgba(40,35,24,0.14)] sm:px-5">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-600">
              <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
                <path d="M10 6.25v4.167m0 3.333h.008M17.083 10A7.083 7.083 0 1 1 2.917 10a7.083 7.083 0 0 1 14.166 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-work text-sm font-medium text-stone-900">We couldn’t find that song</p>
              <p className="mt-1 font-work text-xs leading-5 text-stone-500">{error}</p>
            </div>
            <button
              aria-label="Dismiss message"
              className="grid size-7 shrink-0 place-items-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-900/10 disabled:cursor-wait"
              disabled={isLoading}
              onClick={onDismissError}
              type="button"
            >
              <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 20 20">
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {showSearchConventions && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/15 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setShowSearchConventions(false)}
          role="dialog"
          aria-labelledby="search-conventions-title"
        >
          <section
            className="relative w-full max-w-xl rounded-[2rem] border border-white/90 bg-[#fdfcf9] px-6 py-8 shadow-[0_24px_80px_rgba(40,35,24,0.16)] sm:px-10 sm:py-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close searching conventions"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-950 focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-900/10 sm:right-5 sm:top-5"
              onClick={() => setShowSearchConventions(false)}
              type="button"
              disabled={isLoading}
            >
              <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
              </svg>
            </button>
            <p className="font-work text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">A little guide</p>
            <h2 id="search-conventions-title" className="mt-3 pr-8 font-display text-4xl tracking-[-0.05em] text-stone-950 sm:text-5xl">
              Searching, simply.
            </h2>
            <ul className="mt-7 grid gap-3 font-work text-sm leading-6 text-stone-600 sm:text-base">
              <li className="rounded-2xl bg-stone-100/70 px-4 py-3"><span className="font-medium text-stone-900">Song + artist</span> — the most accurate way to find a track.</li>
              <li className="rounded-2xl bg-stone-100/70 px-4 py-3"><span className="font-medium text-stone-900">Song title only</span> — leave the artist blank if you are not sure.</li>
              <li className="rounded-2xl bg-stone-100/70 px-4 py-3"><span className="font-medium text-stone-900">Artist name</span> — pair it with a title, including featured artists when useful.</li>
              <li className="rounded-2xl bg-stone-100/70 px-4 py-3"><span className="font-medium text-stone-900">Versions</span> — add terms such as “live”, “acoustic”, or “remix” to narrow it down.</li>
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}

function getLyricPreview(lyrics) {
  const lines = (Array.isArray(lyrics) ? lyrics : typeof lyrics === 'string' ? lyrics.split(/\r?\n/) : [])
    .map((line) => String(line).replace(/^\s*\[[^\]]+\]\s*/, '').trim())
    .filter(Boolean)

  return [lines[0] ?? '', lines[1] ?? '', lines[2] ?? '']
}

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
          <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              d="M15.833 10H4.167m0 0L10 4.167M4.167 10 10 15.833"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
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
              <p
                aria-current="true"
                className="relative z-10 max-w-2xl font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-stone-950 sm:text-[2rem]"
              >
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
  );
}

function App() {
  const [songData, setSongData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!error) return undefined

    const timeoutId = window.setTimeout(() => setError(''), 5000)
    return () => window.clearTimeout(timeoutId)
  }, [error])

  async function handleSearch(songName, artistName) {
    if (!songName || !artistName) {
      setError('Please fill in both the song name and artist name before searching.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const data = await fetchSong(songName, artistName)
      if (!data) {
        setError('Please consider going through searching conventions')
        return
      }

      setSongData(data)
    } catch {
      setError('Something went wrong while searching. Please try again in a moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f6f2] text-stone-950 selection:bg-stone-900 selection:text-white">
      {songData ? (
        <SongPage song={songData} onBack={() => setSongData(null)} />
      ) : (
        <HomePage
          error={error}
          isLoading={isLoading}
          onDismissError={() => setError('')}
          onHome={() => setSongData(null)}
          onSearch={handleSearch}
        />
      )}
    </div>
  )
}

export default App

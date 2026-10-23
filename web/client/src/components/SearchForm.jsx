import { useState } from 'react'

function SearchForm({ onSearch, isLoading, onOpenConventions }) {
  const [songName, setSongName] = useState('')
  const [artistName, setArtistName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(songName.trim(), artistName.trim())
  }

  return (
    <form
      className="mx-auto mt-11 grid max-w-[30rem] gap-3 text-left sm:mt-14"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="songName">Song name</label>
      <input
        autoComplete="off"
        disabled={isLoading}
        className="h-[3.65rem] w-full rounded-2xl border border-stone-200/90 bg-white/75 px-5 font-montserrat text-sm text-stone-900 shadow-[0_5px_20px_rgba(40,35,24,0.025)] outline-none transition placeholder:text-stone-400 hover:border-stone-300 focus:border-stone-500 focus:bg-white focus:ring-4 focus:ring-stone-900/[0.04]"
        id="songName"
        onChange={(event) => setSongName(event.target.value)}
        placeholder="Song name"
        value={songName}
      />
      <label className="sr-only" htmlFor="artistName">Artist name</label>
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
        className="mx-auto max-w-md cursor-pointer font-work text-sm leading-7 text-stone-500 underline decoration-stone-300 underline-offset-4 transition hover:text-stone-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-900/10 disabled:cursor-wait sm:text-base"
        onClick={onOpenConventions}
        type="button"
        disabled={isLoading}
      >
        Searching Conventions
      </button>
    </form>
  )
}

export default SearchForm

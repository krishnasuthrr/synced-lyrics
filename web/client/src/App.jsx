import { useState } from 'react'

const featuredSong = {
  title: "West Coast",
  artist: "Lana Del Rey",
  lyrics: {
    previous: "Down on the West coast, they got a sayin'",
    current: `"If you're not drinkin', then you're not playin'"`,
    next: "But you've got the music",
  },
};

// function Wordmark({ onClick }) {
//   return (
//     <button className="group inline-flex items-center gap-3 text-left" onClick={onClick} type="button" aria-label="Go to home page">
//       <span className="grid size-9 place-items-center rounded-xl bg-stone-950 text-sm font-semibold tracking-tight text-white transition-transform group-hover:-rotate-6">tl</span>
//       <span className="font-work text-sm font-semibold tracking-[-0.04em] text-stone-900">tenderlyrics</span>
//     </button>
//   )
// }

function HomePage({ onSearch }) {
  const [songName, setSongName] = useState('')
  const [artistName, setArtistName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(songName.trim() || featuredSong.title, artistName.trim() || featuredSong.artist)
  }

  return (
    <main className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center flex-col px-5 py-16 sm:px-8">
      
      <div className="absolute left-1/2 top-[17%] -z-0 size-72 -translate-x-1/2 rounded-full bg-white/70 blur-3xl sm:size-[30rem]" />
      <section className="relative z-10 w-full max-w-2xl text-center">
        <h1 className="font-display text-[clamp(3.4rem,10vw,6.6rem)] leading-[0.94] tracking-[-0.065em] text-stone-950">
          Every word,
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
            className="h-[3.65rem] w-full rounded-2xl border border-stone-200/90 bg-white/75 px-5 font-montserrat text-sm text-stone-900 shadow-[0_5px_20px_rgba(40,35,24,0.025)] outline-none transition placeholder:text-stone-400 hover:border-stone-300 focus:border-stone-500 focus:bg-white focus:ring-4 focus:ring-stone-900/[0.04]"
            id="artistName"
            onChange={(event) => setArtistName(event.target.value)}
            placeholder="Artist name"
            value={artistName}
          />
          <button
            className="mt-1 flex h-[3.65rem] items-center justify-center gap-3 rounded-2xl bg-stone-950 px-6 font-work text-sm font-medium text-white shadow-lg shadow-stone-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-xl hover:shadow-stone-900/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-900/20 active:translate-y-0"
            type="submit"
          >
            Search songs
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </form>
      </section>
    </main>
  );
}

function SongPage({ song, onBack }) {
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
          <h1 className="font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-none tracking-[-0.06em] text-stone-950">
            {song.title}
          </h1>
          <p className="mt-4 font-montserrat text-sm font-medium tracking-wide text-stone-500 sm:text-base">
            {song.artist}
          </p>
        </div>

        <div className="relative mx-auto mt-16 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/90 bg-white/55 px-5 py-10 shadow-[0_24px_80px_rgba(62,51,31,0.055)] sm:mt-20 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/80 to-transparent" />
          <div className="relative flex min-h-60 flex-col items-center justify-center gap-8 text-center sm:min-h-64 sm:gap-9">
            <p className="max-w-2xl font-display text-lg leading-relaxed text-stone-300 sm:text-2xl">
              {featuredSong.lyrics.previous}
            </p>
            <div className="relative isolate py-1">
              <span className="absolute inset-x-0 inset-y-[-0.75rem] z-0 rounded-2xl bg-stone-100/80 sm:-inset-x-4" />
              <p
                aria-current="true"
                className="relative z-10 max-w-2xl font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-stone-950 sm:text-[2rem]"
              >
                {featuredSong.lyrics.current}
              </p>
            </div>
            <p className="max-w-2xl font-display text-lg leading-relaxed text-stone-300 sm:text-2xl">
              {featuredSong.lyrics.next}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [song, setSong] = useState(null)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f6f2] text-stone-950 selection:bg-stone-900 selection:text-white">
      {song ? <SongPage song={song} onBack={() => setSong(null)} /> : <HomePage onSearch={(title, artist) => setSong({ title, artist })} />}
    </div>
  )
}

export default App

import { useState } from 'react'
import SearchConventionsModal from './SearchConventionsModal.jsx'
import SearchForm from './SearchForm.jsx'
import Toast from './Toast.jsx'
import Wordmark from './Wordmark.jsx'

function HomePage({ onSearch, isLoading, error, onDismissError, onHome }) {
  const [showSearchConventions, setShowSearchConventions] = useState(false)

  function handleSearch(songName, artistName) {
    setShowSearchConventions(false)
    onSearch(songName, artistName)
  }

  return (
    <main className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-between px-5 sm:px-8">
      <header className="relative z-20 mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Wordmark disabled={isLoading} onClick={onHome} />
        <p className="font-work text-[10px] font-medium uppercase tracking-[0.15em] text-stone-400 sm:text-[11px]">
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
          Find the song you love. Settle in, and let the lyrics find their rhythm.
        </p>
        <SearchForm
          isLoading={isLoading}
          onOpenConventions={() => setShowSearchConventions(true)}
          onSearch={handleSearch}
        />
      </section>

      <div className="h-20 w-full" aria-hidden="true" />
      <Toast message={error} isLoading={isLoading} onDismiss={onDismissError} />
      {showSearchConventions && (
        <SearchConventionsModal onClose={() => setShowSearchConventions(false)} />
      )}
    </main>
  )
}

export default HomePage

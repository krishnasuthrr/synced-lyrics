function SearchConventionsModal({ onClose }) {
  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/15 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
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
          onClick={onClose}
          type="button"
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
          <li className="rounded-2xl bg-stone-100/70 px-4 py-3"><span className="font-medium text-stone-900">Song + Artist</span> — Names must be accurately matching with the YouTube video of the song.</li>
          <li className="rounded-2xl bg-stone-100/70 px-4 py-3"><span className="font-medium text-stone-900">Song title only</span> — leave the artist blank if you are not sure.</li>
          <li className="rounded-2xl bg-stone-100/70 px-4 py-3"><span className="font-medium text-stone-900">Artist name</span> — pair it with a title, including featured artists when useful.</li>
          <li className="rounded-2xl bg-stone-100/70 px-4 py-3"><span className="font-medium text-stone-900">Versions</span> — add terms such as “live”, “acoustic”, or “remix” to narrow it down.</li>
        </ul>
      </section>
    </div>
  )
}

export default SearchConventionsModal

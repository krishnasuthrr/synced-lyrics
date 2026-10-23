function Toast({ message, title = 'We couldn’t find that song', isLoading, onDismiss }) {
  if (!message) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2" role="alert">
      <div className="flex items-start gap-3 rounded-2xl border border-stone-200/90 bg-[#fdfcf9] px-4 py-4 text-left shadow-[0_16px_50px_rgba(40,35,24,0.14)] sm:px-5">
        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-600">
          <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
            <path d="M10 6.25v4.167m0 3.333h.008M17.083 10A7.083 7.083 0 1 1 2.917 10a7.083 7.083 0 0 1 14.166 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-work text-sm font-medium text-stone-900">{title}</p>
          <p className="mt-1 font-work text-xs leading-5 text-stone-500">{message}</p>
        </div>
        <button
          aria-label="Dismiss message"
          className="grid size-7 shrink-0 place-items-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-900/10 disabled:cursor-wait"
          disabled={isLoading}
          onClick={onDismiss}
          type="button"
        >
          <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 20 20">
            <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Toast

function Wordmark({ onClick, disabled = false }) {
  return (
    <button
      className="group inline-flex items-center gap-3 text-left disabled:cursor-default"
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
          aria-hidden="true"
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
  )
}

export default Wordmark

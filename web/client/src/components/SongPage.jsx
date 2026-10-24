import { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import LyricsWindow from "./LyricsWindow.jsx";
import useSyncedLyrics from "../hooks/useSyncedLyrics.js";
import Toast from './Toast.jsx'

function SongPage({ song, onBack }) {
  const [playbackTime, setPlaybackTime] = useState(0)
  const [playbackError, setPlaybackError] = useState('')
  const { lyrics, currentIndex } = useSyncedLyrics(song.lyrics, playbackTime)

  useEffect(() => {
    setPlaybackError(song.url ? '' : 'No audio URL was included with this song. You can still read the lyrics.')
  }, [song.url])

  function handleTimeUpdate(event) {
    const currentTime = event?.currentTarget?.currentTime ?? event?.target?.currentTime
    if (Number.isFinite(currentTime)) setPlaybackTime(currentTime)
  }

  function handlePlayerError() {
    setPlaybackError('Audio could not be started. Your browser may require a tap to begin playback.')
  }

  return (
    <main className="flex min-h-[calc(100svh-5rem)] flex-col items-center px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
      {song.url ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-10000px] top-0 h-[200px] w-[200px] overflow-hidden opacity-0"
        >
          <ReactPlayer
            src={song.url}
            playing
            controls={false}
            muted={false}
            playsInline
            width="200px"
            height="200px"
            onTimeUpdate={handleTimeUpdate}
            onError={handlePlayerError}
          />
        </div>
      ) : null}

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

      <section className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center pb-6 pt-16 sm:pb-14 sm:pt-20 lg:grid lg:max-w-7xl lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-center lg:gap-x-14">
        <div className="flex w-[80%] flex-col items-center justify-between gap-9 text-center md:flex-row md:gap-12 md:text-left lg:col-start-1 lg:row-start-1 lg:w-full lg:flex-col lg:gap-7 lg:text-center">
          <div className="min-w-0 flex-1 lg:order-2 lg:w-full lg:flex-none">
            <h1 className="font-display text-[clamp(2.8rem,2vw,5.5rem)] leading-none tracking-[-0.06em] text-stone-950">
              {song.title}
            </h1>
            <p className="mt-4 font-montserrat text-lg font-medium tracking-wide text-stone-600">
              {song.artist}
            </p>
          </div>
          {song.thumbnail && (
            <img
              alt={`${song.title} by ${song.artist} thumbnail`}
              className="h-auto max-h-72 w-auto max-w-full rounded-2xl object-contain shadow-[0_16px_48px_rgba(40,35,24,0.12)] md:max-w-sm lg:order-1 lg:max-h-[min(42vh,22rem)] lg:max-w-full"
              decoding="async"
              loading="lazy"
              src={song.thumbnail}
            />
          )}
        </div>

        <LyricsWindow
          className="lg:col-start-2 lg:row-start-1 lg:mx-0 lg:mt-0 lg:max-w-none"
          currentIndex={currentIndex}
          lyrics={lyrics}
        />
      </section>

      {playbackError && (
        <Toast
          title={song.url ? 'Playback unavailable' : 'Audio unavailable'}
          message={playbackError}
          onDismiss={() => setPlaybackError('')}
        />
      )}
    </main>
  );
}

export default SongPage;

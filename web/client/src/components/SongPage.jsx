import { useEffect, useRef, useState } from 'react'
import ReactPlayer from "react-player";
import LyricsWindow from "./LyricsWindow.jsx";
import useSyncedLyrics from "../hooks/useSyncedLyrics.js";
import Toast from './Toast.jsx'

function SongPage({ song, onBack }) {
  const playerRef = useRef(null)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [duration, setDuration] = useState(() => Number(song.duration) || 0)
  const [isPlaying, setIsPlaying] = useState(Boolean(song.url))
  const [playbackError, setPlaybackError] = useState('')
  const { lyrics, currentIndex } = useSyncedLyrics(song.lyrics, playbackTime)

  useEffect(() => {
    setPlaybackError(song.url ? '' : 'No audio URL was included with this song. You can still read the lyrics.')
  }, [song.url])

  function handleTimeUpdate(event) {
    const currentTime = event?.currentTarget?.currentTime ?? event?.target?.currentTime
    if (Number.isFinite(currentTime)) setPlaybackTime(currentTime)

    const mediaDuration = event?.currentTarget?.duration ?? event?.target?.duration
    if (Number.isFinite(mediaDuration) && mediaDuration > 0) setDuration(mediaDuration)
  }

  function handleDurationChange(event) {
    const mediaDuration = event?.currentTarget?.duration ?? event?.target?.duration
    if (Number.isFinite(mediaDuration) && mediaDuration > 0) setDuration(mediaDuration)
  }

  function handleSeek(event) {
    const nextTime = Number(event.target.value)
    if (!Number.isFinite(nextTime)) return

    setPlaybackTime(nextTime)
    if (playerRef.current) playerRef.current.currentTime = nextTime
  }

  function handlePlayerError() {
    setIsPlaying(false)
    setPlaybackError('Audio could not be started. Your browser may require a tap to begin playback.')
  }

  return (
    <main className="flex min-h-[calc(100svh-5rem)] flex-col items-center px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-12">
      {song.url ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-10000px] top-0 h-[200px] w-[200px] overflow-hidden opacity-0"
        >
          <ReactPlayer
            ref={playerRef}
            src={song.url}
            playing={isPlaying}
            controls={false}
            muted={false}
            playsInline
            width="200px"
            height="200px"
            onTimeUpdate={handleTimeUpdate}
            onDurationChange={handleDurationChange}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={handlePlayerError}
          />
        </div>
      ) : null}

      <button
        aria-label="Back to search"
        className="fixed left-4 top-4 z-50 grid size-10 place-items-center rounded-full border border-stone-200/80 bg-[#f7f6f2]/90 text-stone-500 shadow-sm backdrop-blur transition hover:bg-white hover:text-stone-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-900/10"
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
      </button>

      <section className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 pb-6 pt-8 sm:gap-0 sm:pt-16 lg:grid lg:max-w-7xl lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-stretch lg:gap-x-14 lg:pt-20">
        <div className="order-2 flex w-full max-w-sm flex-col items-center justify-between gap-6 px-2 text-center sm:gap-8 lg:order-none lg:col-start-1 lg:row-start-1 lg:w-full lg:max-w-none lg:justify-center lg:gap-7 lg:px-0">
          <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-12 md:text-left lg:flex-col lg:gap-7 lg:text-center">
            {song.thumbnail && (
              <img
                alt={`${song.title} by ${song.artist} thumbnail`}
                className="order-first h-auto max-h-37 w-auto max-w-37 rounded-xl object-contain shadow-[0_12px_32px_rgba(40,35,24,0.1)] md:order-none md:max-h-72 md:max-w-[40%] md:rounded-2xl md:shadow-[0_16px_48px_rgba(40,35,24,0.12)] lg:order-1 lg:max-h-[min(42vh,22rem)] lg:max-w-full"
                decoding="async"
                loading="lazy"
                src={song.thumbnail}
              />
            )}
            <div className="min-w-0 flex-1 lg:order-2 lg:w-full lg:flex-none">
              <h1 className="font-display text-[clamp(2rem,8vw,3.2rem)] leading-tight tracking-[-0.06em] text-stone-950 lg:text-[clamp(2.8rem,2vw,5.5rem)] lg:leading-none">
                {song.title}
              </h1>
              <p className="mt-2 font-montserrat text-sm font-medium tracking-wide text-stone-600 sm:mt-4 sm:text-base lg:text-lg">
                {song.artist}
              </p>
            </div>
          </div>

          <div className="w-full px-1">
            <div className="flex items-center gap-3">
              <button
                aria-label={isPlaying ? "Pause song" : "Play song"}
                className="grid size-9 shrink-0 place-items-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/40 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!song.url}
                onClick={() => setIsPlaying((playing) => !playing)}
                type="button"
              >
                {isPlaying ? (
                  <svg
                    aria-hidden="true"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7 5v10M13 5v10"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.7"
                    />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="m7 5 8 5-8 5V5Z"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </button>

              <div className="min-w-0 flex-1">
                <input
                  aria-label="Seek through song"
                  className="audio-seek w-full disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!song.url || duration <= 0}
                  max={duration || 0}
                  min="0"
                  onChange={handleSeek}
                  step="0.1"
                  style={{
                    "--seek-progress": `${duration > 0 ? (playbackTime / duration) * 100 : 0}%`,
                  }}
                  type="range"
                  value={Math.min(playbackTime, duration || 0)}
                />
              </div>
            </div>
          </div>
        </div>

        <LyricsWindow
          className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 lg:mx-0 lg:h-full lg:max-w-none"
          currentIndex={currentIndex}
          lyrics={lyrics}
        />
      </section>

      {playbackError && (
        <Toast
          title={song.url ? "Playback unavailable" : "Audio unavailable"}
          message={playbackError}
          onDismiss={() => setPlaybackError("")}
        />
      )}
    </main>
  );
}

export default SongPage;

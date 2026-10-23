import { useEffect, useState } from 'react'
import HomePage from './components/HomePage.jsx'
import SongPage from './components/SongPage.jsx'
import { fetchSong } from './utils/app.util.js'

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

import axios from 'axios'

export async function fetchSong(song, artist) {
  try {
    const response = await axios.get('http://localhost:3000/api/search', {
      params: { song, artist },
    })

    console.log(response.data)

    return response.data
  } catch (error) {
    console.error('Song search failed:', error)
    return null
  }
}

// await fetchSong("baby by me", "50 cent")
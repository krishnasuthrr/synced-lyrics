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

// await fetchSong("dirty diana", "michael jackson")

const examplePayload = {
  title: 'Dirty Diana',
  artist: 'Michael Jackson',
  duration: 281,
  thumbnail: 'https://i.ytimg.com/vi/aUD0juRwb3I/hq720.jpg',
  url: 'https://youtube.com/watch?v=aUD0juRwb3I',
  lyrics: [
    { time: 4100, text: 'Oh, no' },
    { time: 14970, text: '' },
    { time: 20090, text: 'Oh, no' },
    { time: 24960, text: 'Oh, no' },
    { time: 28680, text: "You'll never make me stay" },
    { time: 29990, text: 'So take your weight off of me' },
    { time: 31650, text: 'I know your every move' },
    { time: 33540, text: "So won't you just let me be" },
    { time: 35350, text: "I've been here times before" },
    { time: 37440, text: 'But I was too blind to see' },
    { time: 38950, text: 'That you seduce every man' },
    { time: 40790, text: "This time you won't seduce me" },
    { time: 42550, text: `She's saying, "That's okay` },
    { time: 44320, text: 'Hey, baby, do what you please' },
    { time: 46580, text: 'I have the stuff that you want' },
    { time: 48320, text: 'I am the thing that you need' },
    { time: 49920, text: 'She looked me deep in the eyes' },
    { time: 51740, text: "She touchin' me so to start" },
    { time: 53760, text: `She says there's no turnin' back"` },
    { time: 55470, text: 'She trapped me in her heart' },
    { time: 57300, text: 'Dirty Diana, nah' },
    { time: 60980, text: 'Dirty Diana, nah' },
    { time: 64420, text: 'Dirty Diana, no' },
    { time: 68320, text: 'Dirty Diana' },
    { time: 70580, text: 'Let me be' },
    { time: 72180, text: 'Oh, no' },
    { time: 78110, text: 'Oh, no' },
    { time: 79910, text: 'Oh, no' },
    { time: 84360, text: '' },
    { time: 86770, text: 'She likes the boys in the bands' },
    { time: 88430, text: 'She knows when they come to town' },
    {
      time: 90160,
      text: "Every musician's fan, after the curtain comes down"
    },
    {
      time: 93820,
      text: 'She waits at backstage doors, for those who have prestige'
    },
    {
      time: 97460.00000000001,
      text: "Who promise fortune and fame, a life that's so carefree"
    },
    { time: 101160, text: `She's saying, "That's okay` },
    { time: 102890, text: 'Hey, baby, do what you want' },
    {
      time: 104770.00000000001,
      text: "I'll be your night lovin' thing"
    },
    { time: 106860, text: "I'll be the freak you can taunt" },
    { time: 108280, text: "I don't care what you say" },
    { time: 110270.00000000001, text: 'I wanna go too far' },
    { time: 112330, text: "I'll be your everything" },
    { time: 114009.99999999999, text: 'If you make me a star"' },
    { time: 115950, text: 'Dirty Diana, nah' },
    { time: 119740.00000000001, text: 'Dirty Diana, nah' },
    { time: 123180, text: 'Dirty Diana, no' },
    { time: 126950, text: 'Dirty Diana' },
    { time: 129190, text: 'Dirty Diana, nah' },
    { time: 134220, text: 'Dirty Diana, nah' },
    { time: 137690, text: 'Dirty Diana, no' },
    { time: 141440, text: 'Dirty Diana' },
    { time: 143590, text: 'Diana' },
    { time: 148550, text: 'Diana' },
    { time: 152340, text: 'Dirty Diana' },
    { time: 156070, text: "It's Dia-aa-aa... come on" },
    { time: 160220, text: '' },
    { time: 174380, text: 'She said, "I have to go home' },
    { time: 176850, text: "'Cause I'm real tired you see" },
    { time: 178070, text: "Now I hate sleepin' alone" },
    { time: 179770, text: `Why don't you come with me?"` },
    { time: 181760, text: `I said, "My baby's at home` },
    { time: 183870, text: "She's probably worried tonight" },
    { time: 185420, text: "I didn't call on the phone" },
    { time: 187290, text: `To say that I'm alright"` },
    { time: 189340, text: 'Diana walked up to me' },
    { time: 190960, text: `She said, "I'm all yours tonight"` },
    { time: 192940, text: 'And then I ran to the phone' },
    { time: 194590, text: `Sayin', "Baby I'm alright"` },
    { time: 196630, text: 'I said, "But unlock the door"' },
    { time: 198220, text: "'Cause I forgot the key" },
    { time: 200040, text: `She said, "He's not coming back` },
    { time: 202010, text: `Because he's sleeping with me"` },
    { time: 204180, text: 'Dirty Diana, nah' },
    { time: 208070, text: 'Dirty Diana, nah' },
    { time: 210820, text: 'Dirty Diana, nah' },
    { time: 214540, text: 'Dirty Diana, no' },
    { time: 218430, text: 'Dirty Diana, nah' },
    { time: 221720, text: 'Dirty Diana, nah' },
    { time: 225100, text: 'Dirty Diana, nah' },
    { time: 229410, text: 'Dirty Diana' },
    { time: 231130, text: 'Come on!' },
    { time: 236480, text: 'Come on!' },
    { time: 240260, text: 'Come on!' },
    { time: 244030, text: 'Come on!' },
    { time: 247720, text: 'Come on!' },
    { time: 251480, text: 'Come on!' },
    { time: 255200, text: 'Come on!' },
    { time: 258800, text: 'Come on!' },
    { time: 261740, text: 'Come on!' },
    { time: 265570, text: 'Come on!' },
    { time: 269660, text: 'Come on!' },
    { time: 273390, text: 'Come on!' },
    { time: 277930, text: '' }
  ]
}
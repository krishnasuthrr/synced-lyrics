export function getLyricPreview(lyrics) {
  const lines = (Array.isArray(lyrics) ? lyrics : typeof lyrics === 'string' ? lyrics.split(/\r?\n/) : [])
    .map((line) => String(line).replace(/^\s*\[[^\]]+\]\s*/, '').trim())
    .filter(Boolean)

  return [lines[0] ?? '', lines[1] ?? '', lines[2] ?? '']
}

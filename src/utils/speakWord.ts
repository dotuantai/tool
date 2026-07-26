/** Speaks an English word via the Web SpeechSynthesis API. */

let cachedEnglishVoice: SpeechSynthesisVoice | null | undefined

/** Prefer natural US/UK voices; avoid non-English defaults on VI locales. */
function pickEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const english = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
  if (english.length === 0) return null

  const preferName = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase()
    // Prefer high-quality neural / named English voices on Windows/Chrome
    if (/neural|natural|enhanced|premium/.test(name)) return 0
    if (/google us english|microsoft aria|microsoft jenny|microsoft guy|microsoft david|microsoft zira|samantha|alex|daniel/.test(name))
      return 1
    if (v.lang.toLowerCase().startsWith('en-us')) return 2
    if (v.lang.toLowerCase().startsWith('en-gb')) return 3
    return 4
  }

  return [...english].sort((a, b) => preferName(a) - preferName(b))[0] ?? null
}

function getEnglishVoice(): SpeechSynthesisVoice | null {
  if (cachedEnglishVoice !== undefined) return cachedEnglishVoice

  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) return null

  cachedEnglishVoice = pickEnglishVoice(voices)
  return cachedEnglishVoice
}

function ensureVoicesLoaded(): Promise<SpeechSynthesisVoice[]> {
  const existing = window.speechSynthesis.getVoices()
  if (existing.length > 0) return Promise.resolve(existing)

  return new Promise((resolve) => {
    const onVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged)
      resolve(window.speechSynthesis.getVoices())
    }
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged)
    // Some browsers never fire voiceschanged; don't hang forever
    window.setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged)
      resolve(window.speechSynthesis.getVoices())
    }, 500)
  })
}

function speakWithVoice(word: string, lang: string, voice: SpeechSynthesisVoice | null): void {
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(word)
  utterance.lang = voice?.lang || lang
  utterance.rate = 0.9
  if (voice) utterance.voice = voice

  window.speechSynthesis.speak(utterance)
}

export function speakWord(word: string, lang = 'en-US'): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return

  const voice = getEnglishVoice()
  if (voice || window.speechSynthesis.getVoices().length > 0) {
    speakWithVoice(word, lang, voice)
    return
  }

  // Voices load async on first use (Chrome/Edge) — wait then speak
  void ensureVoicesLoaded().then((voices) => {
    cachedEnglishVoice = pickEnglishVoice(voices)
    speakWithVoice(word, lang, cachedEnglishVoice)
  })
}

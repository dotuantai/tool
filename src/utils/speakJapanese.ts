/** Speaks a Japanese hiragana character with authentic Japanese pronunciation.
 *
 * Priority order:
 *  1. Google Translate TTS (authentic Japanese, no install needed)
 *  2. Web Speech API with a Japanese voice (if one is installed on the OS)
 *  3. English TTS reading the romaji (last resort)
 */

import { speakWord } from '@/utils/speakWord'

// ─── Google Translate TTS (audio element, bypasses CORS) ─────────────────────

function playGoogleTTS(word: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Use client=gtx — this is the same client used by the Google Translate
    // web widget and works reliably as a media request (no CORS block).
    const url =
      `https://translate.googleapis.com/translate_tts` +
      `?ie=UTF-8&tl=ja&client=gtx&q=${encodeURIComponent(word)}`

    const audio = new Audio(url)

    // Resolve true as soon as the browser can start playing
    audio.addEventListener('canplaythrough', () => {
      audio.play().then(() => resolve(true)).catch(() => resolve(false))
    }, { once: true })

    audio.addEventListener('error', () => resolve(false), { once: true })

    // Give up after 3 s if the network is too slow or the URL is blocked
    setTimeout(() => resolve(false), 3000)
  })
}

// ─── Web Speech API helpers ───────────────────────────────────────────────────

function pickJapaneseVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const japanese = voices.filter((v) => v.lang.toLowerCase().startsWith('ja'))
  if (japanese.length === 0) return null

  const score = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase()
    if (/neural|natural|enhanced|premium/.test(name)) return 0
    if (/google|nanami|ayumi|haruka|ichiro|kyoko|otoya/.test(name)) return 1
    return 2
  }

  return [...japanese].sort((a, b) => score(a) - score(b))[0] ?? null
}

function ensureVoicesLoaded(): Promise<SpeechSynthesisVoice[]> {
  const existing = window.speechSynthesis.getVoices()
  if (existing.length > 0) return Promise.resolve(existing)

  return new Promise((resolve) => {
    const handler = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler)
      resolve(window.speechSynthesis.getVoices())
    }
    window.speechSynthesis.addEventListener('voiceschanged', handler)
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler)
      resolve(window.speechSynthesis.getVoices())
    }, 600)
  })
}

function speakWithJapaneseVoice(character: string, voice: SpeechSynthesisVoice): void {
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(character)
  utterance.lang = voice.lang
  utterance.rate = 0.85
  utterance.voice = voice
  window.speechSynthesis.speak(utterance)
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Speak a hiragana character in authentic Japanese.
 * @param character  The hiragana character, e.g. "あ"
 * @param romaji     Romaji fallback, e.g. "a" — used only as last resort
 */
export async function speakJapaneseWord(character: string, romaji: string): Promise<void> {
  if (typeof window === 'undefined' || !window.speechSynthesis) return

  // 1. Try Google TTS first — gives authentic Japanese pronunciation on any device
  const googleOk = await playGoogleTTS(character)
  if (googleOk) return

  // 2. Fall back to system Japanese voice if available
  const voices = await ensureVoicesLoaded()
  const japaneseVoice = pickJapaneseVoice(voices)
  if (japaneseVoice) {
    speakWithJapaneseVoice(character, japaneseVoice)
    return
  }

  // 3. Last resort: English TTS reading the romaji
  speakWord(romaji)
}

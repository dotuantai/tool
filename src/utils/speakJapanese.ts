/** Speaks a Japanese hiragana character with authentic Japanese pronunciation.
 * Works across Chrome, Brave, Edge, Safari, Firefox.
 */

import { speakWord } from '@/utils/speakWord'

let cachedJapaneseVoice: SpeechSynthesisVoice | null = null

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

function refreshCache() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const voices = window.speechSynthesis.getVoices()
  cachedJapaneseVoice = pickJapaneseVoice(voices)
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.addEventListener('voiceschanged', refreshCache)
  refreshCache()
}

/**
 * Speaks a hiragana character using the best available Japanese audio source.
 */
export function speakJapaneseWord(character: string, romaji: string): void {
  if (typeof window === 'undefined') return

  refreshCache()

  // 1. If browser/OS has a Japanese voice (like Chrome natively has), use it!
  if (cachedJapaneseVoice && window.speechSynthesis) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(character)
    utterance.lang = cachedJapaneseVoice.lang
    utterance.rate = 0.85
    utterance.voice = cachedJapaneseVoice
    window.speechSynthesis.speak(utterance)
    return
  }

  // 2. Fallback for browsers like Brave that block Google cloud voices:
  // Use online Japanese Dictionary audio API (Youdao JP voice) which is NOT blocked by Brave Shields
  const dictionaryAudioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(character)}&le=jap`
  const audio = new Audio(dictionaryAudioUrl)

  audio.play().catch(() => {
    // 3. Secondary fallback: Google Translate TTS
    const googleUrl = `https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=ja&client=gtx&q=${encodeURIComponent(character)}`
    const gAudio = new Audio(googleUrl)
    gAudio.play().catch(() => {
      // 4. Final fallback: English speech synthesis reading romaji
      speakWord(romaji)
    })
  })
}

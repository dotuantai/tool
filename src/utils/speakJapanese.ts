/** Speaks a Japanese hiragana character with authentic Japanese pronunciation.
 * Works across Chrome, Brave, Edge, Safari, Firefox.
 *
 * Known fixes applied:
 *  - speechSynthesis.resume() trước speak() để vá bug Chrome tab-backgrounded frozen.
 *  - ensureVoicesLoaded() async để tránh race condition lần đầu load.
 */

import { speakWord } from '@/utils/speakWord'

let cachedJapaneseVoice: SpeechSynthesisVoice | null = null
let voicesReady = false

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
  if (voices.length > 0) {
    cachedJapaneseVoice = pickJapaneseVoice(voices)
    voicesReady = true
  }
}

function ensureJapaneseVoiceLoaded(): Promise<SpeechSynthesisVoice | null> {
  if (voicesReady) return Promise.resolve(cachedJapaneseVoice)

  const existing = window.speechSynthesis.getVoices()
  if (existing.length > 0) {
    cachedJapaneseVoice = pickJapaneseVoice(existing)
    voicesReady = true
    return Promise.resolve(cachedJapaneseVoice)
  }

  return new Promise((resolve) => {
    const onReady = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onReady)
      refreshCache()
      resolve(cachedJapaneseVoice)
    }
    window.speechSynthesis.addEventListener('voiceschanged', onReady)
    // Timeout fallback: một số browser không bắn voiceschanged
    window.setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', onReady)
      refreshCache()
      resolve(cachedJapaneseVoice)
    }, 1000)
  })
}

/**
 * Phát âm bằng Web Speech API với voice đã chọn.
 * Luôn gọi resume() trước speak() để vá bug Chrome frozen khi tab bị background.
 */
function speakWithWebSpeech(character: string, voice: SpeechSynthesisVoice): void {
  const synth = window.speechSynthesis
  synth.cancel()
  // Fix Chrome bug: SpeechSynthesis bị freeze khi tab không active
  synth.resume()
  const utterance = new SpeechSynthesisUtterance(character)
  utterance.lang = voice.lang
  utterance.rate = 0.85
  utterance.voice = voice
  synth.speak(utterance)
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

  // Ưu tiên Web Speech API (nếu voices đã sẵn sàng)
  if (voicesReady && cachedJapaneseVoice && window.speechSynthesis) {
    speakWithWebSpeech(character, cachedJapaneseVoice)
    return
  }

  // Nếu voices chưa sẵn sàng, đợi async rồi thử lại
  if (!voicesReady && window.speechSynthesis) {
    void ensureJapaneseVoiceLoaded().then((voice) => {
      if (voice) {
        speakWithWebSpeech(character, voice)
        return
      }
      // Không có Japanese voice → dùng fallback audio
      playFallbackAudio(character, romaji)
    })
    return
  }

  // Fallback ngay nếu không có speechSynthesis
  playFallbackAudio(character, romaji)
}

/**
 * Fallback cho Brave và các browser không có Japanese voice:
 * Thử Youdao → Google TTS → Romaji đọc bằng tiếng Anh.
 */
function playFallbackAudio(character: string, romaji: string): void {
  // 1. Youdao JP Dictionary audio (thường không bị Brave chặn)
  const dictionaryAudioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(character)}&le=jap`
  const audio = new Audio(dictionaryAudioUrl)

  audio.play().catch(() => {
    // 2. Google Translate TTS
    const googleUrl = `https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=ja&client=gtx&q=${encodeURIComponent(character)}`
    const gAudio = new Audio(googleUrl)
    gAudio.play().catch(() => {
      // 3. Cuối cùng: đọc romaji bằng tiếng Anh
      speakWord(romaji)
    })
  })
}

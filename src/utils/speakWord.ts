/** Speaks an English word via the Web SpeechSynthesis API. */
export function speakWord(word: string, lang = 'en-US'): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(word)
  utterance.lang = lang
  utterance.rate = 0.9

  window.speechSynthesis.speak(utterance)
}

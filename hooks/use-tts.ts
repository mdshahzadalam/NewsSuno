"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type Lang = "en" | "hi"

function pickBestVoice(voices: SpeechSynthesisVoice[], lang: Lang): SpeechSynthesisVoice | undefined {
  if (!voices?.length) return undefined
  const want = lang === "hi" ? ["hi-IN", "hi"] : ["en-IN", "en-GB", "en-US", "en-AU", "en-CA"]
  // 1) exact match by lang code
  for (const code of want) {
    const v = voices.find((voice) => voice.lang?.toLowerCase() === code.toLowerCase())
    if (v) return v
  }
  // 2) includes language family
  const family = lang === "hi" ? "hi" : "en"
  const v2 = voices.find((voice) => voice.lang?.toLowerCase().includes(family))
  if (v2) return v2
  // 3) any available voice
  return voices[0]
}

export function useTTS() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Load voices (browsers load asynchronously)
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    const synth = window.speechSynthesis
    function updateVoices() {
      const list = synth.getVoices()
      if (list && list.length) setVoices(list)
    }

    updateVoices()
    synth.onvoiceschanged = updateVoices
    return () => {
      synth.onvoiceschanged = null
    }
  }, [])

  const speak = useCallback(
    (text: string, lang: Lang, id: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        console.warn("SpeechSynthesis not supported in this browser.")
        return
      }
      const synth = window.speechSynthesis
      // Stop any current speech first
      synth.cancel()
      setIsSpeaking(false)
      setSpeakingId(null)

      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang === "hi" ? "hi-IN" : "en-IN"
      const voice = pickBestVoice(voices, lang)
      if (voice) utter.voice = voice
      // Tune for clarity
      utter.rate = lang === "hi" ? 0.95 : 1.0
      utter.pitch = 1.0
      utter.volume = 1.0

      utter.onstart = () => {
        setIsSpeaking(true)
        setSpeakingId(id)
      }
      utter.onend = () => {
        setIsSpeaking(false)
        setSpeakingId((prev) => (prev === id ? null : prev))
        utterRef.current = null
      }
      utter.onerror = () => {
        setIsSpeaking(false)
        setSpeakingId((prev) => (prev === id ? null : prev))
        utterRef.current = null
      }

      utterRef.current = utter
      synth.speak(utter)
    },
    [voices],
  )

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    const synth = window.speechSynthesis
    synth.cancel()
    setIsSpeaking(false)
    setSpeakingId(null)
    utterRef.current = null
  }, [])

  return useMemo(
    () => ({
      isSpeaking,
      speakingId,
      speak,
      stop,
      hasSupport: typeof window !== "undefined" && "speechSynthesis" in window,
      voices,
    }),
    [isSpeaking, speakingId, speak, stop, voices],
  )
}

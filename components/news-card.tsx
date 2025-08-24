"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, Newspaper, PauseCircle, PlayCircle, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { type LangMode } from "./news-client"
import { useTTS } from "@/hooks/use-tts"

export type Article = {
  id: string
  title: string
  link: string
  description?: string
  image?: string
  publishedAt?: string
  source?: string
}

function stripHtml(text?: string) {
  if (!text) return ""
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
}

function truncate(text: string, max = 220) {
  if (!text) return ""
  const t = stripHtml(text)
  return t.length > max ? t.slice(0, max - 1) + "…" : t
}

function timeAgo(iso?: string): string {
  if (!iso) return ""
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ""
  const diff = Date.now() - then
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return `${sec}s ago`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  const d = Math.floor(hr / 24)
  return `${d}d ago`
}

async function translate(text: string, target: "hi" | "en"): Promise<string | null> {
  try {
    // Limit to avoid hitting public instance limits
    const limited = text.slice(0, 800)
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: limited, target }),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { translatedText?: string }
    return data.translatedText || null
  } catch {
    return null
  }
}

export default function NewsCard({
  article,
  langMode = "en",
}: {
  article: Article
  langMode?: LangMode
}) {
  const img = article.image || "/news-headline-placeholder.png"
  const alt = article.title ? `Image for: ${article.title}` : "News image"

  const [expanded, setExpanded] = useState(false)
  const plainTitle = useMemo(() => stripHtml(article.title), [article.title])
  const plainDesc = useMemo(() => stripHtml(article.description || ""), [article.description])

  // Translated fields (to Hindi when needed)
  const [hiTitle, setHiTitle] = useState<string | null>(null)
  const [hiDesc, setHiDesc] = useState<string | null>(null)
  const needsHindi = langMode === "hi" || langMode === "both"

  useEffect(() => {
    let active = true
    async function run() {
      if (!needsHindi) return
      if (!hiTitle && plainTitle) {
        const t = await translate(plainTitle, "hi")
        if (active) setHiTitle(t)
      }
      if (!hiDesc && plainDesc) {
        const t = await translate(plainDesc, "hi")
        if (active) setHiDesc(t)
      }
    }
    run()
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsHindi, plainTitle, plainDesc])

  // TTS
  const { isSpeaking, speakingId, speak, stop } = useTTS()
  const playing = isSpeaking && speakingId === article.id
  const readingLang: "en" | "hi" = langMode === "hi" ? "hi" : langMode === "both" ? "hi" : "en"

  function buildSpeechText() {
    const parts: string[] = []
    if (readingLang === "hi") {
      parts.push(hiTitle || plainTitle)
      parts.push(expanded ? hiDesc || plainDesc : (hiDesc ? truncate(hiDesc) : truncate(plainDesc)))
    } else {
      parts.push(plainTitle)
      parts.push(expanded ? plainDesc : truncate(plainDesc))
    }
    return parts.filter(Boolean).join(". ")
  }

  return (
    <div className="group h-full">
      <Card className="h-full overflow-hidden transition-shadow duration-200 hover:shadow-md">
        <div className="relative aspect-video w-full bg-neutral-100">
          <img 
            src={img || "/placeholder.svg"} 
            alt={alt} 
            className="h-full w-full object-cover" 
            loading="lazy"
            width={400}
            height={300}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/news-headline-placeholder.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <CardContent className="flex h-full flex-col p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-neutral-600">
            <Newspaper className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{article.source || "News"}</span>
            <span className="text-neutral-400" aria-hidden="true">•</span>
            <time className="whitespace-nowrap text-xs text-neutral-500">{timeAgo(article.publishedAt)}</time>
          </div>

          {/* Title in selected/both languages */}
          <div className="space-y-1.5">
            {(langMode === "en" || langMode === "both") && (
              <h3 className="line-clamp-3 text-base font-medium leading-tight text-neutral-900 sm:line-clamp-2">
                {plainTitle}
              </h3>
            )}
            {(langMode === "hi" || langMode === "both") && (
              <p className="line-clamp-3 text-base font-medium leading-tight text-neutral-900 sm:line-clamp-2">
                {hiTitle || (needsHindi ? "अनुवाद हो रहा है…" : "")}
              </p>
            )}
          </div>

          {/* Description area */}
          <div className="mt-2 flex-1 space-y-2 text-sm text-neutral-700">
            {(langMode === "en" || langMode === "both") && (
              <p className={expanded ? "line-clamp-6" : "line-clamp-3"}>
                {expanded ? plainDesc : truncate(plainDesc, 150)}
              </p>
            )}
            {(langMode === "hi" || langMode === "both") && (
              <p className={expanded ? "line-clamp-6" : "line-clamp-3"} dir="rtl">
                {expanded ? hiDesc || (needsHindi ? "अनुवाद हो रहा है…" : "") : truncate(hiDesc || "", 150)}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex flex-1 items-center gap-2">
              {!playing ? (
                <Button
                  type="button"
                  onClick={() => speak(buildSpeechText(), readingLang, article.id)}
                  size="sm"
                  className="flex-1 gap-1.5 text-xs sm:text-sm"
                  aria-label={readingLang === "hi" ? "खबर सुनें" : "Listen to news"}
                >
                  <PlayCircle className="h-3.5 w-3.5" />
                  <span className="truncate">{readingLang === "hi" ? "सुनें" : "Listen"}</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => stop()}
                  size="sm"
                  className="flex-1 gap-1.5 text-xs sm:text-sm"
                  aria-label={readingLang === "hi" ? "आवाज़ रोकें" : "Pause voice"}
                >
                  <PauseCircle className="h-3.5 w-3.5" />
                  <span className="truncate">{readingLang === "hi" ? "रोकें" : "Pause"}</span>
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setExpanded((v) => !v)}
                className="h-9 w-9 flex-shrink-0"
                aria-pressed={expanded}
                aria-label={expanded ? "Show short summary" : "Show full description"}
                title={expanded ? "Show less" : "Show more"}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-900 no-underline shadow-sm transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/20 sm:text-sm"
              aria-label={readingLang === "hi" ? "पूरा लेख पढ़ें" : "Read full article"}
            >
              <span className="truncate">{readingLang === "hi" ? "पूरा लेख" : "Read more"}</span>
              <ArrowUpRight className="h-3 w-3 flex-shrink-0" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* live region for screen readers when playing */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {playing ? "Playing article audio" : "Audio stopped"}
      </div>
    </div>
  )
}

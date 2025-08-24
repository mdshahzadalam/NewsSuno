"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCcw, MapPin, Globe, AlertCircle, Languages } from 'lucide-react'
import NewsCard, { type Article } from "./news-card"

type Region = {
  city?: string
  state?: string
  country?: string
}

export type LangMode = "en" | "hi" | "both"

const SUPPORTED_CITIES = ["All India", "Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Kolkata", "Kochi"]

function normalizeCity(input?: string): string | undefined {
  if (!input) return undefined
  const s = input.trim().toLowerCase()
  // common aliases and spellings
  if (["bangalore"].includes(s)) return "Bengaluru"
  if (["madras"].includes(s)) return "Chennai"
  if (["calcutta"].includes(s)) return "Kolkata"
  // title-case for UI
  const byList = SUPPORTED_CITIES.find((c) => c.toLowerCase() === s)
  return byList || input
}

export default function NewsClient() {
  const [region, setRegion] = useState<Region>({})
  const [cityChoice, setCityChoice] = useState<string>("All India")
  const [langMode, setLangMode] = useState<LangMode>("en")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [articles, setArticles] = useState<Article[]>([])
  const [refresher, setRefresher] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  const queryCity = useMemo(() => {
    // Priority: manual selection > detected city > All India
    if (cityChoice && cityChoice !== "All India") return cityChoice
    if (region.city) {
      const norm = normalizeCity(region.city)
      if (norm && norm !== "All India") return norm
    }
    return undefined
  }, [cityChoice, region.city])

  async function fetchNews(signal?: AbortSignal) {
    try {
      setError("")
      setLoading(true)
      const params = new URLSearchParams()
      if (queryCity) params.set("city", queryCity)
      params.set("limit", "60")
      const res = await fetch(`/api/news?${params.toString()}`, { signal })
      if (!res.ok) throw new Error("Failed to fetch news")
      const data = (await res.json()) as { articles: Article[] }
      setArticles(data.articles)
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        setError(e?.message || "Something went wrong.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    fetchNews(controller.signal)
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryCity, refresher])

  async function handleUseMyLocation() {
    setError("")
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported on this device.")
      return
    }
    try {
      const coords = await new Promise<GeolocationCoordinates>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
        ),
      )
      const res = await fetch(`/api/reverse-geocode?lat=${coords.latitude}&lon=${coords.longitude}`)
      if (!res.ok) throw new Error("Could not detect your city.")
      const geo = (await res.json()) as { city?: string; state?: string; country?: string }
      const normCity = normalizeCity(geo.city)
      setRegion({ ...geo, city: normCity })
      // If detected city is supported, switch selection to it
      if (normCity && SUPPORTED_CITIES.map((c) => c.toLowerCase()).includes(normCity.toLowerCase())) {
        setCityChoice(normCity)
      }
    } catch (e: any) {
      setError("We couldn't get your location. You can still pick a city from the list.")
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto] lg:items-center lg:justify-between">
        <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-2">
          <label htmlFor="city" className="sr-only text-sm font-medium text-neutral-700 sm:not-sr-only">
            Choose city
          </label>
          <select
            id="city"
            value={cityChoice}
            onChange={(e) => setCityChoice(e.target.value)}
            className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm shadow-sm transition-colors hover:border-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500/20 sm:w-auto"
            aria-label="Select city"
          >
            {SUPPORTED_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleUseMyLocation} 
              className="h-10 gap-1.5 text-sm"
              aria-label="Use my location"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Location</span>
            </Button>

            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => setRefresher((v) => v + 1)} 
              className="h-10 gap-1.5 text-sm"
              aria-label="Refresh news"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Refresh</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-3">
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <Languages className="h-4 w-4 flex-shrink-0 text-neutral-500" aria-hidden="true" />
            <span className="whitespace-nowrap">View in:</span>
          </div>
          <select
            id="lang"
            value={langMode}
            onChange={(e) => setLangMode(e.target.value as LangMode)}
            className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:border-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500/20"
            aria-label="Select language for viewing and listening"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="both">English + हिन्दी</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-neutral-600">
        {queryCity ? (
          <span className="inline-flex flex-wrap items-center gap-1">
            <span>Showing news for <strong className="font-medium">{queryCity}</strong>.</span>
            <span className="hidden sm:inline">Choose a language to read and listen.</span>
            <span className="text-xs text-neutral-500 sm:text-sm">Translations are automatic and may be approximate.</span>
          </span>
        ) : (
          <span className="inline-flex flex-wrap items-center gap-1">
            <Globe className="h-4 w-4 flex-shrink-0" />
            <span>Showing top Indian headlines.</span>
            <span className="hidden sm:inline">Choose a language to read and listen.</span>
          </span>
        )}
      </p>

      {error ? (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-red-700"
        >
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] w-full animate-pulse bg-neutral-200" />
                <CardContent className="space-y-3 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
                  <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-neutral-200" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-neutral-200" />
                </CardContent>
              </Card>
            ))
          : articles.map((a) => <NewsCard key={a.id} article={a} langMode={langMode} />)}
      </div>

      {!loading && articles.length === 0 && !error ? (
        <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center">
          <p className="text-sm text-neutral-600">No articles found. Try another city or refresh.</p>
          <div className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => setRefresher((v) => v + 1)}
              className="gap-2"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

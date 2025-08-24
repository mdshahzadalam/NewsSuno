import { NextResponse } from "next/server"

type Body = {
  q?: string
  target?: "hi" | "en"
}

// Simple translation proxy using MyMemory (no API key). Falls back gracefully.
export async function POST(req: Request) {
  try {
    const { q, target } = (await req.json()) as Body
    if (!q || !target) {
      return NextResponse.json({ error: "Missing q or target" }, { status: 400 })
    }
    const text = q.slice(0, 900) // small limit to be nice to public API
    const source = target === "hi" ? "en" : "hi"
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`

    const res = await fetch(url, {
      headers: {
        "User-Agent": "NewaTalk/1.0 (+https://example.com)",
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      // Fallback: return original text
      return NextResponse.json({ translatedText: null }, { status: 200 })
    }
    const data = await res.json()
    const translated = data?.responseData?.translatedText || null
    return NextResponse.json({ translatedText: translated }, { status: 200 })
  } catch {
    return NextResponse.json({ translatedText: null }, { status: 200 })
  }
}

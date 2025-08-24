import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 })
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/reverse")
    url.searchParams.set("lat", lat)
    url.searchParams.set("lon", lon)
    url.searchParams.set("format", "json")
    url.searchParams.set("addressdetails", "1")

    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent": "NewaTalk/1.0 (https://example.com)",
        "Accept-Language": "en",
      },
      cache: "no-store",
    })
    if (!res.ok) {
      return NextResponse.json({ error: "Reverse geocoding failed" }, { status: 500 })
    }
    const data = await res.json()
    const addr = data?.address || {}
    const city = addr.city || addr.town || addr.village || addr.suburb || addr.state_district || undefined
    const state = addr.state || addr.region || undefined
    const country = addr.country || undefined
    return NextResponse.json({ city, state, country })
  } catch (e) {
    return NextResponse.json({ error: "Reverse geocoding error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { XMLParser } from "fast-xml-parser"

type FeedArticle = {
  id: string
  title: string
  link: string
  description?: string
  image?: string
  publishedAt?: string
  source?: string
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  allowBooleanAttributes: true,
})

/**
 * Supported city feeds where available
 * - The Hindu: reliable city RSS
 * - Hindustan Times: /cities/{city}-news/rssfeed.xml
 */
const CITY_FEEDS: Record<string, string[]> = {
  delhi: [
    "https://www.thehindu.com/news/cities/Delhi/feeder/default.rss",
    "https://www.hindustantimes.com/cities/delhi-news/rssfeed.xml",
  ],
  mumbai: [
    "https://www.thehindu.com/news/cities/mumbai/feeder/default.rss",
    "https://www.hindustantimes.com/cities/mumbai-news/rssfeed.xml",
  ],
  bengaluru: [
    "https://www.thehindu.com/news/cities/bengaluru/feeder/default.rss",
    "https://www.hindustantimes.com/cities/bengaluru-news/rssfeed.xml",
  ],
  chennai: [
    "https://www.thehindu.com/news/cities/chennai/feeder/default.rss",
    "https://www.hindustantimes.com/cities/chennai-news/rssfeed.xml",
  ],
  hyderabad: [
    "https://www.thehindu.com/news/cities/Hyderabad/feeder/default.rss",
    "https://www.hindustantimes.com/cities/hyderabad-news/rssfeed.xml",
  ],
  kolkata: [
    "https://www.thehindu.com/news/cities/kolkata/feeder/default.rss",
    "https://www.hindustantimes.com/cities/kolkata-news/rssfeed.xml",
  ],
  kochi: [
    "https://www.thehindu.com/news/cities/kochi/feeder/default.rss",
    "https://www.hindustantimes.com/cities/kochi-news/rssfeed.xml",
  ],
}

/**
 * National / general feeds (reliable)
 * NDTV, The Hindu (national), India TV, Hindustan Times
 */
const GENERAL_FEEDS: string[] = [
  "https://feeds.feedburner.com/ndtvnews-top-stories",
  "https://www.thehindu.com/news/national/feeder/default.rss",
  "https://www.indiatvnews.com/rss/topstory.xml",
  "https://www.hindustantimes.com/rss/india/rssfeed.xml",
]

// Helpers to extract image from various RSS formats
function getImage(item: any): string | undefined {
  // enclosure
  const enclosure = item?.enclosure
  if (enclosure) {
    if (Array.isArray(enclosure)) {
      const url = enclosure.find((e: any) => e?.["@_url"])?.["@_url"]
      if (url) return url
    } else if (enclosure?.["@_url"]) {
      return enclosure["@_url"]
    }
  }
  // media:content or media:thumbnail
  const mediaContent = item?.["media:content"] || item?.mediaContent
  if (mediaContent) {
    if (Array.isArray(mediaContent)) {
      const url = mediaContent.find((m: any) => m?.["@_url"] || m?.["@_href"])?.["@_url"] || mediaContent[0]?.["@_href"]
      if (url) return url
    } else if (mediaContent?.["@_url"] || mediaContent?.["@_href"]) {
      return mediaContent["@_url"] || mediaContent["@_href"]
    }
  }
  const mediaThumb = item?.["media:thumbnail"]
  if (mediaThumb) {
    if (Array.isArray(mediaThumb)) {
      const url = mediaThumb.find((m: any) => m?.["@_url"])?.["@_url"]
      if (url) return url
    } else if (mediaThumb?.["@_url"]) {
      return mediaThumb["@_url"]
    }
  }
  // parse from description html
  const desc: string | undefined = item?.description || item?.summary || item?.["content:encoded"]
  if (desc) {
    const match = desc.match(/<img[^>]+src=['"]([^'"]+)['"]/i)
    if (match?.[1]) return match[1]
  }
  return undefined
}

// Extract a usable link (RSS and Atom variants)
function getLink(item: any): string | undefined {
  const link = item?.link
  if (!link) return undefined
  if (typeof link === "string") return link
  if (Array.isArray(link)) {
    const first = link.find((l: any) => typeof l === "string") || link[0]
    if (typeof first === "string") return first
    if (first?.["@_href"]) return first["@_href"]
    if (first?.["#text"]) return first["#text"]
  } else {
    if (link?.["@_href"]) return link["@_href"]
    if (link?.["#text"]) return link["#text"]
  }
  return undefined
}

function getPublished(item: any): string | undefined {
  return item?.pubDate || item?.published || item?.updated
}

function getSourceFromFeedUrl(feedUrl: string): string {
  try {
    const host = new URL(feedUrl).host
    if (host.includes("thehindu")) return "The Hindu"
    if (host.includes("hindustantimes")) return "Hindustan Times"
    if (host.includes("ndtv")) return "NDTV"
    if (host.includes("indiatvnews")) return "India TV"
    return host
  } catch {
    return "News"
  }
}

async function fetchFeed(url: string): Promise<FeedArticle[]> {
  try {
    const res = await fetch(url, {
      // Some feeds prefer a UA; keep it generic
      headers: { "User-Agent": "NewaTalk/1.0 (+https://example.com)" },
      // 10s timeout via AbortController
      cache: "no-store",
    })
    if (!res.ok) throw new Error(`Fetch failed ${res.status}`)
    const xml = await res.text()
    const json = parser.parse(xml)

    // RSS
    const channel = json?.rss?.channel
    if (channel) {
      const items = Array.isArray(channel?.item) ? channel.item : channel?.item ? [channel.item] : []
      const source = channel?.title || getSourceFromFeedUrl(url)
      return items
        .map((item: any): FeedArticle | null => {
          const link = getLink(item)
          const title = item?.title || item?.["title"]?.["#text"]
          if (!link || !title) return null
          return {
            id: link,
            title: typeof title === "string" ? title : (title?.["#text"] ?? ""),
            link,
            description: item?.description || item?.["content:encoded"] || item?.summary,
            image: getImage(item),
            publishedAt: getPublished(item),
            source,
          }
        })
        .filter(Boolean) as FeedArticle[]
    }

    // Atom
    const feed = json?.feed
    if (feed) {
      const entries = Array.isArray(feed?.entry) ? feed.entry : feed?.entry ? [feed.entry] : []
      const source = feed?.title || getSourceFromFeedUrl(url)
      return entries
        .map((item: any): FeedArticle | null => {
          const link = getLink(item)
          const title = item?.title || item?.["title"]?.["#text"]
          if (!link || !title) return null
          return {
            id: link,
            title: typeof title === "string" ? title : (title?.["#text"] ?? ""),
            link,
            description: item?.summary || item?.content,
            image: getImage(item),
            publishedAt: getPublished(item),
            source,
          }
        })
        .filter(Boolean) as FeedArticle[]
    }

    return []
  } catch {
    return []
  }
}

function normalizeCityKey(city?: string): string | undefined {
  if (!city) return undefined
  const s = city.trim().toLowerCase()
  if (s === "bangalore") return "bengaluru"
  if (s === "madras") return "chennai"
  if (s === "calcutta") return "kolkata"
  return s
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get("limit") || 60)
  const cityParam = normalizeCityKey(searchParams.get("city") || undefined)

  const feeds: string[] = []
  if (cityParam && CITY_FEEDS[cityParam]) {
    feeds.push(...CITY_FEEDS[cityParam])
  }
  // Always include general feeds to have broader coverage
  feeds.push(...GENERAL_FEEDS)

  // Deduplicate feeds array
  const uniqueFeeds = Array.from(new Set(feeds))

  const results = await Promise.all(uniqueFeeds.map((u) => fetchFeed(u)))
  const merged = results.flat()

  // Deduplicate articles by link
  const byLink = new Map<string, FeedArticle>()
  for (const a of merged) {
    if (!byLink.has(a.link)) byLink.set(a.link, a)
  }

  const sorted = Array.from(byLink.values()).sort((a, b) => {
    const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return tb - ta
  })

  return NextResponse.json({ articles: sorted.slice(0, Math.max(10, Math.min(limit, 200))) })
}

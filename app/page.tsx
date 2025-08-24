'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewsClient from "@/components/news-client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TricolorBanner from "@/components/tricolor-banner";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Tricolor Banner */}
        <section className="relative overflow-hidden">
          <TricolorBanner />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-blue-900 drop-shadow-lg sm:text-4xl md:text-5xl">
                Stay Informed with Local & National News
              </h1>
              {/* <p className="mx-auto mt-4 max-w-2xl text-lg text-blue/90 drop-shadow-sm sm:text-xl">
                Get the latest updates from across India in multiple languages
              </p> */}
            </div>
          </div>
        </section>

        {/* Main News Section */}
        <section id="latest-news" className="mx-auto w-full max-w-7xl p-4 sm:p-6">
          <Card className="border-neutral-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Latest News</CardTitle>
            </CardHeader>
            <CardContent>
              <NewsClient />
            </CardContent>
          </Card>
        </section>

        {/* About Section */}
        <section id="about" className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                About NewsSuno
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
                Your trusted source for the latest news and updates from across India
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: 'Local & National Coverage',
                  description: 'Get news from your city or explore national headlines, all in one place.',
                  icon: '🗞️'
                },
                {
                  title: 'Multiple Languages',
                  description: 'Read and listen to news in English, Hindi, or both languages side by side.',
                  icon: '🌐'
                },
                {
                  title: 'Real-time Updates',
                  description: 'Stay updated with the latest breaking news as it happens across India.',
                  icon: '⚡'
                }
              ].map((feature, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                  <p className="mt-2 text-neutral-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

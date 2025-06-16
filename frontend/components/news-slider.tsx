"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import AnimateIn from "@/components/animate-in"
import type { NewsItems } from "@/interface/news-item"


interface NewsSliderProps {
  news: NewsItems[]
}

export default function NewsSlider({ news }: NewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length)
  }
  const locale = navigator.language || "en-US"
  return (
    <AnimateIn direction="up">
      <div className="relative">
        <div className="overflow-hidden rounded-lg shadow-xl gradient-border">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={process.env.NEXT_PUBLIC_STRAPI_API_URL + news[currentIndex].image.url || "/placeholder.svg"}
              alt={news[currentIndex].image.alternativeText}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <div className="mb-2 flex items-center gap-3">
                <Badge variant= "default" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg">
                  {news[currentIndex].tag}
                </Badge>
                <span className="text-sm text-white/80">
                  {new Date(news[currentIndex].date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h3 className="mb-2 text-2xl font-bold">{news[currentIndex].title}</h3>
              <p className="mb-4 text-white/80">{news[currentIndex].previewDescription}</p>
              <Button
                variant="outline"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg hover-arrow"
                asChild
              >
                <Link href={`/news/${news[currentIndex].id}`} className="group flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 shadow-lg"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 shadow-lg"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>

        <div className="mt-4 flex justify-center gap-2">
          {news.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-600 dark:bg-blue-500 scale-110"
                  : "bg-muted hover:bg-muted-foreground/50"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </AnimateIn>
  )
}

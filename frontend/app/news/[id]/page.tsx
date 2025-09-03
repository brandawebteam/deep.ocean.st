import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import SocialLinks from "@/components/social-links"
import { fetchApiDataById } from "@/components/api-fetcher"
import type { NewsItems } from "@/interface/news-item"


export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const news: NewsItems = await fetchApiDataById("news-pages", id);
  console.log(news)


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/news">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
          </Link>
        </Button>
      </div>

      <article className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Badge className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">{news.tag}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(news.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight">{news.title}</h1>

        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image src={news.image.url || "/placeholder.svg"} alt={news.image.alternativeText} fill className="object-cover" />
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {news.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <h3 className="mb-4 text-lg font-semibold">Share this article</h3>
          <SocialLinks />
        </div>
      </article>
    </div>
  )
}

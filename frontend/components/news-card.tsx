import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { NewsItems } from "@/interface/news-item"


interface NewsCardProps {
  news: NewsItems
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
      <Link href={`/news/${news.id}`}>
        <div className="relative aspect-video w-full">
          <Image src={news.image.url || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
          <div className="absolute right-3 top-3">
            <Badge className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">{news.tag}</Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="mb-2 flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(news.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h3 className="mb-2 text-xl font-bold">{news.title}</h3>
          <p className="text-muted-foreground">{news.previewDescription}</p>
        </CardContent>
      </Link>
    </Card>
  )
}

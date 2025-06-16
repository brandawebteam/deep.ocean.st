import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsCard from "@/components/news-card"
import { fetchApiData } from "@/components/api-fetcher"
import type { NewsItems } from "@/interface/news-item"

type Props = {
  params: {
    id: string;
  };
};

export default async function NewsPage({ params }: Props) {
  const idNumber = Number(params.id);
  const newsItems: NewsItems[] = await fetchApiData("news-pages");

  // Group news by tag for filtering
  const allNews = newsItems
  const releases = newsItems.filter((item) => item.tag === "Release")
  const devlogs = newsItems.filter((item) => item.tag === "Devlog")
  const announcements = newsItems.filter((item) => item.tag === "Announcement")
  const studioNews = newsItems.filter((item) => item.tag === "Studio")
  const mediaNews = newsItems.filter((item) => item.tag === "Media")

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">News & Updates</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="devlogs">Devlogs</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="studio">Studio</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </TabsContent>

        <TabsContent value="releases" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {releases.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </TabsContent>

        <TabsContent value="devlogs" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {devlogs.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </TabsContent>

        <TabsContent value="announcements" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </TabsContent>

        <TabsContent value="studio" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {studioNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </TabsContent>

        <TabsContent value="media" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mediaNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

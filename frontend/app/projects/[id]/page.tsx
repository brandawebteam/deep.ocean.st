import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, ComputerIcon as Steam, Youtube } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Gallery from "@/components/gallery"
import { fetchApiDataById } from "@/components/api-fetcher"
import type { ProjectItem } from "@/interface/project-item"

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const project: ProjectItem = await fetchApiDataById("projects", id)

  const featuresArray = project.features ? project.features : []
  
  const imagesArray = project.images;
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
          <div className="mt-2 flex items-center gap-4">
            <Badge className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              {project.tag}
            </Badge>
            {project.releaseDate && (
              <span className="text-sm text-muted-foreground">Release Date: {project.releaseDate}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.link.steam && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.link.steam} target="_blank" rel="noopener noreferrer">
                <Steam className="mr-2 h-4 w-4" /> Steam
              </a>
            </Button>
          )}
          {project.link.epicGames && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.link.epicGames} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Epic Games
              </a>
            </Button>
          )}
          {project.link.youtube && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.link.youtube} target="_blank" rel="noopener noreferrer">
                <Youtube className="mr-2 h-4 w-4" /> YouTube
              </a>
            </Button>
          )}
          {project.link.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.link.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Website
              </a>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          {featuresArray?.length >0 && (
          <TabsTrigger value="features">Features</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {project?.video && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src={project.video}
                  title={`${project.title} Trailer`}
                  className="absolute h-full w-full"
                  allowFullScreen
                ></iframe>
              </div>
              )}

              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-bold">About the Game</h2>
                {project.fullDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Game Details</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                      <dd className="mt-1">{project.tag}</dd>
                    </div>
                    {project.releaseDate && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Release Date</dt>
                        <dd className="mt-1">{project.releaseDate}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Platforms</dt>
                      <dd className="mt-1">{project.platforms}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Genre</dt>
                      <dd className="mt-1">{project.genre}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Developer</dt>
                      <dd className="mt-1">{project.developer}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Publisher</dt>
                      <dd className="mt-1">{project.publisher}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>


        <TabsContent value="gallery">
          <Gallery images={imagesArray} />
        </TabsContent>
        {featuresArray?.length >0 && (
        <TabsContent value="features">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold">Key Features</h2>
              <ul className="space-y-4">
                {featuresArray.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white dark:bg-blue-500">
                      {index + 1}
                    </span>
                    <span>{feature.features}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              {imagesArray.length > 0 && (
                <Image src={imagesArray[0] || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              )}
            </div>
          </div>
        </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

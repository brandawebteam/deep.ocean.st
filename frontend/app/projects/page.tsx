import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { fetchApiData } from "@/components/api-fetcher"
import type { ProjectItem } from "@/interface/project-item"

export default async function ProjectsPage() {
  const projectsData: ProjectItem[] = await fetchApiData("projects")

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Our Projects</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => {
      const firstImage =
         project.images && project.images.length > 0
        ? project.images[0].url
        : "/placeholder.svg?height=600&width=800";

          return (
            <Link key={project.id} href={`/projects/${project.id}`} className="transition-transform hover:scale-[1.02]">
              <Card className="h-full overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                  <Image src={firstImage || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="absolute right-3 top-3">
                    <Badge className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                      {project.tag}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 ring-0 shadow-none focus:ring-0 focus:outline-none">
                  <h2 className="mb-2 text-xl font-bold">{project.title}</h2>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

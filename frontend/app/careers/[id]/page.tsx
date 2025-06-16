import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { fetchApiDataById } from "@/components/api-fetcher"

export interface ContentSection {
  id: number
  header: string
  theses: string // Single text field, not array
}

export interface CareersItems {
  id: number
  title: string
  department: string
  location: string
  type: string
  description: string
  content: ContentSection[]
}

export default async function CareersDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const job: CareersItems = await fetchApiDataById("careers", id)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/careers">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div>
          <div className="mb-6">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="outline">{job.type}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                {job.location}
              </div>
              <span className="text-sm text-muted-foreground">Department: {job.department}</span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Overview</h2>
              <p className="text-muted-foreground">{job.description}</p>
            </div>

            {job.content.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="mb-4 text-2xl font-bold">{section.header}</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {/* Split the theses text by line breaks and render as list */}
                  <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                    {section.theses
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, lineIndex) => (
                        <li key={lineIndex}>{line.trim()}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-border pt-8">
        <div className="text-center">
          <h3 className="mb-4 text-xl font-bold">Interested in this position?</h3>
          <p className="mb-6 text-muted-foreground">Send us your resume and cover letter to apply for this role.</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" asChild>
            <Link href={`mailto:careers@company.com?subject=Application for ${job.title}`}>Apply Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

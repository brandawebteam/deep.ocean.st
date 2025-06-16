import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { fetchApiData } from "@/components/api-fetcher"
import type { CareersItems } from "./[id]/page"

export default async function CareersPage() {
  const jobs: CareersItems[] = await fetchApiData("careers")

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Join Our Team</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          We're always looking for talented individuals who are passionate about creating amazing games and pushing the
          boundaries of interactive entertainment.
        </p>
      </div>

      <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id} className="flex h-full flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <Badge variant="outline">{job.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                {job.location}
              </div>
              <p className="mb-2 text-sm font-medium">Department: {job.department}</p>
              <p className="text-muted-foreground">{job.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" asChild>
                <Link href={`/careers/${job.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="rounded-lg bg-muted p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Don't see a position that fits your skills?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          We're always interested in hearing from talented individuals. Send us your resume and tell us how you can
          contribute to our team.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" asChild>
          <Link href="/careers/apply">Send Open Application</Link>
        </Button>
      </div>
    </div>
  )
}

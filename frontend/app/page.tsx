import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import NewsSlider from "@/components/news-slider"
import SocialLinks from "@/components/social-links"
import ProjectPreview from "@/components/project-preview"
import Logo from "@/components/logo"
import SimpleButtonWithArrow from "@/components/simple-button-with-arrow"
import AnimateIn from "@/components/animate-in"
import StaggeredChildren from "@/components/staggered-children"
import type { ProjectItem } from "@/interface/project-item"
import type { NewsItems } from "@/interface/news-item"
import { fetchApiData } from "@/components/api-fetcher"

interface MainPageSettings {
  heroText: string
  featuredProject: ProjectItem
  showCTASection: boolean
  featuredProjectGradientColour: string
  featuredProjectGradientEnabled: boolean
}

export default async function Home() {
  const newsItems: NewsItems[] = await fetchApiData("news-pages")
  const projects: ProjectItem[] = await fetchApiData("projects")
  const mainPageSettings: MainPageSettings = await fetchApiData("main-page")


  // Featured project
  const featuredProject: ProjectItem = projects.filter(p => {
    return p.id === mainPageSettings.featuredProject.id
  })[0];
  console.log(featuredProject)

  return (
    <>
      {/* Hero Section with new animated background */}
      <section className="relative flex w-full min-h-[70dvh] items-center justify-center overflow-hidden bg-muted hero-pattern animated-gradient-bg">
        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-background to-background"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <AnimateIn direction="down" duration={800}>
            <div className="mx-auto mb-8 max-w-[300px]">
              <Logo size="large" className="mx-auto" />
            </div>
          </AnimateIn>

          <AnimateIn delay={300} duration={800}>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {mainPageSettings.heroText}
            </p>
          </AnimateIn>

          <AnimateIn delay={500} duration={800}>
            <SocialLinks className="mb-8 justify-center" />
          </AnimateIn>

          <AnimateIn delay={700} duration={800}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SimpleButtonWithArrow
                href="/projects"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover-slide-up"
                size="lg"
              >
                View Projects
              </SimpleButtonWithArrow>
              <SimpleButtonWithArrow
                href="/careers"
                variant="outline"
                size="lg"
                className="transition-all duration-300 hover:shadow-lg hover-slide-up"
              >
                Open Positions
              </SimpleButtonWithArrow>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimateIn direction="left">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-gradient">Latest News</h2>
              <SimpleButtonWithArrow href="/news" variant="ghost">
                View All
              </SimpleButtonWithArrow>
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={200}>
            <NewsSlider news={newsItems} />
          </AnimateIn>
        </div>
      </section>
      <section className="py-16 bg-background overflow-hidden relative">
        {mainPageSettings.featuredProjectGradientEnabled == true && (
          <div className="absolute inset-0 z-0  opacity-30 pointer-events-none" style={{
            background: `radial-gradient(circle at top right, ${mainPageSettings.featuredProjectGradientColour} 0%, transparent 40%)`
          }}></div>
        )}
        <div className="container relative z-10 mx-auto px-4">
          <AnimateIn direction="left">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-gradient">Featured Project</h2>
          </AnimateIn>
          <div className="grid gap-8 md:grid-cols-2">
            <AnimateIn direction="right" delay={200}>
              <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl gradient-border hover-scale">
                <Image
                  src={process.env.NEXT_PUBLIC_STRAPI_API_URL + featuredProject.images[0].url || "/placeholder.svg"}
                  alt={featuredProject.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-4 right-4">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white dark:bg-blue-500 shadow-lg">
                    {featuredProject.tag}
                  </span>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="left" delay={300}>
              <div className="flex flex-col justify-center">
                <h3 className="mb-4 text-2xl font-bold">{featuredProject.title}</h3>
                <p className="mb-6 text-muted-foreground">{featuredProject.description}</p>
                <div className="flex flex-wrap gap-4">
                  <SimpleButtonWithArrow
                    href={`/projects/${featuredProject.id}`}
                    className="transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                  >
                    Learn More
                  </SimpleButtonWithArrow>
                  <Button
                    variant="outline"
                    className="transition-all duration-300 hover:shadow-lg hover-rotate-icon group"
                    asChild
                  >
                    <a
                      href="https://store.steampowered.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Steam Page <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section >

      {/* Projects Preview */}
      < section className="py-16" >
        <div className="container mx-auto px-4">
          <AnimateIn direction="left">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-gradient">Our Projects</h2>
              <SimpleButtonWithArrow href="/projects" variant="ghost">
                View All
              </SimpleButtonWithArrow>
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={200}>
            <ProjectPreview projects={projects} />
          </AnimateIn>
        </div>
      </section >

      {/* CTA Section */}
      {
        mainPageSettings?.showCTASection && (
          <section className="relative py-16 overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 dark:bg-blue-500 z-0"></div>
            <div className="absolute inset-0 opacity-10 z-0 section-pattern"></div>
            <div className="container relative z-10 mx-auto px-4 text-center text-white">
              <StaggeredChildren staggerDelay={200} direction="up">
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">Join Our Community</h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg">
                  Stay updated with our latest news, game releases, and exclusive content by following us on social media.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="transition-all duration-300 hover:shadow-xl hover-bounce group"
                    asChild
                  >
                    <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Join Discord
                    </a>
                  </Button>
                  <SimpleButtonWithArrow
                    href="/careers"
                    variant="secondary"
                    size="lg"
                    className="transition-all duration-300 hover:shadow-xl hover-bounce group"
                  >
                    View Open Positions
                  </SimpleButtonWithArrow>
                </div>
              </StaggeredChildren>
            </div>
          </section>
        )
      }
    </>
  )
}

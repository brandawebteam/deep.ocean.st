"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import StaggeredChildren from "@/components/staggered-children"
import { ProjectItem } from "@/interface/project-item"
interface ProjectsCarouselProps {
  projects: ProjectItem[]
}
export default function ProjectPreview({projects} : ProjectsCarouselProps) {

  // State to track which project is being hovered
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  // State to track current image index for each project
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({})
  // Refs for carousel intervals
  const carouselIntervals = useRef<{ [key: number]: NodeJS.Timeout }>({})

  // Start carousel for a project when hovered
  const startCarousel = (projectId: number) => {
    setHoveredProject(projectId)

    // Initialize current image index if not already set
    if (currentImageIndices[projectId] === undefined) {
      setCurrentImageIndices((prev) => ({ ...prev, [projectId]: 0 }))
    }

    // Clear any existing interval for this project
    if (carouselIntervals.current[projectId]) {
      clearInterval(carouselIntervals.current[projectId])
    }

    // Set up new interval to cycle through images
    carouselIntervals.current[projectId] = setInterval(() => {
      setCurrentImageIndices((prev) => {
        const project = projects.find((p) => p.id === projectId)
        if (!project) return prev

        const nextIndex = (prev[projectId] + 1) % project.images.length
        return { ...prev, [projectId]: nextIndex }
      })
    }, 2000) // Change image every 2 seconds
  }

  // Stop carousel when not hovered
  const stopCarousel = (projectId: number) => {
    setHoveredProject(null)

    // Clear interval
    if (carouselIntervals.current[projectId]) {
      clearInterval(carouselIntervals.current[projectId])
      delete carouselIntervals.current[projectId]
    }

    // Reset to first image
    setCurrentImageIndices((prev) => ({ ...prev, [projectId]: 0 }))
  }

  // Manually navigate to previous image
  const prevImage = (projectId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const project = projects.find((p) => p.id === projectId)
    if (!project) return

    setCurrentImageIndices((prev) => {
      const currentIndex = prev[projectId] || 0
      const newIndex = (currentIndex - 1 + project.images.length) % project.images.length
      return { ...prev, [projectId]: newIndex }
    })
  }

  // Manually navigate to next image
  const nextImage = (projectId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const project = projects.find((p) => p.id === projectId)
    if (!project) return

    setCurrentImageIndices((prev) => {
      const currentIndex = prev[projectId] || 0
      const newIndex = (currentIndex + 1) % project.images.length
      return { ...prev, [projectId]: newIndex }
    })
  }

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(carouselIntervals.current).forEach((interval) => {
        clearInterval(interval)
      })
    }
  }, [])

  return (
    <StaggeredChildren className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={150} direction="up">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="transition-transform hover:scale-[1.02]"
          onMouseEnter={() => startCarousel(project.id)}
          onMouseLeave={() => stopCarousel(project.id)}
        >
          <Card className="h-full overflow-hidden card-hover gradient-border">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {/* Carousel navigation buttons - only show when hovered */}
              {hoveredProject === project.id && project.images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white transition-opacity hover:bg-black/70"
                    onClick={(e) => prevImage(project.id, e)}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white transition-opacity hover:bg-black/70"
                    onClick={(e) => nextImage(project.id, e)}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Carousel indicators - only show when hovered */}
              {hoveredProject === project.id && project.images.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center space-x-1">
                  {project.images.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 w-5 rounded-full transition-all ${
                        index === (currentImageIndices[project.id] || 0) ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Images */}
              {project.images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url || "/placeholder.svg"}
                  alt={`${image.alternativeText} - Image ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    index === (currentImageIndices[project.id] || 0) ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              <div className="absolute right-3 top-3 z-10">
                <Badge
                  className={
                    project.tag === "Released"
                      ? "bg-green-600 hover:bg-green-700 shadow-lg"
                      : project.tag === "Coming Soon"
                        ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg"
                        : project.tag === "In Development"
                          ? "bg-amber-600 hover:bg-amber-700 shadow-lg"
                          : project.tag === "Alpha"
                            ? "bg-purple-600 hover:bg-purple-700 shadow-lg"
                            : "bg-gray-600 hover:bg-gray-700 shadow-lg"
                  }
                >
                  {project.tag}
                </Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold hover-glow">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </StaggeredChildren>
  )
}

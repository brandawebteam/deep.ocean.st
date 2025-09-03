import Image from "next/image"
import SocialLinks from "@/components/social-links"
import SimpleButtonWithArrow from "@/components/simple-button-with-arrow"
import { StringifyOptions } from "querystring"
import { fetchApiData } from "@/components/api-fetcher"

interface ValueItem {
  id: number
  title: string
  description: string
}

interface ApproachItem {
  id: number
  step: number
  title: string
  description: string
}

interface AboutPageData {
  id: number
  hero_title: string
  hero_description: string
  story_title: string
  story_content: string
  story_image: {
    url: string
    alternativeText: string
  }
  values_title: string
  values: ValueItem[]
  approach_title: string
  approaches: ApproachItem[]
  community_title: string
  community_description: string
  careers_title: string
  careers_description: string
  careers_button_text: string
  careers_button_link: string
}

export default async function AboutPage() {
  const aboutData: AboutPageData = await fetchApiData('about-page')

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          {aboutData.hero_title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {aboutData.hero_description}
        </p>
      </div>

      {/* Our Story Section */}
      <div className="mb-16 grid gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-2xl font-bold">{aboutData.story_title}</h2>
          <div
            className="text-muted-foreground prose prose-p:mb-4 max-w-none"
            dangerouslySetInnerHTML={{ __html: aboutData.story_content }}
          />
        </div>

        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={`${aboutData.story_image === null
                ? "/placeholder.svg?height=800&width=800"
                : aboutData.story_image.url
              }`}
            alt={`${aboutData.story_image === null
              ? "About us"
              : aboutData.story_image.alternativeText
              }`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">
          {aboutData.values_title}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {aboutData.values.map((value) => (
            <div key={value.id} className="rounded-lg bg-muted p-6">
              <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">
          {aboutData.approach_title}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {aboutData.approaches.map((approach) => (
            <div key={approach.id}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white dark:bg-blue-500">
                {approach.step}
              </div>
              <h3 className="mb-2 text-xl font-bold">{approach.title}</h3>
              <p className="text-muted-foreground">{approach.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Join Community Section */}
      <div className="mb-16 rounded-lg bg-blue-600 p-8 text-center text-white dark:bg-blue-500">
        <h2 className="mb-4 text-2xl font-bold text-white">
          {aboutData.community_title}
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-white/90">
          {aboutData.community_description}
        </p>
        <SocialLinks className="justify-center" variant="white" />
      </div>

      {/* Careers CTA Section */}
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">{aboutData.careers_title}</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          {aboutData.careers_description}
        </p>
        <SimpleButtonWithArrow
          href={aboutData.careers_button_link}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {aboutData.careers_button_text}
        </SimpleButtonWithArrow>
      </div>
    </div>
  );
}

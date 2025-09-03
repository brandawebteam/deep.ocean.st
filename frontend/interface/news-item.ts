import { SeoProps } from "./meta-data"

  export interface NewsItems {
  id: number
  title: string
  date: Date
  content: string
  tag: string
  previewDescription: string
  image: {
    url: string
    alternativeText: string
  }
  seo: SeoProps
}
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
}
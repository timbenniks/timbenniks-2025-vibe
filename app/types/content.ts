export interface AboutData {
  bio: string
  currentRole: string
  company: string
  experience: string
  location: string
  faq: FAQ[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface CareerEntry {
  title: string
  company: string
  location: string
  period: string
  type: string
  description: string
}

export interface Article {
  title: string
  slug: string
  description: string
  date: string
  readingTime: string
  featured: boolean
  thumbnail: string
  tags: string[]
  excerpt: string
}

export interface Talk {
  title: string
  event: string
  location: string
  date: string
  type: string
  description: string
  topics: string[]
  slides?: string | null
  video?: string | null
}

export interface Video {
  title: string
  description: string
  videoId: string
  date: string
  duration: string
  category: string
  tags: string[]
  thumbnail: string
}

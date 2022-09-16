export type Collections = {
  questions: Question
}

export type Question = {
  data: {
    id: number
    status: "published" | "draft" | "archived"
    question: string
    answer: string //markdown
    category: string
    tags: string[]
  }
}
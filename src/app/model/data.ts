export interface Question {
  id: number,
  amount: string,
  question: string,
  answer: string,
  answered?: boolean
  image?: string
}

export interface Category {
  category: string,
  questions: [
    Question,
    Question,
    Question,
    Question,
    Question
  ]
}

export interface Categories {
  categories: [
    Category,
    Category,
    Category,
    Category,
    Category,
  ]
}

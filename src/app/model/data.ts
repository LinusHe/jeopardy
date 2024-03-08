export interface Question {
  id: number,
  amount: string,
  question: string,
  answer: string,
  isEstimationQuestion?: boolean;
  answerImage?: string,
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
export interface XLCategories {
  categories: [
    Category,
    Category,
    Category,
    Category,
    Category,
    Category,
  ]
}

export interface Group {
  groupName: string;
  members: string[];
  points: number;
  isWinner?: boolean;
}

export interface Groups {
  groups: Group[];
}

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

export const data: Categories = {
  "categories": [
    {
      "category": "Who said what?",
      "questions": [
        {
          id: 1,
          "amount": "200",
          "question": "'Omg, ich hasse euch alle, scheiß Entwickler!' - xx",
          "answer": "'Omg, ich hasse euch alle, scheiß Entwickler!' - Patrick",
        },
        {
          id: 2,
          "amount": "400",
          "question": "'Meine Studienzeit ist vorbei!' - xx",
          "answer": "'Meine Studienzeit ist vorbei!' - Sven",
        },
        {
          id: 3,
          "amount": "600",
          "question": "'Du kannst ihn auch gerne Rüpel nennen!” - Adrien. 'Das werde ich nicht tun, aber danke für die Inspiration.' - xx",
          "answer": "'Du kannst ihn auch gerne Rüpel nennen!” - Adrien. 'Das werde ich nicht tun, aber danke für die Inspiration.' - Karl",
        },
        {
          id: 4,
          "amount": "800",
          "question": "'Das faszinierende ist nicht die Menge an Scheiße, die er produziert, sondern wie hoch der Anteil an Scheiße ist, von dem wenigen, was er produziert.' - xx",
          "answer": "'Das faszinierende ist nicht die Menge an Scheiße, die er produziert, sondern wie hoch der Anteil an Scheiße ist, von dem wenigen, was er produziert.' - Adrien",
        },
        {
          id: 5,
          "amount": "1000",
          "question": "'Du hast Adrien dazu motiviert, mit seinem Hintern zu programmieren' - xx. 'Man nennt es: Team Adorsys 2' - xx",
          "answer": "'Du hast Adrien dazu motiviert, mit seinem Hintern zu programmieren' - Marcel. 'Man nennt es: Team Adorsys 2' - Adrien",
        }
      ]
    },
    {
      "category": "Alternative POs (Finatix intern)",
      "questions": [
        {
          id: 6,
          "amount": "200",
          "question": "'Ihr seid schon wieder toxisch...'-xx",
          "answer": "Fantonia",
        },
        {
          id: 7,
          "amount": "400",
          "question": "Mother of PaymentNext",
          "answer": "Maria",
        },
        {
          id: 8,
          "amount": "600",
          "question": "Richterin 1, 2, 3",
          "answer": "Su",
        },
        {
          id: 9,
          "amount": "800",
          "question": "'Wegen dir müssen wir jetzt Geld ausgeben'-xx",
          "answer": "Jan F",
        },
        {
          id: 10,
          "amount": "1000",
          "question": "Jesus",
          "answer": "Christian",
        }
      ]
    },
    {
      "category": "Quote Completion",
      "questions": [
        {
          id: 11,
          "amount": "200",
          "question": "Anspruch “...”",
          "answer": "Runter!",
        },
        {
          id: 12,
          "amount": "400",
          "question": "Better done than “...” ",
          "answer": "Perfect",
        },
        {
          id: 13,
          "amount": "600",
          "question": "QS-Stage “...”",
          "answer": "Steht!",
        },
        {
          id: 14,
          "amount": "800",
          "question": "Global “...”",
          "answer": "Galaktisch",
        },
        {
          id: 15,
          "amount": "1000",
          "question": "Ready for “...”",
          "answer": "500",
        }
      ]
    },
    {
      "category": "Tickets",
      "questions": [
        {
          id: 16,
          "amount": "200",
          "question": "Was ist der Inhalt von #420?",
          "answer": "Behandlung von Updates für verteilte Daten!",
        },
        {
          id: 17,
          "amount": "400",
          "question": "Was ist der Inhalt von #666?",
          "answer": "Filterung per Chips für Auftragsdetails möglich?",
        },
        {
          id: 18,
          "amount": "600",
          "question": "Was ist der Inhalt von #69?",
          "answer": "PPI-Doku lesen und Fragen formulieren",
        },
        {
          id: 19,
          "amount": "800",
          "question": "Was ist der Inhalt von #314?",
          "answer": "Untersuchen des Streamens in der EbicsApplication",
        },
        {
          id: 20,
          "amount": "1000",
          "question": "Was ist der Inhalt von #600?",
          "answer": "PPI-Testbank Users auf neue Konvention anpassen",
        }
      ]
    },
    {
      "category": "2022",
      "questions": [
        {
          id: 21,
          "amount": "200",
          "question": "In welchem Monat ist dieses Bild entstanden?",
          "answer": "November",
          "image": "./assets/retro-memes.png"
        },
        {
          id: 22,
          "amount": "400",
          "question": "In welchem Monat ist dieses Bild entstanden?",
          "answer": "August",
          "image": "./assets/retro-sommerloch.png"
        },
        {
          id: 23,
          "amount": "600",
          "question": "In welchem Monat ist dieses Bild entstanden?",
          "answer": "Februar",
          "image": "./assets/retro-characters.png"
        },
        {
          id: 24,
          "amount": "800",
          "question": "In welchem Monat ist dieses Bild entstanden?",
          "answer": "Mai",
          "image": "./assets/team-datev.jpeg"
        },
        {
          id: 25,
          "amount": "1000",
          "question": "In welchem Monat ist dieses Bild entstanden?",
          "answer": "Mai",
          "image": "./assets/team-volleyball.jpeg"
        }
      ]
    }
  ]
}

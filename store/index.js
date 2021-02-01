const sleep = m => new Promise(resolve => setTimeout(resolve, m))

const books = [
  {
    title: 'Trainspotting',
    cTitle: 'trainspotting',
    rating: [{
      userId: 1121,
      mark: 1
    }],
    year: 1983,
    description: 'Пупкпфы афыаыфафы аыафы',
    author: 'Irvine Welsh',
    tagline: 'Voice of generation',
    id: 1,
    reviews: [
      {
        author: 'Dail Cooper',
        date: new Date(),
        text: 'super puper book i love it',
        id: 111
      },
      {
        author: 'Dian',
        date: new Date(),
        text: 'super puper book i dont love it',
        id: 10000
      }
    ]
  },
  {
    title: 'Harry Potter',
    cTitle: 'harry_potter',
    rating: [0, 1, 2, 3, 4, 5, 0, 1, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    year: 1953,
    description: 'asd fasffsa fasa',
    author: 'Joanne Rowling',
    tagline: 'Voice of generation',
    id: 2,
    reviews: [
      {
        author: 'Dail',
        date: new Date(),
        text: 'super puper book i love it',
        id: 551444
      },
      {
        author: 'Dian Cooper',
        date: new Date(),
        text: 'super puper book i dont love it',
        id: 121234
      }
    ]
  },
  {
    title: 'War and Peace',
    cTitle: 'war_and_peace',
    rating: [0, 1, 2, 3, 4, 5, 0, 1, 2, 0, 1, 2, 3, 4, 5, 0, 1, 2],
    year: 1883,
    description: 'Супап уафыаф',
    author: 'Leo Tolstoy',
    tagline: 'Voice of generation',
    id: 3,
    reviews: [
      {
        author: 'Sobaka Cooper',
        date: new Date(),
        text: 'super puper book i love it',
        id: 551
      },
      {
        author: 'Dian Cruger',
        date: new Date(),
        text: 'super puper book i dont love it',
        id: 12123
      }
    ]
  },
  {
    title: 'Alchemist',
    cTitle: 'alchemist',
    rating: [0, 1, 2, 3],
    year: 1984,
    description: 'Перпетуум мо',
    author: 'Paulo Coelho',
    tagline: 'Voice of generation',
    id: 4,
    reviews: [
      {
        author: 'Bag',
        date: new Date(),
        text: 'super puper book i love it',
        id: 55
      },
      {
        author: 'Dian',
        date: new Date(),
        text: 'super puper book i dont love it',
        id: 121
      }
    ]
  }
]

export const state = {
  books: [],
  user: {
    name: 'John Doe'
  }
}

export const getters = {
  USER: (state) => {
    return state.user
  },
  BOOKS: (state) => {
    return state.books
  }
}

export const mutations = {
  SET_BOOKS (state, books) {
    state.books = books
  },
  SET_CURRENT_BOOK (state, book) {
    state.currentBook = book
  },
  ADD_BOOK: (state, payload) => {
    state.books.push(payload)
  },
  ADD_REVIEW: (state, payload) => {
    state.currentBook.reviews.push(payload)
  },
  ADD_MARK: (state, payload) => {
    const currentBook = state.books.find(book => book.id === payload.bookId)
    currentBook.rating.push(Number(payload.mark))
  }
}

export const actions = {
  SAVE_BOOK: async (context, payload) => {
    await context.commit('ADD_BOOK', payload)
  },
  SAVE_REVIEW: async (context, payload) => {
    await context.commit('ADD_REVIEW', payload)
  },
  SAVE_MARK: async (context, payload) => {
    await context.commit('ADD_MARK', payload)
  },
  async getBooks ({ commit }) {
    try {
      await sleep(1000)
      await commit('SET_BOOKS', books)
    } catch (err) {
      throw new Error('Внутреняя ошибка сервера, сообщите администратору')
    }
  },
  async getCurrentBook ({ commit }, { route }) {
    await sleep(1000)
    const book = books.find(book => book.cTitle === route.params.book)
    await commit('SET_CURRENT_BOOK', book)
  }
}

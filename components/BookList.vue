<template>
  <div class="board">
    <div class="board__menu">
      <div class="search">
        Поиск
        <button type="button" @click="searchByAuthor()">
          по автору
        </button>
        <button type="button" @click="searchByTitle()">
          по названию
        </button>
        <input v-show="byTitle" v-model="searchTitle" type="search" placeholder="Поиск по названию">
        <input v-show="byAuthor" v-model="searchAthor" type="search" placeholder="Поиск по автору">
      </div>
      <div class="sort">
        сортировать по:
        <div class="sort__buttons">
          году написания
          <button class="sort__button sort__button--up" @click="sortParam='year'">
            по возрастанию
          </button>
          <button class="sort__button sort__button--down" @click="sortParam='year-reverse'">
            по убыванию
          </button>
        </div>
        <div class="sort__buttons">
          рейтингу
          <button class="sort__button sort__button--up" @click="sortParam='rating'">
            по возрастанию
          </button>
          <button class="sort__button sort__button--down" @click="sortParam='rating-reverse'">
            по убыванию
          </button>
        </div>
      </div>
    </div>
    <ul class="book-list">
      <li v-for="book in sortedBooks" :key="book.title">
        <Book :book="book" class="book-list__book" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.board {
  background-image: url('../assets/img/bg-fill.jpg');
  border-radius: 10px;
  overflow: hidden;
  color: #d4d0c2;
  font-weight: 500;
  border: 5px solid brown;

  &__menu {
    padding: 20px;
  }
}

.book-list {
  list-style: none;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  padding-left: 0;

  li {
    padding: 25px 50px;
    margin: 10px 0;
    width: 25%;
    background-image: url('../assets/img/book-border.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    backface-visibility: hidden;
  }
}

.sort {
  margin-top: 20px;

  &__buttons {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 5px;
  }

  &__button {
    position: relative;
    padding-right: 30px;

    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
    }

    &::before {
      width: 15px;
      height: 1px;
      right: 7px;
      top: 50%;
      background-color: #000;
    }

    &::after {
      width: 8px;
      height: 8px;
      border-right: 1px solid #000;
    }

    &--down {
      &::before {
        transform: translateY(-50%) rotate(45deg);
      }

      &::after {
        border-bottom: 1px solid #000;
        right: 8px;
        bottom: 5px;
      }
    }

    &--up {
      &::before {
        transform: translateY(-50%) rotate(-45deg);
      }

      &::after {
        border-top: 1px solid #000;
        top: 6px;
        right: 9px;
      }
    }
  }
}
</style>

<script>
import Book from './Book'

const sortByYear = (book1, book2) => { return (book1.year > book2.year) ? 1 : -1 }
const sortByRating = (book1, book2) => { return (book1.rating > book2.rating) ? 1 : -1 }

export default {
  components: {
    Book
  },
  props: {
    books: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      searchTitle: '',
      searchAthor: '',
      byTitle: true,
      byAuthor: false,
      sortParam: ''
    }
  },
  computed: {
    filteredBooks () {
      return this.books.slice().filter((book) => {
        if (this.byTitle) {
          return book.title.toLowerCase().includes(this.searchTitle.toLowerCase())
        }
        if (this.byAuthor) {
          return book.author.toLowerCase().includes(this.searchAthor.toLowerCase())
        }
      })
    },
    sortedBooks () {
      switch (this.sortParam) {
        case 'year': return this.filteredBooks.slice().sort(sortByYear)
        case 'year-reverse': return this.filteredBooks.slice().sort(sortByYear).reverse()
        case 'rating': return this.filteredBooks.slice().sort(sortByRating)
        case 'rating-reverse': return this.filteredBooks.slice().sort(sortByRating).reverse()
        default: return this.filteredBooks.slice()
      }
    }
  },
  methods: {
    changeIsMarked () {
      this.isMarked = !this.isMarked
    },
    searchByAuthor () {
      this.byAuthor = true
      this.byTitle = false
    },
    searchByTitle () {
      this.byTitle = true
      this.byAuthor = false
    }
  }
}
</script>

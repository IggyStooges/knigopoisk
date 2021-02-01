<template>
  <div class="container">
    <h1 class="title">
      Книгопоиск
    </h1>
    <BookList :books="books" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BookList from '~~/components/BookList'

export default {
  components: {
    BookList
  },
  async asyncData ({ app, route, params, error, store }) {
    try {
      await store.dispatch('getBooks')
    } catch (err) {
      return error({
        statusCode: 404,
        message: 'Категории не найдены или сервер не доступен'
      })
    }
  },
  computed: {
    ...mapState({
      books: 'books'
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

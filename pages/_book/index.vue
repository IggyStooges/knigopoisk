<template>
  <div class="container">
    <h1>
      <nuxt-link to="/" class="book__wrapper">
        {{ book.title }}
      </nuxt-link>
    </h1>
    <section class="book-info">
      <div class="book-info__img">
        <img src="" alt="">
      </div>
      <div>
        <p> Was written in {{ book.year }} by {{ book.author }} </p>
        <p> {{ book.description }}</p>
      </div>
    </section>
    <section class="reviews">
      <article v-for="review in book.reviews" :key="review.id">
        <h2> {{ review.author }} {{ review.date }}</h2>
        <p> {{ review.text }}</p>
      </article>
    </section>
    <AddCommentForm />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddCommentForm from '~~/components/AddCommentForm'

export default {
  components: {
    AddCommentForm
  },
  async asyncData ({ app, params, route, error }) {
    try {
      await app.store.dispatch('getCurrentBook', { route })
    } catch (err) {
      return error({
        statusCode: 404,
        message: 'Категория не найдена или сервер не доступен'
      })
    }
  },
  computed: {
    ...mapState({
      book: 'currentBook'
    })
  },
  head () {
    return {
      title: this.book.title,
      meta: [
        {
          hid: 'description',
          name: 'description'
        }
      ]
    }
  }
}
</script>

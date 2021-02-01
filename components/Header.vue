<template>
  <header>
    <div class="container">
      <span>Hello, {{ userName }}</span>
      <div>Your Rating is {{ userTitle }}</div>
      <div>We Have {{ totalBooks }} books in our DataBase</div>
    </div>
  </header>
</template>

<style>
header {
  color: #ffdbff;
}
</style>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => []
    },
    books: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      userName: this.user.name,
      userTitle: this.user.title,
      totalBooks: this.books.length
    }
  }
}
</script>

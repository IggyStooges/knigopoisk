<template>
  <form class="new-book" @submit="commitNewBook">
    <fieldset>
      <div>
        <input v-model="author" type="text" placeholder="author">
      </div>
      <div>
        <textarea v-model="text" type="text" placeholder="description">Введите текст комментария</textarea>
      </div>
      <button>
        Добавить комментарий
      </button>
    </fieldset>
    <ul>
      <li v-for="error in errors" :key="error.key">
        {{ error }}
      </li>
    </ul>
  </form>
</template>

<style lang="scss">
input,
textarea,
select,
button {
  border: none;
  background-color: #d4d0c2;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  border-radius: 10px;
  font-size: 12px;
  line-height: 14px;

  &:hover {
    box-shadow: 0 0 5px 2px #d4d0c2;
  }

  &:focus,
  &:active {
    outline: none;
  }
}
</style>

<script>

export default {
  data () {
    return {
      author: '',
      date: new Date(),
      text: '',
      year: '',
      errors: []
    }
  },
  methods: {
    commitNewBook (event) {
      event.preventDefault()
      const comment = {
        author: this.author,
        date: this.date.toLocaleString(),
        text: this.text,
        id: Math.floor(Math.random() * Math.floor(500))
      }
      if (this.text.length >= 10) {
        this.$store.dispatch('SAVE_REVIEW', comment)
      }
      this.errors = []
      if (this.text.length < 10) {
        this.errors.push('Текст рецензии должен содержать не менее 10 символов')
      }
    }
  }
}
</script>

<template>
  <article class="book">
    <nuxt-link :to="`/${book.cTitle}`" class="book__wrapper">
      <div class="book__wrapper-inner">
        <div class="book__front">
          <img src="../assets/img/book-bg.jpg" alt="обложка">
          <div class="book__content">
            <div class="book__tagline">
              {{ tagline }}
            </div>
            <h3 class="book__title">
              {{ title }}
            </h3>
            <div class="book__author">
              <span>Written By</span>
              <span>{{ author }}</span>
            </div>
          </div>
        </div>
        <div class="book__back">
          <div class="book__back-wrapper">
            <div>
              <span>book written in {{ year }}</span>
              <span>средняя оценка пользователей {{ humanityRating }}</span>
            </div>
            <p>{{ description }}</p>
          </div>
        </div>
      </div>
    </nuxt-link>
    <div>
      <div v-if="isMarked">
        Ваша оценка <span class="book__mark">{{ userMark }}</span>
        <button type="button" @click="changeIsMarked">
          изменить оценку
        </button>
      </div>
      <div v-else>
        Поставьте оценку
        <select v-model="userMark" type="text" placeholder="rating" @change="estimateBook">
          <option value="1">
            1
          </option>
          <option value="2">
            2
          </option>
          <option value="3">
            3
          </option>
          <option value="4">
            4
          </option>
          <option value="5">
            5
          </option>
        </select>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
.book {
  padding-top: 10px;
  padding-bottom: 10px;

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    overflow: hidden;
  }

  &__wrapper {
    cursor: pointer;
    position: relative;
    backface-visibility: visible;

    &-inner {
      display: block;
      position: relative;
      transition: transform 0.7s;
      transform-style: preserve-3d;
      perspective: 800px;
    }

    &:hover & {
      &-inner {
        transform: translateX(-35%) rotateY(-180deg) scale(0.7);
      }
    }
  }

  &__tagline {
    text-transform: uppercase;
    font-size: 14px;
  }

  &__content {
    position: absolute;
    color: #b19a4c;
    top: 30px;
    bottom: 35px;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-style: italic;
    max-width: 50%;
  }

  &__back {
    position: absolute;
    left: -100%;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    background: transparent;
    transform: rotateY(180deg);
    color: brown;
    font-size: 28px;
    line-height: 32px;
    padding: 30px;
    background-image: url('../assets/img/back-book-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    backface-visibility: hidden;

    &-wrapper {
      display: flex;
      justify-content: space-between;

      * {
        width: 45%;
      }
    }
  }

  &__front {
    height: 100%;
    backface-visibility: hidden;
    position: relative;
    z-index: 1;
  }

  &__author {
    display: flex;
    flex-direction: column;
  }

  &__mark {
    color: #ffbc00;
    font-size: 20px;
    font-style: italic;
    font-weight: bold;
  }
}
</style>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      title: this.book.title,
      rating: this.book.rating,
      year: this.book.year,
      description: this.book.description,
      author: this.book.author,
      tagline: this.book.tagline,
      userMark: 0,
      isMarked: false
    }
  },
  computed: {
    humanityRating () {
      return parseFloat(this.rating.reduce((a, b) => a + b, 0) / this.rating.length)
    }
  },
  methods: {
    changeIsMarked () {
      this.isMarked = !this.isMarked
    },
    estimateBook () {
      this.changeIsMarked()
      const bookId = this.book.id
      const mark = this.userMark
      this.$store.dispatch('SAVE_MARK', { bookId, mark })
    }
  }
}
</script>

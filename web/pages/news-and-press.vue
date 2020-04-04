<template>
  <div class="news-and-press page">
    <TornHero half-size :background="content.hero_background" />
    <div class="news-and-press__content content" :style="computedMaxHeight">
      <transition name="fade-event" mode="out-in" @after-enter="animCardsIn">
        <div
          :key="activeIndex"
          ref="container"
          class="news-and-press__content__cards"
        >
          <ArticleCard
            v-for="card in activeCards"
            :key="card.title"
            :content="card"
          />
        </div>
      </transition>
      <Paginate
        :active-index="activeIndex"
        :items="content.articles"
        :copy="{
          prev: 'Later',
          next: 'Earlier'
        }"
        @upateIndex="handleUpdate"
      />
    </div>
  </div>
</template>

<script>
import { checkGlobalData, getCopy, chunkItems } from '@/core/utils'
import TornHero from '@/components/TornHero'
import ArticleCard from '@/components/ArticleCard'
import Paginate from '@/components/Paginate'

export default {
  name: 'NewsAndPress',
  components: {
    TornHero,
    ArticleCard,
    Paginate
  },
  async asyncData({ $axios, store }) {
    await checkGlobalData(store)
    const content = await $axios.$get(
      'http://crop-new-bucket.s3.amazonaws.com/app-data/staging-news.json'
    )
    return { content: JSON.parse(JSON.stringify(getCopy(content[0]))).news }
  },
  data: () => ({
    activeIndex: 0,
    itemsPerPage: 4
  }),
  computed: {
    chunkedCards() {
      return chunkItems(this.content.articles, this.itemsPerPage)
    },
    computedMaxHeight() {
      return {
        maxHeight: `${this.activeCards.length * 306 + 20}px`
      }
    },
    activeCards() {
      return this.chunkedCards[this.activeIndex]
    }
  },
  methods: {
    handleUpdate(newIndex) {
      this.activeIndex = newIndex
    },
    animCardsIn() {
      this.$refs.container.classList.add('animate')
    }
  }
}
</script>

<style lang="scss">
.news-and-press {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: {
      top: 50px;
      bottom: 100px;
    }
    height: 10000px;
    transition: max-height 500ms $easeOutQuad;
    &__cards {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}
</style>

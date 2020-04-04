<template>
  <div class="article-card">
    <div class="article-card__image">
      <img :src="content.hero_image" alt="article image" />
    </div>
    <div class="article-card__content">
      <h4>NEWS • {{ getDate(content.date) }}</h4>
      <ArticleDivider class="divider" />
      <h3>{{ content.headline }}</h3>
      <p>{{ content.description }}</p>
      <CropButton copy="Read Article" :link="content.url" arrow flat />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ArticleDivider from '@/assets/svg/article-divider.svg?inline'

export default {
  name: 'ArticleCard',
  components: {
    ArticleDivider
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    getDate(date) {
      return moment(date).format('MM/DD/YYYY')
    }
  }
}
</script>

<style lang="scss">
.article-card {
  display: flex;
  width: 100%;
  margin: 30px 0;
  &__image {
    width: 35%;
    max-width: 369px;
    max-height: 246px;
    overflow: hidden;
    border-top: 4px solid $gold;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__content {
    width: 60%;
    margin-left: 5%;
    position: relative;
    .divider {
      margin: 10px 0;
    }

    p {
      margin-top: 10px;
      font-size: 12px;
      line-height: 180%;
    }

    .crop-button {
      position: absolute;
      bottom: 10px;
      left: 0;
      padding: 0;
      border: none;
      background: none;
      svg {
        transition: transform 250ms $easeOutQuad;
      }
      &:hover {
        svg {
          transform: translateX(5px);
        }
      }
    }
  }
}
</style>

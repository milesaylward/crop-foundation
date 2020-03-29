<template>
  <div class="hero-carousel">
    <Slide v-for="slide in items" :key="slide.image" :slide="slide" />
    <div class="hero-carousel__controls">
      <div class="hero-carousel__controls__buttons">
        <button class="prev">
          <arrowFilled />
        </button>
        <button class="next">
          <arrowFilled />
        </button>
      </div>
      <div class="hero-carousel__controls__copy">
        <h4>
          {{ displayIndex }} &ndash; {{ totalSlides }}
          <span>/</span>
          The crop foundation
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import Slide from './Slide'
import arrowFilled from '@/assets/svg/arrow-filled.svg?inline'

export default {
  components: {
    Slide,
    arrowFilled
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    activeIndex: 0
  }),
  computed: {
    displayIndex() {
      return this.activeIndex + 1
    },
    totalSlides() {
      return this.items.length
    }
  }
}
</script>

<style lang="scss">
.hero-carousel {
  position: relative;
  max-height: 100vh;
  overflow: hidden;
  z-index: 1;
  color: white;
  &::after {
    content: '';
    position: absolute;
    background: url('~@/assets/images/hero_border.png');
    width: 100%;
    height: 13%;
    background-size: cover;
    bottom: 0;
  }
  &__controls {
    position: absolute;
    left: 75px;
    top: 36%;
    transform: translateY(-50%);
    h4 {
      font-weight: 200;
      span {
        display: inline-block;
        margin: 0 5px;
      }
    }
    &__buttons {
      display: flex;
      margin-bottom: 20px;
      button {
        background: none;
        width: 40px;
        height: 40px;
        border: 1px solid $halfWhite;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        &.prev {
          margin-right: 10px;
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}
</style>

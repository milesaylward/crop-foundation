<template>
  <div class="hero-carousel" :class="{ animate: showControls }">
    <transition name="fade" mode="out-in">
      <Slide :key="activeSlide.image" :slide="activeSlide" />
    </transition>
    <div class="hero-carousel__controls">
      <div class="hero-carousel__controls__buttons">
        <button
          class="prev"
          @mousedown="preventFocus"
          @click="handleSlideChange('prev')"
        >
          <arrowFilled />
        </button>
        <button
          class="next"
          @mousedown="preventFocus"
          @click="handleSlideChange('next')"
        >
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
    <img :src="carouselBorder" alt="carousel border" class="accent" />
  </div>
</template>

<script>
import Slide from './Slide'
import arrowFilled from '@/assets/svg/arrow-filled.svg?inline'
import eventBus from '@/core/eventBus'
import { preventFocus } from '@/core/utils'
import carouselBorder from '@/assets/images/hero_border.png'

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
    activeIndex: 0,
    showControls: false,
    preventFocus,
    carouselBorder
  }),
  computed: {
    displayIndex() {
      return this.activeIndex + 1
    },
    activeSlide() {
      return this.items[this.activeIndex]
    },
    totalSlides() {
      return this.items.length
    }
  },
  mounted() {
    eventBus.$on('animateSlideControls', () => {
      this.showControls = true
    })
  },
  methods: {
    handleSlideChange(dir) {
      if (dir === 'prev') {
        if (this.activeIndex === 0) {
          this.activeIndex = this.items.length - 1
        } else {
          this.activeIndex -= 1
        }
      } else if (this.activeIndex === this.items.length - 1) {
        this.activeIndex = 0
      } else {
        this.activeIndex += 1
      }
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
  min-height: 600px;
  @include bpMedium {
    min-height: 100vh;
  }
  .accent {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(50%);
    width: 100%;
  }
  &__controls {
    position: absolute;
    transform: translateY(-50%);
    left: 20px;
    top: 25%;
    @include bpMedium {
      left: 75px;
      top: 32%;
    }
    h4 {
      font-weight: 200;
      color: white;
      text-transform: uppercase;
      @include bpMedium {
        color: $gold;
      }
      span {
        display: inline-block;
        margin: 0 5px;
      }
    }
    &__buttons {
      display: flex;
      margin-bottom: 20px;
      opacity: 0;
      transition: opacity 500ms $easeOutMaterial;
      button {
        background: $noWhite;
        width: 40px;
        height: 40px;
        border: 1px solid $halfWhite;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background 300ms $easeOutQuad;
        svg {
          path {
            transition: fill 300ms $easeOutQuad, stroke 300ms $easeOutQuad;
          }
        }
        &:hover {
          background: white;
          svg {
            path {
              fill: $halfBlack;
              stroke: $halfBlack;
            }
          }
        }
        &.prev {
          margin-right: 10px;
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }
    &__copy {
      opacity: 0;
      transition: opacity 500ms $easeOutMaterial 85ms;
    }
  }

  &.animate {
    .hero-carousel__controls {
      &__buttons,
      &__copy {
        opacity: 1;
      }
    }
  }
}
</style>

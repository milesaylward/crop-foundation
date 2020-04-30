<template>
  <div class="hero-carousel" :class="{ animate: showControls }">
    <transition name="fade" mode="out-in">
      <Slide
        :key="activeSlide.image"
        :slide="activeSlide"
        :is-first-mount="isFirstMount"
        @firstMountDone="isFirstMount = false"
      />
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
    <button class="hero-carousel__scroll-button" @click="handleScrollToClick">
      <span class="arrow">
        <DownArrow />
      </span>
      Scroll to learn more
    </button>
    <img :src="carouselBorder" alt="carousel border" class="accent" />
  </div>
</template>

<script>
import Slide from './Slide'
import arrowFilled from '@/assets/svg/arrow-filled.svg?inline'
import DownArrow from '@/assets/svg/double-down-arrow.svg?inline'
import eventBus from '@/core/eventBus'
import { preventFocus } from '@/core/utils'
import carouselBorder from '@/assets/images/hero_border.png'

export default {
  components: {
    Slide,
    arrowFilled,
    DownArrow
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
    isFirstMount: true,
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
    },
    handleScrollToClick() {
      const rect = document
        .querySelector('.home-section-one')
        .getBoundingClientRect()
      window.scrollTo({
        top: rect.top + window.scrollY,
        behavior: 'smooth'
      })
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
    min-height: 900px;
    height: 100vh;
  }
  .accent {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(50%);
    width: 100%;
  }
  &__scroll-button {
    position: absolute;
    bottom: 3%;
    left: 10px;
    display: flex;
    align-items: center;
    z-index: 105;
    font-family: $fontHeadline;
    background: none;
    border: none;
    font-size: 14px;
    line-height: 16px;
    font-weight: 200;
    color: $gold;
    &:focus {
      outline: none;
    }
    &:hover {
      svg {
        transform: translateY(3px);
      }
    }
    svg {
      width: 35px;
      height: 25px;
      padding: 3px 10px;
      margin-right: 10px;
      border-right: 1px solid rgba($lightGrey, 0.5);
      transition: transform 250ms $easeOutQuad;
    }
  }
  &__controls {
    position: absolute;
    transform: translateY(-50%);
    left: 20px;
    top: 18%;
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

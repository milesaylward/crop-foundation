<template>
  <div ref="slide" class="slide">
    <div ref="canvasContainer" class="canvas-container" :class="{ animate }">
      <div class="slide__overlay" />
      <img v-if="isIOS" :src="slide.image" @load="handleImageReady" />
    </div>
    <div
      class="content"
      :class="{ animate: animateContent, first: isFirstSlide }"
    >
      <h1 v-if="!slide.quotes.length">{{ slide.headline }}</h1>
      <div v-else class="hero__quotes">
        <h3
          v-for="quote in trimmedQuotes"
          :key="quote.copy"
          class="hero__quotes__quote"
        >
          {{ quote.copy }}
        </h3>
      </div>
      <div class="button">
        <CropButton
          :copy="slide.button"
          color="white"
          :link="slide.link"
          :use-nuxt-link="slide.internal_link"
        >
          <arrowFilled />
        </CropButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import arrowFilled from '@/assets/svg/arrow-filled.svg?inline'
import WatercolorSlide from '@/core/watercolor'
import eventBus from '@/core/eventBus'
import resizeMixin from '@/mixins/resize'

export default {
  components: {
    arrowFilled
  },
  mixins: [resizeMixin],
  props: {
    slide: {
      type: Object,
      required: true
    },
    isFirstSlide: {
      type: Boolean,
      default: true
    },
    isFirstMount: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    animate: false,
    animateContent: false
  }),
  computed: {
    trimmedQuotes() {
      return this.slide.quotes.slice(0, 2)
    },
    ...mapGetters(['isIOS'])
  },
  mounted() {
    if (!this.isIOS) {
      this.initSlide()
    }
  },
  beforeDestroy() {
    if (this.waterColor) this.waterColor.destroy()
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    initSlide() {
      this.timeout = setTimeout(() => {
        const rect = this.$refs.slide.getBoundingClientRect()
        this.waterColor = new WatercolorSlide({
          container: this.$refs.canvasContainer,
          image: this.slide.image,
          width: rect.width,
          height: rect.height,
          showControls: this.isFirstSlide
        })
        this.waterColor.readyImage()
      }, 350)
      eventBus.$on('slideReady', this.handleSlideReady)
      eventBus.$on('animateSlideContent', () => {
        this.animateContent = true
      })
    },
    handleResize() {
      if (!this.waterColor) return
      const rect = this.$refs.slide.getBoundingClientRect()
      this.waterColor.handleResize(rect)
    },
    animateSlide() {
      this.$nextTick(() => {
        this.animate = true
        this.waterColor.onAnimate()
      })
    },
    animateSlideContent() {
      this.animate = true
      this.animateContent = true
      eventBus.$emit('animateSlideControls')
    },
    handleImageReady() {
      if (this.isFirstSlide && this.isFirstMount) {
        this.setShowLoader(false)
        this.$emit('firstMountDone')
        eventBus.$emit('firstSlideDone')
        eventBus.$on('loaderDismissed', () => {
          this.animateSlideContent()
        })
      } else {
        this.animateSlideContent()
      }
    },
    handleSlideReady() {
      if (this.isFirstSlide && this.isFirstMount) {
        this.setShowLoader(false)
        eventBus.$emit('firstSlideDone')
        eventBus.$on('loaderDismissed', this.animateSlide)
        this.$emit('firstMountDone')
      } else {
        this.animateSlide()
      }
    },
    ...mapActions(['setShowLoader'])
  }
}
</script>

<style lang="scss">
.slide {
  position: relative;
  height: 100vh;
  max-height: 600px;
  @include bpMedium {
    max-height: 100vh;
    min-height: 1000px;
  }
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 500ms $easeOutQuad 100ms;
    pointer-events: none;
  }
  img {
    position: relative;
    z-index: -1;
    height: 100%;
    width: auto;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
    max-height: 600px;
    transition: opacity 250ms $easeOutQuad 200ms;
  }
  canvas {
    opacity: 0;
  }
  .animate {
    canvas {
      opacity: 1;
    }
    .slide__overlay {
      opacity: 1;
    }
    img {
      opacity: 1;
    }
  }
  .canvas-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    left: 0;
    max-width: 1000px;
    @include bpMedium {
      padding-left: 70px;
    }
    &.animate {
      h1,
      .button,
      h3 {
        opacity: 1;
      }
    }
    h3 {
      color: white;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 18px;
      opacity: 0;
      transition: opacity 500ms $easeOutMaterial;
      @for $i from 1 through 2 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 85ms;
        }
      }
      @include bpMedium {
        font-size: 20px;
        line-height: 24px;
      }
      @include bpLarge {
        font-size: 24px;
        line-height: 34px;
      }
    }
    h1 {
      max-width: 900px;
      opacity: 0;
      transition: opacity 500ms $easeOutMaterial 170ms;
      color: white;
      font-weight: 200;
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      opacity: 0;
      transition: opacity 500ms $easeOutMaterial 255ms;
    }
  }
}
</style>

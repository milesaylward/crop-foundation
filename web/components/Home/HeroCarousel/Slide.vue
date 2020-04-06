<template>
  <div ref="slide" class="slide">
    <div ref="canvasContainer" class="canvas-container" :class="{ animate }" />
    <img :src="slide.image" alt="alt text" />
    <div
      class="content"
      :class="{ animate: animateContent, first: isFirstSlide }"
    >
      <h1>{{ slide.headline }}</h1>
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
import arrowFilled from '@/assets/svg/arrow-filled.svg?inline'
import WatercolorSlide from '@/core/watercolor'
import eventBus from '@/core/eventBus'

export default {
  components: {
    arrowFilled
  },
  props: {
    slide: {
      type: Object,
      required: true
    },
    isFirstSlide: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    animate: false,
    animateContent: false
  }),
  mounted() {
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
    }, 100)
    eventBus.$on('slideReady', () => {
      this.$nextTick(() => {
        this.animate = true
        this.waterColor.onAnimate()
      })
    })
    window.addEventListener('resize', this.handleResize)
    eventBus.$on('animateSlideContent', () => {
      this.animateContent = true
    })
  },
  beforeDestroy() {
    this.waterColor.destroy()
    window.removeEventListener('resize', this.handleResize)
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    handleResize() {
      if (!this.waterColor) return
      const rect = this.$refs.slide.getBoundingClientRect()
      this.waterColor.handleResize(rect)
    }
  }
}
</script>

<style lang="scss">
.slide {
  position: relative;
  max-height: 600px;
  @include bpMedium {
    max-height: 100vh;
  }
  img {
    height: 100%;
    width: auto;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
  }
  canvas {
    opacity: 0;
  }
  .animate {
    canvas {
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
    max-width: 900px;
    @include bpMedium {
      padding-left: 70px;
    }
    &.animate {
      h1,
      .button {
        opacity: 1;
      }
    }
    h1 {
      opacity: 0;
      transition: opacity 500ms $easeOutMaterial 170ms;
      color: white;
      font-weight: 200;
      margin-bottom: 30px;
    }
    .button {
      opacity: 0;
      transition: opacity 500ms $easeOutMaterial 255ms;
    }
  }
}
</style>

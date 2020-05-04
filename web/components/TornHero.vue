<template>
  <div
    class="torn-hero"
    :class="{
      'no-bg': !background,
      'half-size': halfSize
    }"
  >
    <video
      v-if="background && isVideo"
      :src="background"
      class="background"
      autoplay
      muted
      loop
      playsinline
      @loadeddata="handleVideoLoaded"
    />
    <div v-else-if="background" ref="canvasContainer" class="background">
      <img
        ref="image"
        :src="background"
        :class="{ animate, isIOS }"
        @load="handleImageReady"
      />
    </div>
    <h1>{{ copy }}</h1>
    <img class="torn-hero__border" :src="heroBorder" alt="torn border" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import tornBorder from '@/assets/images/torn-hero-border.png'
import halfTornBorder from '@/assets/images/half-torn-border.png'
import WatercolorSlide from '@/core/watercolor'
import eventBus from '@/core/eventBus'
import resizeMixin from '@/mixins/resize'

export default {
  name: 'TornHero',
  mixins: [resizeMixin],
  props: {
    background: {
      type: String,
      default: ''
    },
    halfSize: {
      type: Boolean,
      default: false
    },
    copy: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    tornBorder,
    halfTornBorder,
    animate: false
  }),
  computed: {
    isVideo() {
      return this.background.includes('.mp4')
    },
    heroBorder() {
      return !this.halfSize ? this.tornBorder : this.halfTornBorder
    },
    showWaterColor() {
      return this.background && !this.isVideo && !this.isIOS
    },
    ...mapGetters(['isIOS'])
  },
  mounted() {
    if (this.showWaterColor) this.initWaterColor()
  },
  beforeDestroy() {
    if (this.waterColor) {
      this.waterColor.destroy()
    }
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    initWaterColor() {
      this.timeout = setTimeout(() => {
        const rect = this.$refs.image.getBoundingClientRect()
        this.waterColor = new WatercolorSlide({
          container: this.$refs.canvasContainer,
          image: this.background,
          width: rect.width,
          height: rect.height,
          showControls: this.isFirstSlide
        })
        this.waterColor.readyImage()
      }, 350)
      eventBus.$on('slideReady', () => {
        this.setShowLoader(false)
      })
      eventBus.$on('loaderDismissed', () => {
        if (this.waterColor) {
          this.waterColor.onAnimate()
        }
      })
    },
    handleResize() {
      if (!this.waterColor) return
      const rect = this.$refs.image.getBoundingClientRect()
      this.waterColor.handleResize(rect)
    },
    handleImageReady() {
      if (this.isIOS) {
        this.setShowLoader(false)
        this.animate = true
      }
    },
    handleVideoLoaded() {
      this.setShowLoader(false)
    },
    ...mapActions(['setShowLoader'])
  }
}
</script>

<style lang="scss">
.torn-hero {
  width: 100%;
  max-height: 500px;
  position: relative;
  @include bpMedium {
    overflow: hidden;
  }
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 30px;
    line-height: 35px;
    transform: translate(-50%, -50%);
    color: $offWhite;
    width: 80%;
    max-width: 600px;
    text-align: center;
    font-weight: 100;
    @include bpMedium {
      font-size: 49px;
      line-height: 57px;
    }
  }
  &.half-size {
    height: 250px;
    .background {
      height: 250px;
    }
    @include bpMedium {
      height: auto;
      .background {
        height: auto;
      }
    }
  }
  &.no-bg {
    background: $darkGrey;
    min-height: 300px;
    overflow: visible;
    @media screen and (min-width: 500px) {
      min-height: 400px;
    }
    @include bpMedium {
      min-height: 500px;
    }
    .torn-hero__border {
      bottom: -1px;
    }
  }
  .background {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    img {
      position: relative;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 300ms $easeOutMaterial;
      &.isIOS {
        width: auto;
        left: 50%;
        transform: translateX(-50%);
      }
      &.animate {
        opacity: 1;
      }
    }
    canvas {
      position: absolute;
      top: 0;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translateX(-50%);
    }
  }
  &__border {
    position: absolute;
    bottom: -1px;
    height: auto;
    width: 100%;
    @media screen and (min-width: 1000px) {
      bottom: -6px;
    }
  }
}
</style>

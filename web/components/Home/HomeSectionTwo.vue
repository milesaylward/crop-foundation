<template>
  <div class="home-section-two">
    <div class="home-section-two__images">
      <Appearable
        v-for="(image, i) in content.images"
        :key="image.image.url"
        class="home-section-two__images__image"
        @can-appear="handleCanAppear(i)"
      >
        <div ref="canvasContainer" class="canvas-container">
          <img
            :key="image.image.url"
            :src="image.image.url"
            alt="cooking image"
            class="main"
            :class="{ 'ap-child': isIOS }"
          />
        </div>
        <span class="ap-child ap-child--6">
          <img
            v-if="i === 0"
            class="home-section-two__accent peeler"
            :src="peelerAccent"
            alt="background accent"
          />
        </span>
        <span class="ap-child ap-child--6 sub">
          <img
            v-if="i === 1"
            class="home-section-two__accent halftone"
            :src="halftoneTwo"
            alt="background accent"
          />
        </span>
        <img
          v-if="i === 2"
          class="accent circle"
          :src="circleAccent"
          alt="background accent"
        />
      </Appearable>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import halftoneTwo from '@/assets/images/halftone-background-accent.png'
import circleAccent from '@/assets/images/circle-accent.png'
import peelerAccent from '@/assets/images/peeler-accent.png'
import WatercolorSlide from '@/core/watercolor'
import resizeMixin from '@/mixins/resize'
import eventBus from '@/core/eventBus'

export default {
  name: 'SectionTwo',
  mixins: [resizeMixin],
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    halftoneTwo,
    circleAccent,
    peelerAccent,
    waterColors: []
  }),
  computed: {
    ...mapGetters(['isIOS'])
  },
  mounted() {
    eventBus.$on('firstSlideDone', () => {
      document.body.classList.remove('locked')
      this.$nextTick(() => {
        this.initWaterColor()
      })
    })
  },
  beforeDestroy() {
    this.waterColors.forEach((waterColor, i) => {
      waterColor.destroy()
    })
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    initWaterColor() {
      this.timeout = setTimeout(() => {
        this.content.images.forEach((image, i) => {
          const rect = this.$refs.canvasContainer[i].getBoundingClientRect()
          const waterColor = new WatercolorSlide({
            container: this.$refs.canvasContainer[i],
            image: image.image.url,
            width: rect.width,
            height: rect.height,
            useMin: false,
            debug: true
          })
          waterColor.readyImage()
          this.waterColors.push(waterColor)
        })
      }, 500)
    },
    handleResize() {
      this.waterColors.forEach((waterColor, i) => {
        const rect = this.$refs.canvasContainer[i].getBoundingClientRect()
        waterColor.handleResize(rect)
      })
    },
    handleCanAppear(i) {
      if (this.waterColors.length) {
        this.waterColors[i].onAnimate()
      }
    }
  }
}
</script>

<style lang="scss">
.home-section-two {
  position: relative;
  @include bpMedium {
    padding-top: 200px;
  }
  z-index: 2;
  &__images {
    display: flex;
    flex-wrap: wrap;
    z-index: 1;
    position: relative;
    &__image {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 50px;
      position: relative;
      z-index: 1;
      min-height: 233px;
      .sub {
        img {
          z-index: -1;
        }
      }
      .appearable__content {
        width: 65%;
        @include bpMedium {
          width: 48%;
        }
      }
      &:first-child {
        margin-top: 0;
      }
      @include bpMedium {
        margin-top: -100px;
      }
      &:nth-child(even) {
        justify-content: flex-start;
      }
      img {
        width: 100%;
        object-fit: cover;
        &.main {
          position: relative;
          z-index: 5;
        }
      }
    }
  }
  .canvas-container {
    position: relative;
    z-index: 5;
    img {
      opacity: 0;
    }
    canvas {
      top: 0;
      left: 0;
      position: absolute;
    }
  }

  .top {
    position: relative;
  }

  &__accent,
  .accent {
    position: absolute;
    z-index: -1;
    &.halftone {
      width: 85%;
      top: -70%;
      transform: translateY(50%);
      @include bpMedium {
        width: 60%;
        top: 0;
        transform: translateY(0%);
      }
    }
    &.peeler {
      width: 40%;
      max-width: 386px;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      @include bpMedium {
        left: 10%;
        top: 40%;
      }
    }
    &.circle {
      width: auto;
      right: 0;
      top: 0;
      z-index: 100;
      transform: translateY(-50%);
      display: none;
      @include bpMedium {
        display: block;
      }
    }
  }
}
</style>

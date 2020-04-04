<template>
  <div
    class="torn-hero"
    :class="{
      'no-bg': !background,
      'half-size': halfSize
    }"
  >
    <component
      :is="tagForBackground"
      :src="background"
      autoplay
      muted
      loop
      playsinline
    />
    <img class="torn-hero__border" :src="heroBorder" alt="torn border" />
  </div>
</template>

<script>
import tornBorder from '@/assets/images/torn-hero-border.png'
import halfTornBorder from '@/assets/images/half-torn-border.png'

export default {
  name: 'TornHero',
  props: {
    background: {
      type: String,
      default: ''
    },
    halfSize: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    tornBorder,
    halfTornBorder
  }),
  computed: {
    tagForBackground() {
      return this.background.includes('.mp4') ? 'video' : 'img'
    },
    heroBorder() {
      return !this.halfSize ? this.tornBorder : this.halfTornBorder
    }
  }
}
</script>

<style lang="scss">
.torn-hero {
  width: 100%;
  max-height: 500px;
  min-height: 500px;
  overflow: hidden;
  position: relative;
  &.half-size {
    min-height: 0;
  }
  &.no-bg {
    background: $darkGrey;
  }
  video,
  img {
    width: 100%;
  }
  &__border {
    position: absolute;
    bottom: -5px;
    width: 100%;
  }
}
</style>

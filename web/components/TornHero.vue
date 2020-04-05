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
    <h1>{{ copy }}</h1>
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
    },
    copy: {
      type: String,
      default: ''
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
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 49px;
    line-height: 57px;
    transform: translate(-50%, -50%);
    color: $offWhite;
    width: 80%;
    max-width: 600px;
    text-align: center;
    font-weight: 100;
  }
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

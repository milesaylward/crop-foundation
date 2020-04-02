<template>
  <div class="torn-hero" :class="{ 'no-bg': !background }">
    <component
      :is="tagForBackground"
      :src="background"
      autoplay
      muted
      loop
      playsinline
    />
    <img class="torn-hero__border" :src="tornBorder" alt="torn border" />
  </div>
</template>

<script>
import tornBorder from '@/assets/images/torn-hero-border.png'

export default {
  name: 'TornHero',
  props: {
    background: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    tornBorder
  }),
  computed: {
    tagForBackground() {
      return this.background.includes('.mp4') ? 'video' : 'img'
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

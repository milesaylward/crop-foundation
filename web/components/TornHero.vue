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
      v-if="background"
      :src="background"
      class="background"
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
  overflow: hidden;
  position: relative;
  @include bpMedium {
    // min-height: 500px;
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
    min-height: 250px;
    .background {
      min-height: 250px;
    }
  }
  &.no-bg {
    background: $darkGrey;
    min-height: 300px;
    @media screen and (min-width: 500px) {
      min-height: 400px;
    }
    @include bpMedium {
      min-height: 500px;
    }
    .torn-hero__border {
      bottom: -5px;
    }
  }
  .background {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__border {
    position: absolute;
    bottom: 0px;
    height: auto;
    width: 100%;
    @media screen and (min-width: 1000px) {
      bottom: -5px;
    }
  }
}
</style>

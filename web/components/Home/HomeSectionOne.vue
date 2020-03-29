<template>
  <div class="home-section-one container">
    <div class="home-section-one__content">
      <h4>{{ content.eyebrow }}</h4>
      <h2>{{ content.headline }}</h2>
      <div class="home-section-one__content__flex-copy">
        <p>{{ content.copy.one }}</p>
        <p>{{ content.copy.two }}</p>
      </div>
      <div class="home-section-one__accents">
        <img
          class="home-section-one__accents__grater"
          :src="grater"
          alt="kitchen grater"
        />
        <img
          class="home-section-one__accents__halftone"
          :src="halftone"
          alt="accent image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import grater from '@/assets/images/grater-accent.png'
import halftone from '@/assets/images/halftone-accent.png'

export default {
  name: 'SectionOne',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    grater,
    halftone
  })
}
</script>

<style lang="scss">
.home-section-one {
  position: relative;
  padding-top: 3rem;
  &__content {
    max-width: 900px;
    text-align: center;
    padding: 12.5rem 0;
    h4 {
      color: $gold;
      margin-bottom: 20px;
    }
    h2 {
      margin: 0 auto;
      color: $darkGrey;
      max-width: 576px;
      margin-bottom: 40px;
    }
    &__flex-copy {
      width: 100%;
      display: flex;
      text-align: left;
      justify-content: center;
      p {
        max-width: 417px;
        &:first-child {
          margin-right: 40px;
        }
      }
    }
  }
  &__accents {
    position: absolute;
    right: 0;
    top: 0;
    &__grater,
    &__halftone {
      position: absolute;
      right: 0;
      top: 30px;
      z-index: 1;
    }
    &__grater {
      width: 300px;
      z-index: 2;
    }
    &__halftone {
      width: 120px;
      top: 130px;
    }
  }
}
</style>

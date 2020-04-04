<template>
  <div class="home-section-two">
    <div class="home-section-two__images">
      <div
        v-for="(image, i) in content.images"
        :key="image.image"
        class="home-section-two__images__image"
      >
        <img :src="image.image" alt="cooking image" />
        <img
          v-if="i === 2"
          class="accent circle"
          :src="circleAccent"
          alt="background accent"
        />
      </div>
    </div>
    <img
      class="home-section-two__accent halftone"
      :src="halftoneTwo"
      alt="background accent"
    />
    <img
      class="home-section-two__accent peeler"
      :src="peelerAccent"
      alt="background accent"
    />
  </div>
</template>

<script>
import halftoneTwo from '@/assets/images/halftone-background-accent.png'
import circleAccent from '@/assets/images/circle-accent.png'
import peelerAccent from '@/assets/images/peeler-accent.png'

export default {
  name: 'SectionTwo',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    halftoneTwo,
    circleAccent,
    peelerAccent
  })
}
</script>

<style lang="scss">
.home-section-two {
  position: relative;
  padding-top: 200px;
  &__images {
    display: flex;
    flex-wrap: wrap;
    z-index: 1;
    position: relative;
    &__image {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: -100px;
      position: relative;
      &:nth-child(even) {
        justify-content: flex-start;
      }
      img {
        width: 48%;
      }
    }
  }
  &__accent,
  .accent {
    position: absolute;
    z-index: -1;
    &.halftone {
      width: 70%;
      top: 18%;
    }
    &.peeler {
      width: 386px;
      top: 17.5%;
      left: 13%;
    }
    &.circle {
      width: auto;
      right: 0;
      top: 0;
      z-index: 3;
      transform: translateY(-50%);
    }
  }
}
</style>

<template>
  <div class="home-section-three container">
    <img
      class="home-section-three__border-top"
      :src="SectionThreeBorderTop"
      alt="border-image"
    />
    <img
      class="home-section-three__border-bottom"
      :src="SectionThreeBorderBottom"
      alt="border-image"
    />
    <div class="home-section-three__content">
      <h4>{{ content.eyebrow }}</h4>
      <h2 class="light">{{ content.headline }}</h2>
      <div class="home-section-three__content__flex-copy">
        <p class="light">{{ content.copy.one }}</p>
        <p class="light">{{ content.copy.two }}</p>
      </div>
      <CropButton
        :copy="content.button"
        color="white"
        link="/scholarships"
        arrow
        use-nuxt-link
      />
    </div>
  </div>
</template>

<script>
import SectionThreeBorderTop from '@/assets/images/section-3-border-top.png'
import SectionThreeBorderBottom from '@/assets/images/section-3-border-bottom.png'

export default {
  name: 'HomeSectionThree',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    SectionThreeBorderTop,
    SectionThreeBorderBottom
  })
}
</script>

<style lang="scss">
.home-section-three {
  position: relative;
  background: $darkGrey;
  flex-direction: column;
  padding: 10rem 0;
  z-index: 1;
  &__border-top,
  &__border-bottom {
    position: absolute;
    width: 100%;
    top: 0;
    transform: translateY(-100%);
    z-index: -1;
  }
  &__border-bottom {
    top: auto;
    bottom: 0;
    transform: translateY(85%);
  }
  &__content {
    max-width: 900px;
    text-align: center;
    h4 {
      margin-bottom: 2rem;
    }
    h2 {
      margin: 0 auto;
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
    .crop-button {
      margin: 5rem auto;
    }
  }
}
</style>

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
    <img
      :src="peelerAccent"
      class="home-section-three__accent"
      alt="peeler accent image"
    />
    <div class="home-section-three__content">
      <h4>{{ content.eyebrow }}</h4>
      <h2 class="light">{{ content.headline }}</h2>
      <div class="home-section-three__content__flex-copy">
        <p class="light">{{ content.copy.one }}</p>
        <p class="light">{{ content.copy.two }}</p>
      </div>
      <div class="home-section-three__content__copy">
        <p class="light">
          {{ content.copy.one }}
          {{ content.copy.two }}
        </p>
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
import peelerAccent from '@/assets/images/peeler-light-accent.png'

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
    SectionThreeBorderBottom,
    peelerAccent
  })
}
</script>

<style lang="scss">
.home-section-three {
  position: relative;
  background: $darkGrey;
  flex-direction: column;
  padding: 10rem 0 5rem;
  @include bpMedium {
    padding: 10rem 0;
  }
  z-index: 1;
  &__border-top,
  &__border-bottom {
    position: absolute;
    width: 100%;
    top: 0;
    transform: translateY(-99%);
    z-index: -1;
  }
  &__accent {
    position: absolute;
    width: 40%;
    top: 0;
    left: 20px;
    @include bpMedium {
      width: 20%;
      left: 10%;
    }
  }
  &__border-bottom {
    top: auto;
    bottom: 0;
    transform: translateY(85%);
  }
  &__content {
    max-width: 900px;
    padding: 0 20px;
    @include bpMedium {
      text-align: center;
    }
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
      text-align: left;
      justify-content: center;
      display: none;
      @include bpMedium {
        display: flex;
      }
      p {
        max-width: 417px;
        &:first-child {
          margin-right: 40px;
        }
      }
    }
    &__copy {
      @include bpMedium {
        display: none;
      }
    }
    .crop-button {
      margin: 5rem auto;
    }
  }
}
</style>

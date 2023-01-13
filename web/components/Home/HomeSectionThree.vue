<template>
  <Appearable class="home-section-three container" :threshold="0.3">
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
      class="home-section-three__accent ap-child"
      alt="peeler accent image"
    />
    <div class="home-section-three__content">
      <h4 class="ap-child ap-child--1">{{ content.eyebrow }}</h4>
      <h2 class="light ap-child ap-child--2">{{ content.headline }}</h2>
      <div class="home-section-three__content__copy">
        <p class="light ap-child ap-child--3">
          {{ content.copy_one }}
        </p>
      </div>
      <CropButton
        copy="LEARN MORE ABOUT OUR SCHOLARSHIPS"
        class="ap-child ap-child--4"
        color="white"
        link="/scholarships"
        arrow
        use-nuxt-link
      />
    </div>
  </Appearable>
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
    left: 0;
    transform: translateY(-99%);
    z-index: -1;
  }
  &__accent {
    position: absolute;
    width: 40%;
    min-width: 250px;
    top: 0;
    left: 20px;
    @include bpMedium {
      width: 25%;
      left: 7%;
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
    padding-top: 70px;
    margin: 0 auto;
    @include bpMedium {
      text-align: center;
      padding-top: 0px;
    }
    h4 {
      margin-bottom: 2rem;
    }
    h2 {
      margin: 0 auto;
      margin-bottom: 40px;
      @include bpMedium {
        max-width: 576px;
      }
    }
    &__copy {
      @include bpMedium {
      }
    }
    .crop-button {
      margin: 5rem auto;
      display: inline-flex;
    }
  }
}
</style>

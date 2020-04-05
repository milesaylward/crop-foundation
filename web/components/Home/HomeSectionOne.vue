<template>
  <div class="home-section-one container">
    <div class="home-section-one__content content">
      <h4>{{ content.eyebrow }}</h4>
      <h2>{{ content.headline }}</h2>
      <div class="home-section-one__content__flex-copy">
        <p>{{ content.copy.one }}</p>
        <p>{{ content.copy.two }}</p>
      </div>
      <div class="home-section-one__content__copy">
        <p>
          {{ content.copy.one }}
          {{ content.copy.two }}
        </p>
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
  overflow: hidden;
  @include bpMedium {
    overflow: visible;
  }
  &__content {
    max-width: 900px;
    padding: {
      top: 12.5rem;
      bottom: 12.5rem;
    }
    @include bpMedium {
      text-align: center;
    }
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
  }
  &__accents {
    &__grater,
    &__halftone {
      position: absolute;
      right: 0;
      top: 30px;
      z-index: 1;
    }
    &__grater {
      width: 150px;
      z-index: 2;
      @include bpMedium {
        width: 300px;
      }
    }
    &__halftone {
      width: 40%;
      bottom: 0;
      transform: translateY(60%);
      top: initial;
      @include bpMedium {
        width: 120px;
        top: 130px;
      }
    }
  }
}
</style>

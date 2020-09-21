<template>
  <div class="home-section-community container">
    <Appearable class="home-section-community__content" :threshold="0.3">
      <h4 class="ap-child">{{ content.eyebrow }}</h4>
      <h2 class="ap-child ap-child--1">{{ content.headline }}</h2>
      <div class="home-section-community__content__copy">
        <p class="ap-child ap-child--2">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="content.copy.left" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="content.copy.right" />
        </p>
      </div>
      <div class="home-section-community__images">
        <div
          v-for="(image, i) in images"
          :key="image.image"
          class="home-section-community__images__image"
          @click="handleGalleryClick(i)"
        >
          <img :src="image.image" alt="CROP image" />
        </div>
      </div>
    </Appearable>
    <LightBox
      v-if="showLightBox"
      :image="lightBoxImage"
      :disable="lightBoxDisable"
      @close="handleCloseLightBox"
      @increment="handleLightBoxIncrement"
    />
  </div>
</template>

<script>
import LightBox from '@/components/Events/LightBox'

export default {
  name: 'SectionCommunity',
  components: {
    LightBox
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showLightBox: false,
    activeLightBoxIndex: null
  }),
  computed: {
    images() {
      return this.content.images
    },
    lightBoxDisable() {
      return {
        prev: this.activeLightBoxIndex === 0,
        next: this.activeLightBoxIndex === this.images.length - 1
      }
    },
    lightBoxImage() {
      return this.activeLightBoxIndex !== null
        ? { url: this.images[this.activeLightBoxIndex].image }
        : ''
    }
  },
  methods: {
    handleCloseLightBox() {
      this.activeLightBoxIndex = null
      this.showLightBox = false
    },
    handleGalleryClick(index) {
      this.activeLightBoxIndex = index
      this.showLightBox = true
    },
    handleLightBoxIncrement(dir) {
      if (dir === 'prev') this.activeLightBoxIndex -= 1
      else this.activeLightBoxIndex += 1
    }
  }
}
</script>

<style lang="scss">
.home-section-community {
  position: relative;
  padding-top: 3rem;
  padding: 0 20px;
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
      @include bpMedium {
        max-width: 576px;
      }
      margin-bottom: 40px;
    }
    .cta-support {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5rem;
      h3 {
        line-height: 1;
      }
      img {
        margin-top: 5px;
        margin-left: 10px;
        width: 150px;
      }
    }
    &__copy {
      a {
        color: $gold;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -3px;
          background: $gold;
          width: 100%;
          height: 1px;
          transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
          transform-origin: center center;
          transform: scaleX(0);
        }
        @include on-hover {
          &::after {
            transform: scaleX(1);
          }
        }
      }
    }
  }
  &__images {
    margin-top: 50px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    @include bpLarge {
      flex-wrap: nowrap;
    }
    &__image {
      width: 48%;
      margin: 10px 0;
      overflow: hidden;
      cursor: pointer;
      @include bpLarge {
        margin: 0 10px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 250ms $easeOutMaterial;
      }
      &:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>

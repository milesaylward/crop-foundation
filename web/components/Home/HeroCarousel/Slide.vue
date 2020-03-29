<template>
  <div class="slide">
    <img :src="slide.image" alt="alt text" />
    <div class="content">
      <h1>{{ slide.headline }}</h1>
      <CropButton :copy="slide.button" color="white" link="">
        <arrowFilled />
      </CropButton>
    </div>
  </div>
</template>

<script>
import arrowFilled from '@/assets/svg/arrow-filled.svg?inline'
export default {
  components: {
    arrowFilled
  },
  props: {
    slide: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.slide {
  position: relative;
  max-height: 100vh;
  img {
    width: 100%;
  }
  .content {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    left: 0;
    padding-left: 70px;
    max-width: 900px;
    h1 {
      color: white;
      font-weight: 200;
      margin-bottom: 30px;
    }
  }
}
</style>

<template>
  <div class="home-section-images">
    <img
      v-for="image in images"
      :key="image.image"
      class="home-section-images__image"
      :src="image.image"
      alt="CROP image"
    />
  </div>
</template>

<script>
export default {
  name: 'HomeSectionImages',
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.home-section-images {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  bottom: 0;
  position: relative;
  z-index: 2;
  &__image {
    display: block;
    width: 44%;
    margin: 0 10px;
  }
}
</style>

<template>
  <div class="glide">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <img
          v-for="image in images"
          :key="image.image"
          class="glide__slide"
          :src="image.image"
          alt="CROP image"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide'

export default {
  name: 'HomeSectionImages',
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.glide = new Glide('.glide', {
      type: 'carousel',
      perView: 2,
      focusAt: 'center',
      autoplay: 4000
    }).mount()
  }
}
</script>

<style lang="scss">
.glide {
  position: relative;
  z-index: 2;
  cursor: -webkit-grab;
  @import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';
}
</style>

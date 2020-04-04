<template>
  <div class="gallery-item" @click="handleItemClick">
    <img :src="src" alt="event image" @load="$emit('load')" />
  </div>
</template>

<script>
export default {
  name: 'GalleryItem',
  props: {
    src: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleItemClick() {
      this.$emit('itemClick', this.index)
    }
  }
}
</script>

<style lang="scss">
.gallery-item {
  overflow: hidden;
  width: 25%;
  max-width: 264px;
  max-height: 188px;
  margin: 20px;
  cursor: pointer;
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 250ms $easeOutMaterial;
  }
}
</style>

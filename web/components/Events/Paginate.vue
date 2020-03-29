<template>
  <div class="paginate">
  </div>
</template>

<script>
export default {
  name: 'Paginate',
  props: {
    items: {
      type: Array,
      required: true,
    },
    visibleItems: {
      type: Number, 
      default: 6
    }
  },   
}
</script>

<style lang="scss">
.paginate {
}
</style>
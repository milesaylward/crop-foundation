<template>
  <div>
    <Sidebar />
    <nuxt />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/normalize';
@import '~@/assets/styles/scaffold';
</style>

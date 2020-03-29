<template>
  <div class="main">
    <Sidebar />
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default {
  components: {
    Sidebar,
    Footer,
    Header
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/normalize';
@import '~@/assets/styles/scaffold';
.main {
  position: relative;
  z-index: 1;
}
</style>

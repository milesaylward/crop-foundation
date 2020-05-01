<template>
  <div id="app" class="main" :class="{ mounted: pageMounted }">
    <Sidebar />
    <Header />
    <nuxt />
    <Footer />
    <div class="noise"></div>
    <transition name="fade" @after-leave="afterLeave">
      <Loader v-if="showLoader" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loader from '@/components/Loader'
import eventBus from '@/core/eventBus'

export default {
  components: {
    Sidebar,
    Footer,
    Header,
    Loader
  },
  data: () => ({
    pageMounted: false
  }),
  computed: {
    ...mapState(['showLoader'])
  },
  watch: {
    $route() {
      this.pageMounted = false
    }
  },
  methods: {
    afterLeave() {
      eventBus.$emit('loaderDismissed')
      this.pageMounted = true
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/normalize';
@import '~@/assets/styles/scaffold';
.main {
  // position: relative;
  z-index: 1;
  .noise {
    z-index: 10000;
    opacity: 0.85;
    position: fixed;
    pointer-events: none;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    &:after {
      content: '';
      pointer-events: none;
      will-change: transform;
      animation: noiseAnimation 1s steps(4) infinite;
      opacity: 0.8;
      background-image: url('~@/assets/images/noise.png');
      width: 200%;
      height: 200%;
      display: block;
      position: absolute;
      top: -50%;
      left: -50%;
    }
  }
}
</style>

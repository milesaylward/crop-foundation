<template>
  <div class="page">
    <HeroCarousel :items="content.hero_carousel_items" />
  </div>
</template>

<script>
import getCopy from '@/core/utils'
import HeroCarousel from '@/components/HeroCarousel'

export default {
  components: {
    HeroCarousel
  },
  async asyncData({ $axios }) {
    const content = await $axios.$get(
      'http://localhost:9000/wp-json/wp/v2/pages/21'
    )
    const copy = getCopy(content.acf)
    return { content: JSON.parse(JSON.stringify(copy)) }
  },
  mounted() {
    // console.log(this.content)
  }
}
</script>

<style></style>

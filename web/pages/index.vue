<template>
  <div class="page">
    <HeroCarousel :items="content.hero_carousel_items" />
    <SectionOne :content="content.section.one" />
    <SectionTwo :content="content.section.two" />
    <SectionThree :content="content.section.three" />
    <SectionImages :images="content.section.three.images" />
    <SectionEvents :content="content.events" />
    <SectionSubscribe :content="content.subscribe" />
  </div>
</template>

<script>
import { checkGlobalData, getCopy } from '@/core/utils'
import HeroCarousel from '@/components/Home/HeroCarousel'
import SectionOne from '@/components/Home/HomeSectionOne'
import SectionTwo from '@/components/Home/HomeSectionTwo'
import SectionThree from '@/components/Home/HomeSectionThree'
import SectionImages from '@/components/Home/HomeSectionImages'
import SectionEvents from '@/components/Home/HomeSectionEvents'
import SectionSubscribe from '@/components/Home/HomeSectionSubscribe'

export default {
  components: {
    HeroCarousel,
    SectionOne,
    SectionTwo,
    SectionThree,
    SectionImages,
    SectionEvents,
    SectionSubscribe
  },
  async fetch({ store }) {
    await store.dispatch('getEvents')
  },
  async asyncData({ $axios, store }) {
    await checkGlobalData(store)
    const content = await $axios.$get(
      'https://crop-new-bucket.s3.amazonaws.com/app-data/staging-home.json'
    )
    const copy = JSON.parse(JSON.stringify(getCopy(content[0])))
    return { content: copy }
  }
}
</script>

<style></style>

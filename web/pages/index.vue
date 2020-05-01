<template>
  <div class="page">
    <HeroCarousel :items="content.hero_carousel_items" />
    <SectionOne :content="content.section.one" />
    <SectionTwo :content="content.section.two" />
    <SectionThree :content="content.section.three" />
    <Appearable>
      <SectionImages :images="content.section.three.images" class="ap-child" />
    </Appearable>
    <SectionEvents
      v-if="homeEvents.length"
      :content="content.events"
      :events="homeEvents"
    />
    <SectionCommunity v-else :content="content.community" />
    <Appearable>
      <SectionSubscribe :content="content.subscribe" />
    </Appearable>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { checkGlobalData, getCopy } from '@/core/utils'
import HeroCarousel from '@/components/Home/HeroCarousel'
import SectionOne from '@/components/Home/HomeSectionOne'
import SectionTwo from '@/components/Home/HomeSectionTwo'
import SectionThree from '@/components/Home/HomeSectionThree'
import SectionImages from '@/components/Home/HomeSectionImages'
import SectionEvents from '@/components/Home/HomeSectionEvents'
import SectionCommunity from '@/components/Home/HomeSectionCommunity'
import SectionSubscribe from '@/components/Home/HomeSectionSubscribe'

export default {
  components: {
    HeroCarousel,
    SectionOne,
    SectionTwo,
    SectionThree,
    SectionImages,
    SectionEvents,
    SectionCommunity,
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
  },
  computed: {
    homeEvents() {
      const events = this.events.events
        .filter((event) => {
          return !moment(event.date).isBefore(moment()) && event.event_gallery
        })
        .slice(0, 2)
      return events
    },
    ...mapState(['events'])
  }
}
</script>

<style></style>

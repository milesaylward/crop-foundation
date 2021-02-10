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
    <SectionCommunity :content="content.community" />
    <Appearable :threshold="0.3">
      <SectionSubscribe :content="content.subscribe" />
    </Appearable>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { checkGlobalData, getEventsData } from '@/core/utils'
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
  async asyncData({ $axios, store, route }) {
    const JSON_BASE = route.query.staging ? 'staging' : 'production'
    await checkGlobalData(store, JSON_BASE)
    await getEventsData(store, JSON_BASE)
    await store.dispatch('getData', { key: 'home', base: JSON_BASE })
  },
  computed: {
    homeEvents() {
      const events = this.events.events.filter(
        (event) => !moment(event.date).isBefore(moment())
      )
      return events
    },
    content() {
      return this.home
    },
    ...mapState(['events', 'home'])
  }
}
</script>

<style></style>

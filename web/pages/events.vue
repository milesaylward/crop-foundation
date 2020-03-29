<template>
  <div class="events page">
    <TornHero />
    <EventHero :event="content.events[0]" />
    <div class="events__content">
      <h2>Past Events</h2>
      <div class="events__content__past-events">
        <transition-group name="fade" mode="out-in">
          <PastEvent
            v-for="event in activeEvents"
            :key="event.title"
            :event="event"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getCopy } from '@/core/utils'
import TornHero from '@/components/TornHero'
import EventHero from '@/components/Events/EventHero'
import PastEvent from '@/components/Events/PastEvent'

export default {
  components: {
    TornHero,
    EventHero,
    PastEvent
  },
  async fetch({ store }) {
    await store.dispatch('getGlobal')
  },
  async asyncData({ $axios }) {
    const content = await $axios.$get(
      'http://crop-new-bucket.s3.amazonaws.com/app-data/staging-events.json'
    )
    const copy = JSON.parse(JSON.stringify(getCopy(content[0])))
    return { content: copy }
  },
  data: () => ({
    activeEvents: []
  }),
  computed: {
    pastEvents() {
      const pastEvents = this.content.events.filter((event) => {
        return moment(event.date).isBefore(moment())
      })
      return pastEvents
    }
  },
  mounted() {
    this.activeEvents = this.pastEvents
    console.log(this.pastEvents)
  }
}
</script>

<style lang="scss">
.events {
  &__content {
    margin-top: 180px;
    padding: 0 80px;
    text-align: center;
  }
}
</style>

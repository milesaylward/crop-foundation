<template>
  <div class="event-detail page">
    <TornHero />
    <EventHero :event="content" detailPage />
  </div>
</template>

<script>
import { getEventsData, checkGlobalData } from '@/core/utils'
import TornHero from '@/components/TornHero'
import EventHero from '@/components/Events/EventHero'

export default {
  name: 'EventDetail',
  components: {
    EventHero,
    TornHero
  },
  async asyncData({ $axios, params, store }) {
    const eventsData = await getEventsData($axios, store)
    const content = eventsData.events.filter(
      (event) => event.title.toLowerCase() === params.id.replace('-', ' ')
    )
    await checkGlobalData(store)
    return { content: content[0] }
  },
  mounted() {
    console.log(this.content)
  }
}
</script>

<style lang="scss">
.event-detail {
}
</style>

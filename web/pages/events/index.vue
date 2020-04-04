<template>
  <div class="events page">
    <TornHero />
    <EventHero :event="content.events[0]" />
    <div class="events__content">
      <h2>Past Events</h2>
      <div class="events__content__past-events">
        <transition name="fade-event" mode="out-in" @after-enter="animEventsIn">
          <div
            :key="activeIndex"
            ref="eventContainer"
            class="events__content__past-events__events"
          >
            <PastEvent
              v-for="event in activeEvents"
              :key="event.title"
              :event="event"
            />
          </div>
        </transition>
        <Paginate
          :active-index="activeIndex"
          :items="pastEvents"
          @upateIndex="handleUpdate"
        />
      </div>
    </div>
    <EventsFooter :content="content.footer" />
  </div>
</template>

<script>
import moment from 'moment'
import { getEventsData, checkGlobalData, chunkItems } from '@/core/utils'
import TornHero from '@/components/TornHero'
import EventHero from '@/components/Events/EventHero'
import PastEvent from '@/components/Events/PastEvent'
import Paginate from '@/components/Paginate'
import EventsFooter from '@/components/Events/EventsFooter'

export default {
  components: {
    TornHero,
    EventHero,
    PastEvent,
    Paginate,
    EventsFooter
  },
  async asyncData({ $axios, store }) {
    await checkGlobalData(store)
    const eventsData = await getEventsData($axios, store)
    return { content: eventsData }
  },
  data: () => ({
    activeIndex: 0,
    itemsPerPage: 6
  }),
  computed: {
    pastEvents() {
      const pastEvents = this.content.events.filter((event) => {
        return moment(event.date).isBefore(moment()) && event.event_gallery
      })
      return pastEvents
    },
    chunkedEvents() {
      return chunkItems(this.pastEvents, this.itemsPerPage)
    },
    activeEvents() {
      return this.chunkedEvents[this.activeIndex]
    }
  },
  mounted() {
    this.$refs.eventContainer.classList.add('animate')
  },
  methods: {
    animEventsIn() {
      this.$refs.eventContainer.classList.add('animate')
    },
    handleUpdate(newIndex) {
      this.activeIndex = newIndex
    }
  }
}
</script>

<style lang="scss">
.events {
  &__content {
    margin-top: 180px;
    padding: 0 80px;
    text-align: center;

    &__past-events {
      margin: {
        top: 20px;
        bottom: 50px;
      }
      &__events {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 1250px;
        margin: 0 auto;
        .past-event {
          transition: opacity 400ms $easeOutQuad;
          @for $i from 1 through 6 {
            &:nth-child(#{$i}) {
              transition-delay: 100ms * $i;
            }
          }
        }

        &.animate {
          .past-event {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>

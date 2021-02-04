<template>
  <div class="events page">
    <TornHero />
    <Appearable :threshold="0.3">
      <EventHero
        :event="featuredEvent"
        :is-upcoming-event="isUpcomingEvent"
        @heroReady="heroReady = true"
      />
      <div class="events__hero-copy">
        <div class="spacer" />
        <EventHeroCopy
          :event="featuredEvent"
          :is-upcoming-event="isUpcomingEvent"
        />
      </div>
    </Appearable>
    <Appearable class="events__content" :threshold="0.1">
      <h2 class="ap-child">Past Events</h2>
      <div class="events__content__past-events ap-child ap-child--1">
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
              @loaded="eventImageLoaded"
            />
          </div>
        </transition>
        <Paginate
          :active-index="activeIndex"
          :items="pastEvents"
          @upateIndex="handleUpdate"
        />
      </div>
    </Appearable>
    <Appearable :threshold="0.3">
      <EventsFooter :content="content.footer" />
    </Appearable>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import { getEventsData, checkGlobalData, chunkItems } from '@/core/utils'
import TornHero from '@/components/TornHero'
import EventHero from '@/components/Events/EventHero'
import EventHeroCopy from '@/components/Events/EventHeroCopy'
import PastEvent from '@/components/Events/PastEvent'
import Paginate from '@/components/Paginate'
import EventsFooter from '@/components/Events/EventsFooter'

export default {
  components: {
    TornHero,
    EventHero,
    PastEvent,
    Paginate,
    EventsFooter,
    EventHeroCopy
  },
  async asyncData({ store, route }) {
    const JSON_BASE = route.query.staging ? 'staging' : 'production'
    await checkGlobalData(store, JSON_BASE)
    await getEventsData(store, JSON_BASE)
  },
  data: () => ({
    activeIndex: 0,
    itemsPerPage: 6,
    loadedImages: 0,
    heroReady: false
  }),
  computed: {
    pastEvents() {
      const pastEvents = this.content.events
        .filter((event) => {
          return moment(event.date).isBefore(moment())
        })
        .sort((a, b) => moment(b.date).diff(moment(a.date)))
      return pastEvents
    },
    content() {
      return this.events
    },
    nextEvent() {
      const events = this.content.events.filter((event) => {
        return !moment(event.date).isBefore(moment())
      })
      const sorted = events.sort((a, b) => moment(a.date).diff(moment(b.date)))
      return sorted[0]
    },
    isUpcomingEvent() {
      return !!this.nextEvent
    },
    featuredEvent() {
      if (this.nextEvent) return this.nextEvent
      return this.pastEvents[0]
    },
    chunkedEvents() {
      const events = this.pastEvents.filter(
        (event) => event.title !== this.featuredEvent.title
      )
      return chunkItems(events, this.itemsPerPage)
    },
    activeEvents() {
      return this.chunkedEvents[this.activeIndex]
    },
    dismissLoader() {
      return this.loadedImages === this.itemsPerPage && this.heroReady
    },
    ...mapState(['events'])
  },
  watch: {
    dismissLoader(val) {
      if (val) this.setShowLoader(false)
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
    },
    eventImageLoaded() {
      this.loadedImages += 1
    },
    ...mapActions(['setShowLoader'])
  }
}
</script>

<style lang="scss">
.events {
  position: relative;
  &__hero-copy {
    display: flex;
    justify-content: flex-end;
    min-height: 250px;
    .spacer {
      width: 50%;
      display: none;
      @include bpLarge {
        display: block;
      }
    }
  }
  &__content {
    margin-top: 80px;
    padding: 0;
    text-align: center;

    &__past-events {
      position: relative;
      min-height: 875px;
      margin: {
        top: 20px;
        bottom: 50px;
      }
      .paginate {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
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

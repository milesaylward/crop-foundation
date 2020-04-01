<template>
  <div class="events page">
    <TornHero />
    <EventHero :event="content.events[0]" />
    <div class="events__content">
      <h2>Past Events</h2>
      <div class="events__content__past-events">
        <transition name="fade" mode="out-in" @after-enter="animEventsIn">
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
    <div class="events__footer">
      <img class="accent" :src="eventsFooterBorder" alt="border accent" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getCopy } from '@/core/utils'
import TornHero from '@/components/TornHero'
import EventHero from '@/components/Events/EventHero'
import PastEvent from '@/components/Events/PastEvent'
import Paginate from '@/components/Events/Paginate'
import eventsFooterBorder from '@/assets/images/events-border.png'

export default {
  components: {
    TornHero,
    EventHero,
    PastEvent,
    Paginate
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
    activeIndex: 0,
    itemsPerPage: 6,
    eventsFooterBorder
  }),
  computed: {
    pastEvents() {
      const pastEvents = this.content.events.filter((event) => {
        return moment(event.date).isBefore(moment())
      })
      return pastEvents
    },
    chunkedEvents() {
      return Array.from(
        {
          length: Math.ceil(this.pastEvents.length / this.itemsPerPage)
        },
        (v, i) =>
          this.pastEvents.slice(
            i * this.itemsPerPage,
            i * this.itemsPerPage + this.itemsPerPage
          )
      )
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
  &__footer {
    width: 100%;
    position: relative;
    padding: 60px;
    background: $darkGrey;
    .accent {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      transform: translateY(-99%);
    }
  }
}
</style>

<template>
  <div class="past-event">
    <img :src="event.hero_image" alt="event image" />
    <div class="past-event__info">
      <h4>{{ eventDate }}</h4>
      <h3>{{ event.title }}</h3>
      <EventDividerLine />
      <p v-if="event.photo_credits" class="source">
        Photos by: {{ event.photo_credits }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import EventDividerLine from '@/assets/svg/event-divider-line.svg?inline'

export default {
  name: 'PastEvent',
  components: {
    EventDividerLine
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    eventDate() {
      return moment(this.event.date).format('MMMM Do YYYY')
    }
  }
}
</script>

<style lang="scss">
.past-event {
  max-width: 369px;
  margin: 0 20px;
  text-align: left;
  border-top: 4px solid $gold;
  img {
    display: block;
    width: 100%;
  }
  &__info {
    h4 {
      font-size: 14px;
      margin: 15px 0 10px;
    }
    h3 {
      font-weight: 200;
    }
    svg {
      margin: 10px 0;
    }
  }
}
</style>

<template>
  <div class="past-event" @click="handleEventClick">
    <div class="past-event__image">
      <img :src="event.hero_image" alt="event image" />
    </div>
    <div class="past-event__info">
      <h4>{{ eventDate }}</h4>
      <h3>{{ event.title }}</h3>
      <EventDividerLine />
      <p class="source">
        <span v-if="event.photo_credits">
          Photos by: {{ event.photo_credits }}
        </span>
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
  },
  methods: {
    handleEventClick() {
      const eventURL = encodeURIComponent(
        this.event.title.replace(/ /g, '-')
      ).toLowerCase()
      this.$router.push(`/events/${eventURL}`)
    }
  }
}
</script>

<style lang="scss">
.past-event {
  width: 100%;
  text-align: left;
  border-top: 4px solid $gold;
  opacity: 0;
  margin: 15px 10px;
  @include bpLarge {
    margin: 30px 20px;
  }
  @include bpMedium {
    width: 33%;
    max-width: 369px;
  }
  cursor: pointer;
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
  &__image {
    max-height: 246px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 250ms $easeOutMaterial;
    }
  }
  &__info {
    h4 {
      font-size: 14px;
      margin: 15px 0 10px;
    }
    h3 {
      font-weight: 200;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .source {
      min-height: 22px;
    }
    svg {
      margin: 10px 0;
    }
  }
}
</style>

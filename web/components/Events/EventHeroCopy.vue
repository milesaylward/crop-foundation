<template>
  <div class="event-hero-copy">
    <p class="date ap-child ap-child--2">
      <span class="date__day">
        {{ dayOfWeek }}
      </span>
      <span class="date__date">
        {{ monthDate }}
        <span v-if="yearDate" class="date__year">, {{ yearDate }}</span>
      </span>
    </p>
    <div class="info">
      <component
        :is="i === 0 ? 'h3' : 'h4'"
        v-for="(line, i) in event.location"
        :key="line.location_line"
        class="ap-child ap-child--2"
      >
        {{ line.location_line }}
      </component>
      <p class="description ap-child ap-child--3">{{ event.description }}</p>
      <div v-if="event.guest_chefs" class="ap-child ap-child--4">
        <p>Guest chefs include:</p>
        <p v-for="chef in event.guest_chefs" :key="chef.name">
          {{ chef.name }} - {{ chef.affiliation }}
        </p>
      </div>
      <span v-if="!detailPage && eventLink" class="ap-child ap-child--5">
        <CropButton
          :copy="buttonCopy"
          :link="eventLink"
          :use-nuxt-link="!isUpcomingEvent"
          color="dark-grey"
          arrow
        />
      </span>
      <span v-else-if="event.event_gallery" class="ap-child ap-child--5">
        <button class="gallery-button">
          <span class="arrow">
            <DownArrow />
          </span>
          Scroll for gallery
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import DownArrow from '@/assets/svg/double-down-arrow.svg?inline'
import { getDayOfWeek, getMonthDate, getYearDate } from '@/core/utils'

export default {
  name: 'EventHeroCopy',
  components: {
    DownArrow
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    detailPage: {
      type: Boolean,
      default: false
    },
    isUpcomingEvent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dayOfWeek() {
      return getDayOfWeek(this.event.date)
    },
    monthDate() {
      return getMonthDate(this.event.date)
    },
    yearDate() {
      return this.isUpcomingEvent ? '' : getYearDate(this.event.date)
    },
    buttonCopy() {
      return this.isUpcomingEvent ? 'buy tickets now' : 'view event gallery'
    },
    eventLink() {
      const eventURL = encodeURIComponent(
        this.event.title.replace(/ /g, '-')
      ).toLowerCase()
      const url = `/events/${eventURL}`
      return this.isUpcomingEvent ? this.event.ticket_link : url
    }
  }
}
</script>

<style lang="scss">
.event-hero-copy {
  display: flex;
  width: 100%;
  position: relative;
  margin-top: calc(60vw);
  flex-wrap: wrap;
  @include bpMedium {
    flex-wrap: nowrap;
  }
  @media screen and (min-width: 450px) {
    margin-top: 50vw;
  }
  @media screen and (min-width: 650px) {
    margin-top: 300px;
  }
  @include bpLarge {
    margin-top: 0;
    width: 50%;
    margin-left: 30px;
  }
  padding: 0 20px;
  .date {
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    text-align: left;
    @include bpMedium {
      text-align: right;
    }
    color: $gold;
    font-family: $fontHeadline;
    font-size: 14px;
    flex-shrink: 0;
    line-height: 1.5;
    min-width: 64px;
    width: auto;
    @include bpLarge {
      position: static;
    }
    &__year {
      margin-left: -3px;
    }
    &__day {
      font-weight: bold;
      text-transform: uppercase;
    }
    &__date {
      font-weight: 200;
      letter-spacing: -1px;
    }
  }
  .info {
    color: $darkGrey;
    h4 {
      color: $lightGrey;
      letter-spacing: 1px;
      font-size: 16px;
    }
    p {
      font-size: 13px;
      line-height: 21px;
      &.description {
        margin-top: 30px;
      }
    }
    .crop-button {
      display: inline-flex;
    }
    .crop-button,
    .gallery-button {
      margin-top: 30px;
    }
    .gallery-button {
      background: none;
      border: none;
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      color: $gold;
      font-family: $fontHeadline;
      padding: 0;
      &:focus {
        outline: none;
      }
      &:hover {
        svg {
          transform: translateY(3px);
        }
      }
      span {
        display: block;
        padding: 3px 15px 3px 0px;
        margin-right: 15px;
        border-right: 1px solid #a5a4a2;
        svg {
          transition: transform 250ms $easeOutMaterial;
        }
      }
    }
  }
}
</style>

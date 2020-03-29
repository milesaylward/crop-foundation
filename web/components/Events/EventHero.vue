<template>
  <div class="event-hero">
    <div class="event-hero__img">
      <div class="event-hero__img__img">
        <img :src="event.hero_image" alt="event image" />
      </div>
      <img
        class="accent accent__background"
        :src="eventHeroAccent"
        alt="accent background"
      />
      <div class="accent accent__block" />
    </div>
    <div class="event-hero__content">
      <div class="headline">
        <h4>upcoming event</h4>
        <h1>{{ event.title }}</h1>
      </div>
      <div class="event-hero__content__copy">
        <p class="date">
          <span class="date__day">
            {{ dayOfWeek }}
          </span>
          <span class="date__date">
            {{ monthDate }}
          </span>
        </p>
        <div class="info">
          <component
            v-for="(line, i) in event.location"
            :key="line.location_line"
            :is="i === 0 ? 'h3' : 'h4'"
          >
            {{ line.location_line }}
          </component>
          <p class="description">{{ event.description }}</p>
          <div v-if="event.guest_chefs">
            <p>Guest chefs include:</p>
            <p v-for="chef in event.guest_chefs" :key="chef.name">
              {{ chef.name }} - {{ chef.affiliation }}
            </p>
          </div>
          <CropButton copy="BUY TICKETS NOW" color="dark-grey" arrow />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDayOfWeek, getMonthDate } from '@/core/utils'
import eventHeroAccent from '@/assets/images/event-hero-accent.png'

export default {
  name: 'EventHero',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    eventHeroAccent
  }),
  computed: {
    dayOfWeek() {
      return getDayOfWeek(this.event.date)
    },
    monthDate() {
      return getMonthDate(this.event.date)
    }
  }
}
</script>

<style lang="scss">
.event-hero {
  margin-top: -22%;
  position: relative;
  z-index: 5;
  display: flex;
  margin-bottom: 100px;
  .accent {
    position: absolute;
    &__block {
      height: 24px;
      width: 70%;
      right: 12%;
      bottom: -10%;
      transform: translateY(50%);
      background: $beige;
      opacity: 0.5;
    }
    &__background {
      width: 85%;
      height: 100%;
      bottom: -10%;
      z-index: 1;
    }
  }
  &__img,
  &__content {
    position: relative;
    width: 50%;
    &__img {
      position: relative;
      z-index: 3;
      overflow-x: hidden;
      height: 100%;
      img {
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &__content {
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h4,
    h1 {
      color: $offWhite;
    }
    h1 {
      font-weight: 200;
    }

    &__copy {
      display: flex;
      margin-bottom: 30px;
      margin-top: 250px;
      .date {
        display: flex;
        flex-direction: column;
        padding-right: 20px;
        color: $gold;
        text-align: right;
        font-family: $fontHeadline;
        font-size: 14px;
        flex-shrink: 0;
        line-height: 1.5;
        width: 10%;
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
        padding-right: 80px;
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
          margin-top: 30px;
        }
      }
    }
  }
}
</style>

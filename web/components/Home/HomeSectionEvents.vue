<template>
  <div class="home-section-events container">
    <div class="home-section-events__content">
      <h4>{{ content.eyebrow }}</h4>
      <h2>{{ content.headline }}</h2>
      <div class="home-section-events__content__events">
        <div v-for="(event, i) in homeEvents" :key="event.title" class="event">
          <eventBorderTop v-if="i === 0" class="border border--top" />
          <eventBorderInner v-if="i === 0" class="border " />
          <eventBorderBottom v-if="i === 1" class="border" />
          <p class="event__date">
            <span class="event__date__day">
              {{ getDayOfWeek(event.date) }}
            </span>
            <span class="event__date__date">
              {{ getMonthDate(event.date) }}
            </span>
            <eventDateBorder />
          </p>
          <p class="event__info">
            <span class="event__info__title">
              {{ event.title }}
            </span>
            <span class="event__info__location">
              {{ event.location[0].location_line }}
            </span>
          </p>
          <a class="event__link" href="">
            view more info
            <arrowFilled />
          </a>
        </div>
      </div>
      <CropButton copy="SEE ALL OUR EVENTS" link="">
        <arrowFilled />
      </CropButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import eventDateBorder from '@/assets/svg/event-date-border.svg?inline'
import eventBorderTop from '@/assets/svg/event-border-top.svg?inline'
import eventBorderInner from '@/assets/svg/event-border-inner.svg?inline'
import eventBorderBottom from '@/assets/svg/event-border-bottom.svg?inline'
import arrowFilled from '@/assets/svg/arrow-filled.svg?inline'

export default {
  name: 'HomeSectionEvents',
  components: {
    eventBorderTop,
    eventBorderInner,
    eventBorderBottom,
    eventDateBorder,
    arrowFilled
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    homeEvents() {
      return this.events.events.slice(0, 2)
    },
    ...mapState(['events'])
  },
  methods: {
    getDayOfWeek(date) {
      const momentDate = moment(date)
      return momentDate.format('ddd')
    },
    getMonthDate(date) {
      const momentDate = moment(date)
      return momentDate.format('MMM DD')
    }
  }
}
</script>

<style lang="scss">
.home-section-events {
  padding: 5rem 0;
  &__content {
    text-align: center;
    width: 100%;
    max-width: 900px;
    h2 {
      max-width: 577px;
      margin: 2rem auto 4rem;
    }

    .crop-button {
      margin: 35px auto;
    }
    &__events {
      .event {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        padding: 1rem 1.5rem;
        .border {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          &--top {
            top: 0;
            bottom: auto;
          }
        }
        &__date,
        &__info {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        &__date {
          position: relative;
          padding: 20px 20px 20px 0;
          color: $gold;
          text-align: right;
          font-family: $fontHeadline;
          font-size: 14px;
          flex-shrink: 0;
          width: 10%;
          &__day {
            font-weight: bold;
            text-transform: uppercase;
          }
          &__date {
            font-weight: 200;
            letter-spacing: -1px;
          }
          svg {
            position: absolute;
            height: 100%;
            right: 0;
            top: 0px;
            width: 4px;
            // opacity: 0.6;
            path {
              stroke-width: 0.5px;
            }
          }
        }
        &__info {
          text-align: left;
          margin-left: 20px;
          &__title {
            font-family: $fontHeadline;
            font-weight: 200;
            font-size: 18px;
          }
          &__location {
            color: $lightGrey;
            font-size: 16px;
          }
        }
        &__link {
          margin-left: auto;
          display: flex;
          align-items: center;
          color: $greige;
          text-decoration: none;
          white-space: nowrap;
          line-height: 1;
          font-size: 16px;
          &:hover {
            svg {
              transform: translateX(5px);
            }
          }
          svg {
            transition: transform 250ms $easeOutMaterial;
            margin: {
              top: 4px;
              left: 6px;
            }

            path {
              fill: $greige;
            }
          }
        }
      }
    }
  }
}
</style>

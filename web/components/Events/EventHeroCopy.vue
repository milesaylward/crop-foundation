<template>
  <div class="event-hero-copy">
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
        :is="i === 0 ? 'h3' : 'h4'"
        v-for="(line, i) in event.location"
        :key="line.location_line"
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
      <CropButton
        v-if="!detailPage"
        copy="BUY TICKETS NOW"
        color="dark-grey"
        arrow
      />
      <button v-else class="gallery-button">
        <span class="arrow">
          <DownArrow />
        </span>
        Scroll for gallery
      </button>
    </div>
  </div>
</template>

<script>
import DownArrow from '@/assets/svg/double-down-arrow.svg?inline'
import { getDayOfWeek, getMonthDate } from '@/core/utils'

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
    }
  },
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
.event-hero-copy {
  display: flex;
  width: 100%;
  position: relative;
  margin-top: calc(60vw);
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
    position: absolute;
    color: $gold;
    text-align: right;
    font-family: $fontHeadline;
    font-size: 14px;
    flex-shrink: 0;
    line-height: 1.5;
    width: 64px;
    @include bpLarge {
      position: static;
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
    h4,
    h3 {
      padding-left: 65px;
      @include bpLarge {
        padding-left: 0;
      }
    }
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

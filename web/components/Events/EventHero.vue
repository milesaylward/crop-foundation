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
        <h4 v-if="!detailPage">upcoming event</h4>
        <h1>{{ event.title }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import eventHeroAccent from '@/assets/images/event-hero-accent.png'

export default {
  name: 'EventHero',
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
  data: () => ({
    eventHeroAccent
  })
}
</script>

<style lang="scss">
.event-hero {
  position: absolute;
  top: 300px;
  z-index: 5;
  display: flex;
  margin-bottom: 100px;
  flex-wrap: wrap-reverse;
  padding: 0 20px;
  transform: translateY(-45%);
  @media screen and (min-width: 500px) {
    top: 400px;
    transform: translateY(-60%);
  }
  @include bpMedium {
    top: 500px;
  }
  @include bpLarge {
    transform: translateY(60%);
    flex-wrap: nowrap;
    top: 0;
    padding: 0;
  }
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
      left: -10%;
      width: 90%;
      height: 100%;
      bottom: -10%;
      z-index: 1;
    }
  }
  &__img,
  &__content {
    position: relative;
    width: 100%;
    max-height: 600px;
    @include bpLarge {
      width: 50%;
    }
    &__img {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      overflow-x: hidden;
      height: 100%;
      max-height: 400px;
      @include bpLarge {
        max-height: 100%;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        @include bpXLarge {
          width: auto;
        }
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 30px;
    @include bpLarge {
      margin-left: 30px;
    }
    h4,
    h1 {
      color: $offWhite;
      margin-bottom: 10px;
    }
    h1 {
      font-weight: 200;
      margin-bottom: 30px;
    }
  }
}
</style>

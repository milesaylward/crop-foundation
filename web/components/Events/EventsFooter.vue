<template>
  <div class="events-footer">
    <img class="accent" :src="eventsFooterBorder" alt="border accent" />
    <div class="events-footer__content content">
      <div class="copy">
        <h3 class="ap-child">{{ content.left.headline }}</h3>
        <p class="ap-child ap-child--1">{{ content.left.copy }}</p>
        <CropButton
          class="ap-child ap-child--2"
          arrow
          :copy="content.left.button"
          color="white"
        />
      </div>
      <div class="divider">
        <verticalBorder class="vertical ap-child ap-child--3" />
        <horizontalBorder class="horizontal ap-child ap-child--3" />
      </div>
      <div class="copy">
        <h3 class="ap-child ap-child--4">{{ content.right.headline }}</h3>
        <p class="ap-child ap-child--5">{{ content.right.copy }}</p>
        <CropButton
          class="ap-child ap-child--6"
          arrow
          :copy="content.right.button"
          color="white"
        />
      </div>
    </div>
  </div>
</template>

<script>
import eventsFooterBorder from '@/assets/images/events-border.png'
import verticalBorder from '@/assets/svg/events-footer-vertical.svg?inline'
import horizontalBorder from '@/assets/svg/events-footer-horizontal.svg?inline'

export default {
  name: 'EventsFooter',
  components: {
    verticalBorder,
    horizontalBorder
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    eventsFooterBorder
  })
}
</script>

<style lang="scss">
.events-footer {
  width: 100%;
  position: relative;
  padding: 60px 0;
  background: $darkGrey;
  margin-top: 200px;
  @include bpMedium {
    padding: 60px;
  }
  .accent {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transform: translateY(-99%);
  }
  .divider {
    width: 100%;
    margin: 20px 0;
    @include bpMedium {
      margin: 0 20px;
      width: auto;
    }
    .vertical {
      opacity: 0.5;
      display: none;
      width: 100%;
      height: 100%;
      max-width: 2px;
      @include bpMedium {
        display: block;
      }
    }
    .horizontal {
      opacity: 0.5;
      display: block;
      width: 100%;
      @include bpMedium {
        display: none;
      }
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @include bpMedium {
      flex-wrap: nowrap;
    }
    .copy {
      color: white;
      width: 100%;
      @include bpMedium {
        max-width: 545px;
        width: 50%;
      }
      h3 {
        margin-bottom: 20px;
      }
      p {
        color: white;
        margin-bottom: 20px;
      }
    }
  }
}
</style>

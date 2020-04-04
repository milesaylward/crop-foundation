<template>
  <div class="events-footer">
    <img class="accent" :src="eventsFooterBorder" alt="border accent" />
    <div class="events-footer__content content">
      <div class="copy">
        <h3>{{ content.left.headline }}</h3>
        <p>{{ content.left.copy }}</p>
        <CropButton arrow :copy="content.left.button" color="white" />
      </div>
      <div class="copy">
        <h3>{{ content.right.headline }}</h3>
        <p>{{ content.right.copy }}</p>
        <CropButton arrow :copy="content.right.button" color="white" />
      </div>
    </div>
  </div>
</template>

<script>
import eventsFooterBorder from '@/assets/images/events-border.png'
export default {
  name: 'EventsFooter',
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
  padding: 60px;
  background: $darkGrey;
  margin-top: 200px;
  .accent {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transform: translateY(-99%);
  }
  &__content {
    display: flex;
    justify-content: space-between;
    .copy {
      color: white;
      width: 50%;
      max-width: 545px;
      padding-right: 20px;
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

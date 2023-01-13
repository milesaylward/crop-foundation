<template>
  <client-only>
    <div class="event-detail page">
      <TornHero />
      <Appearable>
        <EventHero
          :event="content"
          detail-page
          @heroReady="slideReady = true"
        />
      </Appearable>
      <Appearable class="event-detail__content content" :threshold="0.5">
        <h2 class="ap-child">Gallery</h2>
        <div class="event-detail__content__gallery">
          <div class="event-detail__content__gallery__items">
            <GalleryItem
              v-for="(item, i) in galleryItems"
              :key="item"
              :class="`ap-child ap-child--${i + 1}`"
              :src="item"
              :index="i"
              @itemClick="handleGalleryClick"
              @load="handleItemLoaded"
            />
          </div>
          <infinite-loading
            ref="infiniteLoader"
            spinner="spiral"
            @infinite="addGalleryItems"
          >
            <div slot="no-more" />
            <div slot="no-results" />
          </infinite-loading>
        </div>
      </Appearable>
      <Appearable :threshold="0.5">
        <EventsFooter :content="footer[0]" />
      </Appearable>
      <transition name="fade">
        <LightBox
          v-if="showLightBox"
          :image="lightBoxImage"
          :disable="lightBoxDisable"
          @close="handleCloseLightBox"
          @increment="handleLightBoxIncrement"
        />
      </transition>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getEventsData, checkGlobalData } from '@/core/utils'
import TornHero from '@/components/TornHero'
import EventHero from '@/components/Events/EventHero'
import LightBox from '@/components/Events/LightBox'
import GalleryItem from '@/components/Events/GalleryItem'
import EventsFooter from '@/components/Events/EventsFooter'

export default {
  name: 'EventDetail',
  components: {
    EventHero,
    TornHero,
    GalleryItem,
    EventsFooter,
    LightBox
  },
  async asyncData({ store, route }) {
    const JSON_BASE = route.query.staging ? 'staging' : 'production'
    await checkGlobalData(store, JSON_BASE)
    await getEventsData(store, JSON_BASE)
  },
  data: () => ({
    galleryItems: [],
    currentPage: 0,
    itemsLoaded: 0,
    activeLightBoxIndex: null,
    showLightBox: false,
    imagesReady: false,
    slideReady: false
  }),
  computed: {
    galleryItemsPerPage() {
      return this.content.event_gallery.length < 12
        ? this.content.event_gallery.length
        : 12
    },
    lightBoxDisable() {
      return {
        prev: this.activeLightBoxIndex === 0,
        next: this.activeLightBoxIndex === this.content.event_gallery.length - 1
      }
    },
    canAnimate() {
      return this.slideReady && this.imagesReady
    },
    lightBoxImage() {
      return this.activeLightBoxIndex !== null
        ? { url: this.content.event_gallery[this.activeLightBoxIndex] }
        : ''
    },
    params() {
      return this.$route.params
    },
    content() {
      return this.events.events.filter(
        (event) => event.slug === this.params.id
      )[0]
    },
    footer() {
      return this.events.footer
    },
    ...mapState(['events'])
  },
  watch: {
    itemsLoaded(val) {
      if (val === this.galleryItemsPerPage) {
        this.imagesReady = true
      }
    },
    canAnimate() {
      this.setShowLoader(false)
    }
  },
  mounted() {
    this.addGalleryItems()
  },
  methods: {
    handleItemLoaded() {
      this.itemsLoaded += 1
    },
    handleGalleryClick(index) {
      this.activeLightBoxIndex = index
      this.showLightBox = true
    },
    handleCloseLightBox() {
      this.activeLightBoxIndex = null
      this.showLightBox = false
    },
    handleLightBoxIncrement(dir) {
      if (dir === 'prev') this.activeLightBoxIndex -= 1
      else this.activeLightBoxIndex += 1
    },
    addGalleryItems($state) {
      this.currentPage += 1
      this.galleryItems = this.content.event_gallery.slice(
        0,
        this.currentPage * this.galleryItemsPerPage
      )
      if ($state) {
        if (
          this.currentPage * this.galleryItemsPerPage >
          this.content.event_gallery.length
        ) {
          $state.complete()
        } else {
          this.interval = setInterval(() => {
            if (
              this.itemsLoaded ===
              this.currentPage * this.galleryItemsPerPage
            ) {
              $state.loaded()
              clearInterval(this.interval)
            }
          }, 150)
        }
      }
    },
    ...mapActions(['setShowLoader'])
  }
}
</script>

<style lang="scss">
.event-detail {
  position: relative;
  .event-hero {
    width: 100%;
    @include bpMedium {
      width: calc(100% - 120px);
    }
    @include bpLarge {
      transform: translateY(30%);
    }
    &__img {
      width: 100%;
      min-width: 50%;
      max-height: 500px;
    }
  }
  &__content {
    margin-top: 30%;
    padding: 100px 0;
    text-align: center;
    @include bpMedium {
      margin-top: 200px;
    }
    &__gallery {
      &__items {
        height: auto;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .ap-child {
          @for $i from 1 through 20 {
            &:nth-child(#{$i}n) {
              transition-delay: #{0 + (($i - 1) * 85ms)} !important;
            }
          }
        }
      }
    }
  }
  .events-footer {
    margin-top: 50px;
  }
}
</style>

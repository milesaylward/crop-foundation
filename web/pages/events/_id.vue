<template>
  <div class="event-detail page">
    <TornHero />
    <EventHero :event="content" detail-page />
    <div class="event-detail__content content">
      <h2>Gallery</h2>
      <div class="event-detail__content__gallery">
        <div class="event-detail__content__gallery__items">
          <GalleryItem
            v-for="(item, i) in galleryItems"
            :key="item.title"
            :src="item.url"
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
    </div>
    <EventsFooter :content="footer" />
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
</template>

<script>
import { mapActions } from 'vuex'
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
  async asyncData({ $axios, params, store }) {
    const eventsData = await getEventsData($axios, store)
    await checkGlobalData(store)
    return {
      content: eventsData.events.filter(
        (event) =>
          event.title.toLowerCase().replace(/-/g, ' ') ===
          params.id.replace(/-/g, ' ')
      )[0],
      footer: eventsData.footer
    }
  },
  data: () => ({
    galleryItems: [],
    currentPage: 0,
    itemsLoaded: 0,
    activeLightBoxIndex: null,
    showLightBox: false
  }),
  computed: {
    galleryItemsPerPage() {
      return 12
    },
    lightBoxDisable() {
      return {
        prev: this.activeLightBoxIndex === 0,
        next: this.activeLightBoxIndex === this.content.event_gallery.length - 1
      }
    },
    lightBoxImage() {
      return this.activeLightBoxIndex !== null
        ? this.content.event_gallery[this.activeLightBoxIndex]
        : ''
    }
  },
  watch: {
    itemsLoaded(val) {
      if (val === this.galleryItemsPerPage) {
        this.setShowLoader(false)
      }
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
      }
    }
  }
  .events-footer {
    margin-top: 50px;
  }
}
</style>

<template>
  <div class="paginate">
    <button
      class="paginate__button paginate__button--prev"
      :class="{ inactive: activeIndex === 0 }"
      @click="setIndex('prev')"
    >
      <Arrow />
    </button>
    <div class="paginate__indicators">
      <button
        v-for="page in pages"
        :key="page"
        class="paginate__indicators__indicator"
        :class="{ active: activeIndex === page }"
      />
    </div>
    <button
      class="paginate__button paginate__button--next"
      :class="{ inactive: activeIndex === pages.length - 1 }"
      @click="setIndex('next')"
    >
      <Arrow />
    </button>
  </div>
</template>

<script>
import Arrow from '@/assets/svg/arrow.svg?inline'

export default {
  name: 'Paginate',
  components: {
    Arrow
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    },
    visibleItems: {
      type: Number,
      default: 6
    }
  },
  computed: {
    pages() {
      const indicatorArray = []
      const totalPages = Math.floor(this.items.length / this.visibleItems)
      for (let index = 0; index <= totalPages; index++) {
        indicatorArray.push(index)
      }
      return indicatorArray
    }
  },
  mounted() {
    console.log(this.pages)
  },
  methods: {
    setIndex(dir, idx) {
      let newIndex
      if (!idx)
        newIndex = dir === 'prev' ? this.activeIndex - 1 : this.activeIndex + 1
      else newIndex = idx
      console.log(this.activeIndex, dir, newIndex, idx)
      this.$emit('upateIndex', newIndex)
    }
  }
}
</script>

<style lang="scss">
.paginate {
  display: inline-flex;
  align-items: center;
  button {
    &:focus {
      outline: none;
    }
  }
  &__indicators {
    display: flex;
    &__indicator {
      width: 10px;
      height: 10px;
      margin: 0 5px;
      background: $lightGrey;
      border: none;
      border-radius: 50%;
      padding: 0;
      transition: background 250ms $easeOutMaterial;
      &:hover {
        background: $gold;
      }
      &.active {
        background: $gold;
        pointer-events: none;
      }
    }
  }
  &__button {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      transition: transform 250ms $easeOutMaterial;
    }
    &.inactive {
      cursor: default;
      pointer-events: none;
      svg {
        path {
          stroke: $lightGrey;
        }
      }
    }
    &:not(.inactive) {
      &:hover {
        svg {
          transform: translateX(-5px);
        }
      }
    }
    &--next {
      transform: rotate(180deg);
    }
  }
}
</style>

<template>
  <div class="lightbox">
    <div class="lightbox__overlay" @click="$emit('close')" />
    <div class="lightbox__close" @click="$emit('close')">
      <div class="lightbox__close__outer">
        <div class="lightbox__close__inner">
          <h4>Close</h4>
        </div>
      </div>
    </div>
    <transition :name="transitionName" mode="out-in">
      <div :key="image.url" class="lightbox__image">
        <img :src="image.url" alt="event image" />
      </div>
    </transition>
    <div class="lightbox__buttons">
      <button
        class="lightbox__button lightbox__button--prev"
        :class="{ disabled: disable.prev }"
        @mousedown="preventFocus"
        @click="handleClick('prev')"
      >
        <Arrow />
      </button>
      <button
        class="lightbox__button lightbox__button--next"
        :class="{ disabled: disable.next }"
        @mousedown="preventFocus"
        @click="handleClick('next')"
      >
        <Arrow />
      </button>
    </div>
  </div>
</template>

<script>
import Arrow from '@/assets/svg/arrow.svg?inline'
import { preventFocus } from '@/core/utils'

export default {
  name: 'Lightbox',
  components: {
    Arrow
  },
  props: {
    image: {
      type: Object,
      required: true
    },
    disable: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    transitionName: 'fade-left',
    preventFocus
  }),
  methods: {
    handleClick(dir) {
      this.transitionName = dir !== 'prev' ? 'fade-left' : 'fade-right'
      this.$emit('increment', dir)
    }
  }
}
</script>

<style lang="scss">
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  &__image {
    width: 100%;
    height: 100%;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    justify-content: center;
    @include bpMedium {
      max-width: 80%;
      max-height: 80%;
    }
    img {
      width: 100%;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: $halfBlack;
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: auto;
    bottom: 1%;
    width: 100%;
    @include bpMedium {
      top: 50%;
      bottom: auto;
      justify-content: space-between;
    }
  }
  &__button {
    background: $noWhite;
    border: 1px solid $halfWhite;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
    transition: background 250ms $easeOutQuad;
    margin: 0 10px;
    @include bpLarge {
      left: 60px;
    }
    @include bpXLarge {
      left: 100px;
    }
    &:hover {
      background: white;
      svg {
        path {
          stroke: $halfBlack;
        }
      }
    }
    svg {
      margin-right: -3px;
      width: 20px;
      height: 20px;
      path {
        stroke: white;
        transition: stroke 250ms $easeOutQuad;
      }
    }
    &--next {
      transform: rotate(180deg) translateY(50%);
      left: auto;
      right: 1%;
      @include bpLarge {
        right: 60px;
      }
      @include bpXLarge {
        right: 100px;
      }
    }
    &.disabled {
      pointer-events: none;
      border-color: $lightGrey;
      svg {
        path {
          stroke: $lightGrey;
        }
      }
    }
  }
  &__close {
    position: absolute;
    top: 50px;
    right: 50px;
    @include bpLarge {
      top: 70px;
      right: 70px;
    }
    &__outer {
      position: relative;
      margin: auto;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        h4 {
          opacity: 1;
        }
        .lightbox__close {
          &__inner {
            &::before,
            &::after {
              transform: rotate(0);
            }
            &::before {
              top: 10px;
            }
            &::after {
              bottom: 10px;
            }
          }
        }
      }
    }
    &__inner {
      width: inherit;
      text-align: center;
      &::before,
      &::after {
        position: absolute;
        content: '';
        height: 1px;
        width: inherit;
        background: $offWhite;
        left: 0;
        transition: all 200ms $easeOutQuad;
      }
      &::before {
        top: 50%;
        transform: rotate(45deg);
      }
      &::after {
        bottom: 50%;
        transform: rotate(-45deg);
      }
    }
    h4 {
      color: white;
      font-size: 14px;
      transition: all 200ms $easeOutQuad;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>

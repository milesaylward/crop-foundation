<template>
  <button
    v-if="!link"
    class="crop-button"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    {{ copy }}
    <ArrowFilled v-if="arrow" />
  </button>
  <component
    :is="tagForLink"
    v-else
    :href="link"
    download
    :to="link"
    :target="useNuxtLink || download ? '' : '_blank'"
    class="crop-button"
    :class="buttonClasses"
  >
    {{ copy }}
    <ArrowFilled v-if="arrow" />
  </component>
</template>

<script>
import ArrowFilled from '@/assets/svg/arrow-filled.svg?inline'

export default {
  name: 'CropButton',
  components: {
    ArrowFilled
  },
  props: {
    color: {
      type: String,
      default: 'gold'
    },
    link: {
      type: String,
      default: ''
    },
    filled: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    copy: {
      type: String,
      required: true
    },
    useNuxtLink: {
      type: Boolean,
      default: false
    },
    download: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      let classes = `crop-button--${this.color}`
      if (this.filled) classes += ' crop-button--filled'
      if (this.small) classes += ' crop-button--small'
      return classes
    },
    tagForLink() {
      return this.useNuxtLink ? 'nuxt-link' : 'a'
    }
  }
}
</script>

<style lang="scss">
.crop-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  background: none;
  border: 1px solid;
  border-radius: 34px;
  font-family: $fontAccent;
  letter-spacing: 1px;
  cursor: pointer;
  font-size: 16px;
  line-height: 17px;
  font-weight: 200;
  text-transform: uppercase;
  color: white;
  transition: background 300ms $easeOutMaterial, color 300ms $easeOutMaterial;

  svg {
    margin-left: 10px;
    margin-top: -2px;
    path {
      transition: fill 300ms $easeOutMaterial;
    }
  }
  &--small {
    padding: 8px 20px;
  }
  &--dark-grey {
    border-color: $darkGrey;
    color: $darkGrey;
    background: rgba(82, 79, 76, 0);
    svg {
      path {
        fill: $darkGrey;
      }
    }
    &:hover {
      background: $darkGrey;
      color: white;
      svg {
        path {
          fill: white;
        }
      }
    }
  }
  &--light-grey {
    border-color: $lightGrey;
    color: white;
    background: $lightGrey;
    svg {
      path {
        fill: white;
      }
    }
    &:hover {
      background: $darkGrey;
      color: white;
      svg {
        path {
          fill: white;
        }
      }
    }
  }
  &--white {
    border-color: $halfWhite;
    background: $noWhite;
    &:hover {
      background: white;
      color: $darkGrey;
      svg {
        path {
          fill: $darkGrey;
        }
      }
    }
  }
  &--gold {
    border-color: $lightGrey;
    color: $gold;
    svg {
      path {
        fill: $gold;
      }
    }
    &.crop-button {
      &--filled {
        border-color: $gold;
        background: $gold;
        color: white;
        &:hover {
          background: darken($gold, 10);
        }
      }
    }
  }
}
</style>

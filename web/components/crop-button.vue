<template>
  <button class="crop-button" :class="buttonClasses">
    {{ copy }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CropButton',
  props: {
    color: {
      type: String,
      default: 'gold'
    },
    filled: {
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
    }
  },
  computed: {
    buttonClasses() {
      let classes = `crop-button--${this.color}`
      if (this.filled) classes += ' crop-button--filled'
      if (this.small) classes += ' crop-button--small'
      return classes
    }
  }
}
</script>

<style lang="scss">
.crop-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  background: none;
  border: 1px solid;
  border-radius: 34px;
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
    border-color: $gold;
    &.crop-button {
      &--filled {
        background: $gold;
        &:hover {
          background: darken($gold, 10);
        }
      }
    }
  }
}
</style>

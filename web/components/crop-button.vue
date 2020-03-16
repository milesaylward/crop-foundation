<template>
  <button class="crop-button" :class="buttonClasses">
    {{ copy }}
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
    copy: {
      type: String,
      required: true
    }
  },
  computed: {
    buttonClasses() {
      let classes = `crop-button--${this.color}`
      if (this.filled) {
        classes += ' crop-button--filled'
      }
      return classes
    }
  }
}
</script>

<style lang="scss">
.crop-button {
  padding: 8px 20px;
  background: none;
  border: 1px solid;
  border-radius: 34px;
  font-family: $fontAccent;
  font-size: 16px;
  line-height: 17px;
  text-transform: uppercase;
  color: white;
  transition: background 300ms $easeOutMaterial;
  cursor: pointer;
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

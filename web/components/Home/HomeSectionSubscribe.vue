<template>
  <div class="home-section-subscribe container">
    <div class="home-section-subscribe__content">
      <h4>{{ content.eyebrow }}</h4>
      <h2>{{ content.headline }}</h2>
      <form
        class="home-section-subscribe__content__form"
        name="Subscribe"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        @submit.prevent="handleFormSubmit"
      >
        <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Enter your email"
        />
        <button>
          Subscribe
          <arrowFilled />
        </button>
      </form>
    </div>
    <img class="accent" :src="halftoneAccent" alt="accent image" />
  </div>
</template>

<script>
import arrowFilled from '@/assets/svg/arrow-filled.svg?inline'
import halftoneAccent from '@/assets/images/halftone-2-accent.png'
import { encode } from '@/core/utils'

export default {
  name: 'HomeSectionSubscribe',
  components: {
    arrowFilled
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    email: '',
    halftoneAccent
  }),
  methods: {
    handleFormSubmit(e) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'Subscribe', email: this.email })
      })
        .then(() => alert('Success!'))
        .catch((error) => console.error(error))
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss">
.home-section-subscribe {
  position: relative;
  margin-top: 30px;
  padding-bottom: 30px;
  @include bpMedium {
    min-height: 506px;
    padding-bottom: 0px;
  }
  .accent {
    position: absolute;
    left: 0;
    top: 0;
    height: 102%;
    display: none;
    @include bpMedium {
      display: block;
    }
  }
  &__content {
    max-width: 577px;
    margin: 0 auto;
    padding: 0 20px;
    @include bpMedium {
      text-align: center;
    }
    h4 {
      margin-bottom: 20px;
    }
    &__form {
      margin: 30px 0;
      position: relative;
      input {
        width: 100%;
        background: none;
        border: 1px solid $lightGrey;
        color: $darkGrey;
        border-radius: 6px;
        font-family: $fontHeadline;
        font-weight: 300;
        font-size: 18px;
        line-height: 22px;
        padding: 10px 20px;
        transition: border-color 300ms $easeOutMaterial;
        &::placeholder {
          color: $lightGrey;
          font-weight: 200;
        }
        &:focus {
          outline: none;
          border-color: $darkGrey;
          & ~ button {
            border-color: $darkGrey;
          }
        }
      }
      button {
        font-family: $fontAccent;
        text-transform: uppercase;
        font-size: 14px;
        line-height: 1;
        position: absolute;
        right: 4px;
        top: 0;
        height: 100%;
        background: $offWhite;
        border: none;
        color: $gold;
        display: flex;
        align-items: center;
        border-top: 1px solid $lightGrey;
        border-bottom: 1px solid $lightGrey;
        transition: border-color 300ms $easeOutMaterial;
        svg {
          margin-left: 8px;
          margin-top: -1px;
          path {
            fill: $gold;
          }
        }
      }
    }
  }
}
</style>

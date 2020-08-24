<template>
  <div class="home-section-subscribe container">
    <div class="home-section-subscribe__content">
      <h4 class="ap-child">{{ content.eyebrow }}</h4>
      <h2 class="ap-child ap-child--1">{{ content.headline }}</h2>
      <form
        class="home-section-subscribe__content__form ap-child ap-child--2"
        name="Subscribe"
        @submit.prevent="handleFormSubmit"
      >
        <input
          type="checkbox"
          name="_honeypot"
          style="display:none"
          tabindex="-1"
          autocomplete="off"
        />
        <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Enter your email"
        />
        <button @mousedown="preventFocus">
          Subscribe
          <arrowFilled />
        </button>
        <transition name="fade">
          <p v-if="showSuccess" class="form__message">
            Thanks For Subscribing!
          </p>
        </transition>
        <transition name="fade">
          <p v-if="showError" class="form__message">
            {{ errorMessage }}
          </p>
        </transition>
      </form>
    </div>
    <img
      class="accent ap-child ap-child--3"
      :src="halftoneAccent"
      alt="accent image"
    />
  </div>
</template>

<script>
import arrowFilled from '@/assets/svg/arrow-filled.svg?inline'
import halftoneAccent from '@/assets/images/halftone-2-accent.png'
import { encode, preventFocus } from '@/core/utils'

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
    halftoneAccent,
    preventFocus,
    showError: false,
    showSuccess: false
  }),
  watch: {
    email(val) {
      if (val) {
        this.showError = false
      }
    }
  },
  methods: {
    handleFormSubmit(e) {
      if (!this.email) {
        this.errorMessage = 'Email field is required'
        this.showError = true
        return
      }
      fetch('https://submit-form.com/g_DHqoGN3-dmxZSLIWBlL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ email: this.email })
      })
        .then(() => {
          this.email = ''
          this.showSuccess = true
        })
        .catch((error) => {
          this.showError = true
          this.error = error
          this.errorMessage = 'Something Went wrong please try again'
        })
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
    .form__message {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
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

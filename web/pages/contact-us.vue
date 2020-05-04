<template>
  <div class="contact-us page">
    <TornHero
      half-size
      :background="content.hero_background"
      :copy="content.headline"
    />
    <Appearable class="contact-us__content content" :threshold="0.2">
      <div class="contact-us__content__info ap-child">
        <p>{{ content.copy }}</p>
        <div
          v-for="item in content.info_items"
          :key="item.contact_info"
          class="contact-us__content__info__items"
        >
          <p>{{ item.copy }}</p>
          <a :href="getLinkForType(item)" target="_blank">
            {{ item.contact_info }}
          </a>
        </div>
      </div>
      <div class="contact-us__content__form ap-child ap-child--1">
        <form
          name="Contact"
          netlify
          data-netlify-honeypot="bot-field"
          @submit.prevent="handleFormSubmit"
        >
          <input type="hidden" name="form-name" value="Contact" />
          <input
            v-model="formData.first_name"
            :class="{ error: formErrors.first_name }"
            type="text"
            name="first_name"
            placeholder="First Name"
          />
          <input
            v-model="formData.last_name"
            :class="{ error: formErrors.last_name }"
            type="text"
            name="last_name"
            placeholder="Last Name"
          />
          <input
            v-model="formData.email"
            :class="{ error: formErrors.email }"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            v-model="formData.subject"
            :class="{ error: formErrors.subject }"
            type="text"
            name="subject"
            placeholder="Subject"
          />
          <textarea
            v-model="formData.message"
            :class="{ error: formErrors.message }"
            name="message"
            cols="10"
            rows="5"
            placeholder="Message"
          />
          <div class="contact-us__content__form__bottom">
            <CropButton
              copy="submit"
              color="light-grey"
              filled
              arrow
              @mousedown.native="preventFocus"
            />
            <transition name="fade">
              <p v-if="showSuccess" class="form-message">
                We'll be in touch soon!
              </p>
            </transition>
            <transition name="fade">
              <p v-if="showError" class="form-message">
                {{ errorMessage }}
              </p>
            </transition>
          </div>
        </form>
      </div>
    </Appearable>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { checkGlobalData, encode, preventFocus } from '@/core/utils'
import TornHero from '@/components/TornHero'

export default {
  name: 'ContactUs',
  components: {
    TornHero
  },
  async asyncData({ store, route }) {
    const JSON_BASE = route.query.staging ? 'staging' : 'production'
    await checkGlobalData(store, JSON_BASE)
    await store.dispatch('getData', { key: 'contact', base: JSON_BASE })
  },
  data: () => ({
    formData: {
      first_name: '',
      last_name: '',
      email: '',
      subject: '',
      message: ''
    },
    formInvalid: false,
    formErrors: {
      first_name: false,
      last_name: false,
      email: false,
      subject: false,
      message: false
    },
    errorMessage: '',
    showError: false,
    showSuccess: false,
    preventFocus
  }),
  computed: {
    content() {
      return this.contact.contact
    },
    ...mapState(['contact'])
  },
  watch: {
    formData: {
      handler(val) {
        Object.keys(val).forEach((key) => {
          if (val[key] !== '') {
            this.formErrors[key] = false
          }
        })
      },
      deep: true
    },
    formErrors: {
      handler(val) {
        const allClear = Object.keys(val).every((key) => {
          return !val[key]
        })
        if (allClear) this.showError = false
      },
      deep: true
    }
  },
  methods: {
    getLinkForType(item) {
      let link
      switch (item.type) {
        case 'website':
          link = `https://${item.contact_info}`
          break
        case 'email':
          link = `mailto:${item.contact_info}`
          break
        case 'phone number':
          link = `tel:${item.contact_info}`
          break
        default:
          link = `https://${item.contact_info}`
          break
      }
      return link
    },
    handleFormSubmit(e) {
      this.formInvalid = false
      Object.keys(this.formData).forEach((key) => {
        this.formErrors[key] = false
        if (this.formData[key] === '') {
          this.formErrors[key] = true
          this.formInvalid = true
        }
      })
      if (this.formInvalid) {
        this.showError = true
        this.errorMessage = 'Please fill out the highlighted fields'
        return
      }
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'Contact', ...this.formData })
      })
        .then(() => {
          Object.keys(this.formData).forEach((key) => {
            this.formData[key] = ''
          })
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
.contact-us {
  &__content {
    .appearable__content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: {
        top: 40px;
        bottom: 80px;
      }
    }
    &__info {
      padding-right: 20px;
    }
    &__info,
    &__form {
      width: 100%;
      @include bpMedium {
        width: 50%;
      }
    }
    &__info {
      max-width: 500px;
      &__items {
        margin-top: 20px;
        p,
        a {
          font-size: 12px;
          line-height: 22px;
        }
        a {
          color: $gold;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -3px;
            background: $gold;
            width: 100%;
            height: 1px;
            transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
            transform-origin: center center;
            transform: scaleX(0);
          }
          &:hover {
            &::after {
              transform: scaleX(1);
            }
          }
        }
      }
    }
    &__form {
      margin-top: 50px;
      @include bpMedium {
        padding-left: 20px;
        margin-top: 0px;
      }
      form {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        input,
        textarea {
          font-size: 18px;
          line-height: 22px;
          width: 100%;
          margin: 10px 0;
          background: none;
          border: 1px solid rgba($lightGrey, 0.5);
          border-radius: 6px;
          padding: 15px;
          transition: border-color 300ms $easeOutQuad;
          &.error {
            border-color: $gold;
          }
          &::placeholder {
            color: $lightGrey;
          }
          &[name='first_name'],
          &[name='last_name'] {
            width: 48%;
            margin-top: 0;
          }
          &:focus {
            outline: none;
            border-color: $darkGrey;
          }
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px $offWhite inset;
          transition: background-color 50000s ease-in-out 0s;
        }
      }
      &__bottom {
        width: 100%;
        margin-top: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>

<template>
  <div class="events-footer">
    <img class="accent" :src="eventsFooterBorder" alt="border accent" />
    <transition name="fade" mode="out-in">
      <div v-if="!showForm" key="content" class="content">
        <div class="events-footer__content content">
          <div class="copy">
            <h3 class="ap-child">{{ content.left.headline }}</h3>
            <p class="ap-child ap-child--1">{{ content.left.copy }}</p>
            <span class="ap-child ap-child--2">
              <CropButton
                arrow
                :copy="content.left.button"
                color="white"
                @click="showForm = true"
              />
            </span>
          </div>
          <div class="divider">
            <verticalBorder class="vertical ap-child ap-child--3" />
            <horizontalBorder class="horizontal ap-child ap-child--3" />
          </div>
          <div class="copy">
            <h3 class="ap-child ap-child--4">{{ content.right.headline }}</h3>
            <p class="ap-child ap-child--5">{{ content.right.copy }}</p>
            <span class="ap-child ap-child--6">
              <CropButton
                arrow
                link="mailto:info@thecrop.org?subject=Sponsor a Crop Foundation Event"
                :copy="content.right.button"
                color="white"
              />
            </span>
          </div>
        </div>
      </div>
      <div v-else key="form" class="content">
        <h2>Host an Event</h2>
        <form
          name="HostEvent"
          netlify
          data-netlify-honeypot="bot-field"
          @submit.prevent="handleFormSubmit"
        >
          <input type="hidden" name="form-name" value="HostEvent" />
          <label for="event_first_name">First Name</label>
          <input
            id="event_first_name"
            v-model="formData.first_name"
            class="name"
            :class="{ error: formErrors.first_name }"
            type="text"
            name="first_name"
            placeholder="First Name*"
          />
          <label for="event_last_name">Last Name</label>
          <input
            id="event_last_name"
            v-model="formData.last_name"
            class="name"
            :class="{ error: formErrors.last_name }"
            type="text"
            name="last_name"
            placeholder="Last Name*"
          />
          <label for="event_email"></label>
          <input
            id="event_email"
            v-model="formData.email"
            :class="{ error: formErrors.email }"
            type="text"
            name="email"
            placeholder="Email*"
          />
          <label for="eventType">Event Type</label>
          <select id="eventType" v-model="formData.eventType" name="eventType">
            <option value="popup" selected>
              Pop-Up Dinner (7 Person minimum)
            </option>
            <option value="fundraiser">Fundraising Event</option>
            <option value="other">Other (Explain Below)</option>
          </select>
          <label for="event_other">Describe other event</label>
          <textarea
            id="event_other"
            v-model="formData.other"
            :class="{ error: formErrors.other }"
            name="other"
            cols="10"
            rows="3"
            placeholder="If other, tell us about your idea"
          />
          <label for="event_message">Additional Information</label>
          <textarea
            id="event_message"
            v-model="formData.message"
            :class="{ error: formErrors.message }"
            name="message"
            cols="10"
            rows="3"
            placeholder="Additional Information"
          />
          <label for="eventDate"></label>
          <input
            id="eventDate"
            v-model="formData.eventDate"
            type="date"
            name="eventDate"
          />
          <div class="form__bottom">
            <CropButton
              copy="submit"
              color="light-grey"
              filled
              arrow
              @mousedown.native="preventFocus"
            />
            <transition name="fade">
              <p v-if="showSuccess" class="form__message">
                We'll be in touch soon!
              </p>
            </transition>
            <transition name="fade">
              <p v-if="showError" class="form__message">
                {{ errorMessage }}
              </p>
            </transition>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import eventsFooterBorder from '@/assets/images/events-border.png'
import verticalBorder from '@/assets/svg/events-footer-vertical.svg?inline'
import horizontalBorder from '@/assets/svg/events-footer-horizontal.svg?inline'
import { encode, preventFocus } from '@/core/utils'

export default {
  name: 'EventsFooter',
  components: {
    verticalBorder,
    horizontalBorder
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    eventsFooterBorder,
    showForm: false,
    formData: {
      first_name: '',
      last_name: '',
      email: '',
      eventType: 'popup',
      date: '',
      message: '',
      other: ''
    },
    formInvalid: false,
    formErrors: {
      first_name: false,
      last_name: false,
      email: false,
      eventType: false,
      other: false
    },
    errorMessage: '',
    showError: true,
    showSuccess: false,
    preventFocus
  }),
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
    handleFormSubmit(e) {
      this.formInvalid = false
      Object.keys(this.formData).forEach((key) => {
        if (this.formErrors[key] !== undefined) {
          this.formErrors[key] = false
          if (this.formData[key] === '' && key !== 'other') {
            this.formErrors[key] = true
            this.formInvalid = true
          }
          if (
            this.formData.eventType === 'other' &&
            this.formData.other === ''
          ) {
            this.formErrors.other = true
            this.formInvalid = true
          }
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
.events-footer {
  width: 100%;
  position: relative;
  padding: 60px 0;
  background: $darkGrey;
  margin-top: 200px;
  @include bpMedium {
    padding: 60px;
  }
  .accent {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transform: translateY(-99%);
  }
  .divider {
    width: 100%;
    margin: 20px 0;
    @include bpMedium {
      margin: 0 20px;
      width: auto;
    }
    .vertical {
      opacity: 0.5;
      display: none;
      width: 100%;
      height: 100%;
      max-width: 2px;
      @include bpMedium {
        display: block;
      }
    }
    .horizontal {
      opacity: 0.5;
      display: block;
      width: 100%;
      @include bpMedium {
        display: none;
      }
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @include bpMedium {
      flex-wrap: nowrap;
    }
    .crop-button {
      display: inline-flex;
    }
    .copy {
      color: white;
      width: 100%;
      @include bpMedium {
        max-width: 545px;
        width: 50%;
      }
      h3 {
        margin-bottom: 20px;
      }
      p {
        color: white;
        margin-bottom: 20px;
      }
    }
  }
  h2 {
    color: $lightGrey;
    margin-bottom: 20px;
  }
  form {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    label {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
    input,
    textarea,
    select {
      font-size: 16px;
      line-height: 20px;
      width: 100%;
      margin: 10px 0;
      background: none;
      border: 1px solid rgba($lightGrey, 0.5);
      border-radius: 6px;
      padding: 10px;
      color: $lightGrey;
      transition: border-color 300ms $easeOutQuad;
      &.error {
        border-color: $gold;
      }
      &::placeholder {
        color: $lightGrey;
      }
      &[name='first_name'],
      &[name='last_name'] {
        margin-top: 0;
      }
      &:focus {
        outline: none;
        border-color: $greige;
      }
    }
    input,
    select {
      width: 48%;
    }
    .form {
      &__bottom {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      &__message {
        white-space: nowrap;
        right: 0;
        bottom: 0;
        transform: translateY(100%);
        position: absolute;
        color: $gold;
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
}
</style>

<template>
  <div class="contact-us page">
    <TornHero
      half-size
      :background="content.hero_background"
      :copy="content.headline"
    />
    <div class="contact-us__content content">
      <div class="contact-us__content__info">
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
      <div class="contact-us__content__form">
        <form action="">
          <input type="text" name="first_name" placeholder="First Name" />
          <input type="text" name="last_name" placeholder="Last Name" />
          <input type="text" name="email" placeholder="Email" />
          <input type="text" name="subject" placeholder="Subject" />
          <textarea name="message" cols="10" rows="5" placeholder="Message" />
          <CropButton copy="submit" color="light-grey" filled arrow />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { checkGlobalData, getCopy } from '@/core/utils'
import TornHero from '@/components/TornHero'

export default {
  name: 'ContactUs',
  components: {
    TornHero
  },
  async asyncData({ $axios, store }) {
    await checkGlobalData(store)
    const content = await $axios.$get(
      'https://crop-new-bucket.s3.amazonaws.com/app-data/staging-contact.json'
    )
    return { content: JSON.parse(JSON.stringify(getCopy(content[0]))).contact }
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
    }
  }
}
</script>

<style lang="scss">
.contact-us {
  &__content {
    display: flex;
    justify-content: space-between;
    padding: {
      top: 40px;
      bottom: 80px;
    }
    &__info {
      padding-right: 20px;
    }
    &__info,
    &__form {
      width: 50%;
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
      padding-left: 20px;
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

        .crop-button {
          margin-top: auto;
        }
      }
    }
  }
}
</style>

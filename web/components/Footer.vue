<template>
  <div class="footer">
    <div class="footer__content content">
      <div class="footer__nav-links">
        <a
          v-for="link in globalData.nav_items"
          :key="link.slug"
          class="footer__nav-links__link"
          :href="link.slug"
        >
          {{ link.label }}
        </a>
      </div>
      <div class="footer__addresses">
        <div
          v-for="address in globalData.addresses"
          :key="address.title"
          class="footer__addresses__address"
        >
          <h3>{{ address.title }}</h3>
          <div class="break" />
          <p v-for="line in address.address_lines" :key="line.copy">
            {{ line.copy }}
          </p>
          <a :href="getLink(address.contact)">{{ address.contact }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapState(['globalData'])
  },
  methods: {
    getLink(link) {
      if (link.includes('@')) {
        return `mailto:${link}`
      }
      return `tel:${link}`
    }
  }
}
</script>

<style lang="scss">
.footer {
  position: relative;
  z-index: 3;
  background: $greige;
  padding: 60px 0;
  @include bpMedium {
    padding-left: 150px;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    @include bpMedium {
      flex-wrap: nowrap;
    }
  }
  &__nav-links {
    display: flex;
    flex-direction: column;
    margin-right: 10%;
    &__link {
      text-decoration: none;
      margin: 15px 0;
      line-height: 1;
      transition: color 300ms $easeOutMaterial;
      &:hover {
        color: $offWhite;
      }
    }
  }
  &__addresses {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    @include bpMedium {
      flex-wrap: nowrap;
    }
    &__address {
      color: white;
      width: 100%;
      margin-top: 15px;
      @include bpMedium {
        width: 50%;
        max-width: 285px;
      }
      &:first-child {
        margin-right: 10%;
      }
      h3 {
        color: $offWhite;
        font-weight: 200;
        font-size: 14px;
      }
      p,
      a {
        color: white;
        font-size: 12px;
        line-height: 16px;
      }
      a {
        position: relative;
        display: inline-block;
        margin-top: 15px;
        text-decoration: none;
        transition: color 300ms $easeOutMaterial;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -3px;
          background: white;
          width: 100%;
          height: 1px;
          transition: transform 250ms $easeOutMaterial;
          transform-origin: center center;
          transform: scaleX(0);
        }
        &:hover {
          &::after {
            transform: scaleX(1);
          }
        }
      }
      .break {
        height: 1px;
        width: 100%;
        margin: 15px 0;
        background: $offWhite;
        opacity: 0.3;
      }
    }
  }
}
</style>

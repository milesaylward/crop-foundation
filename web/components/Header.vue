<template>
  <nav class="header">
    <div class="header__desktop">
      <nuxt-link
        v-for="link in global.nav_items"
        :key="link.slug"
        class="link"
        :to="`/${link.slug !== '/' ? link.slug : ''}`"
      >
        {{ link.label }}
        <navBorder class="nav-border" />
      </nuxt-link>
    </div>
    <div class="header__mobile" :class="{ active: showMenu }">
      <img
        class="background"
        :src="mobileHeaderBackground"
        alt="mobileHeaderBackground"
      />
      <div class="header__mobile__content content">
        <nuxt-link to="/">
          <img class="logo" :src="mobileLogo" alt="crop foundation logo" />
        </nuxt-link>
        <div class="links">
          <div class="social-buttons">
            <a
              href="https://www.facebook.com/thecropfoundation"
              target="_blank"
            >
              <facebook class="facebook" />
            </a>
            <a href="https://www.instagram.com/thecropfoundation/">
              <instagram class="instagram" />
            </a>
          </div>
          <mobileDivider class="divider" />
          <button
            class="menu-button"
            @click="handleMenuClick"
            @mousedown="preventFocus"
          >
            Menu
            <downArrow />
          </button>
        </div>
        <div class="overlay" @click="handleMenuClick" />
        <div class="mobile-menu">
          <nuxt-link
            v-for="link in global.nav_items"
            :key="link.slug"
            class="link"
            :to="`/${link.slug !== '/' ? link.slug : ''}`"
            @click.native="handleMenuClick"
          >
            {{ link.label }}
            <navBorder class="nav-border" />
          </nuxt-link>
          <CropButton filled copy="donate" small :link="global.paypal_link" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import navBorder from '@/assets/svg/nav-border.svg?inline'
import mobileHeaderBackground from '@/assets/images/mobile-header-background.png'
import mobileLogo from '@/assets/images/mobile-crop-logo.png'
import mobileDivider from '@/assets/svg/mobile-divider.svg?inline'
import facebook from '@/assets/svg/facebook.svg?inline'
import instagram from '@/assets/svg/instagram.svg?inline'
import downArrow from '@/assets/svg/down-arrow.svg?inline'
import { preventFocus } from '@/core/utils'

export default {
  name: 'Header',
  components: {
    navBorder,
    mobileDivider,
    facebook,
    instagram,
    downArrow
  },
  data: () => ({
    mobileHeaderBackground,
    mobileLogo,
    preventFocus,
    showMenu: false
  }),
  computed: {
    menuStyle() {
      return { height: `${this.viewHeight}px` }
    },
    ...mapState(['global', 'viewHeight'])
  },
  methods: {
    handleMenuClick() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="scss">
.header {
  position: fixed;
  top: -1px;
  left: 0px;
  width: 100%;
  z-index: 100;
  @include bpMedium {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    padding: 30px 51px;
  }
  &__desktop {
    display: none;
    @include bpMedium {
      display: block;
    }
  }
  &__mobile {
    @include bpMedium {
      display: none;
    }
    height: 120px;
    position: relative;
    .background {
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      z-index: -1;
      top: 0;
    }
    .logo {
      width: 90px;
    }
    &__content {
      align-items: center;
      display: flex;
      justify-content: space-between;
      &.content {
        padding: 20px;
      }
      .links {
        display: flex;
        align-items: center;
      }
      .divider {
        height: 100%;
        width: 2px;
        margin: 0 10px 0 5px;
      }
      .social-buttons {
        display: flex;
        justify-content: space-between;
        a {
          display: block;
          width: 30px;
          margin: 0 5px;
          .facebook,
          .instagram {
            display: block;
            path {
              fill: $gold;
              transition: stroke 300ms $easeOutQuad, fill 300ms $easeOutQuad;
              &:first-child {
                stroke: $beige;
                fill: rgba($gold, 0);
              }
            }
          }
        }
      }
      .menu-button {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        color: $gold;
        text-transform: uppercase;
        font-size: 16px;
        line-height: 14px;
        svg {
          margin-top: -2px;
          margin-left: 5px;
        }
      }
    }
    &.active {
      .overlay {
        opacity: 1;
        pointer-events: all;
      }
      .mobile-menu {
        transform: translateX(0);
      }
    }
    .overlay {
      background: $halfBlack;
      position: absolute;
      z-index: -2;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      transition: opacity 300ms $easeOutQuad;
      opacity: 0;
      pointer-events: none;
    }
    .mobile-menu {
      height: calc(100vh);
      background: $offWhite;
      position: absolute;
      display: flex;
      flex-direction: column;
      right: 0;
      top: 0;
      z-index: -1;
      padding: 30px;
      padding-top: 80px;
      text-align: right;
      transition: transform 300ms $easeOutQuad;
      transform: translateX(100%);
      .crop-button {
        margin-top: auto;
        margin-bottom: 50px;
        width: 100%;
      }
      .link {
        margin: 15px 0;
        color: $darkGrey;
      }
    }
  }
  .link {
    position: relative;
    font-family: $fontAccent;
    font-size: 20px;
    line-height: 28px;
    color: $offWhite;
    font-weight: 200;
    letter-spacing: 0.5px;
    margin: 0 20px;
    text-decoration: none;
    text-transform: uppercase;
    &:hover {
      .nav-border {
        opacity: 1;
      }
    }
    &.nuxt-link-exact-active {
      .nav-border {
        opacity: 1;
      }
    }
    .nav-border {
      position: absolute;
      transition: opacity 250ms $easeOutMaterial;
      opacity: 0;
      bottom: -3px;
      left: -1px;
      width: 100%;
      height: 2px;
    }
  }
}
</style>

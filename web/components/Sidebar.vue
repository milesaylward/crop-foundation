<template>
  <div class="sidebar">
    <img class="sidebar__background" :src="sidebarBg" alt="background" />
    <div class="sidebar__content">
      <nuxt-link to="/">
        <img class="sidebar__content__logo" :src="logo" alt="crop logo" />
      </nuxt-link>
      <div class="sidebar__content__bottom">
        <p class="source">copyright 2020 • the crop foundation</p>
        <CropButton filled copy="donate" small link="" />
        <div class="social-buttons">
          <a href="">
            <facebook class="facebook" />
          </a>
          <a href="">
            <instagram class="instagram" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebarBg from '~/assets/images/sidebar.png'
import logo from '~/assets/images/logo.png'
import facebook from '~/assets/svg/facebook.svg?inline'
import instagram from '~/assets/svg/instagram.svg?inline'

export default {
  components: {
    facebook,
    instagram
  },
  data: () => ({
    sidebarBg,
    logo
  })
}
</script>

<style lang="scss">
.sidebar {
  width: 200px;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  &__background {
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  &__content {
    position: absolute;
    box-sizing: border-box;
    width: 63%;
    height: 100%;
    padding: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    &__logo {
      display: block;
      width: 56px;
      height: 125px;
      height: auto;
    }
    &__bottom {
      position: relative;
      .source {
        white-space: nowrap;
        position: absolute;
        top: 0px;
        left: -118%;
        transform: rotate(-90deg) translate(65%);
        color: $gold;
      }
      .social-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        a {
          display: block;
          width: 45%;

          .facebook,
          .instagram {
            path {
              fill: #bf9121;
              &:first-child {
                stroke: #c7b59a;
                fill: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>

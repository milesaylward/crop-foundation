<template>
  <nav class="header">
    <div>
      <nuxt-link
        v-for="link in globalData.nav_items"
        :key="link.slug"
        :to="`/${link.slug}`"
      >
        {{ link.label }}
        <navBorder />
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import navBorder from '@/assets/svg/nav-border.svg?inline'

export default {
  name: 'Header',
  components: {
    navBorder
  },
  computed: {
    ...mapState(['globalData'])
  },
  mounted() {
    console.log('globaData', this.globalData)
  }
}
</script>

<style lang="scss">
.header {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 100;
  padding: 30px 51px;
  a {
    position: relative;
    font-family: $fontAccent;
    font-size: 24px;
    line-height: 28px;
    color: $offWhite;
    font-weight: 200;
    letter-spacing: 0.5px;
    margin: 0 20px;
    text-decoration: none;
    text-transform: uppercase;
    &:hover {
      svg {
        opacity: 1;
      }
    }
    &.nuxt-link-active {
      svg {
        opacity: 1;
      }
    }
    svg {
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

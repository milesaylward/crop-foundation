<template>
  <div class="page scholarship">
    <TornHero :background="content.hero_background" />
    <div class="scholarship__content">
      <div class="flex-copy">
        <p>{{ content.copy.one }}</p>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="parseCopy(content.copy.two)" />
      </div>
      <CropButton :copy="content.button" color="dark-grey" arrow />
    </div>
    <div class="scholarship__photo-winners content">
      <PeelerAccent class="accent accent__peeler" />
      <img class="accent accent__halftone" :src="halftoneAccent" alt="accent" />
      <div
        v-for="winner in computedWinners"
        :key="winner.year"
        class="scholarship__photo-winners__winner"
      >
        <img :src="winner.image" alt="scholarship winner" />
        <div class="scholarship__photo-winners__winner__info">
          <h4>{{ winner.year }} winners:</h4>
          <p
            v-for="student in winner.winners"
            :key="student.name"
            class="winner-copy"
          >
            {{ student.name }} <span>/</span> {{ student.amount }}
          </p>
        </div>
      </div>
    </div>
    <div class="scholarship__other-winners content">
      <h4>Other past winners (Not pictured)</h4>
      <p
        v-for="student in content.other_winners"
        :key="student.name"
        class="winner-copy"
      >
        {{ student.name }} <span>/</span> {{ student.amount }}
      </p>
    </div>
  </div>
</template>

<script>
import TornHero from '@/components/TornHero'
import { getCopy } from '@/core/utils'
import { KIP_LINK, GABY_LINK } from '@/core/constants'
import PeelerAccent from '@/assets/svg/peeler.svg?inline'
import halftoneAccent from '@/assets/images/accent-scholarship.png'

export default {
  name: 'ScholarshipPage',
  components: {
    TornHero,
    PeelerAccent
  },
  async fetch({ store }) {
    await store.dispatch('getEvents')
    await store.dispatch('getGlobal')
  },
  async asyncData({ $axios }) {
    const content = await $axios.$get(
      'http://crop-new-bucket.s3.amazonaws.com/app-data/staging-scholarship.json'
    )
    const copy = JSON.parse(JSON.stringify(getCopy(content[0])))
    return { content: copy }
  },
  data: () => ({
    halftoneAccent
  }),
  computed: {
    computedWinners() {
      return this.content.scholarship_winners.slice(0, 2)
    }
  },
  methods: {
    parseCopy(copy) {
      const innerCopy = copy.replace('{{email-kip}}', KIP_LINK)
      return innerCopy.replace('{{email-gaby}}', GABY_LINK)
    }
  }
}
</script>

<style lang="scss">
.scholarship {
  position: relative;
  .accent {
    position: absolute;
    &__peeler {
      right: 5%;
      top: -10%;
    }
    &__halftone {
      height: 628px;
      right: 0;
      top: 15%;
      z-index: -1;
    }
  }
  &__content {
    max-width: 900px;
    margin: 0 auto;
    padding-top: 80px;
    .flex-copy {
      display: flex;
      p {
        width: 50%;
        a {
          color: $gold;
          &:hover {
            color: darken($gold, 5);
          }
        }
        &:first-child {
          margin-right: 40px;
        }
      }
    }
    .crop-button {
      margin: 60px auto;
    }
  }
  h4 {
    font-weight: 200;
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 20px;
  }
  .winner-copy {
    font-family: $fontHeadline;
    font-weight: 100;
    font-size: 18px;
    line-height: 1;
    margin: 15px 0;
    span {
      color: $gold;
    }
  }
  &__photo-winners {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 150px;
    &__winner {
      width: 50%;
      &:nth-child(odd) {
        margin-right: 20px;
      }
      &:nth-child(even) {
        margin-top: 15%;
        margin-left: 20px;
      }
      img {
        width: 100%;
        height: 628px;
        object-fit: cover;
        display: block;
      }
      &__info {
        background: $darkGrey;
        display: inline-block;
        padding: 30px;
        margin-top: -50px;
        p {
          color: $offWhite;
        }
      }
    }
  }
  &__other-winners {
    margin: {
      top: -100px;
      bottom: 100px;
    }
  }
}
</style>

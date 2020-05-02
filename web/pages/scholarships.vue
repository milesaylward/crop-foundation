<template>
  <div class="page scholarship">
    <TornHero :background="content.hero_background" :copy="content.headline" />
    <Appearable class="scholarship__content">
      <div class="flex-copy">
        <p class="ap-child">{{ content.copy.one }}</p>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="ap-child ap-child--1" v-html="parseCopy(content.copy.two)" />
      </div>
      <CropButton
        class="ap-child ap-child--2"
        :copy="content.button"
        color="dark-grey"
        arrow
        @click="downloadPDF"
      />
    </Appearable>
    <div class="scholarship__photo-winners content">
      <PeelerAccent class="accent accent__peeler" />
      <img class="accent accent__halftone" :src="halftoneAccent" alt="accent" />
      <Appearable
        v-for="(winner, i) in computedWinners"
        :key="`${winner.year}-${i}`"
        class="scholarship__photo-winners__winner"
        :threshold="0.5"
        @can-appear="handleCanAppear(i)"
      >
        <div ref="canvasContainer" class="canvas-container">
          <img ref="image" :src="winner.image" alt="scholarship winner" />
        </div>
        <div
          class="scholarship__photo-winners__winner__info ap-child ap-child--1"
        >
          <h4>{{ winner.year }} winners:</h4>
          <p
            v-for="student in winner.winners"
            :key="student.name"
            class="winner-copy"
          >
            {{ student.name }} <span>/</span> {{ student.amount }}
          </p>
        </div>
      </Appearable>
    </div>
    <Appearable class="scholarship__other-winners content">
      <h4 class="ap-child">Other past winners (Not pictured)</h4>
      <p
        v-for="(student, i) in content.other_winners"
        :key="student.name"
        class="winner-copy ap-child"
        :class="`ap-child--${i + 1}`"
      >
        {{ student.name }} <span>/</span> {{ student.amount }}
      </p>
    </Appearable>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import TornHero from '@/components/TornHero'
import { getCopy, checkGlobalData } from '@/core/utils'
import { KIP_LINK, GABY_LINK } from '@/core/constants'
import PeelerAccent from '@/assets/svg/peeler.svg?inline'
import halftoneAccent from '@/assets/images/accent-scholarship.png'
import WatercolorSlide from '@/core/watercolor'
import resizeMixin from '@/mixins/resize'

export default {
  name: 'ScholarshipPage',
  components: {
    TornHero,
    PeelerAccent
  },
  mixins: [resizeMixin],
  async asyncData({ $axios, store }) {
    await checkGlobalData(store)
    const content = await $axios.$get(
      'https://crop-new-bucket.s3.amazonaws.com/app-data/staging-scholarship.json'
    )
    const copy = JSON.parse(JSON.stringify(getCopy(content[0])))
    return { content: copy }
  },
  data: () => ({
    halftoneAccent,
    waterColors: []
  }),
  computed: {
    computedWinners() {
      return this.content.scholarship_winners
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initWaterColor()
    })
  },
  beforeDestroy() {
    this.waterColors.forEach((waterColor, i) => {
      waterColor.destroy()
    })
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    parseCopy(copy) {
      const innerCopy = copy.replace('{{email-kip}}', KIP_LINK)
      return innerCopy.replace('{{email-gaby}}', GABY_LINK)
    },
    downloadPDF() {
      fetch(this.content.scholarship_pdf).then((response) =>
        response.blob().then((blob) => {
          FileSaver.saveAs(blob, 'Crop Scholarship Application.pdf')
        })
      )
    },
    initWaterColor() {
      this.timeout = setTimeout(() => {
        this.computedWinners.forEach((winner, i) => {
          const rect = this.$refs.image[i].getBoundingClientRect()
          const waterColor = new WatercolorSlide({
            container: this.$refs.canvasContainer[i],
            image: winner.image,
            width: rect.width,
            height: rect.height,
            useMin: false
          })
          waterColor.readyImage()
          this.waterColors.push(waterColor)
        })
      }, 500)
    },
    handleResize() {
      this.waterColors.forEach((waterColor, i) => {
        const rect = this.$refs.image[i].getBoundingClientRect()
        waterColor.handleResize(rect)
      })
    },
    handleCanAppear(i) {
      this.waterColors[i].onAnimate()
    }
  }
}
</script>

<style lang="scss">
.scholarship {
  position: relative;
  .accent {
    position: absolute;
    display: none;
    @include bpMedium {
      display: block;
    }
    &__peeler {
      right: 5%;
      top: -5%;
      @include bpLarge {
        top: -10%;
      }
    }
    &__halftone {
      height: 628px;
      right: 0;
      top: 0;
      z-index: 1;
    }
  }
  &__content {
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include bpMedium {
      padding-top: 80px;
    }
    .flex-copy {
      display: flex;
      flex-wrap: wrap;
      @include bpMedium {
        flex-wrap: nowrap;
      }
      p {
        width: 100%;
        @include bpMedium {
          width: 50%;
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
        &:first-child {
          margin-right: 40px;
        }
      }
    }
    .crop-button {
      margin: 30px auto;
      @include bpMedium {
        margin: 60px auto;
      }
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
    max-width: 450px;
    font-size: 18px;
    line-height: 1.5;
    margin: 15px 0;
    span {
      color: $gold;
    }
  }
  &__photo-winners {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
    margin-top: 50px;
    @include bpMedium {
      margin-top: 150px;
    }
    &__winner {
      width: 100%;
      position: relative;
      z-index: 2;
      .appearable__content {
        width: 100%;
      }
      .canvas-container {
        position: relative;
        z-index: 5;
        overflow: hidden;
        img {
          opacity: 0;
        }
        canvas {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
        }
      }
      margin-top: 60px;
      @include bpLarge {
        width: 47%;
        margin-top: 0;
        &:nth-child(odd) {
          margin-right: 20px;
        }
        &:nth-child(even) {
          margin-top: 15%;
          margin-left: 20px;
        }
      }
      img {
        width: 100%;
        min-height: 296px;
        height: auto;
        display: block;
        @include bpLarge {
          height: 628px;
          width: auto;
        }
      }
      &__info {
        background: $darkGrey;
        display: inline-block;
        padding: 30px;
        width: 100%;
        @include bpLarge {
          width: auto;
        }
        p {
          color: $offWhite;
        }
      }
    }
  }
  &__other-winners {
    margin: {
      top: 100px;
      bottom: 100px;
    }
    @include bpMedium {
      margin: {
        // top: -100px;
        bottom: 100px;
      }
    }
  }
}
</style>

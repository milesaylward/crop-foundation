<template>
  <div class="home-section-community container">
    <div class="home-section-community__content">
      <h4>{{ content.eyebrow }}</h4>
      <h2>{{ content.headline }}</h2>
      <div class="home-section-one__content__flex-copy">
        <p>{{ content.copy.left }}</p>
        <p>{{ content.copy.right }}</p>
      </div>
      <div class="home-section-one__content__copy">
        <p>
          {{ content.copy.left }}
          {{ content.copy.right }}
        </p>
      </div>
      <div class="cta-support">
        <h3>Support us using:</h3>
        <a
          href="https://smile.amazon.com/ref=smi_ext_ch_83-2281354_dl?_encoding=UTF8&ein=83-2281354&ref_=smi_chpf_redirect&ref_=smi_ext_ch_83-2281354_cl"
          target="_blank"
        >
          <img :src="SmileLogo" alt="Amazon Smile Logo" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SmileLogo from '@/assets/images/amazon-smile.png'

export default {
  name: 'SectionCommunity',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    SmileLogo
  })
}
</script>

<style lang="scss">
.home-section-community {
  position: relative;
  padding-top: 3rem;
  padding: 0 20px;
  overflow: hidden;
  @include bpMedium {
    overflow: visible;
  }
  &__content {
    max-width: 900px;
    padding: {
      top: 12.5rem;
      bottom: 12.5rem;
    }
    @include bpMedium {
      text-align: center;
    }
    h4 {
      color: $gold;
      margin-bottom: 20px;
    }
    h2 {
      margin: 0 auto;
      color: $darkGrey;
      @include bpMedium {
        max-width: 576px;
      }
      margin-bottom: 40px;
    }
    &__flex-copy {
      width: 100%;
      text-align: left;
      justify-content: center;
      display: none;
      @include bpMedium {
        display: flex;
      }
      p {
        max-width: 417px;
        &:first-child {
          margin-right: 40px;
        }
      }
    }
    .cta-support {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5rem;
      h3 {
        line-height: 1;
      }
      img {
        margin-top: 5px;
        margin-left: 10px;
        width: 150px;
      }
    }
    &__copy {
      @include bpMedium {
        display: none;
      }
    }
  }
}
</style>

import UAParser from 'ua-parser-js'
import { getCopy } from '@/core/utils'
import Mighty from '@/assets/images/mighty-dream.jpg'

export const state = () => ({
  events: null,
  global: null,
  showLoader: true,
  viewWidth: 0,
  viewHeight: 0,
  home: null,
  scholarship: null,
  news: null,
  contact: null,
  OS: null
})

export const mutations = {
  setData(state, { key, data }) {
    state[key] = data
  },
  setShowLoader(state, val) {
    state.showLoader = val
  },
  setWindowSize(state, { width, height }) {
    state.viewWidth = width
    if (Math.abs(height - state.viewHeight) > 114) {
      state.viewHeight = height
    }
  },
  setUserAgent(state, OS) {
    state.OS = OS
  }
}

export const getters = {
  isIOS: (state) => state.OS.name === 'iOS'
}

export const actions = {
  async getData({ commit, state }, { key, base }) {
    if (!state[key]) {
      await this.$axios
        .$get(
          `https://crop-foundation.s3-us-west-2.amazonaws.com/app-data/${base}-${key}.json`
        )
        .then((res) => {
          const data = JSON.parse(JSON.stringify(getCopy(res[0])))
          if (key === 'events') {
            const tempEvent = {
              date: '2022-11-01 18:00:00',
              description: `Pharrell Williams launches MIGHTY DREAM, a multi-day forum in Norfolk, Virginia where matters of business,
                opportunity and money intersect with people of color, set against a backdrop of community engagement and jaw-dropping entertainment.`,
              event_gallery: false,
              guest_chefs: false,
              hero_image: Mighty,
              location: [{ location_line: 'Norfolk, Va' }],
              photo_credits: '',
              slug: 'mighty-dream-forum',
              ticket_link: 'https://registration.mightydreamforum.com/',
              title: 'Mighty Dream Forum'
            }
            data.events = [tempEvent, ...data.events]
          }
          commit('setData', {
            key,
            data
          })
        })
    }
  },
  setUserAgent({ commit }) {
    const parser = new UAParser()
    const OS = parser.getOS()
    commit('setUserAgent', OS)
  },
  setShowLoader({ commit }, val) {
    commit('setShowLoader', val)
  },
  setWindowSize({ commit }, size) {
    commit('setWindowSize', size)
  }
}

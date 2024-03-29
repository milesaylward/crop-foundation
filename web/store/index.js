import UAParser from 'ua-parser-js'
import { getCopy } from '@/core/utils'

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
          `https://new-crop-foundation.s3.amazonaws.com/app-data/${base}-${key}.json`
        )
        .then((res) => {
          const data = JSON.parse(JSON.stringify(getCopy(res[0])))
          if (key === 'home') {
            data.hero_carousel_items = res
              .map((item, idx) => idx && item)
              .filter((val) => val)
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

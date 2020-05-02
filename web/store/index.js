export const state = () => ({
  events: [],
  globalData: {},
  showLoader: true,
  viewWidth: 0,
  viewHeight: 0
})

export const mutations = {
  setEvents(state, events) {
    state.events = events
  },
  setGlobal(state, data) {
    state.globalData = data
  },
  setShowLoader(state, val) {
    state.showLoader = val
  },
  setWindowSize(state, { width, height }) {
    state.viewWidth = width
    if (Math.abs(height - state.viewHeight) > 114) {
      state.viewHeight = height
    }
  }
}

export const actions = {
  async getEvents({ commit }) {
    await this.$axios
      .$get(
        'https://crop-new-bucket.s3.amazonaws.com/app-data/staging-events.json'
      )
      .then((res) => {
        commit('setEvents', res[0])
      })
  },
  async getGlobal({ commit }) {
    await this.$axios
      .$get(
        'https://crop-new-bucket.s3.amazonaws.com/app-data/staging-global.json'
      )
      .then((res) => {
        commit('setGlobal', res[0])
      })
  },
  setShowLoader({ commit }, val) {
    commit('setShowLoader', val)
  },
  setWindowSize({ commit }, size) {
    commit('setWindowSize', size)
  }
}

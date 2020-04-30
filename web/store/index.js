export const state = () => ({
  events: [],
  globalData: {},
  showLoader: true
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
  }
}

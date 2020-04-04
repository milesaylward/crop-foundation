export const state = () => ({
  events: [],
  globalData: {}
})

export const mutations = {
  setEvents(state, events) {
    state.events = events
  },
  setGlobal(state, data) {
    state.globalData = data
  }
}

export const actions = {
  async getEvents({ commit }) {
    await this.$axios
      .$get(
        'http://crop-new-bucket.s3.amazonaws.com/app-data/staging-events.json'
      )
      .then((res) => {
        commit('setEvents', res[0])
      })
  },
  async getGlobal({ commit }) {
    await this.$axios
      .$get(
        'http://crop-new-bucket.s3.amazonaws.com/app-data/staging-global.json'
      )
      .then((res) => {
        commit('setGlobal', res[0])
      })
  }
}

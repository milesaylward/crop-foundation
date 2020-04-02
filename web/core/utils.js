import set from 'lodash/set'
import moment from 'moment'

export const getCopy = (data = {}) => {
  const out = {}
  Object.getOwnPropertyNames(data).forEach((name) => {
    set(out, name, data[name] && data[name])
  })
  return out
}

export const getDayOfWeek = (date) => {
  const momentDate = moment(date)
  return momentDate.format('ddd')
}

export const getMonthDate = (date) => {
  const momentDate = moment(date)
  return momentDate.format('MMM DD')
}

export async function getEventsData(axios, store) {
  let content
  if (!store.state.events.length) {
    content = await axios.$get(
      'http://crop-new-bucket.s3.amazonaws.com/app-data/staging-events.json'
    )
  } else {
    content = await (() => store.state.events)
  }
  return JSON.parse(JSON.stringify(getCopy(content[0])))
}

export async function checkGlobalData(store) {
  if (!Object.keys(store.state.globalData).length) {
    await store.dispatch('getGlobal')
  }
}

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

export const getYearDate = (date) => {
  const momentDate = moment(date)
  return momentDate.format('YYYY')
}

export async function getEventsData(axios, store) {
  let content
  if (!store.state.events.length) {
    content = await axios.$get(
      'https://crop-new-bucket.s3.amazonaws.com/app-data/staging-events.json'
    )
    content = JSON.parse(JSON.stringify(getCopy(content[0])))
  } else {
    content = store.state
  }
  return content
}

export async function checkGlobalData(store) {
  if (!Object.keys(store.state.globalData).length) {
    await store.dispatch('getGlobal')
  }
}

export const preventFocus = (e) => {
  e.preventDefault()
}

export const chunkItems = (items, itemsPer) => {
  return Array.from(
    {
      length: Math.ceil(items.length / itemsPer)
    },
    (v, i) => items.slice(i * itemsPer, i * itemsPer + itemsPer)
  )
}

export const encode = (data) => {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

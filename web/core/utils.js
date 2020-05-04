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

export async function getEventsData(store, JSONBase) {
  if (!store.state.events || store.state.events.length < 1) {
    await store.dispatch('getData', { key: 'events', base: JSONBase })
  }
}

export async function checkGlobalData(store, JSONBase) {
  if (!store.state.global) {
    await store.dispatch('getData', { key: 'global', base: JSONBase })
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

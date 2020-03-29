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

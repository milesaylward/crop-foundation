import set from 'lodash/set'

export default function getCopy(data = {}) {
  const out = {}
  Object.getOwnPropertyNames(data).forEach((name) => {
    set(out, name, data[name] && data[name])
  })
  return out
}

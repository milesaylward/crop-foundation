export default ({ store }) => {
  const size = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  store.dispatch('setWindowSize', size)
  window.onresize = () => {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    store.dispatch('setWindowSize', size)
  }
}

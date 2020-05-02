import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['viewHeight', 'viewWidth'])
  },
  watch: {
    viewWidth() {
      this.handleResize()
    },
    viewHeight() {
      this.handleResize()
    }
  }
}

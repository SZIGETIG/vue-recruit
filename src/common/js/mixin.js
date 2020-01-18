export default {
  data() {
    return {
      children: []
    }
  },
  mounted() {
    this.children = this.$children
  }
}
  
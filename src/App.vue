<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState(['userInfo']),
    noSession() {
      return !(this.userInfo && this.userInfo.employeeId)
    },
  },
  created() {
    this.initSessionInfo()
    if (this.noSession) {
      this.$router.replace('/error')
    }
  },
  methods: {
    ...mapActions(['storeSessionInfo']),
    initSessionInfo() {
      const employeeId = localStorage.getItem('employeeId')
      const userInfo = {
        employeeId
      }
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      this.storeSessionInfo(userInfo)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

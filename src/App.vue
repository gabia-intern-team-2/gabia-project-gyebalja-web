<template>
  <v-app>
    <!-- 인증 전 -->
    <div v-if="!isAuthenticationUser">
      <core-login/>
    </div>

    <!-- 인증 후 -->
    <!-- 등록 전 -->
    <div v-if="isAuthenticationUser && !isRegisterUser">
      <core-login-register/>
    </div>

    <!-- 등록 후 -->
    <div v-if="isAuthenticationUser && isRegisterUser">
      <!-- HEADER -->
      <core-toolbar />

      <!-- RIGHT -->
      <core-filter />

      <!-- LEFT -->
      <core-drawer />

      <!-- CONTENTS -->
      <core-view />
    </div>
    <spinner :loading="loadingStatus"/>
  </v-app>
</template>

<script>
import bus from './utils/bus.js'
import Spinner from './components/helper/Spinner.vue'
import { getIsAuthenticationUser, getIsRegisterUser } from './api/login/login.js'

export default {
  components: {
    Spinner
  },

  data () {
    return {
      loadingStatus: false,
      isAuthenticationUser: true,
      isRegisterUser: true
    }
  },

  created () {
    bus.$on('start:spinner', this.startSpinner)
    this.initializeUser()
    bus.$on('end:spinner', this.endSpinner)
  },

  beforeDestroy () {
    bus.$off('start:spinner', this.startSpinner)
    bus.$oof('end:spinner', this.endSpinner)
  },

  methods: {
    startSpinner () {
      this.loadingStatus = true
    },
    endSpinner () {
      this.loadingStatus = false
    },
    async initializeUser () {
      let response = await getIsAuthenticationUser()
      if (response.data === false) return
      this.isAuthenticationUser = response.data

      response = await getIsRegisterUser()
      this.isRegisterUser = response.data
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

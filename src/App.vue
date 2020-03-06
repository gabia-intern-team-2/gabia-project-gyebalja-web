<template>
  <v-app>
    <div v-if="isGetData">
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
      <!-- 인증 전 -->
      <div v-if="!isAuthenticationUser">
        <core-login/>
      </div>

      <!-- 인증 후 -->
      <!-- 등록 전 -->
      <div v-if="isAuthenticationUser && !isRegisterUser">
        <core-login-register/>
      </div>
      <spinner :loading="loadingStatus"/>
    </div>
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
      isAuthenticationUser: false,
      isRegisterUser: false,
      isGetData: false
    }
  },

  created () {
    bus.$on('start:spinner', this.startSpinner)
    this.initializeUser()
    bus.$on('end:spinner', this.endSpinner)
    bus.$on('register-success', success => {
      this.isRegisterUser = true
    })
    bus.$on('logout-success', success => {
      this.isAuthenticationUser = false
    })
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
      try {
        // 조회 - 인증 사용자 여부
        let response = await getIsAuthenticationUser()
        if (response.data === false) return
        this.isAuthenticationUser = response.data.response

        // 조회 - 등록 사용자 여부
        response = await getIsRegisterUser()
        this.isRegisterUser = response.data.response
      } catch (error) {
        console.log(error)
      }
      this.isGetData = true
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

<template>
  <v-app>
    <!-- 인증 후 -->
    <div v-if="isAuthenticationUser">
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
    <spinner :loading="loadingStatus"/>
  </v-app>
</template>

<script>
import bus from './utils/bus.js'
import Spinner from './components/helper/Spinner.vue'

export default {
  components: {
    Spinner
  },

  data () {
    return {
      loadingStatus: false,
      isAuthenticationUser: true
    }
  },

  created () {
    bus.$on('start:spinner', this.startSpinner)
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

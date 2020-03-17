<!--
 * Author : 정태균
 * Part : All
-->

<template>
  <v-toolbar
    id="core-toolbar"
    app
    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <router-link
          v-ripple
          class="toolbar-items"
          to="/"
        >
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>
        <router-link
          v-ripple
          class="toolbar-items"
          to="/boardList"
        >
          <v-icon color="tertiary">mdi-clipboard-outline</v-icon>
        </router-link>
        <router-link
          v-ripple
          class="toolbar-items"
          to="/myEducation"
        >
          <v-icon color="tertiary">mdi-book-open-page-variant</v-icon>
        </router-link>
        <router-link
          v-ripple
          class="toolbar-items"
          to="/userProfile"
        >
          <v-icon color="tertiary">mdi-account</v-icon>
        </router-link>
        <router-link
          v-ripple
          class="toolbar-items"
          to=""
        >
          <span @click="logout">
            <v-icon color="tertiary">mdi-logout</v-icon>
          </span>
        </router-link>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import {
  mapMutations
} from 'vuex'
import { logout } from '../../api/login/login.js'
import bus from '../../utils/bus.js'

export default {
  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ],
    title: null,
    responsive: false
  }),

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
    // 로그아웃 메서드
    async logout () {
      if (!confirm('로그아웃 하시겠습니까?')) return
      try {
        await logout()
        bus.$emit('logout-success')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>

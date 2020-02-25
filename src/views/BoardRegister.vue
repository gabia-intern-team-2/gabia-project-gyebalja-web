<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <div v-if="isGetData">
          <!-- 카드 -->
          <material-editor/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from '../store/index.js'
import bus from '../utils/bus.js'
import boardEvent from '../api/board/boardEvent.js'

export default {
  data: () => ({
    // Data
    title: '',
    content: '',
    educationId: '',
    userId: '',
    boardImg: '',

    // Education
    educationList: [],

    // Flag
    isGetData: false
  }),
  created () {
    // Data
    this.userId = 866

    // Logic
    bus.$emit('start:spinner')
    this.fetchData()
  },
  methods: {
    /** Apis */
    async fetchData () {
      const vm = this
      await store.dispatch('FETCH_EDUCATIONS', vm.userId)
      for (let i in this.$store.state.educations.response) {
        vm.educationList.push({
          id: this.$store.state.educations.response[i].id,
          title: this.$store.state.educations.response[i].title })
      }
      vm.isGetData = true
      bus.$emit('end:spinner')
    },

    /** Methods */
    createBoard () {
      boardEvent.createBoard(this)
    }
  }
}
</script>

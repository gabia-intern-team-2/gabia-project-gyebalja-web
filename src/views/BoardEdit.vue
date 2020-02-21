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
          <material-card
            color="green"
            title="게시글 작성"
            text="게시글을 작성해주세요."
          >
            <!-- 입력 폼 -->
            <v-form>
              <v-container py-0>
                <v-layout column>
                  <v-flex
                    xs12
                    md12
                  >
                    <v-text-field
                      v-model="title"
                      label="제목"
                      class="green-input"
                      hint="제목을 입력해주세요"
                      required
                      value="fdsa"/>
                  </v-flex>

                  <v-flex xs12>
                    <v-textarea
                      v-model="content"
                      class="green-input"
                      label="본문"
                      hint="본문을 입력해주세요"
                      rows="20"
                    />
                  </v-flex>

                  <v-flex xs12>
                    <v-select
                      :items="educationList"
                      :reduce="title => title.id"
                      v-model="educationId"
                      item-text="title"
                      item-value="id"
                      label="교육"
                      class="theme--light"
                      chips
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    md4>
                    <v-text-field
                      label="이미지 업로드"
                      class="green-input"/>
                  </v-flex>

                  <!-- 수정 버튼 -->
                  <v-flex
                    xs12
                    text-xs-right
                  >
                    <v-btn
                      class="mx-0 font-weight-light"
                      color="success"
                      @click="submit"
                    >
                      수정하기
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </material-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import bus from '../utils/bus.js'
import { store } from '../store/index.js'
import boardApi from '../api/board/boardApi.js'

export default {
  data: () => ({
    // Data
    title: '',
    content: '',
    educationId: '',
    userId: '',
    boardImg: '',

    // Board
    responseBoard: {},
    requestBoard: {},
    educationList: [],

    // Flag
    isGetData: false
  }),
  created () {
    // Data
    this.userId = 1860

    // Logic
    bus.$emit('start:spinner')
    this.fetchData()
  },
  methods: {
    /** Apis */
    async fetchData () {
      const vm = this
      await boardApi.readBoardOne(vm)
      await store.dispatch('FETCH_EDUCATIONS', vm.userId)
      for (var i in vm.$store.state.educations.response) {
        vm.educationList.push({ id: vm.$store.state.educations.response[i].id, title: vm.$store.state.educations.response[i].title })
      }
      vm.title = vm.responseBoard.title
      vm.content = vm.responseBoard.content
      vm.educationId = vm.responseBoard.educationId
      vm.isGetData = true
      bus.$emit('end:spinner')
    },

    /** Methods */
    async submit () {
      // Data
      const board = {
        title: this.title,
        content: this.content,
        educationId: this.educationId,
        userId: 1860,
        boardImg: this.boardImg
      }

      // Logic
      await boardApi.updateBoard(this, board)
    }
  }
}
</script>
<!--
 - Author : 이현재
 - Part : All
-->

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
            <v-form
              ref="form"
            >
              <v-container py-0>
                <v-layout column>
                  <v-flex
                    xs12
                    md12
                  >
                    <v-text-field
                      v-model="title"
                      :rules="[v => !!v || '제목명은 필수 입력사항입니다']"
                      label="제목"
                      class="green-input"
                      hint="제목을 입력해주세요"
                      required
                      value="fdsa"/>
                  </v-flex>

                  <v-flex xs12>
                    <vue-editor
                      id="editor"
                      v-model="content"
                      use-custom-image-handler
                      @image-added="handleImageAdded"/>
                  </v-flex>

                  <v-flex xs12>
                    <v-select
                      :items="educationList"
                      :reduce="title => title.id"
                      :rules="[v => !!v || '교육명은 필수 입력사항입니다.']"
                      v-model="educationId"
                      item-text="title"
                      item-value="id"
                      label="교육"
                      class="theme--light"
                      chips
                    />
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
                    <v-btn
                      class="mx-1 font-weight-light"
                      color="warning"
                      @click="back"
                    >
                      뒤로가기
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
import { VueEditor } from 'vue2-editor'
import { store } from '../store/index.js'
import { getBoardItem, putBoardItem } from '../api/board/board.js'
import { postBoardImgItem } from '../api/boardImg/boardImg.js'

export default {
  components: {
    VueEditor
  },

  data: () => ({
    // Data
    title: '',
    content: '',
    educationId: '',
    userId: '',

    // Board
    responseBoard: {},
    requestBoard: {},
    educationList: [],

    // Flag
    isGetData: false
  }),

  async created () {
    // Data
    this.userId = this.$store.state.user.id

    // Logic
    bus.$emit('start:spinner')
    this.initialize()
    bus.$emit('end:spinner')
  },

  methods: {
    async initialize () {
      const vm = this

      try {
        // Read Board
        vm.responseBoard = await getBoardItem(vm.$route.params.boardId)
        vm.responseBoard = vm.responseBoard.data.response
        vm.commentList = vm.responseBoard.commentList

        // Read Educations
        await store.dispatch('FETCH_EDUCATIONS', vm.userId)
        for (let i in vm.$store.state.educations.response) {
          vm.educationList.push({
            id: vm.$store.state.educations.response[i].id,
            title: vm.$store.state.educations.response[i].title })
        }
        vm.title = vm.responseBoard.title
        vm.content = vm.responseBoard.content
        vm.educationId = vm.responseBoard.educationId

        vm.isGetData = true
      } catch (error) {
        // Error Page
        console.log(error)
        vm.$router.push({ name: 'Board List' })
      }
    },

    async updateBoard () {
      const vm = this

      const board = {
        title: vm.title,
        content: vm.content,
        educationId: vm.educationId,
        userId: vm.$store.state.user.id
      }

      try {
        await putBoardItem(vm.responseBoard.id, board)
        vm.$router.push({ name: 'Board Detail', params: { boardId: vm.responseBoard.id } })
      } catch (error) {
        // Error page
        console.log(error)
        vm.$router.push({ name: 'Board List' })
      }
    },

    submit () {
      if (this.$refs.form.validate()) {
        this.updateBoard()
      } else {
        alert('값을 정확히 입력해주세요.')
      }
    },

    back () {
      history.back()
    },

    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData()
      formData.append('image', file)

      postBoardImgItem(formData)
        .then(response => {
          let url = response.data
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

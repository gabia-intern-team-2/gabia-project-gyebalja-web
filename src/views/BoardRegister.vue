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
                      :rules="[v => !!v || '제목명은 필수 입력사항입니다.']"
                      label="제목"
                      class="green-input"
                      hint="제목을 입력해주세요"
                      required/>
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
                  <v-flex
                    xs12
                    md4>
                    <v-text-field
                      label="이미지 업로드"
                      class="green-input"/>
                  </v-flex>

                  <!-- 등록 버튼 -->
                  <v-flex
                    xs12
                    text-xs-right
                  >
                    <v-btn
                      class="mx-0 font-weight-light"
                      color="success"
                      @click="checkValidate"
                    >
                      등록하기
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
import axios from 'axios'
import bus from '../utils/bus.js'
import { store } from '../store/index.js'
import { postBoardItem } from '../api/board/board.js'
import { VueEditor } from 'vue2-editor'

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
    boardImg: '',

    // Education
    educationList: [],

    // Flag
    isGetData: false
  }),

  async created () {
    // Data
    this.userId = 2

    // Logic
    bus.$emit('start:spinner')
    this.initialize()
    bus.$emit('end:spinner')
  },

  methods: {
    async initialize () {
      const vm = this

      await store.dispatch('FETCH_EDUCATIONS', vm.userId)
      for (let i in this.$store.state.educations.response) {
        vm.educationList.push({
          id: this.$store.state.educations.response[i].id,
          title: this.$store.state.educations.response[i].title })
      }
      vm.isGetData = true
    },

    async createBoard () {
      const vm = this
      const board = {
        title: vm.title,
        content: vm.content,
        educationId: vm.educationId,
        userId: 2,
        boardImg: vm.boardImg
      }
      console.log(board)
      try {
        await postBoardItem(board)
      } catch (error) {
        console.log(error)
      }
      vm.$router.push({ name: 'Board List' })
    },

    checkValidate () {
      if (this.$refs.form.validate()) {
        this.createBoard()
      }
    },

    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData()
      formData.append('image', file)

      let baseUrl = 'http://211.53.209.130:8282'

      axios({
        url: baseUrl + '/api/v1/boardImgs',
        method: 'POST',
        data: formData
      })
        .then(result => {
          let url = result.data // Get url from response
          url = baseUrl + url
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

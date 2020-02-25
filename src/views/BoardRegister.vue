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
                      required/>
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

                  <!-- 등록 버튼 -->
                  <v-flex
                    xs12
                    text-xs-right
                  >
                    <v-btn
                      class="mx-0 font-weight-light"
                      color="success"
                      @click="createBoard"
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

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
        md12
      >
        <!-- 카드  -->
        <div v-if="isGetData">
          <material-card
            :title="responseBoard.title"
            color="green"
            text="사내 교육 게시판"
          >
            <v-flex
              xs12
            >
              <material-card class="v-card--flat">
                <!-- 작성자 이미지 -->
                <v-avatar
                  slot="offset"
                  class="mx-auto d-block"
                  size="130"
                >
                  <img
                    src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
                  >
                </v-avatar>

                <v-card-text class="text-xs-center">
                  <!-- 헤더 -->
                  <h6 class="category text-gray font-weight-thin mb-3"> {{ responseBoard.userPositionName }} / {{ responseBoard.userName }}</h6>
                  <h6 class="category text-gray font-weight-thin mb-3">교육명 - {{ responseBoard.educationTitle }}</h6><br>
                  <h3 class="card-title font-weight-bold">{{ responseBoard.title }}</h3>

                  <!-- 본문 -->
                  <div class="text-xs-left">
                    <p
                      id="my-v-html"
                      class="font-weight-light"
                      v-html="responseBoard.content"/>
                  </div>

                  <!-- 버튼 -->
                  <v-flex>
                    <v-btn
                      small
                      color="teal"
                      round
                      class="font-weight-light"
                      @click="createLikes">
                      <v-icon
                        :color="getLikes"
                        small>mdi-thumb-up</v-icon>
                    </v-btn>

                    <v-btn
                      v-if="userId === responseBoard.userId"
                      :to="{name:'Board Edit', params:{boardId:responseBoard.id}}"
                      small
                      color="success"
                      round
                    >수정</v-btn>

                    <v-btn
                      v-if="userId === responseBoard.userId"
                      small
                      color="danger"
                      round
                      @click="deleteBoard"
                    >삭제</v-btn>
                  </v-flex>

                  <br>
                  <p class="card-description font-weight-light text-xs-right">조회수 {{ responseBoard.views }} &nbsp; 좋아요 {{ responseBoard.likes }} <br><br> 수정일: {{ responseBoard.modifiedDate }}</p>
                </v-card-text>
              </material-card>
            </v-flex>
          </material-card>

          <!-- 댓글 -->
          <material-comment
            :comments="commentList"
            :user-id="userId"
            :board-id="boardId.toString()"/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import bus from '../utils/bus.js'
import { getBoardItem, deleteBoardItem } from '../api/board/board.js'
import { postLikesItem, getLikesItem, deleteLikesItem } from '../api/likes/likes.js'

export default {
  data: () => ({
    // Board
    responseBoard: {},
    userId: {},
    boardId: {},
    commentList: [],

    // Flag
    isLikes: true,
    isGetData: false,
    isUser: false
  }),

  computed: {
    getLikes () {
      return this.isLikes ? 'white' : 'black'
    }
  },

  async created () {
    // Data
    this.userId = this.$store.state.user.id
    this.boardId = this.$route.params.boardId

    // Logic
    bus.$emit('start:spinner')
    this.initialize()
    bus.$emit('end:spinner')
  },

  methods: {
    async initialize () {
      const vm = this

      // Check Likes
      vm.responseLikes = await getLikesItem(vm.userId, vm.boardId)
      vm.isLikes = !vm.responseLikes.data.response.likes

      // Read Board
      try {
        vm.responseBoard = await getBoardItem(vm.$route.params.boardId)
        vm.responseBoard = vm.responseBoard.data.response
        vm.commentList = vm.responseBoard.commentList
        vm.isGetData = true
      } catch (error) {
        // Error Page
        console.log(error)
        vm.$router.push({ name: 'Board List' })
      }
    },

    async deleteBoard () {
      const vm = this
      try {
        confirm('정말 삭제하시겠습니까?') && await deleteBoardItem(vm.boardId)
      } catch (error) {
        // Error page
        console.log(error)
      }
      vm.$router.push({ name: 'Board List' })
    },

    async createLikes () {
      const vm = this
      const likes = {
        userId: vm.userId,
        boardId: vm.boardId
      }

      if (vm.isLikes === true) {
        vm.isLikes = false
        vm.responseBoard.likes = vm.responseBoard.likes + 1
        await postLikesItem(likes)
      } else {
        vm.isLikes = true
        vm.responseBoard.likes = vm.responseBoard.likes - 1
        await deleteLikesItem(vm.userId, vm.boardId)
      }
    }
  }
}
</script>

<style scoped>
#my-v-html
  >>> pre {
    background-color: black;
    color: #f8f8f2;
    overflow: visible;
  }
#my-v-html
  >>> blockquote {
    margin-left: 1%;
    padding-left: 1%;
    border-left: 5px solid #eeeeee;
    color: grey;
  }
#my-v-html
  >>> strong {
    font-weight: bold
  }
#my-v-html
  >>> .ql-align-center {
    text-align: center;
  }
#my-v-html
  >>> .ql-align-right {
    text-align: right;
  }
.v-card {
  padding-bottom: 1%;
  margin-bottom: 3%;
}
</style>

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
                  <h6 class="category text-gray font-weight-thin mb-3"> CEO / {{ responseBoard.userName }}</h6>
                  <h6 class="category text-gray font-weight-thin mb-3">교육명 - {{ responseBoard.educationTitle }}</h6><br>
                  <h3 class="card-title font-weight-light">{{ responseBoard.title }}</h3>
                  <p
                    class="font-weight-light"
                    v-html="responseBoard.content"/>
                  <v-flex>
                    <v-btn
                      small
                      color="teal"
                      round
                      class="font-weight-light"
                      @click="createLikes">
                      <div
                        v-if="isLikes">
                        <v-icon
                          color="white"
                          small>mdi-thumb-up</v-icon>
                      </div>
                      <div
                        v-if="!isLikes">
                        <v-icon
                          color="black"
                          small>mdi-thumb-up</v-icon>
                      </div>
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
          <material-card>
            <v-flex xs12>
              <!-- 댓글 출력 -->
              <v-card
                v-for="comment in commentList"
                :key="comment.id">
                <div
                  v-if="comment.id !== isChangeCommentId"
                  id="my-div">
                  <p
                    id="my-p"
                    class="text-gray font-weight-thin mb-5 text-xs-left"
                    v-html="comment.content"/>
                  <h6
                    class="text-gray font-weight-thin mb-3 text-xs-right"
                    style="margin-bottom:1rem !important;">
                    {{ comment.userName }}<br>
                    {{ comment.modifiedDate }}
                  </h6>
                  <v-layout
                    v-if="userId === comment.userId"
                    id="my-v-layout"
                    row
                    reverse>
                    <h6
                      id="my-h6"
                      class="text-gray font-weight-thin mb-0"
                      @click="deleteComment(comment.id)"
                    >삭제</h6>
                    &nbsp;
                    <h6
                      id="my-h6"
                      class="text-gray font-weight-thin mb-0"
                      @click="changeComment(comment, true)"
                    >수정</h6>
                  </v-layout>
                </div>

                <!-- 댓글 수정 -->
                <v-flex
                  v-if="isChangeComment && (comment.id == isChangeCommentId)"
                  text-xs-right>
                  <v-textarea
                    v-model="modifiedCommentContent"
                    auto-grow
                    solo
                    class="green-input"
                    label="댓글"
                    rows="5"
                  />
                  <v-btn
                    small
                    color="success"
                    round
                    @click="updateComment(comment.id)"
                  >등록</v-btn>
                  <v-btn
                    small
                    color="orange"
                    round
                    @click="changeComment(comment, false)"
                  >취소</v-btn>
                </v-flex>
              </v-card>
            </v-flex>

            <!-- 댓글 생성 -->
            <v-flex text-xs-right>
              <v-textarea
                v-model="commentContent"
                auto-grow
                solo
                class="green-input"
                label="댓글"
                rows="5"
              />
              <v-btn
                small
                color="success"
                round
                @click="createComment"
              >등록</v-btn>
            </v-flex>
          </material-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import bus from '../utils/bus.js'
import boardEvent from '../api/board/boardEvent.js'
import commentEvent from '../api/comment/commentEvent.js'
import likesEvent from '../api/likes/likesEvent.js'

export default {
  data: () => ({
    // Board
    responseBoard: {},
    userId: {},
    boardId: {},
    commentList: [],

    // Comment
    commentContent: null,
    modifiedCommentContent: null,

    // Flag
    isLikes: true,
    isGetData: false,
    isUser: false,
    isChangeComment: false,
    isChangeCommentId: null
  }),

  async created () {
    // Data
    const vm = this
    vm.userId = 2
    vm.boardId = vm.$route.params.boardId

    // Logic
    bus.$emit('start:spinner')
    this.checkLikes()
    this.readBoardOne()
  },

  methods: {
    // Board
    readBoardOne () {
      boardEvent.readBoardOne(this)
    },

    deleteBoard () {
      boardEvent.deleteBoardWithConfirm(this, 'board')
    },

    // Comment
    createComment () {
      commentEvent.createComment(this)
    },

    updateComment (commentId) {
      commentEvent.updateComment(this, commentId)
    },

    deleteComment (commentId) {
      commentEvent.deleteCommentWithConfirm(this, commentId, 'comment')
    },

    // Likes
    createLikes () {
      likesEvent.createLikes(this)
    },

    checkLikes () {
      likesEvent.checkLikes(this)
    },

    /** Event */
    changeComment (comment, flag) {
      commentEvent.changeComment(this, comment, flag)
    }
  }
}
</script>

<style scoped>
#my-div {
  /* top right bottom left */
  padding: 2% 1% 0% 2%;
}

#my-p {
  font-size: small !important;
}

#my-v-flex {
  margin-top:0;
  padding-top:0;
}

#my-h6 {
  cursor: pointer;
}
#my-h6:hover {
  font-size: 0.8rem !important;
}

#my-v-layout {
  margin: 0;
  padding-bottom:1%;
}

.v-card {
  padding-bottom: 1%;
  margin-bottom: 3%;
}
</style>

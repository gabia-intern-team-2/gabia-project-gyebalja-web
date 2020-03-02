<template>
  <!-- 카드  -->
  <material-card>
    <v-flex xs12>

      <!-- 댓글 출력 -->
      <v-card
        v-for="comment in comments"
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
</template>

<script>
import { postCommentItem, putCommentItem, deleteCommentItem } from '../api/comment/comment.js'

export default {
  props: {
    comments: {
      type: Array,
      default: null
    },
    userId: {
      type: Number,
      default: null
    },
    boardId: {
      type: String,
      default: null
    }
  },

  data: () => ({
    // Comment
    commentList: [],
    commentContent: null,
    modifiedCommentContent: null,

    // Flag
    isChangeComment: false,
    isChangeCommentId: null
  }),

  methods: {
    async createComment () {
      const vm = this
      const comment = {
        content: vm.commentContent,
        userId: vm.userId,
        boardId: vm.boardId
      }

      try {
        await postCommentItem(comment)
        vm.$router.go()
      } catch (error) {
      // Error Page
        console.log(error)
        vm.$router.push({ name: 'Board List' })
      }
    },

    async updateComment (commentId) {
      const vm = this
      const comment = {
        content: vm.modifiedCommentContent,
        userId: vm.userId,
        boardId: vm.boardId
      }

      try {
        await putCommentItem(commentId, comment)
        vm.$router.go()
      } catch (error) {
        vm.$router.push({ name: 'Board List' })
      }
    },

    deleteComment (commentId) {
      const vm = this
      confirm('정말 삭제하시겠습니까?') && deleteCommentItem(commentId)
        .then(response => vm.$router.go())
        .catch(error => console.log(error))
    },

    changeComment (comment, flag) {
      const vm = this
      if (flag === true) {
        vm.isChangeComment = true
        vm.isChangeCommentId = comment.id
        vm.modifiedCommentContent = comment.content
      } else {
        vm.isChangeComment = false
        vm.isChangeCommentId = null
        vm.modifiedCommentContent = null
      }
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

import {
  postCommentItem,
  putCommentItem,
  deleteCommentItem } from './comment.js'

export default {

  async createComment (vm) {
    const comment = {
      content: vm.commentContent,
      userId: vm.userId,
      boardId: vm.boardId
    }

    try {
      await postCommentItem(comment)
    } catch (error) {
      // Error Page
      vm.$router.push({ name: 'Board List' })
    }

    vm.$router.go()
  },

  async updateComment (vm, commentId) {
    const comment = {
      content: vm.modifiedCommentContent,
      userId: vm.userId,
      boardId: vm.boardId
    }

    await putCommentItem(commentId, comment)

    vm.$router.go()
  },

  async deleteComment (vm, commentId) {
    await deleteCommentItem(commentId)

    vm.$router.go()
  },

  async deleteCommentWithConfirm (vm, commentId, message) {
    confirm('정말 삭제하시겠습니까?') && this.deleteComment(vm, commentId)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  },

  changeComment (vm, comment, flag) {
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

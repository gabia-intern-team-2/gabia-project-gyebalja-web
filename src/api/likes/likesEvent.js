import {
  postLikesItem,
  getLikesItem,
  deleteLikesItem } from './likes.js'

export default {

  async createLikes (vm) {
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
  },

  async checkLikes (vm) {
    try {
      await getLikesItem(vm.userId, vm.boardId)
      vm.isLikes = false
    } catch (error) {
      console.log(error)
      vm.isLikes = true
    }
  }
}

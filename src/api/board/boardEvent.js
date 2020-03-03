import bus from '../../utils/bus.js'

import {
  getBoardItem,
  putBoardItem,
  postBoardItem,
  deleteBoardItem } from './board.js'

export default {

  async createBoard (vm) {
    const board = {
      title: vm.title,
      content: vm.content,
      educationId: vm.educationId,
      userId: 866,
      boardImg: vm.boardImg
    }

    try {
      await postBoardItem(board)
      vm.$router.push({ name: 'Board List' })
    } catch (error) {
      console.log(error)
    }
  },

  async readBoardOne (vm) {
    try {
      vm.responseBoard = await getBoardItem(vm.$route.params.boardId)
      vm.responseBoard = vm.responseBoard.data.response
      vm.commentList = vm.responseBoard.commentList
      vm.isGetData = true
      bus.$emit('end:spinner')
    } catch (error) {
      // Error Page
      vm.$router.push({ name: 'Board List' })
      console.log(error)
    }
  },

  async readBoardList (vm) {
    this.$store.dispatch('FETCH_BOARDS', this.$route.name)
  },

  async updateBoard (vm, board) {
    try {
      await putBoardItem(vm.responseBoard.id, board)
      vm.$router.push({ name: 'Board Detail', params: { boardId: vm.responseBoard.id } })
    } catch (error) {
      console.log(error)
      vm.$router.push({ name: 'Board List' })
    }
  },

  async deleteBoard (vm) {
    try {
      await deleteBoardItem(vm.boardId)
    } catch (error) {
      // Error Page
      vm.$router.push({ name: 'Board List' })
    }
    vm.$router.push({ name: 'Board List' })
  },

  async deleteBoardWithConfirm (vm, message) {
    confirm('정말 삭제하시겠습니까?') && this.deleteBoard(vm)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
}

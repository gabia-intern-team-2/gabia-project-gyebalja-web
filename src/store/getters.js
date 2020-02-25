// https://vuex.vuejs.org/en/getters.html

export default {
  fetchedBoards (state) {
    return state.boards.response
  },
  fetchedEducations (state) {
    return state.educations.response
  }
}

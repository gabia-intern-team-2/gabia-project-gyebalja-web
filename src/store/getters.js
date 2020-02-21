// https://vuex.vuejs.org/en/getters.html

export default {
  fetchedBoards (state) {
    console.log(state.boards.response)
    return state.boards.response
  },
  fetchedEducations (state) {
    return state.educations.response
  }
}

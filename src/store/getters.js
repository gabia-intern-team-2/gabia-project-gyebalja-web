// https://vuex.vuejs.org/en/getters.html
export default {
  fetchedBoards (state) {
    return state.boards
  },
  fetchedEducations (state) {
    return state.educations.response
  },
  fetchedDepartments (state) {
    return state.departments
  }
}

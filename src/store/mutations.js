// https://vuex.vuejs.org/en/mutations.html
export default {
  SET_BOARDS (state, boards) {
    state.boards = boards
  },
  SET_EDUCATIONS (state, educations) {
    state.educations = educations
  },
  SET_DEPARTMENTS (state, departments) {
    state.departments = departments
  },
  SET_USER (state, user) {
    state.user = user
  }
}

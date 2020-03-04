// https://vuex.vuejs.org/en/actions.html
import { getBoardList } from '../api/board/board.js'
import { getMyEducationList } from '../api/education/education.js'
import { getDepartmentList } from '../api/department/department.js'

export default {
  async FETCH_BOARDS (context) {
    const response = await getBoardList()
    context.commit('SET_BOARDS', response.data.response)
  },
  async FETCH_EDUCATIONS (context, userId) {
    const response = await getMyEducationList(userId)
    context.commit('SET_EDUCATIONS', response.data)
  },
  async FETCH_DEPARTMENTS (context) {
    const response = await getDepartmentList()
    context.commit('SET_DEPARTMENTS', response.data.response)
  }
}

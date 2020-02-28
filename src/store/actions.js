// https://vuex.vuejs.org/en/actions.html
import { getBoardList } from '../api/board/board.js'
import { getEducationList } from '../api/education/education.js'

export default {
  async FETCH_BOARDS (context) {
    const response = await getBoardList()
    context.commit('SET_BOARDS', response.data.response)
  },
  FETCH_EDUCATIONS (context, userId) {
    return getEducationList(userId)
      .then(response => context.commit('SET_EDUCATIONS', response.data))
      .catch()
  }
}

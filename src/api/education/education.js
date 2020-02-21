import axios from 'axios'
import { config } from '../index.js'

/** 댓글 API */
/** 조회 - 교육 (전체) */
function getEducationList (userId) {
  return axios.get(`${config.baseUrl}users/${userId}/educations`)
}

export {
  getEducationList
}

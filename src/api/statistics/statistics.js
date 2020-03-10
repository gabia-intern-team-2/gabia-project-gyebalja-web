import axios from 'axios'
import { config } from '../index.js'

axios.defaults.withCredentials = true

/** 통계 API */
/** 조회 - 메인 화면 */
function getStatisticsMain () {
  return axios.get(`${config.baseUrl}statistics/main`)
}

/** 조회 - 사용자 교육 관리 페이지 */
function getStatisticsEducation (userId) {
  return axios.get(`${config.baseUrl}statistics/education/users/${userId}`)
}

export {
  getStatisticsMain,
  getStatisticsEducation
}

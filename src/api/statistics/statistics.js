import axios from 'axios'
import { config } from '../index.js'

/** 통계 API */
/** 조회 - 메인 화면 */
function getStatisticsMain () {
  return axios.get(`${config.baseUrl}statistics/main`)
}

export {
  getStatisticsMain
}

import axios from 'axios'
import { config } from '../index.js'

axios.defaults.withCredentials = true

/** 부서 관리 API */
/** 조회 - 부서 랭킹 */
function getDepartmentRanking (deptId) {
  return axios.get(`${config.baseUrl}ranks?deptId=${deptId}`)
}

export {
  getDepartmentRanking
}

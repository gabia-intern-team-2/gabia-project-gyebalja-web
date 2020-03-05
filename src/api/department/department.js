import axios from 'axios'
import { config } from '../index.js'

axios.defaults.withCredentials = true

/** 부서 API */
// 조회 - 부서 (전체)
function getDepartmentList () {
  return axios.get(`${config.baseUrl}departments`)
}

export {
  getDepartmentList
}

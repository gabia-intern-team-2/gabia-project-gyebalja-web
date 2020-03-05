import axios from 'axios'
import { config } from '../index.js'

/** 부서 API */
// 조회 - 부서 (전체)
function getDepartmentList () {
  return axios.get(`${config.baseUrl}departments`, { withCredentials: true })
}

export {
  getDepartmentList
}

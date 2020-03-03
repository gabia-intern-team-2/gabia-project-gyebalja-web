import axios from 'axios'
import { config } from '../index.js'

// 로그인 페이지 요청
function getLoginRedirect () {
  return axios.get(`${config.baseUrl}/login`)
}

export {
  getLoginRedirect
}

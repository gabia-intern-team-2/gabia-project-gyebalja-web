import axios from 'axios'
import { config } from '../index.js'

// 조회 - 로그인 페이지
function getLoginRedirect () {
  return axios.get(`${config.baseUrl}login`)
}

// 조회 - 등록 사용자 여부
function getIsRegisterUser () {
  return axios.get(`${config.baseUrl}login/isRegister`)
}

// 조회 - 인증 사용자 여부
function getIsAuthenticationUser () {
  return axios.get(`${config.baseUrl}auth/user`)
}

export {
  getLoginRedirect,
  getIsRegisterUser,
  getIsAuthenticationUser
}

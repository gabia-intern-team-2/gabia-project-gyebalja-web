import axios from 'axios'
import { config } from '../index.js'

axios.defaults.withCredentials = true

/** 교육 API */
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

// 조회 - 가비아 사용자 프로필
function getGabiaProfile () {
  return axios.get(`${config.baseUrl}gabia-user`)
}

// 로그아웃 요청
function logout () {
  return axios.get(`${config.baseUrl}logout`)
}

export {
  getLoginRedirect,
  getIsRegisterUser,
  getIsAuthenticationUser,
  getGabiaProfile,
  logout
}

// Pass cookies with axios or fetch requests - https://dev.to/hugo__df/pass-cookies-with-axios-or-fetch-requests-5881

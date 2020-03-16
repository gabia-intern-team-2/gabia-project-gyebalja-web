import axios from 'axios'
import { config } from '../index.js'

axios.defaults.withCredentials = true

/** 사용자 API */
// 생성 - 사용자
function postUserItem (user) {
  return axios.post(`${config.baseUrl}users`, user)
}

// 조회 - 사용자
function getUserItem (userId) {
  return axios.get(`${config.baseUrl}users/${userId}`)
}

// 수정 - 사용자
function putUserItem (userId, user) {
  return axios.put(`${config.baseUrl}users/${userId}`, user)
}

// 조회 - 사용자 (토큰)
function getUserItemByToken () {
  return axios.get(`${config.baseUrl}users`)
}

// 저장 - 사용자 이미지
function postUserImgItem (userImg) {
  return axios.post(`${config.baseUrl}userImgs`, userImg)
}

export {
  postUserItem,
  getUserItem,
  putUserItem,
  getUserItemByToken,
  postUserImgItem
}

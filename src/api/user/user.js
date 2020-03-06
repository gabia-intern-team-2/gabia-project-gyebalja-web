import axios from 'axios'
import { config } from '../index.js'

// 생성 - 사용자
function postUserItem (user) {
  return axios.post(`${config.baseUrl}users`, user, { withCredentials: true })
}
// 조회 - 사용자
function getUserItem (userId) {
  return axios.get(`${config.baseUrl}users/${userId}`, { withCredentials: true })
}
// 수정 - 사용자
function putUserItem (userId, user) {
  return axios.put(`${config.baseUrl}users/${userId}`, user, { withCredentials: true })
}

export {
  postUserItem,
  getUserItem,
  putUserItem
}

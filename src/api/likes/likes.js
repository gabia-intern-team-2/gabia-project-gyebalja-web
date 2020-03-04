import axios from 'axios'
import { config } from '../index.js'

/** 좋아요 API */
// 생성 - 좋아요 (한 개)
function postLikesItem (likes) {
  return axios.post(`${config.baseUrl}likes`, likes)
}

// 조회 - 좋아요 (한 개)
function getLikesItem (userId, boardId) {
  return axios.get(`${config.baseUrl}likes/users/${userId}/boards/${boardId}`)
}

// 삭제 - 좋아요 (한 개)
function deleteLikesItem (userId, boardId) {
  return axios.delete(`${config.baseUrl}likes/users/${userId}/boards/${boardId}`)
}

export {
  postLikesItem,
  getLikesItem,
  deleteLikesItem
}

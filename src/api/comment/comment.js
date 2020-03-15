import axios from 'axios'
import { config } from '../index.js'

axios.defaults.withCredentials = true

/** 댓글 API */
// 생성 - 댓글 (한 개)
function postCommentItem (comment) {
  return axios.post(`${config.baseUrl}comments`, comment)
}

// 조회 - 댓글 (전체)
function getCommentList (boardId) {
  return axios.get(`${config.baseUrl}boards/${boardId}/comments`)
}

// 수정 - 댓글 (한 개)
function putCommentItem (commentId, comment) {
  return axios.put(`${config.baseUrl}comments/${commentId}`, comment)
}

// 삭제 - 댓글 (한 개)
function deleteCommentItem (commentId) {
  return axios.delete(`${config.baseUrl}comments/${commentId}`)
}

export {
  postCommentItem,
  getCommentList,
  putCommentItem,
  deleteCommentItem
}

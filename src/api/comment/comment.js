import axios from 'axios'
import { config } from '../index.js'

/** 댓글 API */
// 생성 - 댓글 (한 개)
function postCommentItem (comment) {
  return axios.post(`${config.baseUrl}comments`, comment, { withCredentials: true })
}

// 수정 - 댓글 (한 개)
function putCommentItem (commentId, comment) {
  return axios.put(`${config.baseUrl}comments/${commentId}`, comment, { withCredentials: true })
}

// 삭제 - 댓글 (한 개)
function deleteCommentItem (commentId) {
  return axios.delete(`${config.baseUrl}comments/${commentId}`, { withCredentials: true })
}

export {
  postCommentItem,
  putCommentItem,
  deleteCommentItem
}

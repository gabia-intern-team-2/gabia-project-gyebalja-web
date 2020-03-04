import axios from 'axios'
import { config } from '../index.js'

/** 게시글 API */
// 생성 - 게시글 (한 개)
function postBoardItem (board) {
  return axios.post(`${config.baseUrl}boards`, board, { withCredentials: true })
}

// 조회 - 게시글 (한 개)
function getBoardItem (boardId) {
  return axios.get(`${config.baseUrl}boards/${boardId}`, { withCredentials: true })
}

// 조회 - 게시글 (전체)
function getBoardList () {
  return axios.get(`${config.baseUrl}boards`, { withCredentials: true })
}

// 수정 - 게시글 (한 개)
function putBoardItem (boardId, board) {
  return axios.put(`${config.baseUrl}boards/${boardId}`, board, { withCredentials: true })
}

// 삭제 - 게시글 (한 개)
function deleteBoardItem (boardId) {
  return axios.delete(`${config.baseUrl}boards/${boardId}`, { withCredentials: true })
}

export {
  postBoardItem,
  getBoardList,
  getBoardItem,
  putBoardItem,
  deleteBoardItem
}

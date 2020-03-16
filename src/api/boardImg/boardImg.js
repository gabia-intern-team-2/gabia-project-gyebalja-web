import axios from 'axios'
import { config } from '../index.js'

axios.defaults.withCredentials = true

/** 게시글 API */
// 생성 - 게시글 이미지 (한 개)
function postBoardImgItem (boardImg) {
  return axios.post(`${config.baseUrl}boardImgs`, boardImg)
}

export {
  postBoardImgItem
}

import axios from 'axios'
import { config } from '../index.js'

// 카테고리 목록 요청
function getCategoryList () {
  return axios.get(`${config.baseUrl}categories`)
}
// 카테고리 단건 요청
function getCategoryItem (categoryId) {
  return axios.get(`${config.baseUrl}categories/${categoryId}`)
}

export {
  getCategoryList,
  getCategoryItem
}

import axios from 'axios'
import { config } from '../index.js'

/** 카테고리 API */
// 조회 - 카테고리 (전체)
function getCategoryList () {
  return axios.get(`${config.baseUrl}categories`, { withCredentials: true })
}

// 조회 - 카테고리 (한 개)
function getCategoryItem (categoryId) {
  return axios.get(`${config.baseUrl}categories/${categoryId}`, { withCredentials: true })
}

export {
  getCategoryList,
  getCategoryItem
}

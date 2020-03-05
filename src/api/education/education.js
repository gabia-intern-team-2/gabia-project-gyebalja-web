import axios from 'axios'
import { config } from '../index.js'

/** 교육 API */
// 생성 - 교육 (한 개)
function postEducation (educations) {
  return axios.post(`${config.baseUrl}educations`, educations, { withCredentials: true })
}

// 조회 - 사용자 교육 (전체)
function getMyEducationList (userId) {
  return axios.get(`${config.baseUrl}users/${userId}/educations`, { withCredentials: true })
}

// 조회 - 사용자 교육 (한 개)
function getMyEducationItem (educationId) {
  return axios.get(`${config.baseUrl}educations/${educationId}`, { withCredentials: true })
}

// 수정 - 사용자 교육 (한 개)
function putMyEducationItem (educationId, editedEducation) {
  return axios.put(`${config.baseUrl}educations/${educationId}`, editedEducation, { withCredentials: true })
}

// 삭제 - 사용자 교육 (한 개)
function deleteMyEducationItem (educationId) {
  return axios.delete(`${config.baseUrl}educations/${educationId}`, { withCredentials: true })
}

export {
  postEducation,
  getMyEducationList,
  getMyEducationItem,
  deleteMyEducationItem,
  putMyEducationItem
}

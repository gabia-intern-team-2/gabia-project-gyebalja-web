// https://vuex.vuejs.org/en/state.html

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    boards: [],
    educations: [],
    departments: [],
    user: [],
    boardHeaders: [
      {
        sortable: false,
        text: 'No',
        value: Number
      },
      {
        sortable: false,
        text: '제목',
        value: 'country'
      },
      {
        sortable: false,
        text: '조회수',
        value: 'views'
      },
      {
        sortable: false,
        text: '수정일',
        value: 'modifiedDate'
      }
    ],
    educationHeaders: [
      {
        sortable: false,
        text: '교육명',
        value: 'title',
        width: '480px'
      },
      {
        sortable: false,
        text: '시작날짜',
        value: 'startDate'
      },
      {
        sortable: false,
        text: '종료날짜',
        value: 'endDate'
      },
      {
        sortable: false,
        text: '시간',
        value: 'totalHours'
      },
      {
        sortable: false,
        text: '교육유형',
        value: 'type'
      },
      {
        sortable: false,
        text: '장소',
        value: 'place'
      },
      {
        sortable: false,
        text: '카테고리',
        value: 'category'
      }
    ]
  }
}

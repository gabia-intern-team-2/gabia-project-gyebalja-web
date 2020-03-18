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
        value: 'country',
        align: 'left'
      },
      {
        sortable: false,
        text: '조회수',
        value: 'views',
        align: 'right'
      },
      {
        sortable: false,
        text: '생성일',
        value: 'createdDate',
        align: 'right'
      },
      {
        sortable: false,
        text: '수정일',
        value: 'modifiedDate',
        align: 'right'
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
        value: 'totalHours',
        align: 'center'
      },
      {
        sortable: false,
        text: '교육유형',
        value: 'type',
        align: 'center'
      },
      {
        sortable: false,
        text: '장소',
        value: 'place'
      },
      {
        sortable: false,
        text: '카테고리',
        value: 'category',
        align: 'center'
      }
    ],
    rankingHeaders: [
      {
        sortable: false,
        text: '순위',
        value: Number
      },
      {
        sortable: false,
        text: '이름',
        value: 'country'
      },
      {
        sortable: false,
        text: '닉네임',
        value: 'views'
      },
      {
        sortable: false,
        text: '직책',
        value: 'createdDate'
      },
      {
        sortable: false,
        text: '팀',
        value: 'modifiedDate',
        align: 'center'
      },
      {
        sortable: false,
        text: '총 교육시간',
        value: 'modifiedDate',
        align: 'center'
      },
      {
        sortable: false,
        text: '총 교육건수',
        value: 'modifiedDate',
        align: 'center'
      }
    ],

    positionList: [
      {
        positionId: 1,
        positionName: '사장'
      },
      {
        positionId: 2,
        positionName: '부사장'
      },
      {
        positionId: 3,
        positionName: '팀장'
      },
      {
        positionId: 4,
        positionName: '팀원'
      }
    ],

    genderList: ['MALE', 'FEMALE'],

    edutypeList: ['ONLINE', 'OFFLINE']
  }
}

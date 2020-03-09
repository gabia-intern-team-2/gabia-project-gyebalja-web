<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-layout
        row
      >
        <v-flex
          sm12
          xs12
          lg12
          md12
        >
          <!-- 통계 1 - 부서 내 나의 순위 -->
          <material-stats-card
            :value="rank +' / '+ teamMembers"
            :icon="rank"
            color="orange"
            title="부서 내 나의 순위"
            height="125px"
            min-width="250px"
          />
          <!-- 통계 2 - 주력 카테고리 -->
          <material-stats-card
            :value="mainCategory"
            color="purple"
            icon="mdi-finance"
            title="주력 카테고리"
            height="125px"
            min-width="250px"
          />
        </v-flex>
        <!-- 통계 3 - 나 vs 가비아 -->
        <v-flex
          sm12
          xs12
          md12
          lg12
        >
          <material-chart-card
            :data="hoursData.data"
            :options="hoursData.options"
            :responsive-options="hoursData.responsiveOptions"
            color="red"
            type="Bar"
            height="275px"
            min-width="250px"
          >
            <h4 class="title font-weight-light">{{ currentYear }}년 나 vs 가비아 평균</h4>
            <p class="category d-inline-flex font-weight-light">사내 인원별 교육시간 평균</p>

            <template slot="actions">
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock-outline
              </v-icon>
              <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
            </template>
          </material-chart-card>
        </v-flex>
        <!-- 통계 4 - 나의 태그 Top 3 -->
        <v-flex
          sm12
          xs12
          md12
          lg12
        >
          <material-chart-card
            :data="tagData.data"
            color="green"
            type="Bar"
            height="275px"
            min-width="250px"
          >
            <h4 class="title font-weight-light">나의 태그 Top 3</h4>
            <p class="category d-inline-flex font-weight-light"> <span class="green--text">최고 관심 : {{ mainTag }}</span>&nbsp;</p>

            <template slot="actions">
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock-outline
              </v-icon>
              <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
            </template>
          </material-chart-card>
        </v-flex>
        <!-- 통계 5 - 월별 교육 추이 -->
        <v-flex
          sm12
          xs12
          md12
          lg12
        >
          <material-chart-card
            :data="monthlyData.data"
            :options="monthlyData.options"
            color="info"
            type="Line"
            height="275px"
            min-width="350px"
          >
            <h4 class="title font-weight-light">{{ currentYear }}년 나의 월별 교육 추이</h4>
            <p class="category d-inline-flex font-weight-light">
              <v-icon
                color="green"
                small
              >
                mdi-arrow-up
              </v-icon>
              <span class="green--text">55%</span>&nbsp;
              increase in today's sales
            </p>

            <template slot="actions">
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock-outline
              </v-icon>
              <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
            </template>
          </material-chart-card>
        </v-flex>
        <!-- 유저 프로필 요약 -->
        <v-flex
          sm12
          xs12
          md12
          lg12
        >
          <material-card class="v-card-profile">
            <v-avatar
              slot="offset"
              class="mx-auto d-block"
              size="120"
            >
              <img
                src="../images/dog.jpg"
              >
            </v-avatar>
            <v-card-text class="text-xs-center">
              <h6 class="category text-gray font-weight-thin mb-3">인턴 / HR인사팀</h6>
              <h4 class="card-title font-weight-light">정태균(Thor)</h4>
              <router-link
                :to="{name: 'User Profile'}">
                <v-btn
                  color="success"
                  round
                  class="font-weight-light"
                >상세 보기</v-btn>
              </router-link>
            </v-card-text>
          </material-card>
        </v-flex>
      </v-layout>
      <!-- 간편 수정 Dialog -->
      <v-flex
        md12
      >
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation>
          <v-dialog
            v-model="dialog"
            max-width="700px">
            <v-card>
              <v-card-title>
                <span class="headline">나의 교육 간편 수정</span>
                <v-spacer/>
                <h6 class="red--text">* 교육 내용, 해시태그는 상세페이지에서 수정가능합니다.</h6>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <!-- 교육 명 입력 란 -->
                    <v-flex
                      xs12
                      sm6
                      md8>
                      <v-text-field
                        v-model="editedItem.title"
                        :rules="[v => !!v || '필수 입력사항입니다']"
                        class="purple-input"
                        label="교육 명"/>
                    </v-flex>
                    <!-- 카테고리 입력 란 -->
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-select
                        v-model="editedItem.category.id"
                        :items="categoryList"
                        :rules="[v => !!v || '필수 입력사항입니다']"
                        label="카테고리(Category)"
                        class="purple-input"
                        prepend-icon="mdi-animation"
                        item-text="name"
                        item-value="id"
                        required
                        chips
                        color="purple"
                      />
                    </v-flex>
                    <!-- 시작날짜 입력 란 -->
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-text-field
                        v-model="editedItem.startDate"
                        :rules="dateRules"
                        class="purple-input"
                        hint="YYYY-MM-DD"
                        label="시작 날짜"/>
                    </v-flex>
                    <!-- 종료날짜 입력 란 -->
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-text-field
                        v-model="editedItem.endDate"
                        :rules="dateRules"
                        class="purple-input"
                        hint="YYYY-MM-DD"
                        label="종료 날짜"/>
                    </v-flex>
                    <!-- 교육시간 입력 란 -->
                    <v-flex
                      xs12
                      sm6
                      md4>
                      <v-text-field
                        v-model="editedItem.totalHours"
                        :rules="totalHoursRules"
                        class="purple-input"
                        type="number"
                        hint="숫자입력(시간)"
                        label="교육시간"/>
                    </v-flex>
                    <!-- 교육 유형 입력 란 -->
                    <v-flex
                      xs12
                      sm6
                      md6>
                      <v-select
                        v-model="editedItem.type"
                        :items="edutypeList"
                        :rules="[v => !!v || '필수 입력사항입니다']"
                        label="교육유형"
                        class="purple-input"
                        prepend-icon="mdi-animation"
                        required
                        chips
                        color="purple"
                      />
                    </v-flex>
                    <!-- 교육 장소 입력 란 -->
                    <v-flex
                      xs12
                      sm6
                      md6>
                      <v-text-field
                        v-model="editedItem.place"
                        label="교육 장소"/>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click.native="cancle">취소</v-btn>
                <v-btn
                  :disabled="!valid"
                  color="blue darken-1"
                  flat
                  @click.native="update">수정</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>
        <!-- 카드 -->
        <material-card
          color="blue"
          title="My Educations"
          text="나의 교육 현황 리스트"
        >
          <v-data-table
            :headers="this.$store.state.state.educationHeaders"
            :items="items"
            :pagination.sync="pagination"
            hide-actions
            class="elevation-1"
          >
            <!-- 테이블 -->
            <!-- 테이블 헤더 -->
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-info text--darken-3"
                v-text="header.text"
              />
            </template>
            <!-- 테이블 본문 -->
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <router-link
                id="router-link"
                :to="{name: 'Education Detail', params: {educationId: item.id}}">
                <td>{{ item.title }}</td>
              </router-link>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>
              <td class="text-xs-center">{{ item.totalHours }}</td>
              <td class="text-xs-center">
                <v-chip
                  :color="getColor(item.type)"
                  dark
                  class="text-xs-center">
                  <td>{{ item.type }}</td>
                </v-chip>
              </td>
              <td>{{ item.place }}</td>
              <td class="text-xs-center">{{ item.category.name }}</td>
              <v-tooltip
                top
                content-class="top">
                <v-btn
                  slot="activator"
                  class="v-btn--simple"
                  color="info"
                  icon
                  @click="editEducation(item)"
                >
                  <v-icon color="teal">mdi-pen</v-icon>
                </v-btn>
                <span>수정</span>
              </v-tooltip>
              <v-tooltip
                top
                content-class="top">
                <v-btn
                  slot="activator"
                  class="v-btn--simple"
                  color="danger"
                  icon
                  @click="removeEducation(item)"
                >
                  <v-icon color="error">mdi-delete</v-icon>
                </v-btn>
                <span>삭제</span>
              </v-tooltip>
            </template>
            <template slot="no-data">
              <v-alert
                :value="true"
                color="teal"
                icon="mdi-alert">
                나의 교육이 없습니다. 교육을 추가해보세요!:)
              </v-alert>
            </template>
          </v-data-table>
        </material-card>
        <div class="text-xs-center pt-2">
          <v-pagination
            v-model="pagination.page"
            :length="pages"
            color="info"
            circle/>
        </div>
        <!-- 교육 작성 버튼 -->
        <div class="text-xs-center pt-2">
          <router-link to="/myEducation/register"><v-btn
            color="success"
            round
            class="font-weight-light"
          >교육 작성</v-btn></router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { getMyEducationList, deleteMyEducationItem, putMyEducationItem, getMyEducationItem } from '../api/education/education.js'
import { getCategoryItem, getCategoryList } from '../api/category/category.js'
import { getStatisticsEducation } from '../api/statistics/statistics.js'
import bus from '../utils/bus'

export default {
  data () {
    return {
      valid: true,
      totalHoursRules: [
        v => !!v || '필수 입력사항입니다.',
        v => (v && v > 0) || '0보다 큰값을 입력해주세요.'
      ],
      dateRules: [
        v => !!v || '필수 입력사항입니다.',
        v => /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(v) || 'yyyy-mm-dd 형식을 맞춰주세요!'
      ],
      pagination: {},
      dialog: false,
      items: [],
      hashTagString: '',
      categoryList: [],
      edutypeList: ['ONLINE', 'OFFLINE'],
      editedIndex: -1,
      editedItem: {
        title: '',
        startDate: '',
        endDate: '',
        totalHours: 0,
        place: '',
        category: ''
      },
      defaultItem: {
        title: '',
        startDate: '',
        endDate: '',
        totalHours: 0,
        place: '',
        category: ''

      },
      hoursData: {
        data: {
          labels: ['나', '가비아 평균'],
          series: [
            []
          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 0,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 100px)', {
            seriesBarDistance: 10,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      tagData: {
        data: {
          labels: [],
          series: [
            []
          ]
        }
      },
      monthlyData: {
        data: {
          labels: [],
          series: [
            [],
            []
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 0, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      currentYear: 0,
      rank: 0,
      teamMembers: 0,
      mainCategory: '',
      mainTag: ''
    }
  },

  computed: {
    pages () {
      return Math.ceil(this.items.length / 5)
    }
  },
  // 최초 실행 라이프사이클 훅
  async created () {
    bus.$emit('start:spinner')
    try {
      let response = await getMyEducationList(2) // 교육 리스트 요청
      let response2 = await getStatisticsEducation(2) // 통계 리스트 요청
      this.items = response.data.response
      // 월별 교육 통계
      this.monthlyData.data.labels = response2.data.response.monthlyData.months
      this.monthlyData.data.series[0] = response2.data.response.monthlyData.userEducationTimes
      this.monthlyData.data.series[1] = response2.data.response.monthlyData.userEducationCounts
      this.monthlyData.options.high = Math.max(...response2.data.response.monthlyData.userEducationTimes) + 15
      // 나 vs 회사 통계
      this.hoursData.data.series[0].push(response2.data.response.hoursData.individualHour)
      this.hoursData.data.series[0].push(response2.data.response.hoursData.averageCompHour)
      this.hoursData.options.high = Math.max(response2.data.response.hoursData.individualHour, response2.data.response.hoursData.averageCompHour) + 10
      // 등수 데이터
      this.rank = response2.data.response.rankData.rank
      this.teamMembers = response2.data.response.rankData.teamMemberNumber
      // 주력 카테고리 데이터
      this.mainCategory = response2.data.response.categoryData.categoryName
      // 태그 Top 3 데이터
      this.tagData.data.labels = response2.data.response.tagData.tagNames
      this.tagData.data.series[0] = response2.data.response.tagData.totalCount
      this.mainTag = response2.data.response.tagData.tagNames[0]

      this.currentYear = response2.data.response.monthlyData.year
    } catch (error) {
      console.log(error)
    }
    bus.$emit('end:spinner')
  },

  methods: {
    // Online, Offline구분을 위한 색 변경 메서드
    getColor (type) {
      if (type === 'ONLINE') return 'green'
      else if (type === 'OFFLINE') return 'red'
    },
    // 간편 삭제 메서드
    removeEducation (item) {
      const index = this.items.indexOf(item)
      confirm('정말 삭제하시겠습니까?') && this.items.splice(index, 1) && deleteMyEducationItem(item.id)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    // 간편 수정 메서드
    async editEducation (item) {
      try {
        let response = await getCategoryList()
        this.categoryList = response.data.response
      } catch (error) {
        console.log(error)
      }
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    // 간편 수정 - 취소 메서드
    cancle () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    // 간편 수정 - 업데이트 메서드
    async update () {
      if (this.$refs.form.validate() || this.editedIndex > -1) {
        const vm = this
        if (vm.editedItem.startDate > vm.editedItem.endDate) {
          alert('시작날짜가 종료날짜보다 클 수 없습니다.')
        } else {
          try {
            let categoryRes = await getCategoryItem(vm.editedItem.category.id)
            let educationRes = await getMyEducationItem(this.editedItem.id)
            Object.assign(this.items[this.editedIndex], this.editedItem)
            this.items[this.editedIndex].category.name = categoryRes.data.response.name

            for (let i = 0; i < educationRes.data.response.eduTags.length; i++) {
              vm.hashTagString += educationRes.data.response.eduTags[i].tagName + ' '
            }
            let editedEducation = {
              title: vm.editedItem.title,
              content: educationRes.data.response.content,
              startDate: vm.editedItem.startDate,
              endDate: vm.editedItem.endDate,
              totalHours: vm.editedItem.totalHours,
              type: vm.editedItem.type,
              place: vm.editedItem.place,
              hashTag: vm.hashTagString,
              userId: 2,
              categoryId: vm.editedItem.category.id
            }
            await putMyEducationItem(educationRes.data.response.id, editedEducation)
            alert('수정되었습니다!')
            vm.cancle()
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }
}
</script>
<style scoped>
#router-link {
  color: black;
}
</style>

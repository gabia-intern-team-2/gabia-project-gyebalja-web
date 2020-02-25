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
          xs2
        >
          <material-stats-card
            color="orange"
            icon="2"
            title="부서 내 나의 순위"
            value="2 / 14"
            height="125px"
          />
          <material-stats-card
            color="purple"
            icon="mdi-finance"
            title="주력 카테고리"
            value="개발"
            height="125px"
          />
        </v-flex>
        <v-flex
          md12
          sm12
          lg4
        >
          <material-chart-card
            :data="emailsSubscriptionChart.data"
            :options="emailsSubscriptionChart.options"
            :responsive-options="emailsSubscriptionChart.responsiveOptions"
            color="red"
            type="Bar"
          >
            <h4 class="title font-weight-light">Email Subscription</h4>
            <p class="category d-inline-flex font-weight-light">Last Campaign Performance</p>

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

        <!-- 문제 부분 -->
        <v-flex
          xs2
        >
          <material-chart-card
            :data="emailsSubscriptionChart.data"
            :options="emailsSubscriptionChart.options"
            :responsive-options="emailsSubscriptionChart.responsiveOptions"
            color="green"
            type="Bar"
          >
            <h4 class="title font-weight-light">나의 관심분야</h4>
            <p class="category d-inline-flex font-weight-light"> <span class="green--text">최고 관심 : Spring</span>&nbsp;</p>

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

        <v-flex
          md12
          sm12
          lg4
        >
          <material-chart-card
            :data="dailySalesChart.data"
            :options="dailySalesChart.options"
            color="info"
            type="Line"
          >
            <h4 class="title font-weight-light">Daily Sales</h4>
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
        <v-flex
          xs2
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
              <!-- <h6 class="category text-gray font-weight-thin mb-3">email : jtk@gabia.com</h6>
              <h6 class="category text-gray font-weight-thin mb-3">gender : man</h6>
              <h6 class="category text-gray font-weight-thin mb-3">phone : 010-9100-0000</h6>
              <h6 class="category text-gray font-weight-thin mb-3">tel : 031-714-5555</h6> -->
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
      <v-flex
        md12
      >
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
                  <v-flex
                    xs12
                    sm6
                    md8>
                    <v-text-field
                      v-model="editedItem.title"
                      class="purple-input"
                      label="교육 명"/>
                  </v-flex>
                  <v-flex
                    xs12
                    sm6
                    md4>
                    <v-select
                      v-model="editedItem.category.id"
                      :items="categoryList"
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
                  <v-flex
                    xs12
                    sm6
                    md4>
                    <v-text-field
                      v-model="editedItem.startDate"
                      class="purple-input"
                      hint="YYYY-MM-DD"
                      label="시작 날짜"/>
                  </v-flex>
                  <v-flex
                    xs12
                    sm6
                    md4>
                    <v-text-field
                      v-model="editedItem.endDate"
                      class="purple-input"
                      hint="YYYY-MM-DD"
                      label="종료 날짜"/>
                  </v-flex>
                  <v-flex
                    xs12
                    sm6
                    md4>
                    <v-text-field
                      v-model="editedItem.totalHours"
                      class="purple-input"
                      type="number"
                      hint="숫자입력(시간)"
                      label="교육시간"/>
                  </v-flex>
                  <v-flex
                    xs12
                    sm6
                    md6>
                    <v-select
                      v-model="editedItem.type"
                      :items="edutypeList"
                      label="교육유형"
                      class="purple-input"
                      prepend-icon="mdi-animation"
                      required
                      chips
                      color="purple"
                    />
                  </v-flex>
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
                color="blue darken-1"
                flat
                @click.native="update">수정</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <material-card
          color="blue"
          title="My Educations"
          text="나의 교육 현황 리스트"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            :pagination.sync="pagination"
            hide-actions
            class="elevation-1"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-info text--darken-3"
                v-text="header.text"
              />
            </template>
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
      </v-flex>
      <router-link to="/myEducation/register"><v-btn
        color="success"
        round
        class="font-weight-light"
      >교육 작성</v-btn></router-link>
    </v-layout>
  </v-container>
</template>
<script>
import { getMyEducationList, deleteMyEducationItem, putMyEducationItem, getMyEducationItem } from '../api/education/education.js'
import { getCategoryItem, getCategoryList } from '../api/category/category.js'

export default {
  data () {
    return {
      pagination: {},
      dialog: false,
      headers: [
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
      emailsSubscriptionChart: {
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      }
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.items.length / 5)
    }
  },
  created () {
    getMyEducationList(866)
      .then((response) => { this.items = response.data.response })
      .catch(error => console.log(error))
  },
  methods: {
    getColor (type) {
      if (type === 'ONLINE') return 'green'
      else if (type === 'OFFLINE') return 'red'
    },
    removeEducation (item) {
      const index = this.items.indexOf(item)
      confirm('정말 삭제하시겠습니까?') && this.items.splice(index, 1) && deleteMyEducationItem(item.id)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    editEducation (item) {
      getCategoryList()
        .then((response) => { this.categoryList = response.data.response })
        .catch(error => console.log(error))
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    cancle () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    update () {
      if (this.editedIndex > -1) {
        var vm = this

        getCategoryItem(vm.editedItem.category.id)
          .then(response => {
            Object.assign(this.items[this.editedIndex], this.editedItem)
            this.items[this.editedIndex].category.name = response.data.response.name
          })
          .catch(error => console.log(error))

        getMyEducationItem(this.editedItem.id)
          .then(function (response) {
            for (var i = 0; i < response.data.response.eduTags.length; i++) {
              vm.hashTagString += response.data.response.eduTags[i].tagName + ' '
            }
            var editedEducation = {
              title: vm.editedItem.title,
              content: response.data.response.content,
              startDate: vm.editedItem.startDate,
              endDate: vm.editedItem.endDate,
              totalHours: vm.editedItem.totalHours,
              type: vm.editedItem.type,
              place: vm.editedItem.place,
              hashTag: vm.hashTagString,
              userId: 866,
              categoryId: vm.editedItem.category.id
            }
            putMyEducationItem(response.data.response.id, editedEducation)
              .then(alert('수정되었습니다!'))
              .catch(error => console.log(error))
            vm.cancle()
          })
          .catch(error => console.log(error))
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

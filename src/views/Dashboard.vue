<template>
  <div v-if="isGetData">
    <v-container
      fill-height
      fluid
      grid-list-xl
    >
      <v-layout wrap>
        <!-- 통계 1 - 연간 교육 건수, 시간 -->
        <v-flex
          md12
          sm12
          lg6
        >
          <material-chart-card
            :data="yearlyData.data"
            :options="yearlyData.options"
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

        <!-- 통계 2 - 월간 교육 건수, 시간 -->
        <v-flex
          md12
          sm12
          lg6
        >
          <material-chart-card
            :data="monthlyData.data"
            :options="monthlyData.options"
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

        <!-- 통계 3 - 카테고리 -->
        <v-flex
          md12
          sm12
          lg6
        >
          <material-chart-card
            :data="categoryData.data"
            :options="categoryData.options"
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

        <!-- 통계 4 - 태그 -->
        <v-flex
          md12
          sm12
          lg6
        >
          <material-chart-card
            :data="tagData.data"
            :options="tagData.options"
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

        <!-- 게시판 -->
        <!-- 요약 게시판 1 - 교육 게시판 -->
        <v-flex
          md12
          lg12
        >
          <material-card
            color="cyan"
            title="교육 게시판"
          >
            <v-data-table
              :headers="headers"
              :items="this.$store.state.boards.content"
            >
              <template
                slot="headerCell"
                slot-scope="{ header }"
              >
                <span
                  class="font-weight-light text-warning text--darken-3"
                  v-text="header.text"
                />
              </template>
              <template
                slot="items"
                slot-scope="{ item }"
              >
                <td>{{ item.id }}</td>
                <router-link
                  :to="{name:'Board Detail', params:{boardId:item.id}}">
                  <td>{{ item.title }}</td>
                </router-link>
                <td>{{ item.views }}</td>
                <td>{{ item.modifiedDate }}</td>
              </template>
            </v-data-table>
          </material-card>
        </v-flex>

        <!-- 요약 게시판 2 - 개인 교육 내역 -->
        <v-flex
          md12
          lg12
        >
          <material-card
            color="cyan"
            title="개인 교육 내역"
          >
            <v-data-table
              :headers="educationHeaders"
              :items="this.$store.state.educations.response"
            >
              <template
                slot="headerCell"
                slot-scope="{ header }"
              >
                <span
                  class="font-weight-light text-warning text--darken-3"
                  v-text="header.text"
                />
              </template>
              <template
                slot="items"
                slot-scope="{ item }"
              >
                <router-link
                  :to="{name:'Education Detail', params:{educationId:item.id}}">
                  <td>{{ item.title }}</td>
                </router-link>
                <td>{{ item.startDate }}</td>
                <td>{{ item.endDate }}</td>
                <td>{{ item.totalHours }}hr</td>
                <td>{{ item.type }}</td>
                <td>{{ item.place }}</td>
                <td>{{ item.category.name }}</td>
              </template>
            </v-data-table>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import bus from '../utils/bus.js'
import statisticsEvent from '../api/statistics/statisticsEvent.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      userId: {},
      yearlyData: {
        data: {
          labels: [],
          series: []
        }
      },
      monthlyData: {
        data: {
          labels: [],
          series: []
        }
      },
      categoryData: {
        data: {
          labels: [],
          series: []
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 20,
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
      tagData: {
        data: {
          labels: [],
          series: []
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 5,
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
      headers: [
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
      ],
      // Flag
      isGetData: false
    }
  },

  computed: {
    ...mapGetters({
      boards: 'fetchedBoards'
    })
  },

  async created () {
    const vm = this
    vm.userId = 2
    bus.$emit('start:spinner')
    try {
      await statisticsEvent.readStatisticsMain(vm)
      await vm.$store.dispatch('FETCH_BOARDS')
      await vm.$store.dispatch('FETCH_EDUCATIONS', vm.userId)
      await vm.$store.dispatch('FETCH_USER')
      vm.isGetData = true
    } catch (error) {
      // Error Page
      console.log(error)
      vm.$router.push({ name: 'Error Page' })
    }
    bus.$emit('end:spinner')
  }
}
</script>

<style scoped>
  a {
    color: black;
  }
</style>

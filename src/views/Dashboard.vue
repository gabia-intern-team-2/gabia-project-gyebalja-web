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
        <v-flex
          md12
          lg12
        >
          <material-card
            color="orange"
            title="Employee Stats"
            text="New employees on 15th September, 2016"
          >
            <v-data-table
              :headers="headers"
              :items="this.$store.state.boards.content"
              hide-actions
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
    vm.userId = 866
    bus.$emit('start:spinner')
    try {
      await statisticsEvent.readStatisticsMain(vm)
      await vm.$store.dispatch('FETCH_BOARDS')
      await vm.$store.dispatch('FETCH_EDUCATIONS', vm.userId)
      vm.isGetData = true
    } catch (error) {
      // Error Page
      console.log(error)
    }
    bus.$emit('end:spinner')
  },
  methods: {
  }
}
</script>

<style scoped>
  a {
    color: black;
  }
</style>

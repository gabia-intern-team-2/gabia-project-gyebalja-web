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
          xs12
          md12
          sm12
          lg6
        >
          <material-chart-card
            id="my-statistics"
            :data="yearlyData.data"
            :options="yearlyData.options"
            color="info"
            type="Line"
          >
            <h4 class="title font-weight-light">연간 교육 건수/시간</h4>
            <span class="caption grey--text font-weight-light">Yearly education statistics</span>
          </material-chart-card>
        </v-flex>

        <!-- 통계 2 - 월간 교육 건수, 시간 -->
        <v-flex
          xs12
          md12
          sm12
          lg6
        >
          <material-chart-card
            id="my-statistics"
            :data="monthlyData.data"
            :options="monthlyData.options"
            color="info"
            type="Line"
          >
            <h4 class="title font-weight-light">월간 교육 건수/시간</h4>
            <span class="caption grey--text font-weight-light">Monthly education statistics</span>
          </material-chart-card>
        </v-flex>

        <!-- 통계 3 - 카테고리 -->
        <v-flex
          xs12
          md12
          sm12
          lg6
        >
          <material-chart-card
            id="my-statistics"
            :data="categoryData.data"
            :options="categoryData.options"
            color="red"
            type="Bar"
          >
            <h4 class="title font-weight-light">카테고리 TOP3</h4>
            <span class="caption grey--text font-weight-light">Category Top3</span>
          </material-chart-card>
        </v-flex>

        <!-- 통계 4 - 태그 -->
        <v-flex
          xs12
          md12
          sm12
          lg6
        >
          <material-chart-card
            id="my-statistics"
            :data="tagData.data"
            :options="tagData.options"
            color="red"
            type="Bar"
          >
            <h4 class="title font-weight-light">태그 TOP3</h4>
            <span class="caption grey--text font-weight-light">Tag TOP3</span>
          </material-chart-card>
        </v-flex>

        <!-- 게시판 -->
        <!-- 요약 게시판 1 - 교육 게시판 -->
        <v-flex
          xs12
          md12
          lg12
        >
          <material-card
            color="cyan"
            title="교육 게시판"
          >
            <v-data-table
              :headers="this.$store.state.state.boardHeaders"
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
          xs12
          md12
          lg12
        >
          <material-card
            color="cyan"
            title="개인 교육 내역"
          >
            <v-data-table
              :headers="this.$store.state.state.educationHeaders"
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
import { mapGetters } from 'vuex'
import { getStatisticsMain } from '../api/statistics/statistics.js'
export default {
  data () {
    return {
      userId: {},
      yearlyData: {
        data: {
          labels: [],
          series: []
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 10,
          chartPadding: {
            top: 30,
            right: 5,
            bottom: 0,
            left: 0
          }
        }
      },
      monthlyData: {
        data: {
          labels: [],
          series: []
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 10,
          chartPadding: {
            top: 30,
            right: 5,
            bottom: 0,
            left: 0
          }
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
          high: 10,
          chartPadding: {
            top: 30,
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
          high: 10,
          chartPadding: {
            top: 30,
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
      await vm.$store.dispatch('FETCH_BOARDS')
      await vm.$store.dispatch('FETCH_EDUCATIONS', vm.userId)
      this.initialize()
      vm.isGetData = true
    } catch (error) {
      // Error Page
      console.log(error)
      vm.$router.push({ name: 'Error Page' })
    }
    bus.$emit('end:spinner')
  },

  methods: {
    async initialize () {
      try {
        const response = await getStatisticsMain()
        this.yearlyData.data.labels = response.data.response.yearlyData.years
        this.yearlyData.data.series.push(response.data.response.yearlyData.totalEducationTime)
        this.yearlyData.data.series.push(response.data.response.yearlyData.totalEducationCount)
        this.yearlyData.options.high = Math.max(...response.data.response.yearlyData.totalEducationTime) + 15

        this.monthlyData.data.labels = response.data.response.monthlyData.months
        this.monthlyData.data.series.push(response.data.response.monthlyData.totalEducationTime)
        this.monthlyData.data.series.push(response.data.response.monthlyData.totalEducationCount)
        this.monthlyData.options.high = Math.max(...response.data.response.monthlyData.totalEducationTime) + 5

        this.categoryData.data.labels = response.data.response.categoryData.categories
        this.categoryData.data.series.push(response.data.response.categoryData.totalCategoryCount)
        this.categoryData.options.high = Math.max(...response.data.response.categoryData.totalCategoryCount) + 5

        this.tagData.data.labels = response.data.response.tagData.names
        this.tagData.data.series.push(response.data.response.tagData.totalTagCount)
        this.tagData.options.high = Math.max(...response.data.response.tagData.totalTagCount) + 5
      } catch (error) {
        // Error Page
        console.log(error)
        this.$router.push({ name: 'Error Page' })
      }
    }
  }
}
</script>

<style scoped>
a {
  color: black;
}

#my-statistics
  >>> .empty {
  text-align: center;
  padding-top: 4rem;
}
</style>

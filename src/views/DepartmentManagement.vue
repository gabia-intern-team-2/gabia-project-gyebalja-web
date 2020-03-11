<!--
 - Author : 이현재
 - Part : All
-->

<template>
  <div v-if="isGetData">
    <v-container
      fill-height
      fluid
      grid-list-xl
    >
      <v-layout wrap>
        <!-- 카드 - 랭킹 1위 -->
        <v-flex
          sm12
          xs12
          md12
          lg4
        >
          <material-card
            class="v-card-profile">
            <v-avatar
              slot="offset"
              class="mx-auto d-block mb-2"
              size="100"
            >
              <img
                :src="imgUrl"
                class="mt-3"
              >
            </v-avatar>
            <v-card-text class="text-xs-center">
              <h6 class="category text-gray font-weight-thin mb-3">{{ this.$store.state.user.positionName }} / {{ this.$store.state.user.department.name }}</h6>
              <h4 class="card-title font-weight-light">{{ this.$store.state.user.name }}<div v-if="this.$store.state.user.engName != null">({{ this.$store.state.user.engName }})</div></h4>
            </v-card-text>
          </material-card>
        </v-flex>

        <!-- 카드 - 랭킹 2위 -->
        <v-flex
          sm12
          xs12
          md12
          lg4
        >
          <material-card
            class="v-card-profile">
            <v-avatar
              slot="offset"
              class="mx-auto d-block mb-2"
              size="100"
            >
              <img
                :src="imgUrl"
                class="mt-3"
              >
            </v-avatar>
            <v-card-text class="text-xs-center">
              <h6 class="category text-gray font-weight-thin mb-3">{{ this.$store.state.user.positionName }} / {{ this.$store.state.user.department.name }}</h6>
              <h4 class="card-title font-weight-light">{{ this.$store.state.user.name }}<div v-if="this.$store.state.user.engName != null">({{ this.$store.state.user.engName }})</div></h4>
            </v-card-text>
          </material-card>
        </v-flex>

        <!-- 통계 3 - 카테고리 -->
        <v-flex
          sm12
          xs12
          md12
          lg4
        >
          <material-card class="v-card-profile">
            <v-avatar
              slot="offset"
              class="mx-auto d-block mb-2"
              size="100"
            >
              <img
                :src="imgUrl"
                class="mt-3"
              >
            </v-avatar>
            <v-card-text class="text-xs-center">
              <h6 class="category text-gray font-weight-thin mb-3">{{ this.$store.state.user.positionName }} / {{ this.$store.state.user.department.name }}</h6>
              <h4 class="card-title font-weight-light">{{ this.$store.state.user.name }}<div v-if="this.$store.state.user.engName != null">({{ this.$store.state.user.engName }})</div></h4>
            </v-card-text>
          </material-card>
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

    bus.$emit('start:spinner')
    try {
      await vm.$store.dispatch('FETCH_BOARDS')
      await vm.$store.dispatch('FETCH_USER')
      vm.userId = vm.$store.state.user.id
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
      const vm = this

      try {
        const response = await getStatisticsMain()
        vm.yearlyData.data.labels = response.data.response.yearlyData.years
        vm.yearlyData.data.series.push(response.data.response.yearlyData.totalEducationTime)
        vm.yearlyData.data.series.push(response.data.response.yearlyData.totalEducationCount)
        vm.yearlyData.options.high = Math.max(...response.data.response.yearlyData.totalEducationTime) + 15

        vm.monthlyData.data.labels = response.data.response.monthlyData.months
        vm.monthlyData.data.series.push(response.data.response.monthlyData.totalEducationTime)
        vm.monthlyData.data.series.push(response.data.response.monthlyData.totalEducationCount)
        vm.monthlyData.options.high = Math.max(...response.data.response.monthlyData.totalEducationTime) + 5

        vm.categoryData.data.labels = response.data.response.categoryData.categories
        vm.categoryData.data.series.push(response.data.response.categoryData.totalCategoryCount)
        vm.categoryData.options.high = Math.max(...response.data.response.categoryData.totalCategoryCount) + 5

        vm.tagData.data.labels = response.data.response.tagData.names
        vm.tagData.data.series.push(response.data.response.tagData.totalTagCount)
        vm.tagData.options.high = Math.max(...response.data.response.tagData.totalTagCount) + 5
      } catch (error) {
        // Error Page
        console.log(error)
        vm.$router.push({ name: 'Error Page' })
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

  .v-card-profile {
    display: block;
  }
</style>

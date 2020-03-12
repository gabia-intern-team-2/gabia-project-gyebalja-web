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
      <v-layout
        justify-center
        wrap
      >
        <v-flex
          md12
        >
          <!-- 카드 -->
          <material-card
            color="green"
            title="교육 게시판"
            text="Gabia education bulletin board"
          >
            <!-- 테이블 -->
            <v-data-table
              :headers="this.$store.state.state.boardHeaders"
              :items="this.$store.state.boards.content"
              :pagination.sync="pagination"
              hide-actions
            >

              <!-- 테이블 헤더 -->
              <template
                slot="headerCell"
                slot-scope="{ header }"
              >
                <span
                  class="subheading font-weight-light text-success text--darken-3"
                  v-text="header.text"
                />
              </template>

              <!-- 테이블 본문 -->
              <template
                slot="items"
                slot-scope="{ item }"
              >
                <td
                  class="my-td-left my-td-small-middle">{{ item.id }}</td>
                <router-link
                  :to="{name:'Board Detail', params:{boardId:item.id}}">
                  <td class="my-td-middle">
                    {{ item.title }}
                  </td>
                </router-link>
                <td class="my-td-right my-td-small">{{ item.views }}</td>
                <td class="my-td-right my-td-middle">{{ item.createdDate }}</td>
                <td class="my-td-right my-td-middle">{{ item.modifiedDate }}</td>
              </template>
              <template slot="no-data">
                <p style="text-align:center; height:5%">
                  <span>
                    작성된 게시글이 없습니다. 게시글을 추가해보세요!:)
                  </span>
                </p>
              </template>
            </v-data-table>

            <!-- 작성 버튼 -->
            <v-flex
              xs12
              text-xs-right
            >
              <router-link
                v-ripple
                :to="{name:'Board Register'}"
                class="toolbar-items">
                <v-btn
                  class="mx-0 font-weight-light white--text"
                  color="green"
                >
                  작성하기
                </v-btn>
              </router-link>
            </v-flex>
          </material-card>

          <!-- 페이징 -->
          <div class="text-xs-center pt-2">
            <v-pagination
              v-model="pagination.page"
              :length="pages"
              color="green"
              circle/>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bus from '../utils/bus'
export default {
  data: () => ({
    // Paging
    pagination: {},

    // Flag
    isGetData: false
  }),

  computed: {
    pages () {
      return Math.ceil(this.$store.state.boards.totalElements / 5)
    },
    ...mapGetters({
      boards: 'fetchedBoards'
    })
  },

  async created () {
    const vm = this

    bus.$emit('start:spinner')
    try {
      await vm.$store.dispatch('FETCH_BOARDS')
      vm.isGetData = true
    } catch (error) {
      vm.$router.push({ name: 'Dashboard' })
    }
    bus.$emit('end:spinner')
  }
}
</script>

<style scoped>
  a {
    color: black;
  }

  .my-td-left {
    text-align: left
  }
  .my-td-center {
    text-align: center
  }
  .my-td-right {
    text-align: right
  }
  .my-td-small {
    width: 5%;
  }
  .my-td-small-middle {
    width: 10%;
  }
  .my-td-middle {
    width: 15%;
  }
  .my-td-large {
    width: 30%;
  }
</style>

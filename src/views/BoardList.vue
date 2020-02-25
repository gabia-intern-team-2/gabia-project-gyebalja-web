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
            title="게시판"
            text="사내 교육 게시판"
          >
            <v-data-table
              :headers="headers"
              :items="this.$store.state.boards"
            >
              <!-- 테이블 -->
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
                <td>{{ item.id }}</td>
                <router-link
                  :to="{name:'Board Detail', params:{boardId:item.id}}">
                  <td>{{ item.title }}</td>
                </router-link>
                <td>{{ item.views }}</td>
                <td>{{ item.modifiedDate }}</td>
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
                  class="mx-0 font-weight-light"
                  color="success"
                >
                  작성하기
                </v-btn>
              </router-link>
            </v-flex>
          </material-card>
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

    isGetData: false
  }),
  computed: {
    ...mapGetters({
      boards: 'fetchedBoards'
    })
  },
  async created () {
    bus.$emit('start:spinner')
    try {
      await this.$store.dispatch('FETCH_BOARDS')
      this.isGetData = true
    } catch (error) {
      this.$router.push({ name: 'Dashboard' })
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

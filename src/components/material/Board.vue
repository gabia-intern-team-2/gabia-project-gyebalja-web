<!--
 * Author : 이현재
 * Part : All
-->

<template>
  <div>
    <v-data-table
      :headers="this.$store.state.state.boardHeaders"
      :items="this.$store.state.boards.content"
      :pagination.sync="value"
      hide-actions
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
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null
    }
  },
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
    pagination () {
      console.log(this.value)
      return this.value
    }
  }
}
</script>

<style scoped>
a {
    color: black;
  }
</style>

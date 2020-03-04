<template>
  <v-content>
    <v-container
      id="my-v-container"
      fill-height
      grid-list-xl>
      <v-layout
        justify-center
        wrap
      >
        <v-flex
          xs12
          md8
        >
          <!-- 카드 -->
          <material-card
            color="green"
            title="로그인 - 최초 사용자"
            text="사내 교육 관리 시스템"
          >
            <!-- 입력 폼 -->
            <v-form>
              <v-container>
                <v-text-field
                  v-model="name"
                  label="이름"
                  class="purple-input"/>
                <v-select
                  :items="genderList"
                  v-model="gender"
                  label="성별"
                  class="theme--light"
                  chips
                />
                <v-text-field
                  v-model="phone"
                  label="핸드폰"
                  class="purple-input"/>
                <v-text-field
                  v-model="tel"
                  label="내선 전화"
                  class="purple-input"/>
                <v-select
                  :items="this.$store.state.departments"
                  v-model="departmentId"
                  item-text="name"
                  item-value="id"
                  label="부서"
                  class="theme--light"
                  chips
                />
                <v-select
                  :items="positionList"
                  v-model="positionId"
                  item-text="positionName"
                  item-value="positionId"
                  label="직책"
                  class="theme--light"
                  chips
                />
                <!-- 등록 버튼 -->
                <div id="my-div">
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="submit"
                  >
                    등록
                  </v-btn>
                </div>
              </v-container>
            </v-form>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      name: null,
      gender: null,
      phone: null,
      tel: null,
      positionId: null,
      departmentId: null,
      // email: null,
      // password: null,

      departmentList: [],
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
          positionName: '임직원'
        }
      ],
      genderList: ['MALE', 'FEMALE']
    }
  },

  async created () {
    console.log('ee')
    this.initialize()
  },

  methods: {
    async initialize () {
      const vm = this
      await vm.$store.dispatch('FETCH_DEPARTMENTS')
      console.log(vm.$store.state.departments)
    },
    submit () {
      // 사용자 등록 (POST) 로직
    }
  }
}
</script>

<style scoped>
#my-v-container {
  margin-top: 5% !important;
}

#my-div {
  text-align: center;
}
</style>

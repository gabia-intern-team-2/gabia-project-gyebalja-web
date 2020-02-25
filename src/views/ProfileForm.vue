<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <material-card
          color="purple"
          title="내 정보 수정"
          text="* 보라색 필드는 필수입력 사항입니다."
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="userName"
                    label="User Name"
                    prepend-icon="mdi-account"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="userEmail"
                    label="User Email (ID)"
                    prepend-icon="mdi-email"
                    disabled
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="userGender"
                    label="User Gender"
                    prepend-icon="mdi-gender-male-female"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="userPhone"
                    label="User Phone Number"
                    prepend-icon="mdi-phone"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="userTel"
                    label="User Tel Number"
                    prepend-icon="mdi-phone-classic"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-select
                    :items="positionList"
                    label="직책(Position)"
                    hint=""
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
                  md6
                >
                  <v-select
                    :items="deptList"
                    label="부서(Department)"
                    hint=""
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
                  md12
                >
                  <v-text-field
                    v-model="userTel"
                    label="User Image Url"
                    prepend-icon="mdi-camera"/>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-1 font-weight-light"
                    color="success"
                  >
                    <v-icon>mdi-check</v-icon>
                    등록
                  </v-btn>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="info"
                    @click="back"
                  >
                    <v-icon>mdi-arrow-left</v-icon>
                    이전으로
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      userName: '정태균',
      userEmail: 'test@gabia.com',
      userGender: 'MALE',
      userPhone: '010-9999-9999',
      userTel: '031-777-7777',
      positionList: ['사장', '팀장', '사원'],
      deptList: ['가비아', '인사HR', '하이웍스 개발'],
      files: []
    }
  },
  methods: {
    back () {
      history.back()
    }
  }
}
</script>

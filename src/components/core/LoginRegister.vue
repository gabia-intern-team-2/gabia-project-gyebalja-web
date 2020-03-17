<!--
 * Author : 정태균
 * Part : All(Template, Script)
 * Assistant : 이현재
 * Part : Template
-->

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
          xs12q
          md8
        >
          <!-- 카드 -->
          <material-card
            color="blue"
            title="로그인 - 최초 사용자"
            text="* 보라색 필드는 필수입력 사항입니다."
          >
            <!-- 입력 폼 -->
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-container>
                <v-layout wrap>
                  <v-flex
                    xs12
                    md6
                    lg6
                  >
                    <v-text-field
                      v-model="name"
                      label="이름"
                      prepend-icon="mdi-account"
                      disabled/>
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                    lg6
                  >
                    <v-text-field
                      v-model="email"
                      label="Email"
                      prepend-icon="mdi-email"
                      disabled/>
                  </v-flex>
                  <v-flex
                    xs12
                    md4
                    lg4
                  >
                    <v-text-field
                      v-model="engName"
                      label="영어이름"
                      prepend-icon="mdi-account"/>
                  </v-flex>
                  <v-flex
                    xs12
                    md4
                    lg4
                  >
                    <v-text-field
                      v-model="phone"
                      :rules="phoneRules"
                      label="핸드폰"
                      class="green-input"
                      prepend-icon="mdi-phone"/>
                  </v-flex>
                  <v-flex
                    xs12
                    md4
                    lg4
                  >
                    <v-text-field
                      v-model="tel"
                      :rules="telRules"
                      label="내선 전화"
                      class="green-input"
                      prepend-icon="mdi-phone-classic"/>
                  </v-flex>
                  <v-flex
                    xs12
                    md4
                    lg4
                  >
                    <v-select
                      :items="this.$store.state.state.genderList"
                      :rules="[v => !!v || '성별은 필수 입력사항입니다']"
                      v-model="gender"
                      label="성별"
                      class="purple-input"
                      chips
                      prepend-icon="mdi-gender-male-female"
                      color="purple"
                      required
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    md4
                    lg4
                  >
                    <v-select
                      :items="this.$store.state.departments"
                      :rules="[v => !!v || '부서는 필수 입력사항입니다']"
                      v-model="deptId"
                      item-text="name"
                      item-value="id"
                      label="부서"
                      class="purple-input"
                      chips
                      prepend-icon="mdi-animation"
                      color="purple"
                      required
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    md4
                    lg4
                  >
                    <v-select
                      :items="this.$store.state.state.positionList"
                      :rules="[v => !!v || '직책은 필수 입력사항입니다']"
                      v-model="positionId"
                      item-text="positionName"
                      item-value="positionId"
                      label="직책"
                      class="purple-input"
                      chips
                      prepend-icon="mdi-animation"
                      color="purple"
                      required
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    md12
                  >
                    <v-btn
                      color="success"
                      raised
                      @click="onPickFile"
                    >프로필 사진 등록
                    </v-btn>
                    <span v-if="image">
                      파일 명 : {{ image.name }}
                    </span>
                    <input
                      ref="fileInput"
                      type ="file"
                      style="display: none"
                      accept="image/*"
                      @change="onFilePicked"
                    >
                  </v-flex>
                  <v-flex
                    xs12
                    md12
                  >
                    <img
                      :src="imageUrl"
                      height="100">
                  </v-flex>
                </v-layout>
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
import { getGabiaProfile } from '../../api/login/login.js'
import { postUserItem, postUserImgItem } from '../../api/user/user.js'
import bus from '../../utils/bus.js'
export default {
  data () {
    return {
      valid: true,
      phoneRules: [
        v => !v || /^\d{3}-\d{3,4}-\d{4}$/.test(v) || 'XXX-XXXX-XXXX 형식을 맞춰주세요!'
      ],
      telRules: [
        v => !v || /^\d{2,3}-\d{3,4}-\d{4}$/.test(v) || 'XXX-XXXX-XXXX 형식을 맞춰주세요!'
      ],
      imgRules: [
        v => !v || v.size < 2000000 || '사진 용량은 2MB이하만 가능합니다.'
      ],
      gabiaUserNo: null,
      email: null,
      name: null,
      engName: '',
      gender: null,
      phone: '',
      tel: '',
      positionId: null,
      positionName: null,
      deptId: null,
      departmentList: [],
      image: null,
      imageUrl: ''
    }
  },

  async created () {
    this.initialize()
    try {
      let response = await getGabiaProfile()
      this.gabiaUserNo = response.data.response.no
      this.email = response.data.response.user_id
      this.name = response.data.response.name
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    async initialize () {
      await this.$store.dispatch('FETCH_DEPARTMENTS')
    },
    async submit () {
      if (this.$refs.form.validate()) {
        try {
          let user = {
            gabiaUserNo: this.gabiaUserNo,
            email: this.email,
            name: this.name,
            engName: this.engName,
            gender: this.gender,
            phone: this.phone,
            tel: this.tel,
            positionId: this.positionId,
            // positionName: this.positionList[this.positionId - 1].positionName,
            positionName: this.$store.state.state.positionList[this.positionId - 1].positionName,
            deptId: this.deptId,
            profileImg: ''
          }
          if (this.$refs.fileInput.files[0] != null) {
            let formData = new FormData()
            formData.append('image', this.$refs.fileInput.files[0])
            let imgUrl = await postUserImgItem(formData)
            user.profileImg = imgUrl.data
          } else {
            user.profileImg = 'http://10.12.204.76/images/users/basic.jpg'
          }
          let response = await postUserItem(user)
          alert('등록이 완료 되었습니다. 환영합니다!')
          // APP.vue 의 플래그 조작을 위한 이벤트 버스
          bus.$emit('register-success', response.data.response)
          // 메인으로 이동
          this.$router.push({ name: 'Dashboard' })
        } catch (error) {
          console.log(error)
          alert('값을 올바르게 입력해 주세요.')
        }
      } else {
        alert('필수 입력 사항들을 입력해주세요.')
      }
    },
    onPickFile () {
      // 이미지 첨부 버튼 클릭 시 input type=file 클릭
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('형식에 맞는 사진을 첨부해주세요!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
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

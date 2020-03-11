<!--
 - Author : 정태균
 - Part : All
-->

<template>
  <div v-if="isGetData">
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
          <!-- 카드 -->
          <material-card
            color="orange"
            title="내 정보 수정"
            text="* 보라색 필드는 필수입력 사항입니다."
          >
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-container>
                <v-layout wrap>
                  <!-- 사용자 이름 (수정불가)-->
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
                  <!-- 이메일 (수정불가)-->
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
                  <!-- 영어 이름 -->
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
                  <!-- 핸드폰 -->
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
                  <!-- 내선 전화 -->
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
                  <!-- 성별 (필수) -->
                  <v-flex
                    xs12
                    md4
                    lg4
                  >
                    <v-select
                      :items="genderList"
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
                  <!-- 부서 (필수) -->
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
                  <!-- 직책 (필수) -->
                  <v-flex
                    xs12
                    md4
                    lg4
                  >
                    <v-select
                      :items="positionList"
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
                  <!-- 프로필 사진 -->
                  <v-flex
                    xs6
                    text-xs-left
                  >
                    <v-btn
                      color="orange"
                      class="white--text"
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
                    xs6
                    text-xs-right
                  >
                    <v-btn
                      color="red"
                      class="white--text mx-2"
                      raised
                      @click="changeBasic"
                    >기본 이미지로 변경
                    </v-btn>
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
                <!-- 버튼 -->
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-1 font-weight-light"
                    color="success"
                    @click="modified"
                  >
                    <v-icon>mdi-check</v-icon>
                    수정
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
              </v-container>
            </v-form>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { postUserImgItem, putUserItem } from '../api/user/user.js'
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
        v => !v || v.size < 20000000 || '사진 용량은 2MB이하만 가능합니다.'
      ],
      gabiaUserNo: null,
      id: null,
      email: null,
      name: null,
      engName: '',
      gender: null,
      phone: '',
      tel: '',
      positionId: null,
      positionName: null,
      deptId: null,
      profileImg: null,

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
      genderList: ['MALE', 'FEMALE'],
      image: '',
      imageUrl: '',
      isBasic: false,
      isGetData: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'fetchedUser'
    })
  },
  async created () {
    await this.$store.dispatch('FETCH_DEPARTMENTS')

    this.id = this.$store.state.user.id
    this.gabiaUserNo = this.$store.state.user.gabiaUserNo
    this.name = this.$store.state.user.name
    this.email = this.$store.state.user.email
    this.engName = this.$store.state.user.engName
    this.gender = this.$store.state.user.gender
    this.phone = this.$store.state.user.phone
    this.tel = this.$store.state.user.tel
    this.deptId = this.$store.state.user.department.id
    this.positionId = this.$store.state.user.positionId
    this.imageUrl = this.$store.state.user.profileImg
    this.isGetData = true
  },
  methods: {
    async modified () {
      const vm = this
      if (this.$refs.form.validate()) {
        try {
          let user = {
            gabiaUserNo: vm.gabiaUserNo,
            email: vm.email,
            name: vm.name,
            engName: vm.engName,
            gender: vm.gender,
            phone: vm.phone,
            tel: vm.tel,
            positionId: vm.positionId,
            positionName: vm.positionList[this.positionId - 1].positionName,
            deptId: vm.deptId,
            profileImg: ''
          }
          if (this.$refs.fileInput.files[0] != null) {
            let formData = new FormData()
            formData.append('image', this.$refs.fileInput.files[0])
            let imgUrl = await postUserImgItem(formData)
            user.profileImg = imgUrl.data
          } else {
            if (this.isBasic === false) {
              user.profileImg = this.$store.state.user.profileImg
            } else {
              user.profileImg = this.profileImg
            }
          }
          await putUserItem(vm.id, user)
          alert('수정이 완료 되었습니다.')
          // vuex 최신화
          vm.$store.dispatch('FETCH_USER', vm.id)
          // 사용자 정보로 이동
          this.$router.push({ name: 'User Profile' })
        } catch (error) {
          console.log(error)
          alert('값을 올바르게 입력해 주세요.')
        }
      } else {
        alert('필수 입력 사항들을 입력해주세요.')
      }
    },
    back () {
      history.back()
    },
    onPickFile () {
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
    },
    changeBasic () {
      this.imageUrl = 'http://api.gyeblja.com/images/users/basic.jpg'
      this.$refs.fileInput.files[0] = null
      this.isBasic = true
    }
  }
}
</script>

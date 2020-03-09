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
          md10
        >
          <!-- 카드 -->
          <material-card
            color="green"
            title="나의 교육 입력"
            text="* 보라색 필드는 필수입력 사항입니다."
          >
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-container py-0>
                <v-layout wrap>
                  <!-- 교육 명 입력 란 -->
                  <v-flex
                    xs12
                    md8
                  >
                    <v-text-field
                      v-model="title"
                      :rules="[v => !!v || '교육 명은 필수 입력사항입니다']"
                      label="교육 명(TITLE)"
                      hint="교육 명을 입력해주세요."
                      class="purple-input"
                      required
                    />
                  </v-flex>
                  <!-- 카테고리 셀렉트 박스 -->
                  <v-flex
                    xs12
                    md4
                  >
                    <v-select
                      v-model="category"
                      :items="categoryList"
                      :rules="[ v => !!v || '카테고리는 필수 입력사항입니다']"
                      label="카테고리(Category)"
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
                  <!-- 교육 내용 입력 란 -->
                  <v-flex
                    xs12
                    md12
                  >
                    <v-textarea
                      v-model="content"
                      label="교육 내용(CONTENTS)"
                      rows="15"
                      hint="교육 내용을 입력해주세요."
                    />
                  </v-flex>
                  <!-- 해시태그 입력 란 -->
                  <v-flex
                    xs12
                    md6
                  >
                    <v-text-field
                      v-model="hashTag"
                      label="해시태그(HashTag)"
                      hint="해시태그를 입력해주세요. ex) #Spring #HTML"
                      prepend-icon="mdi-tag"
                    />
                  </v-flex>
                  <!-- 교육장소 입력 란 -->
                  <v-flex
                    xs12
                    md3
                  >
                    <v-text-field
                      v-model="place"
                      label="교육장소(Place)"
                      hint="교육장소를 입력해주세요."
                      prepend-icon="mdi-map-marker"
                    />
                  </v-flex>
                  <!-- 교육유형 셀렉트 박스 -->
                  <v-flex
                    xs12
                    md3
                  >
                    <v-select
                      v-model="type"
                      :items="edutypeList"
                      :rules="[v => !!v || '교육 유형은 필수 입력사항입니다']"
                      label="교육유형"
                      hint=""
                      class="purple-input"
                      prepend-icon="mdi-animation"
                      item-text="name"
                      required
                      chips
                      color="purple"
                    />
                  </v-flex>
                  <!-- 시작날짜 입력 란 및 Date Picker -->
                  <v-flex
                    xs12
                    md5
                  >
                    <v-menu
                      ref="startDate"
                      :close-on-content-click="false"
                      v-model="startDate"
                      :nudge-right="40"
                      :return-value.sync="sdate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="60px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="sdate"
                        :rules="[v => !!v || '시작날짜는 필수 입력사항입니다']"
                        class="purple-input"
                        label="교육 시작날짜(startDate)"
                        readonly
                        required
                        prepend-icon="mdi-calendar"
                        color="purple"
                      />
                      <v-date-picker
                        v-model="sdate"
                        :max="getMaxDate"
                        @input="$refs.startDate.save(sdate)"/>
                    </v-menu>
                  </v-flex>
                  <!-- 종료날짜 입력 란 및 Date Picker -->
                  <v-flex
                    xs12
                    md5
                  >
                    <v-menu
                      ref="endDate"
                      :close-on-content-click="false"
                      v-model="endDate"
                      :nudge-right="40"
                      :return-value.sync="edate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="60px"
                      color="black--text"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="edate"
                        :rules="[v => !!v || '종료날짜는 필수 입력사항입니다']"
                        class="purple-input"
                        label="교육 종료날짜(endDate)"
                        readonly
                        required
                        prepend-icon="mdi-calendar"
                        color="purple"
                      />
                      <v-date-picker
                        v-model="edate"
                        :min="getMinDate"
                        @input="$refs.endDate.save(edate)"/>
                    </v-menu>
                  </v-flex>
                  <!-- 교육시간 입력 란 -->
                  <v-flex
                    xs12
                    md2
                  >
                    <v-text-field
                      v-model="totalHours"
                      :rules="totalHoursRules"
                      type="number"
                      class="purple-input"
                      label="총 교육시간"
                      hint="교육시간을 입력해주세요. (숫자만 입력가능)"
                      required
                      prepend-icon="mdi-timer"
                      color="purple"
                    />
                  </v-flex>
                  <!-- 버튼 -->
                  <v-flex
                    xs12
                    text-xs-right
                  >
                    <!-- 등록 버튼 -->
                    <v-btn
                      :disabled="!valid"
                      class="mx-1 font-weight-light"
                      color="success"
                      @click="submit"
                    >
                      <v-icon>mdi-check</v-icon>
                      등록
                    </v-btn>
                    <!-- 목록으로 버튼 -->
                    <v-btn
                      class="mx-0 font-weight-light"
                      color="info"
                      @click="back"
                    >
                      <v-icon>mdi-arrow-left</v-icon>
                      목록으로
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { postEducation, getMyEducationItem, putMyEducationItem } from '../api/education/education.js'
import { getCategoryList } from '../api/category/category.js'
import bus from '../utils/bus'

export default {
  data () {
    return {
      valid: true,
      title: '',
      category: null,
      content: '',
      hashTag: '',
      place: '',
      type: null,
      totalHours: '',
      totalHoursRules: [
        v => !!v || '필수 입력사항입니다.',
        v => (v && v > 0) || '0보다 큰값을 입력해주세요.'
      ],
      sdate: null,
      edate: null,
      startDate: false,
      endDate: false,
      categoryList: [],
      edutypeList: ['ONLINE', 'OFFLINE'],
      isGetData: false
    }
  },
  // date picker의 시작 날짜 종료 날짜 선택 범위
  computed: {
    getMinDate () {
      return this.sdate
    },
    getMaxDate () {
      return this.edate
    }
  },
  // 최초 실행 라이프사이클 훅
  async created () {
    bus.$emit('start:spinner')
    try {
      await this.$store.dispatch('FETCH_USER')
      let categoryRes = await getCategoryList()
      this.categoryList = categoryRes.data.response
      // 새로 작성이 아니라 수정인 경우 값 매핑
      if (this.$route.name === 'Education Edit') {
        let educationRes = await getMyEducationItem(this.$route.params.educationId)
        this.title = educationRes.data.response.title
        this.content = educationRes.data.response.content
        this.sdate = educationRes.data.response.startDate
        this.edate = educationRes.data.response.endDate
        this.totalHours = educationRes.data.response.totalHours
        this.place = educationRes.data.response.place
        this.type = educationRes.data.response.type
        this.category = educationRes.data.response.category.id
        for (let i = 0; i < educationRes.data.response.eduTags.length; i++) {
          this.hashTag += educationRes.data.response.eduTags[i].tagName + ' '
        }
      }
      this.isGetData = true
    } catch (error) {
      console.log(error)
    }
    bus.$emit('end:spinner')
  },

  methods: {
    // 등록 메서드
    async submit () {
      let education = {
        title: this.title,
        content: this.content,
        startDate: this.sdate,
        endDate: this.edate,
        totalHours: this.totalHours,
        type: this.type,
        place: this.place,
        categoryId: this.category,
        hashTag: this.hashTag,
        userId: this.$store.state.user.id
      }
      if (this.$refs.form.validate()) {
        if (this.$route.name === 'Education Register') {
          try {
            await postEducation(education)
            this.$router.push('/myEducation')
          } catch (error) {
            console.log(error)
            alert('값을 정확히 입력해주세요.')
          }
        } else {
          try {
            await putMyEducationItem(this.$route.params.educationId, education)
            this.$router.push({
              name: 'Education Detail', params: { educationId: this.$route.params.educationId }
            })
          } catch (error) {
            console.log(error)
            alert('값을 정확히 입력해주세요.')
          }
        }
      }
    },
    // 목록으로 메서드
    back () {
      if (this.$route.name === 'Education Edit') {
        this.$router.push('/myEducation')
      } else {
        history.back()
      }
    }
  }
}
</script>

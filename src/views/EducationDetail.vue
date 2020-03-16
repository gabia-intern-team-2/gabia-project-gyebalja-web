<!--
 - Author : 정태균
 - Part : All
-->

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
        md10
      >
        <!-- 카드 -->
        <material-card
          color="info"
          title="교육 상세 페이지"
          text="My Education Detail"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <!-- 교육 명 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg7
                >
                  <v-card
                    class="mx-auto font-weight-bold"
                    min-height="92px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic">제목(TITLE)</h6>
                      <div>{{ title }}</div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 카테고리 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg3
                >
                  <v-card
                    class="mx-auto  text-xs-center"
                    min-height="92px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic text-xs-left">카테고리(Category)</h6>
                      <div>{{ category.name }}</div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 등록번호 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg2
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    min-height="92px"
                    hover
                    dark
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic text-xs-left">등록번호</h6>
                      <div>No.{{ id }}</div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 내용 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg12
                >
                  <v-card
                    class="mx-auto"
                    min-height="300px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic">내용(CONTENTS)</h6>
                      <div style="white-space:pre-wrap;">
                        <p
                          id="my-p"
                          class="font-weight-thin mb-5 text-xs-left"
                          v-html="content"/>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 해시태그 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg5
                >
                  <v-card
                    class="mx-auto"
                    min-height="92px"
                    hover
                  >
                    <v-card-text>
                      <div>
                        <h6 class="grey--text font-italic">해시태그(HashTag)</h6>
                        {{ hashTags }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 교육장소 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg5
                >
                  <v-card
                    class="mx-auto"
                    min-height="92px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic">교육장소(PLACE)</h6>
                      <div>
                        {{ place }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 교육유형 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg2
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    min-height="92px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic text-xs-left">교육유형(TYPE)</h6>
                      <div>
                        {{ type }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 시작날짜 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg5
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    min-height="92px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic text-xs-left">시작날짜(StartDate)</h6>
                      <div>
                        {{ startDate }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 종료날짜 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg5
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    min-height="92px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic text-xs-left">종료날짜(EndDate)</h6>
                      <div>
                        {{ endDate }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 교육시간 -->
                <v-flex
                  sm12
                  xs12
                  md12
                  lg2
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    min-height="92px"
                    hover
                  >
                    <v-card-text>
                      <div>
                        <h6 class="grey--text font-italic text-xs-left">교육시간</h6>
                        {{ totalHours }} 시간
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <!-- 버튼 -->
                <v-flex
                  xs6
                  text-xs-left
                >
                  <!-- 목록으로 버튼 -->
                  <v-btn
                    class="mx-1 font-weight-light"
                    color="info"
                    @click="back"
                  >
                    <v-icon>mdi-arrow-left</v-icon>
                    목록으로
                  </v-btn>
                </v-flex>
                <v-flex
                  xs6
                  text-xs-right
                >
                  <!-- 수정 버튼 -->
                  <router-link
                    :to="{name: 'Education Edit', params: {educationId: id}}">
                    <v-btn
                      class="mx-1 font-weight-light white--text"
                      color="teal"
                    >
                      <v-icon color="white">mdi-pen</v-icon>
                      수정
                    </v-btn>
                  </router-link>
                  <!-- 삭제 버튼 -->
                  <v-btn
                    class="mx-1 font-weight-light"
                    color="error"
                    @click="removeEducation"
                  >
                    <v-icon>mdi-delete</v-icon>
                    삭제
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
import { getMyEducationItem, deleteMyEducationItem } from '../api/education/education.js'
import bus from '../utils/bus'

export default {
  data () {
    return {
      id: '',
      title: '',
      category: {},
      content: '',
      hashTags: '',
      place: '',
      type: '',
      totalHours: '',
      startDate: '',
      endDate: ''
    }
  },
  // 최초 실행 라이프사이클 훅
  async created () {
    bus.$emit('start:spinner')
    try {
      let response = await getMyEducationItem(this.$route.params.educationId)
      this.id = response.data.response.id
      this.title = response.data.response.title
      this.content = response.data.response.content
      this.startDate = response.data.response.startDate
      this.endDate = response.data.response.endDate
      this.totalHours = response.data.response.totalHours
      this.place = response.data.response.place
      this.type = response.data.response.type
      this.category = response.data.response.category
      for (let i = 0; i < response.data.response.eduTags.length; i++) {
        this.hashTags += response.data.response.eduTags[i].tagName + ' '
      }
    } catch (error) {
      console.log(error)
    }
    bus.$emit('end:spinner')
  },

  methods: {
    // 삭제 메서드
    removeEducation () {
      confirm('정말 삭제하시겠습니까?') && deleteMyEducationItem(this.$route.params.educationId)
        .then(this.$router.push('/myEducation'))
        .catch(error => console.log(error))
    },
    // 목록으로 메서드
    back () {
      this.$router.push('/myEducation')
    }
  }
}
</script>

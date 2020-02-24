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
        <material-card
          color="orange"
          title="교육 상세 페이지"
          text="My Education Detail"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md7
                >
                  <v-card
                    class="mx-auto font-weight-bold"
                    max-width="800px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic">제목(TITLE)</h6>
                      <div>{{ title }}</div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-card
                    class="mx-auto  text-xs-center"
                    max-width="200px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic text-xs-left">카테고리(Category)</h6>
                      <div>{{ category.name }}</div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md2
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    max-width="200px"
                    hover
                    dark
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic text-xs-left">등록번호</h6>
                      <div>No.{{ id }}</div>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-card
                    class="mx-auto"
                    max-width="1400px"
                    min-height="300px"
                    hover
                  >
                    <v-card-text>
                      <h6 class="grey--text font-italic">내용(CONTENTS)</h6>
                      <p
                        id="my-p"
                        class="font-weight-thin mb-5 text-xs-left"
                        v-html="content"/>

                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-card
                    class="mx-auto"
                    max-width="600px"
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
                <v-flex
                  xs12
                  md3
                >
                  <v-card
                    class="mx-auto"
                    max-width="300px"
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
                <v-flex
                  xs12
                  md3
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    max-width="300px"
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
                <v-flex
                  xs12
                  md5
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    max-width="500px"
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
                <v-flex
                  xs12
                  md5
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    max-width="500px"
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
                <v-flex
                  xs12
                  md2
                >
                  <v-card
                    class="mx-auto text-xs-center"
                    max-width="200px"
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
                <v-flex
                  xs6
                  text-xs-left
                >
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
  created () {
    getMyEducationItem(this.$route.params.educationId)
      .then(response => {
        this.id = response.data.response.id
        this.title = response.data.response.title
        this.content = response.data.response.content
        this.startDate = response.data.response.startDate
        this.endDate = response.data.response.endDate
        this.totalHours = response.data.response.totalHours
        this.place = response.data.response.place
        this.type = response.data.response.type
        this.category = response.data.response.category
        for (var i = 0; i < response.data.response.eduTags.length; i++) {
          this.hashTags += response.data.response.eduTags[i].tagName + ' '
        }
      })
      .catch(error => console.log(error))
  },
  methods: {
    removeEducation () {
      confirm('정말 삭제하시겠습니까?') && deleteMyEducationItem(this.$route.params.educationId)
        .then(this.$router.push('/myEducation'))
        .catch(error => console.log(error))
    },
    back () {
      this.$router.push('/myEducation')
    }
  }
}
</script>

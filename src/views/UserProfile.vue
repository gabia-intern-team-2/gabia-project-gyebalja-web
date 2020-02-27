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
          title="내 정보 상세"
          text="your profile"
        >
          <v-flex
            xs12
            md12
          >
            <material-card class="v-card-profile">
              <v-avatar
                slot="offset"
                class="mx-auto d-block"
                size="200"
              >
                <img
                  src="../images/dog.jpg"
                >
              </v-avatar>
              <v-card-text class="text-xs-center">
                <h4 class="category text-gray font-weight-thin mb-3">인턴 / HR부서</h4>
                <h3 class="card-title font-weight-light"><v-icon color="black">mdi-account</v-icon>정태균</h3>
              </v-card-text>
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
                        <h6 class="grey--text font-italic"><v-icon color="grey">mdi-email</v-icon>이메일(ID)</h6>
                        <div>test@gabia.com</div>
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
                        <h6 class="grey--text font-italic text-xs-left"><v-icon color="grey">mdi-gender-male-female</v-icon>성별(Gender)</h6>
                        <div>MALE</div>
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
                        <h6 class="grey--text font-italic text-xs-left"><v-icon color="grey">mdi-shield</v-icon>등록번호</h6>
                        <div>No.200</div>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                  >
                    <v-card
                      class="mx-auto"
                      min-width="300px"
                      hover
                    >
                      <v-card-text>
                        <div>
                          <h6 class="grey--text font-italic"><v-icon color="grey">mdi-phone</v-icon>핸드폰 번호(Phone Number)</h6>
                          010-9999-9999
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                  >
                    <v-card
                      class="mx-auto"
                      min-width="300px"
                      hover
                    >
                      <v-card-text>
                        <h6 class="grey--text font-italic"><v-icon color="grey">mdi-phone-classic</v-icon>내선 번호(Tel.)</h6>
                        <div>
                          031-2222-2222
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </material-card>
          </v-flex>
          <v-flex
            xs12
            text-xs-right
          >
            <router-link
              :to="{name: 'Profile Edit'}">
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
              color="info"
              @click="home"
            >
              <v-icon>mdi-home</v-icon>
              홈으로
            </v-btn>
          </v-flex>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    home () {
      this.$router.push({ name: 'DashBoard' })
    }
  }
}
</script>

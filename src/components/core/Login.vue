<template>
  <v-container
    id="my-container"
    fill-height
    fluid
    grid-list-xl
    style="height: 40rem !important">
    <v-layout
      text-xs-center
      justify-center
      align-center
      center
      wrap
    >
      <v-flex
        xs11
        md11
        lg6
      >
        <!-- 카드 -->
        <material-card
          color="blue"
          title="사내 교육 관리 시스템"
          text="Gㅖ발자"
        >
          <v-flex
            xs12
            text-xs-center
          >
            <v-btn
              class="mx-0 font-weight-light"
              color="white"
              @click="login"
            >
              <div>
                <img
                  class="mb-2"
                  src="../../images/hiworks_logo1.png"
                  width="150"
                  alt="하이웍스 로그인"
                >
                <p class="card-description font-weight-light mt-1 mb-1">하이웍스 로그인</p>
              </div>
            </v-btn>
          </v-flex>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getLoginRedirect } from '../../api/login/login.js'
export default {
  methods: {
    async login () {
      let response = null
      try {
        response = await getLoginRedirect()
      } catch (error) {
        console.log(error)
      }
      window.location.href = response.data.response
    }
  }
}
</script>

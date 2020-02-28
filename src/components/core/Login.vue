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
            <a href="https://api.hiworks.com/open/auth/authform?client_id=vtovgjlvdskcasrbiownu1wgjy2xures5e3276b98dd6a9.36873902.open.apps&access_type=offline">
              <v-btn
                class="mx-0 font-weight-light"
                color="white"
              >
                <div>
                  <img
                    class="mb-2"
                    src="../../images/hiworks_logo1.png"
                    width="150"
                    alt="하이웍스 로그인"
                  >
                  <p class="card-description font-weight-light mb-0">하이웍스 로그인</p>
                </div>
              </v-btn>
            </a>
          </v-flex>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  //
}
</script>

<style scoped>
</style>

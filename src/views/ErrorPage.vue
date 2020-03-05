<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md12
        lg12
      >
        <!-- 카드 -->
        <material-card
          title="Error Page"
          class="text-xs-center"
          color="grey">
          <v-btn
            class="mx-0 font-weight-light"
            color="white"
          >
            <v-card-text class="text-xs-center">
              <img
                class="mb-2"
                src="../images/error01.jpg"
                width="300"
                alt="Error Page"
                disabled
              >
              <h4 class="text-gray font-weight-thin mt-4 mb-1">Error Page</h4>
              <p
                class="card-description font-weight-light mt-4 mb-5"
                v-html="errorContent"/>
            </v-card-text>
          </v-btn>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    errorContent: '브라우저가 호스트 컴퓨터는 찾았으나 요청된 특정 도큐먼트를 찾지 못한 경우입니다. <br> 정확한 주소를 입력했는지 확인해 봅니다. 그 페이지는 해당 웹 사이트에서 제거되었을 수도 있고 위치가 바뀌었을 수도 있습니다. <br> 파일명을 떼어내고 주소를 다시 한 번 입력해 봅니다. 즉, 한 단계 위의 웹 사이트를 찾아 봅니다.'
  })
}
</script>

<style>

</style>

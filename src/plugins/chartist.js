import Vue from 'vue'
import 'chartist/dist/chartist.min.css'

/**
 * Author : 이현재
 * Part : Setting vue-chartist
*/

Vue.use(require('vue-chartist'), {
  messageNoData: 'No Data',
  classNoData: 'empty'
})

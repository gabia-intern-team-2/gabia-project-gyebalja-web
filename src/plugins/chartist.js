import Vue from 'vue'
import 'chartist/dist/chartist.min.css'

Vue.use(require('vue-chartist'), {
  messageNoData: 'No Data',
  classNoData: 'empty'
})

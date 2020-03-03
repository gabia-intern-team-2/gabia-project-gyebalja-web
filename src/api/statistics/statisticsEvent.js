import { getStatisticsMain } from './statistics.js'

export default {

  async readStatisticsMain (vm) {
    try {
      const response = await getStatisticsMain()
      vm.yearlyData.data.labels = response.data.response.yearlyData.years
      vm.yearlyData.data.series.push(response.data.response.yearlyData.totalEducationTime)
      vm.yearlyData.data.series.push(response.data.response.yearlyData.totalEducationCount)

      vm.monthlyData.data.labels = response.data.response.monthlyData.months
      vm.monthlyData.data.series.push(response.data.response.monthlyData.totalEducationTime)
      vm.monthlyData.data.series.push(response.data.response.monthlyData.totalEducationCount)

      vm.categoryData.data.labels = response.data.response.categoryData.categories
      vm.categoryData.data.series.push(response.data.response.categoryData.totalCategoryCount)

      vm.tagData.data.labels = response.data.response.tagData.names
      vm.tagData.data.series.push(response.data.response.tagData.totalTagCount)

      console.log(vm.yearlyData)
      console.log(vm.monthlyData)
      console.log(vm.categoryData)
      console.log(vm.tagData)
    } catch (error) {
      // Error Page
      console.log(error)
    }
  }

}

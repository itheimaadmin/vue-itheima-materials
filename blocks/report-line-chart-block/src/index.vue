<template>
  <div class="app-container">
    <div class="wrapper">
      <date-picker
        class="date-picker"
        @handleTabEchartsChange="handleTabEchartsChange"
      />
      <div
        v-loading="listLoading"
        class="line-chart"
      >
        <line-chart
          id="area-collect"

          width="100%"
          height="100%"
          title="地区商销量/销售额（万件/万元）"
          :chartoption="areaCollectChartOption"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Moment from 'moment'
import DatePicker from '@/components/Charts/DatePicker.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import { IOrderCollectEntity } from './entity'

const jsonData = require('./data.json')

@Component({
  name: 'report-line-chart-block',
  components: {
    DatePicker,
    LineChart
  }
})
export default class extends Vue {
  private listLoading: boolean = false
  private areaCollectChartOption: any = {
    xAxis: [],
    series: []
  }

  created() {
    let companyCollectParams = {
      start: Moment()
        .subtract('days', 7)
        .format('YYYY-MM-DD'),
      end: Moment()
        .subtract('days', 1)
        .format('YYYY-MM-DD')
    }
    this.getAreaCollect(companyCollectParams)
  }

  private handleTabEchartsChange(datePickerSel: string[]) {
    let areaCollectParams = {
      startDate: datePickerSel[0],
      endDate: datePickerSel[1]
    }
    this.getAreaCollect(areaCollectParams)
  }

  /**
   * 地区商销量/销售额
   */
  private async getAreaCollect(areaCollectParams: any) {
    this.listLoading = true
    const { data } = await new Promise(resolve => {
      setTimeout(() => {
        resolve(jsonData)
      }, 500)
    })
    this.listLoading = false

    let areaCollect: IOrderCollectEntity[] = data
    let xAxis: string[] = []
    let series: number[][] = []
    let vendoutTotalCountList: number[] = []
    let orderTotalMoneyList: number[] = []

    for (let i = 0; i < areaCollect.length; i++) {
      let orderCollect: IOrderCollectEntity = areaCollect[i]
      xAxis.push(orderCollect.date)
      vendoutTotalCountList.push(
        Math.round(orderCollect.vendoutTotalCount / 10000)
      )
      orderTotalMoneyList.push(Math.round(orderCollect.orderTotalMoney / 10000))
    }

    series.push(vendoutTotalCountList)
    series.push(orderTotalMoneyList)
    this.areaCollectChartOption.xAxis = xAxis
    this.areaCollectChartOption.series = series
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;

  .date-picker {
    position: absolute;
    top: 15px;
    right: 44px;
    z-index: 999;
  }

  .line-chart {
    height: 436px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
  }
}
</style>

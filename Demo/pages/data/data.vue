<template>
  <view class="chart-container">
    <qiun-data-charts
      type="column"
      :opts="opts"
      :chartData="chartData"
    />
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ChargingStatistics',
  setup() {
    const opts = ref({
      title: {
        text: '2023年上半年充电统计',
      },
      legend: {},
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: [
        {
          type: 'value',
          name: '充电次数',
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '充电量(kWh)',
          min: 0,
          max: 500,
          interval: 100,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '花费(元)',
          min: 0,
          max: 1000,
          interval: 200,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: '充电次数',
          type: 'bar',
          data: [20, 25, 30, 35, 40, 45]
        },
        {
          name: '充电量',
          type: 'bar',
          yAxisIndex: 1,
          data: [100, 150, 200, 250, 300, 350]
        },
        {
          name: '花费',
          type: 'bar',
          yAxisIndex: 2,
          data: [200, 300, 400, 500, 600, 700]
        }
      ]
    })

    const chartData = ref({
      categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
      series: [
        {
          name: '充电次数',
          data: [20, 25, 30, 35, 40, 45]
        },
        {
          name: '充电量',
          data: [100, 150, 200, 250, 300, 350]
        },
        {
          name: '花费',
          data: [200, 300, 400, 500, 600, 700]
        }
      ]
    })

    return {
      opts,
      chartData
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>
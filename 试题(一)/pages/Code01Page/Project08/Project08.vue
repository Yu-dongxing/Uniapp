<!-- pages/dataAnalysis/index.vue -->
<template>
  <view class="data-analysis">
    <view class="chart-container">
      <qiun-data-charts 
        type="column"
        :opts="barChartOpts"
        :chartData="barChartData"
      />
    </view>

    <view class="chart-container">
      <qiun-data-charts 
        type="line"
        :opts="lineChartOpts"
        :chartData="lineChartData"
      />
    </view>

  </view>

</template>

<script>
// import { uCharts } from '@qiun/ucharts'

export default {
  data() {
    return {
      barChartOpts: {
        color: ["#1890FF","#91CB74","#FAC858"],
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
        },
        extra: {
          column: {
            type: "group"
          }
        }
      },
      barChartData: {
        categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
        series: [
          {
            name: "充电次数",
            data: [35, 36, 31, 33, 13, 34]
          },
          {
            name: "充电量(kWh)",
            data: [18, 27, 21, 24, 6, 28]
          },
          {
            name: "花费(元)",
            data: [98, 128, 65, 94, 52, 154]
          }
        ]
      },
      lineChartOpts: {
        color: ["#1890FF","#91CB74","#FAC858"],
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
        },
        extra: {
          line: {
            type: "straight"
          }
        }
      },
      lineChartData: {
        categories: ["3月", "5月"],
        series: [
          {
            name: "耗电量(kWh)",
            data: [200, 180]
          },
          {
            name: "行驶里程(km)",
            data: [1000, 950]
          },
          {
            name: "百公里耗电量(kWh/100km)",
            data: [20, 18.9]
          }
        ]
      }
    }
  }
}
</script>

<style>
.data-analysis {
  padding: 20px;
}
.chart-container {
  height: 300px;
  margin-bottom: 20px;
}
</style>

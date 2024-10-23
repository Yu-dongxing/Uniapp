<template>
  <view>
    <echarts :options="chartOptions" />
  </view>
</template>

<script>
import Echarts from '@/components/echarts.vue';

export default {
  components: {
    Echarts
  },
  data() {
    return {
      chartOptions: {
        title: {
          text: 'ECharts 示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  }
};
</script>

<style>
/* 自定义样式 */
</style>

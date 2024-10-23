<template>
  <view>
    <echarts :option="chartOption" @click="handleClick"></echarts>
  </view>
</template>

<script>
import Echarts from '@/components/Echarts.vue';

export default {
  components: {
    Echarts
  },
  data() {
    return {
      chartOption: {
        id: 'chart',
        width: '100%',
        height: '400px',
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      }
    };
  },
  methods: {
    handleClick(params) {
      console.log('Chart click:', params);
    }
  }
}
</script>
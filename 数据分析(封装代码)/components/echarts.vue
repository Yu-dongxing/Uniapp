<template>
  <view class="echart-container">
    <!-- 使用 echarts 组件 -->
    <ec-canvas
      id="mychart-dom"
      canvas-id="mychart"
      :disable-touch="false"
      :ec="ec"
    />
  </view>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ec: {
        lazyLoad: true // 懒加载
      },
      chart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(); // 初始化图表
    });
  },
  methods: {
    initChart() {
      // 获取 DOM 节点
      this.$refs.canvas.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        chart.setOption(this.options);
        this.chart = chart;
        return chart;
      });
    },
    updateChart(options) {
      if (this.chart) {
        this.chart.setOption(options);
      }
    }
  },
  watch: {
    options(newVal) {
      this.updateChart(newVal); // 数据更新时更新图表
    }
  }
};
</script>

<style scoped>
.echart-container {
  width: 100%;
  height: 400px;
}
</style>

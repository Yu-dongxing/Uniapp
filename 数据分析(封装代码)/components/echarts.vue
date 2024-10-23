<template>
  <view class="echarts" :id="option.id" :style="{width: option.width, height: option.height}"></view>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'Echarts',
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  created() {
    // 设置随机数id
    let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let len = t.length;
    let id = '';
    for (let i = 0; i < 32; i++) {
      id += t.charAt(Math.floor(Math.random() * len));
    }
    this.option.id = id;
  },
  methods: {
    onViewClick(params) {
      this.$emit('click', params);
    }
  }
}
</script>

<script module="echarts" lang="renderjs">
export default {
  data() {
    return {
      chart: null,
      clickData: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.chart = echarts.init(document.getElementById(this.option.id));
      this.update(this.option);
      this.chart.on('click', params => {
        this.clickData = params;
        this.onViewClick(params);
      });
    },
    update(option) {
      if (this.chart) {
        this.chart.setOption(option, option.notMerge);
      }
    }
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
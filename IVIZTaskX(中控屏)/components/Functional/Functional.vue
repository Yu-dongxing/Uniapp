<template>
  <view class="grid-container" v-if="index==0">
    <view class="grid-item" v-for="(item, index) in gridItems" :key="index">
      <view class="icon">{{ item.icon }}</view>
      <text>{{ item.label }}</text>
    </view>
  </view>
  <Popups title="组件" v-if="index==1">
	  <!-- <air></air> -->
	  <AppMark></AppMark>
  </Popups>
</template>

<script>
//
import Popups from '../Popups/Popups.vue';
//
import air from '../air/air.vue';//空调组件
import AppMark from '../AppMark/AppMark.vue';//应用市场组件
export default {
  name: "Functional",
  comments:{
	  Popups,
	  air,
	  AppMark
  },
  data() {
    return {
	  index:1,
	  
      gridItems: [
        { icon: '❄️', label: '空调' },
        { icon: '🔘', label: '胎压' },
        { icon: '🚗', label: '车辆信息' },
        // { icon: '🚦', label: '违章查询' },
        // { icon: '📹', label: '行车记录' },
        // { icon: '📋', label: '任务管理' },
        // { icon: '📁', label: '文件管理' },
        // { icon: '📘', label: '升级手册' },
        // { icon: '🎥', label: '视频手册' },
      ]
    };
  }
}
</script>

<style lang="less" scoped>
:root {
  --primary-color: rgba(108, 79, 255, 0.45);
  --secondary-color: rgba(5, 5, 5, 1);
  --item-bg-color: rgba(0, 0, 0, 0.5);
  --text-color: aliceblue;
}

* {
  box-sizing: border-box;
}

.grid-container {
--primary-color: rgba(108, 79, 255, 0.45);
--secondary-color: rgba(5, 5, 5, 1);
--item-bg-color: rgba(0, 0, 0, 0.5);
--text-color: aliceblue;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 15px;
  flex-grow: 1;
  overflow: auto;
  // background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  
  .grid-item {
    flex-basis: calc(25% - 15px);
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--item-bg-color);
    border-radius: 10px;
	.icon {
	  font-size: 100px;
	  margin-bottom: 10px;
	}
	text {
	  font-size: 20px;
	  color: var(--text-color);
	}
  }
  
}






</style>
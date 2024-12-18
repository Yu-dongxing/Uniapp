<template>
  <view class="grid-container" v-if="!index">
    <view class="grid-item" v-for="(item, index) in gridItems" :key="index" @click="showPopup(item)">
      <view class="icon">{{ item.icon }}</view>
      <text>{{ item.label }}</text>
    </view>
  </view>
  <Popups :title="selectedItem.label" v-if="index" @isclose="popclose">
    <component :is="selectedItem.component"></component>
  </Popups>
</template>


<script>
import Popups from '../Popups/Popups.vue';
import air from '../air/air.vue'; // 空调组件
import AppMark from '../AppMark/AppMark.vue'; // 应用市场组件
import CarInfo from '../CarInfo/CarInfo.vue'; //车辆信息

export default {
  name: "Functional",
  components: {
    Popups,
    air,
    AppMark,
	CarInfo
  },
  data() {
    return {
      index: 0,
      selectedItem: {},
      gridItems: [
        { icon: '❄️', label: '空调', component: 'air' },
        { icon: '🔘', label: '应用市场', component: 'AppMark' },
        { icon: '🚗', label: '车辆信息',component:'CarInfo' },
        
      ]
    };
  },
  methods: {
    showPopup(item) {
      this.selectedItem = item;
      this.index = true; // 显示 Popups 组件
    },
	closepop(){
		this.index = false;
	},
	popclose(index){
		this.index=index;
	}
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
Popups{
	transform: all 3s ;
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
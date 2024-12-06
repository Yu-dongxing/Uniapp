<!-- components/AirConditioner.vue -->
<template>
  <view class="air-conditioner">
    <view class="temperature-display">
      <text>车内温度: {{ temperature }}°C</text>
    </view>
    <view class="controls">
      <button @tap="togglePower">{{ isPowerOn ? 'OFF' : 'ON' }}</button>
      <button @tap="increaseTemp">▲</button>
      <button @tap="decreaseTemp">▼</button>
      <button @tap="toggleCirculation">{{ isExternalCirculation ? '外循环' : '内循环' }}</button>
    </view>
  </view>
</template>
<script>
export default {
	name:"air",
  data() {
    return {
      isPowerOn: false,
      temperature: 25,
      isExternalCirculation: true
    }
  },
  methods: {
    togglePower() {
      this.isPowerOn = !this.isPowerOn
      if (!this.isPowerOn) {
        uni.showToast({
          title: '空调系统已关闭',
          duration: 2000
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 2000)
      }
    },
    increaseTemp() {
      if (this.temperature < 30) {
        this.temperature++
        this.sendTempControl()
      }
    },
    decreaseTemp() {
      if (this.temperature > 16) {
        this.temperature--
        this.sendTempControl()
      }
    },
    toggleCirculation() {
      this.isExternalCirculation = !this.isExternalCirculation
      this.showCirculationAnimation()
    },
    sendTempControl() {
      // 这里应该发送CAN指令到温控设备
      console.log('发送温度控制指令:', this.temperature)
    },
    showCirculationAnimation() {
      // 这里应该显示空气循环动画
      console.log('显示', this.isExternalCirculation ? '外循环' : '内循环', '动画')
    }
  }
}
</script>

<style>
.air-conditioner {
  padding: 20px;
}
.temperature-display {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}
.controls {
  display: flex;
  justify-content: space-around;
}
</style>


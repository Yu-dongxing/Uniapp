<template>
  <view class="air-conditioner">
    <view class="temperature-display">
      <text class="temp-value">{{ temperature }}°C</text>
      <text class="temp-label">车内温度</text>
    </view>

    <view class="controls">
      <button class="control-btn power-btn" :class="{ 'on': isPowerOn }" @tap="togglePower">
        <view class="btn-icon">⏻</view>
        <text class="btn-label">{{ isPowerOn ? 'ON' : 'OFF' }}</text>
      </button>

      <button class="control-btn" @tap="increaseTemp">
        <view class="btn-icon">▲</view>
        <text class="btn-label">升温</text>
      </button>

      <button class="control-btn" @tap="decreaseTemp">
        <view class="btn-icon">▼</view>
        <text class="btn-label">降温</text>
      </button>

      <button class="control-btn circulation-btn" :class="{ 'external': isExternalCirculation }" @tap="toggleCirculation">
        <view class="btn-icon">↻</view>
        <text class="btn-label">{{ isExternalCirculation ? '外循环' : '内循环' }}</text>
      </button>
    </view>
  </view>
</template>

<script>
export default {
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
          icon: 'none',
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
  background-color: #1a1a1a;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.temperature-display {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.temp-value {
  font-size: 48px;
  font-weight: bold;
  color: #ecf0f1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.temp-label {
  font-size: 18px;
  color: #bdc3c7;
  display: block;
  margin-top: 10px;
}

.controls {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.control-btn {
  background-color: #2c3e50;
  border: none;
  border-radius: 12px;
  padding: 15px;
  width: 48%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.control-btn:active {
  transform: scale(0.95);
}

.btn-icon {
  font-size: 24px;
  color: #ecf0f1;
  margin-bottom: 5px;
}

.btn-label {
  font-size: 14px;
  color: #bdc3c7;
}

.power-btn {
  background-color: #c0392b;
}

.power-btn.on {
  background-color: #27ae60;
}

.circulation-btn {
  background-color: #8e44ad;
}

.circulation-btn.external {
  background-color: #2980b9;
}
</style>
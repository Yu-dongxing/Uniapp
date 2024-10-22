<template>
  <view class="car-owner-home">
    <view class="car-info">
      <view class="info-card">
        <view class="info-icon">
          <BatteryMediumIcon class="icon" />
        </view>
        <view class="info-text">
          <text class="info-label">电量</text>
          <text class="info-value">{{ batteryLevel }}%</text>
        </view>
      </view>
      <view class="info-card">
        <view class="info-icon">
          <MapIcon class="icon" />
        </view>
        <view class="info-text">
          <text class="info-label">续航里程</text>
          <text class="info-value">{{ range }}km</text>
        </view>
      </view>
    </view>

    <view class="car-model">
      <image :src="carModelSrc" mode="aspectFit" @load="onModelLoaded"></image>
      <view v-if="isModelLoading" class="loading">
        <view class="loading-spinner"></view>
        <text class="loading-text">加载中...</text>
      </view>
    </view>

    <view class="remote-controls">
      <button class="control-btn" :class="{ 'btn-active': isDoorOpen }" @tap="toggleDoor">
        <DoorOpenIcon class="btn-icon" />
        <text class="btn-text">{{ isDoorOpen ? '关门' : '开门' }}</text>
      </button>
      <button class="control-btn" @tap="controlAC">
        <AirVentIcon class="btn-icon" />
        <text class="btn-text">控制空调</text>
      </button>
    </view>
  </view>
</template>

<script>
// import { BatteryMediumIcon, MapIcon, DoorOpenIcon, AirVentIcon } from 'lucide-vue-next'

export default {
  // components: {
  //   BatteryMediumIcon,
  //   MapIcon,
  //   DoorOpenIcon,
  //   AirVentIcon
  // },
  data() {
    return {
      batteryLevel: 80,
      range: 300,
      carModelSrc: '/static/3d-car-model.png',
      isModelLoading: false,
      isDoorOpen: false
    }
  },
  methods: {
    onModelLoaded() {
      this.isModelLoading = false
    },
    toggleDoor() {
      this.isDoorOpen = !this.isDoorOpen
      // 这里应该发送实际的开/关门指令
      console.log(this.isDoorOpen ? '开门' : '关门')
    },
    controlAC() {
      // 这里应该打开空调控制界面
      console.log('打开空调控制')
    }
  }
}
</script>

<style>
.car-owner-home {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.car-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.info-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 15px;
  width: 48%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
}

.info-icon {
  background-color: #e6f7ff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.icon {
  width: 24px;
  height: 24px;
  color: #1890ff;
}

.info-text {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 14px;
  color: #8c8c8c;
  margin-bottom: 5px;
}

.info-value {
  font-size: 20px;
  font-weight: bold;
  color: #262626;
}

.car-model {
  position: relative;
  height: 300px;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.car-model image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 10px;
  color: #8c8c8c;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.remote-controls {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.control-btn {
  background-color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 15px;
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.control-btn:active {
  transform: scale(0.98);
}

.btn-active {
  background-color: #e6f7ff;
}

.btn-icon {
  width: 24px;
  height: 24px;
  color: #1890ff;
  margin-bottom: 8px;
}

.btn-text {
  font-size: 14px;
  color: #262626;
}
</style>
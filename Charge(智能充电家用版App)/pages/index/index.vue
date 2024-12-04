<template>
  <view class="container">
    <!-- 顶部状态栏 -->
    <view class="status-bar">
      <view class="battery-status">
        <view class="battery-icon">
          <view class="battery-level" 
                :style="{ 
                  width: `${chargingStatus.batteryLevel}%`,
                  background: getBatteryColor(chargingStatus.batteryLevel)
                }">
          </view>
        </view>
        <text class="battery-text" :style="{ color: getBatteryTextColor(chargingStatus.batteryLevel) }">
          {{ chargingStatus.batteryLevel.toFixed(1) }}%
        </text>
      </view>
      <text class="connection-status" :class="{ 'connected': chargingStatus.isConnected }">
        {{ chargingStatus.isConnected ? '已连接' : '未连接' }}
      </text>
    </view>

    <!-- 车辆3D模型展示区 -->
    <view class="model-container">
      <view v-if="currentVehicle" class="model-view">
        <image 
          class="car-image"
          :src="getCarImage(currentVehicle.brand)"
          mode="aspectFit"
        />
      </view>
      <view v-else class="model-placeholder">
        <text class="placeholder-icon">🚗</text>
        <text class="placeholder-text">请添加车辆</text>
      </view>
    </view>
    
    <!-- 车辆信息卡片 -->
    <view class="info-card" v-if="currentVehicle">
      <view class="card-header">
        <text class="title">车辆信息</text>
        <text class="subtitle">Vehicle Information</text>
      </view>
      <view class="info-grid">
        <view class="info-item">
          <text class="label">车牌号码</text>
          <text class="value">{{ currentVehicle.plateNumber }}</text>
        </view>
        <view class="info-item">
          <text class="label">品牌型号</text>
          <text class="value">{{ currentVehicle.brand }} {{ currentVehicle.model }}</text>
        </view>
        <view class="info-item">
          <text class="label">续航里程</text>
          <text class="value highlight">{{ currentVehicle.range }}km</text>
        </view>
      </view>
    </view>
    
    <!-- 充电状态卡片 -->
    <view class="charging-card" v-if="chargingStatus.isConnected">
      <view class="card-header">
        <view class="left">
          <text class="charger-name">{{ chargingStatus.chargerName }}</text>
          <text class="status-badge" 
                :class="{ 'charging': chargingStatus.isCharging }">
            {{ chargingStatus.isCharging ? '充电中' : '已连接' }}
          </text>
        </view>
        <view class="right">
          <text class="time-remaining" v-if="chargingStatus.isCharging">
            剩余 {{ formatTime(chargingStatus.remainingTime) }}
          </text>
        </view>
      </view>
      
      <view class="charging-progress">
        <view class="progress-info">
          <text class="progress-text">电池电量</text>
          <text class="progress-value">{{ chargingStatus.batteryLevel.toFixed(1) }}%</text>
        </view>
        <view class="custom-progress">
          <view class="progress-bar" 
                :style="{ 
                  width: `${chargingStatus.batteryLevel}%`,
                  background: getBatteryGradient(chargingStatus.batteryLevel)
                }">
          </view>
        </view>
      </view>
      
      <view class="charging-stats" v-if="chargingStatus.isCharging">
        <view class="stat-item">
          <text class="stat-value">{{ chargingStatus.chargingPower }}kW</text>
          <text class="stat-label">充电功率</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ chargingStatus.chargedAmount.toFixed(1) }}kWh</text>
          <text class="stat-label">充电电量</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">¥{{ calculateCost().toFixed(2) }}</text>
          <text class="stat-label">预计费用</text>
        </view>
      </view>
    </view>
    
    <!-- 底部操作按钮 -->
    <view class="action-bar">
      <view class="action-button secondary" @click="navigateToAddVehicle">
        <text class="button-icon">🚗</text>
        <text>添加车辆</text>
      </view>
      <view class="action-button primary" 
            :class="{ 'charging': chargingStatus.isCharging }"
            @click="handleCharging"
            :disabled="!chargingStatus.isConnected">
        <text class="button-icon">
          {{ chargingStatus.isCharging ? '⏹️' : '⚡' }}
        </text>
        <text>{{ chargingStatus.isCharging ? '停止充电' : '开始充电' }}</text>
      </view>
      <view class="action-button secondary" @click="navigateToAddCharger">
        <text class="button-icon">🔌</text>
        <text>添加充电桩</text>
      </view>
	  <view class="action-button secondary" @click="navigateToUserContol">
	    <text class="button-icon">👃</text>
	    <text>用户中心</text>
	  </view>
    </view>
  </view>
</template>

<style lang="scss">
@import '@/uni.scss';

.container {
  min-height: 100vh;
  background-color: $theme-background;
  padding: $spacing-md;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md $spacing-lg;
  margin-bottom: $spacing-lg;
  
  .battery-status {
    display: flex;
    align-items: center;
    
    .battery-icon {
      width: 70rpx;
      height: 35rpx;
      border: 3rpx solid #333;
      border-radius: 6rpx;
      padding: 3rpx;
      margin-right: $spacing-sm;
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        right: -8rpx;
        top: 50%;
        transform: translateY(-50%);
        width: 5rpx;
        height: 18rpx;
        background: #333;
        border-radius: 0 2rpx 2rpx 0;
      }
      
      .battery-level {
        height: 100%;
        border-radius: 3rpx;
        transition: all 0.3s ease;
      }
    }
    
    .battery-text {
      font-size: 32rpx;
      font-weight: 600;
      transition: color 0.3s ease;
    }
  }
  
  .connection-status {
    font-size: 24rpx;
    color: $charging-disconnected;
    padding: 4rpx 16rpx;
    border-radius: 20rpx;
    background: rgba(142, 142, 147, 0.1);
    
    &.connected {
      color: $charging-connected;
      background: rgba(0, 122, 255, 0.1);
    }
  }
}

.model-container {
  height: 480rpx;
  background: $theme-card;
  border-radius: $border-radius-lg;
  margin-bottom: $spacing-lg;
  box-shadow: $card-shadow;
  overflow: hidden;
  
  .model-view {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $spacing-md;
    
    .car-image {
      width: 100%;
      height: 100%;
      transition: transform 0.3s ease;
      
      &:active {
        transform: scale(1.02);
      }
    }
  }
  
  .model-placeholder {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .placeholder-icon {
      font-size: 80rpx;
      margin-bottom: $spacing-md;
    }
    
    .placeholder-text {
      font-size: 28rpx;
      color: #999;
    }
  }
}

.info-card {
  background: $theme-card;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  box-shadow: $card-shadow;
  
  .card-header {
    margin-bottom: $spacing-lg;
    
    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 4rpx;
    }
    
    .subtitle {
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;
    
    .info-item {
      .label {
        font-size: 24rpx;
        color: #666;
        margin-bottom: 8rpx;
      }
      
      .value {
        font-size: 32rpx;
        color: #333;
        font-weight: 500;
        
        &.highlight {
          color: $theme-primary;
        }
      }
    }
  }
}

.charging-card {
  background: $theme-card;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  box-shadow: $card-shadow;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;
    
    .left {
      .charger-name {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .status-badge {
        font-size: 24rpx;
        padding: 4rpx 16rpx;
        border-radius: 20rpx;
        background: rgba(0, 122, 255, 0.1);
        color: $charging-connected;
        
        &.charging {
          background: rgba(52, 199, 89, 0.1);
          color: $charging-active;
        }
      }
    }
    
    .right {
      .time-remaining {
        font-size: 28rpx;
        color: #666;
      }
    }
  }
  
  .charging-progress {
    margin-bottom: $spacing-lg;
    
    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacing-sm;
      
      .progress-text {
        font-size: 26rpx;
        color: #666;
      }
      
      .progress-value {
        font-size: 30rpx;
        font-weight: 600;
        color: $theme-primary;
      }
    }
    
    .custom-progress {
      height: 16rpx;
      background: #F0F0F0;
      border-radius: 8rpx;
      overflow: hidden;
      
      .progress-bar {
        height: 100%;
        transition: all 0.3s ease;
        border-radius: 8rpx;
      }
    }
  }
  
  .charging-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;
    
    .stat-item {
      text-align: center;
      
      .stat-value {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 4rpx;
      }
      
      .stat-label {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}

.action-bar {
  position: fixed;
  left: $spacing-md;
  right: $spacing-md;
  bottom: $spacing-xl;
  display: flex;
  justify-content: space-between;
  gap: $spacing-md;
  
  .action-button {
    flex: 1;
    height: 120rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $theme-card;
    border-radius: $border-radius-md;
    box-shadow: $card-shadow;
    
    &.primary {
      background: $theme-gradient;
      color: #fff;
      box-shadow: $button-shadow;
      
      &.charging {
        background: linear-gradient(135deg, $charging-active, #2AC845);
      }
      
      &:disabled {
        opacity: 0.5;
      }
    }
    
    &.secondary {
      background: $theme-card;
      color: #333;
    }
    
    .button-icon {
      font-size: 40rpx;
      margin-bottom: 8rpx;
    }
    
    text {
      font-size: 24rpx;
    }
  }
}

.placeholder-icon {
  font-size: 80rpx;
  margin-bottom: $spacing-md;
}

.button-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
}
</style>

<script>
import { useVehicleStore } from '@/stores/vehicle'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const vehicleStore = useVehicleStore()
    const { currentVehicle, chargingStatus } = storeToRefs(vehicleStore)
    
    // 添加获取车辆图片的方法
    const getCarImage = (brand) => {
      const brandMap = {
        '特斯拉': '/static/images/cars/tesla.png',
        '比亚迪': '/static/images/cars/byd.png',
        '小鹏': '/static/images/cars/xpeng.png',
        '蔚来': '/static/images/cars/nio.png'
      }
      return brandMap[brand] || '/static/images/cars/default.png'
    }
    
    return {
      currentVehicle,
      chargingStatus,
      getCarImage
    }
  },
  
  methods: {
    navigateToAddCharger() {
      uni.navigateTo({
        url: '/pages/charger/add'
      })
    },
    
    navigateToAddVehicle() {
      uni.navigateTo({
        url: '/pages/vehicle/add'
      })
    },
    
    handleCharging() {
      const store = useVehicleStore()
      if (store.chargingStatus.isCharging) {
        store.stopCharging()
      } else {
        store.startCharging()
      }
    },
	navigateToUserContol(){
		uni.navigateTo({
			url:'/pages/user/user'
		})
	},
    
    formatTime(minutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours}小时${mins}分钟`
    },
    
    calculateCost() {
      // 示例：按照0.5元/kWh计算
      return this.chargingStatus.chargedAmount * 0.5
    },
    
    getBatteryColor(level) {
      if (level <= 20) {
        return '#FF3B30' // 红色
      } else if (level <= 50) {
        return '#FF9500' // 橙色
      } else {
        return '#34C759' // 绿色
      }
    },
    
    getBatteryTextColor(level) {
      if (level <= 20) {
        return '#FF3B30'
      } else if (level <= 50) {
        return '#FF9500'
      } else {
        return '#34C759'
      }
    },
    
    getBatteryGradient(level) {
      if (level <= 20) {
        return 'linear-gradient(90deg, #FF3B30, #FF6B6B)'
      } else if (level <= 50) {
        return 'linear-gradient(90deg, #FF9500, #FFBD2E)'
      } else {
        return 'linear-gradient(90deg, #34C759, #30D158)'
      }
    }
  }
}
</script>

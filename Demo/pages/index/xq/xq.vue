<!-- pages/detail/detail.vue -->
<template>
  <view class="container">
    <view class="charger-image">
      <image :src="charger.image" mode="aspectFill"></image>
      <view class="status-overlay" :class="charger.status">
        {{ charger.statusText }}
      </view>
    </view>
    <view class="charger-info">
      <view class="info-item">
        <uni-icons type="plug" size="24" color="#007AFF"></uni-icons>
        <text>充电功率: {{ charger.power }}kW</text>
      </view>
      <view class="info-item">
        <uni-icons type="battery" size="24" color="#007AFF"></uni-icons>
        <text>电压: {{ charger.voltage }}V</text>
      </view>
    </view>
    <view class="payment-section">
      <text class="section-title">选择充电金额</text>
      <view class="payment-buttons">
        <button 
          v-for="amount in amounts" 
          :key="amount" 
          @tap="selectAmount(amount)"
          :class="{ 'selected': selectedAmount === amount }"
        >
          {{ amount }}￥
        </button>
        <button @tap="selectAllBalance" :class="{ 'selected': isAllBalanceSelected }">全部余额</button>
      </view>
    </view>
    <button class="start-charging" @tap="startCharging" :disabled="!selectedAmount">
      <text>开始充电</text>
      <text v-if="selectedAmount" class="amount">{{ selectedAmount }}￥</text>
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      chargerId: null,
      charger: {
        image: '/static/charger-detail.jpg',
        status: 'running',
        statusText: '运行中',
        power: 50,
        voltage: 220
      },
      amounts: [20, 30, 50, 100],
      selectedAmount: 0,
      isAllBalanceSelected: false
    }
  },
  onLoad(option) {
    this.chargerId = option.id
    // 这里应该根据 chargerId 获取充电桩详情
  },
  methods: {
    selectAmount(amount) {
      this.selectedAmount = amount
      this.isAllBalanceSelected = false
    },
    selectAllBalance() {
      // 这里应该获取用户的所有余额
      this.selectedAmount = 200 // 假设用户有200元余额
      this.isAllBalanceSelected = true
    },
    startCharging() {
      if (this.selectedAmount > 0) {
        uni.showToast({
          title: `开始充电，金额：${this.selectedAmount}￥`,
          icon: 'success'
        })
      } else {
        uni.showToast({
          title: '请选择充电金额',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style>
.container {
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}
.charger-image {
  position: relative;
  width: 100%;
  height: 400rpx;
}
.charger-image image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.status-overlay {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: bold;
}
.running { background-color: rgba(40, 167, 69, 0.8); color: white; }
.idle { background-color: rgba(0, 123, 255, 0.8); color: white; }
.alert { background-color: rgba(220, 53, 69, 0.8); color: white; }
.charger-info {
  background-color: white;
  padding: 30rpx;
  margin-bottom: 20rpx;
}
.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}
.info-item text {
  margin-left: 20rpx;
  font-size: 28rpx;
  color: #333;
}
.payment-section {
  background-color: white;
  padding: 30rpx;
  margin-bottom: 20rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}
.payment-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.payment-buttons button {
  width: 48%;
  margin-bottom: 20rpx;
  background-color: #f0f0f0;
  color: #333;
  font-weight: normal;
  transition: all 0.3s ease;
}
.payment-buttons button.selected {
  background-color: #007AFF;
  color: white;
}
.start-charging {
  position: fixed;
  bottom: 30rpx;
  left: 30rpx;
  right: 30rpx;
  background-color: #007AFF;
  color: white;
  font-size: 32rpx;
  padding: 20rpx 0;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.start-charging:disabled {
  background-color: #ccc;
}
.start-charging .amount {
  margin-left: 20rpx;
  font-weight: bold;
}
</style>
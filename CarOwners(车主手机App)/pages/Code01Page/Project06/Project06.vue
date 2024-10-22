<template>
  <view class="container">
    
    <view class="status-tabs">
      <view 
        v-for="(tab, index) in statusTabs" 
        :key="index" 
        :class="['tab', { active: currentTab === index }]"
        @tap="changeTab(index)"
      >
        {{ tab }}
      </view>
    </view>
    
    <scroll-view scroll-y class="order-list">
      <view 
        v-for="order in filteredOrders" 
        :key="order.id" 
        class="order-item"
        @tap="goToOrderDetail(order.id)"
      >
        <view class="order-header">
          <text class="order-number">订单编号：{{ order.orderNumber }}</text>
          <text class="order-time">{{ order.startTime }}</text>
        </view>
        <view class="order-content">
          <view class="station-info">
            <text class="station-name">{{ order.stationName }}</text>
            <text class="charging-pile">{{ order.chargingPileName }} ({{ order.chargingPileNumber }})</text>
          </view>
          <view class="charging-info">
            <text class="charged-amount">{{ order.chargedAmount }} kWh</text>
            <text class="charging-duration">{{ order.chargingDuration }}</text>
          </view>
          <text v-if="currentTab === 0" class="remaining-time">剩余：{{ order.remainingTime }}</text>
          <text v-if="currentTab === 1 || currentTab === 2" class="payment-amount">¥{{ order.paymentAmount }}</text>
        </view>
        <view class="order-footer">
          <button v-if="currentTab === 0" @tap.stop="endCharging(order.id)" class="end-charging-btn">结束充电</button>
          <button v-if="currentTab === 1" @tap.stop="payOrder(order.id)" class="pay-btn">立即支付</button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const statusTabs = ['进行中', '待支付', '已完成']
const currentTab = ref(0)

const orders = ref([
  {
    id: 1,
    orderNumber: 'ORDER001',
    startTime: '2023-05-20 10:00:00',
    stationName: '阳光充电站',
    chargingPileName: '快充桩1号',
    chargingPileNumber: 'CP001',
    chargedAmount: 30,
    chargingDuration: '1小时30分钟',
    remainingTime: '30分钟',
    paymentAmount: 60,
    status: 'ongoing'
  },
  {
    id: 2,
    orderNumber: 'ORDER002',
    startTime: '2023-05-20 09:00:00',
    stationName: '绿色能源站',
    chargingPileName: '快充桩2号',
    chargingPileNumber: 'CP002',
    chargedAmount: 50,
    chargingDuration: '2小时15分钟',
    paymentAmount: 100,
    status: 'unpaid'
  },
  {
    id: 3,
    orderNumber: 'ORDER003',
    startTime: '2023-05-19 14:00:00',
    stationName: '未来充电站',
    chargingPileName: '慢充桩1号',
    chargingPileNumber: 'CP003',
    chargedAmount: 40,
    chargingDuration: '4小时',
    paymentAmount: 80,
    status: 'completed'
  }
])

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    if (currentTab.value === 0) return order.status === 'ongoing'
    if (currentTab.value === 1) return order.status === 'unpaid'
    if (currentTab.value === 2) return order.status === 'completed'
  })
})

const changeTab = (index) => {
  currentTab.value = index
}

const goToOrderDetail = (orderId) => {
  uni.setStorageSync('currentOrderId', orderId)
  uni.navigateTo({
    url: `/pages/order-detail/order-detail?id=${orderId}`
  })
}

const endCharging = (orderId) => {
  console.log('结束充电', orderId)
}

const payOrder = (orderId) => {
  console.log('支付订单', orderId)
}
</script>

<style scoped>
.container {
  padding: 30rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

.status-tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.tab {
  padding: 20rpx 0;
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  transition: all 0.3s ease;
}

.tab.active {
  color: #007AFF;
  font-weight: bold;
  position: relative;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #007AFF;
  border-radius: 2rpx;
}

.order-list {
  height: calc(100vh - 240rpx);
}

.order-item {
  background-color: #fff;
  border-radius: 15rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.order-number {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.order-time {
  font-size: 24rpx;
  color: #999;
}

.order-content {
  margin-bottom: 20rpx;
}

.station-info {
  margin-bottom: 10rpx;
}

.station-name {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.charging-pile {
  font-size: 26rpx;
  color: #666;
}

.charging-info {
  display: flex;
  justify-content: space-between;
  margin-top: 15rpx;
}

.charged-amount {
  font-size: 36rpx;
  color: #007AFF;
  font-weight: bold;
}

.charging-duration {
  font-size: 28rpx;
  color: #666;
  align-self: flex-end;
}

.remaining-time, .payment-amount {
  font-size: 28rpx;
  color: #ff6b6b;
  margin-top: 10rpx;
}

.order-footer {
  margin-top: 20rpx;
  text-align: right;
}

.end-charging-btn, .pay-btn {
  padding: 15rpx 30rpx;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #fff;
  border: none;
}

.end-charging-btn {
  background-color: #ff6b6b;
}

.pay-btn {
  background-color: #007AFF;
}
</style>
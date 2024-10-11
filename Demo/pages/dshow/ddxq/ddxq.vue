<template>
  <view class="container">
    
    <view class="order-info">
      <view class="info-section status-section">
        <text class="section-title">订单状态</text>
        <text :class="['status-tag', getStatusClass(orderDetails.status)]">{{ orderDetails.status }}</text>
      </view>
      
      <view class="info-section">
        <text class="section-title">订单编号</text>
        <text class="order-number">{{ orderDetails.orderNumber }}</text>
      </view>
      
      <view class="info-section">
        <text class="section-title">终端信息</text>
        <view class="terminal-info">
          <text class="station-name">{{ orderDetails.stationName }}</text>
          <text class="charging-pile">{{ orderDetails.chargingPileName }} ({{ orderDetails.chargingPileNumber }})</text>
        </view>
      </view>
      
      <view class="info-section">
        <text class="section-title">充电信息</text>
        <view class="charging-details">
          <view class="charging-item">
            <text class="item-label">开始时间</text>
            <text class="item-value">{{ orderDetails.startTime }}</text>
          </view>
          <view class="charging-item">
            <text class="item-label">结束时间</text>
            <text class="item-value">{{ orderDetails.endTime }}</text>
          </view>
          <view class="charging-item">
            <text class="item-label">充电量</text>
            <text class="item-value highlight">{{ orderDetails.chargedAmount }} kWh</text>
          </view>
          <view class="charging-item">
            <text class="item-label">充电时长</text>
            <text class="item-value">{{ orderDetails.chargingDuration }}</text>
          </view>
          <view class="charging-item">
            <text class="item-label">车牌号</text>
            <text class="item-value">{{ orderDetails.licensePlate }}</text>
          </view>
          <view class="charging-item">
            <text class="item-label">车辆型号</text>
            <text class="item-value">{{ orderDetails.vehicleModel }}</text>
          </view>
        </view>
      </view>
      
      <view class="info-section">
        <text class="section-title">费用信息</text>
        <view class="cost-details">
          <view class="cost-item">
            <text class="item-label">订单总额</text>
            <text class="item-value">¥{{ orderDetails.totalAmount }}</text>
          </view>
          <view class="cost-item">
            <text class="item-label">电费</text>
            <text class="item-value">¥{{ orderDetails.electricityFee }}</text>
          </view>
          <view class="cost-item">
            <text class="item-label">服务费</text>
            <text class="item-value">¥{{ orderDetails.serviceFee }}</text>
          </view>
          <view class="cost-item total">
            <text class="item-label">实付金额</text>
            <text class="item-value highlight">¥{{ orderDetails.actualPayment }}</text>
          </view>
        </view>
      </view>
      
      <view class="info-section">
        <text class="section-title">支付信息</text>
        <view class="payment-details">
          <view class="payment-item">
            <text class="item-label">支付金额</text>
            <text class="item-value highlight">¥{{ orderDetails.paymentAmount }}</text>
          </view>
          <view class="payment-item">
            <text class="item-label">支付方式</text>
            <text class="item-value">{{ orderDetails.paymentMethod }}</text>
          </view>
          <view class="payment-item">
            <text class="item-label">支付时间</text>
            <text class="item-value">{{ orderDetails.paymentTime }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const orderDetails = ref({})

const sampleOrders = [
  {
    id: 1,
    status: '进行中',
    orderNumber: 'ORDER001',
    stationName: '阳光充电站',
    chargingPileNumber: 'CP001',
    chargingPileName: '快充桩1号',
    startTime: '2023-05-20 10:00:00',
    endTime: '-',
    chargedAmount: 30,
    chargingDuration: '1小时30分钟',
    licensePlate: '京A12345',
    vehicleModel: 'Tesla Model 3',
    totalAmount: 60,
    electricityFee: 50,
    serviceFee: 10,
    actualPayment: 0,
    paymentAmount: 0,
    paymentMethod: '-',
    paymentTime: '-'
  },
  {
    id: 2,
    status: '待支付',
    orderNumber: 'ORDER002',
    stationName: '绿色能源站',
    chargingPileNumber: 'CP002',
    chargingPileName: '快充桩2号',
    startTime: '2023-05-20 09:00:00',
    endTime: '2023-05-20 11:15:00',
    chargedAmount: 50,
    chargingDuration: '2小时15分钟',
    licensePlate: '沪B67890',
    vehicleModel: 'BYD 汉',
    totalAmount: 100,
    electricityFee: 85,
    serviceFee: 15,
    actualPayment: 100,
    paymentAmount: 100,
    paymentMethod: '待支付',
    paymentTime: '-'
  },
  {
    id: 3,
    status: '已完成',
    orderNumber: 'ORDER003',
    stationName: '未来充电站',
    chargingPileNumber: 'CP003',
    chargingPileName: '慢充桩1号',
    startTime: '2023-05-19 14:00:00',
    endTime: '2023-05-19 18:00:00',
    chargedAmount: 40,
    chargingDuration: '4小时',
    licensePlate: '粤C54321',
    vehicleModel: '小鹏 P7',
    totalAmount: 80,
    electricityFee: 70,
    serviceFee: 10,
    actualPayment: 80,
    paymentAmount: 80,
    paymentMethod: '微信支付',
    paymentTime: '2023-05-19 18:05:00'
  }
]

onMounted(() => {
	// uni.getStorageSync('currentOrderId')
  const orderId = 1
  orderDetails.value = sampleOrders.find(order => order.id === orderId) || {}
})

const getStatusClass = (status) => {
  switch (status) {
    case '进行中':
      return 'status-ongoing'
    case '待支付':
      return 'status-unpaid'
    case '已完成':
      return 'status-completed'
    default:
      return ''
  }
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

.order-info {
  background-color: #fff;
  border-radius: 15rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.info-section {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.info-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 15rpx;
  display: block;
}

.status-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-tag {
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: bold;
}

.status-ongoing {
  background-color: #007AFF;
  color: #fff;
}

.status-unpaid {
  background-color: #ff6b6b;
  color: #fff;
}

.status-completed {
  background-color: #4cd964;
  color: #fff;
}

.order-number {
  font-size: 28rpx;
  color: #666;
}

.terminal-info {
  margin-top: 10rpx;
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

.charging-details, .cost-details, .payment-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}

.charging-item, .cost-item, .payment-item {
  display: flex;
  flex-direction: column;
}

.item-label {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 5rpx;
}

.item-value {
  font-size: 28rpx;
  color: #333;
}

.highlight {
  color: #007AFF;
  font-weight: bold;
}

.total {
  grid-column: 1 / -1;
  margin-top: 10rpx;
  padding-top: 10rpx;
  border-top: 1rpx dashed #eee;
}

.total .item-label {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.total .item-value {
  font-size: 36rpx;
}
</style>
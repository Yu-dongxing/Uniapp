<template>
  <view class="records-container">
    <view class="record-item" v-for="(record, index) in chargingRecords" :key="index">
      <view class="record-header">
        <text class="date">{{ formatDate(record.date) }}</text>
        <text class="vehicle-info">{{ record.vehicleInfo.plateNumber }}</text>
      </view>
      
      <view class="record-details">
        <view class="detail-item">
          <text class="label">充电电量</text>
          <text class="value">{{ record.chargedAmount.toFixed(2) }}kWh</text>
        </view>
        <view class="detail-item">
          <text class="label">充电时长</text>
          <text class="value">{{ formatDuration(record.duration) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      chargingRecords: []
    }
  },
  
  onShow() {
    // 加载充电记录
    this.chargingRecords = uni.getStorageSync('chargingRecords') || []
  },
  
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    },
    
    formatDuration(minutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours}小时${mins}分钟`
    }
  }
}
</script>

<style lang="scss">
.records-container {
  padding: 20rpx;
  
  .record-item {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .record-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20rpx;
      
      .date {
        color: #666;
        font-size: 28rpx;
      }
      
      .vehicle-info {
        color: #333;
        font-weight: bold;
      }
    }
    
    .record-details {
      display: flex;
      justify-content: space-around;
      
      .detail-item {
        text-align: center;
        
        .label {
          color: #666;
          font-size: 24rpx;
          margin-bottom: 10rpx;
        }
        
        .value {
          color: #333;
          font-weight: bold;
          font-size: 32rpx;
        }
      }
    }
  }
}
</style> 
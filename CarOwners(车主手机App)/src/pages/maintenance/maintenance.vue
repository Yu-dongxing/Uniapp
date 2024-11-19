<template>
  <view class="container">
    <!-- 顶部标签页 -->
    <view class="tab-bar">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentTab === index }"
        @tap="switchTab(index)"
      >
        <text>{{ tab }}</text>
      </view>
    </view>

    <!-- 预约表单 -->
    <view class="booking-form" v-if="currentTab === 0">
      <view class="form-section">
        <view class="section-title">基本信息</view>
        <view class="form-item">
          <text class="label">维保类型</text>
          <picker @change="handleTypeChange" :value="typeIndex" :range="maintenanceTypes" range-key="name">
            <view class="picker">
              {{ maintenanceTypes[typeIndex].name }}
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">服务城市</text>
          <picker mode="region" @change="handleCityChange" :value="cityArray">
            <view class="picker">
              {{ cityArray.join(' ') }}
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">服务站点</text>
          <picker @change="handleStationChange" :value="stationIndex" :range="stations" range-key="name">
            <view class="picker">
              {{ stations[stationIndex].name }}
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </picker>
        </view>
      </view>

      <view class="form-section">
        <view class="section-title">预约时间</view>
        <view class="form-item">
          <text class="label">预约日期</text>
          <picker mode="date" :start="startDate" :end="endDate" @change="handleDateChange" :value="bookingDate">
            <view class="picker">
              {{ bookingDate }}
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">预约时段</text>
          <picker @change="handleTimeChange" :value="timeIndex" :range="timeSlots">
            <view class="picker">
              {{ timeSlots[timeIndex] }}
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </picker>
        </view>
      </view>

      <view class="form-section">
        <view class="section-title">维修方案</view>
        <view class="service-plan">
          <view class="plan-item" v-for="(item, index) in servicePlan" :key="index">
            <view class="item-header">
              <text class="name">{{ item.name }}</text>
              <text class="price">¥{{ item.price }}</text>
            </view>
            <text class="desc">{{ item.desc }}</text>
          </view>
          <view class="total-price">
            <text>预估总价</text>
            <text class="amount">¥{{ totalPrice }}</text>
          </view>
        </view>
      </view>

      <!-- 电子签名区域 -->
      <view class="signature-section">
        <view class="section-title">
          <text>电子签名</text>
          <text class="clear-btn" @tap="clearSignature">重签</text>
        </view>
        <view class="signature-box">
          <canvas canvas-id="signature" class="signature-canvas" 
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd">
          </canvas>
        </view>
      </view>

      <!-- 提交按钮 -->
      <button class="submit-btn" @tap="submitBooking">提交预约</button>
    </view>

    <!-- 维保历史 -->
    <view class="history-list" v-else>
      <view class="history-item" v-for="(item, index) in historyList" :key="index">
        <view class="item-header">
          <view class="left">
            <text class="order-no">工单号：{{ item.orderNo }}</text>
            <view class="status-tag" :class="item.status.type">
              {{ item.status.text }}
            </view>
          </view>
          <text class="date">{{ item.date }}</text>
        </view>
        
        <view class="item-content">
          <view class="service-info">
            <text class="type">{{ item.serviceType }}</text>
            <text class="time">预约时间：{{ item.appointTime }}</text>
          </view>
          <view class="shop-info">
            <text class="name">{{ item.shopName }}</text>
            <text class="address">{{ item.address }}</text>
          </view>
        </view>
        
        <view class="item-footer">
          <view class="price-info">
            <text class="label">费用：</text>
            <text class="price">¥{{ item.price }}</text>
          </view>
          <view class="btn-group">
            <button class="action-btn outline" v-if="item.status.type === 'pending'" @tap="cancelOrder(item)">取消预约</button>
            <button class="action-btn primary" v-if="item.status.type === 'completed'" @tap="writeReview(item)">评价服务</button>
            <button class="action-btn" v-if="item.status.type === 'in-progress'" @tap="checkProgress(item)">查看进度</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: ['维保预约', '维保历史'],
      currentTab: 0,
      // 预约表单数据
      typeIndex: 0,
      maintenanceTypes: [
        { name: '常规保养', price: 299 },
        { name: '深度保养', price: 599 },
        { name: '故障维修', price: 399 }
      ],
      cityArray: ['广东省', '广州市', '天河区'],
      stationIndex: 0,
      stations: [
        { name: '广州天河服务中心', address: '天河路123号' },
        { name: '广州越秀服务中心', address: '越秀路456号' }
      ],
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      bookingDate: '2024-01-20',
      timeIndex: 0,
      timeSlots: ['09:00-10:00', '10:00-11:00', '14:00-15:00', '15:00-16:00'],
      servicePlan: [
        {
          name: '机油更换',
          desc: '使用原厂机油，包含机滤更换',
          price: 299
        },
        {
          name: '常规检查',
          desc: '包含15项基础检查项目',
          price: 100
        }
      ],
      signatureCtx: null,
      // 历史记录数据
      historyList: [
        {
          orderNo: 'WB202401200001',
          status: { text: '待服务', type: 'pending' },
          date: '2024-01-20',
          serviceType: '常规保养',
          appointTime: '2024-01-25 10:00',
          shopName: '车享家汽车服务中心',
          address: '广州市天河区天河路123号',
          price: '299.00'
        },
        {
          orderNo: 'WB202401150002',
          status: { text: '已完成', type: 'completed' },
          date: '2024-01-15',
          serviceType: '轮胎更换',
          appointTime: '2024-01-15 14:00',
          shopName: '一汽大众4S店',
          address: '广州市海珠区滨江东路456号',
          price: '1299.00'
        }
      ]
    }
  },
  computed: {
    totalPrice() {
      return this.servicePlan.reduce((total, item) => total + item.price, 0)
    }
  },
  onReady() {
    this.signatureCtx = uni.createCanvasContext('signature', this)
    this.initSignature()
  },
  methods: {
    switchTab(index) {
      this.currentTab = index
    },
    // 表单处理方法
    handleTypeChange(e) {
      this.typeIndex = e.detail.value
    },
    handleCityChange(e) {
      this.cityArray = e.detail.value
    },
    handleStationChange(e) {
      this.stationIndex = e.detail.value
    },
    handleDateChange(e) {
      this.bookingDate = e.detail.value
    },
    handleTimeChange(e) {
      this.timeIndex = e.detail.value
    },
    // 签名相关方法
    initSignature() {
      this.signatureCtx.setStrokeStyle('#333')
      this.signatureCtx.setLineWidth(3)
      this.signatureCtx.setLineCap('round')
    },
    handleTouchStart(e) {
      const { x, y } = e.touches[0]
      this.signatureCtx.beginPath()
      this.signatureCtx.moveTo(x, y)
    },
    handleTouchMove(e) {
      const { x, y } = e.touches[0]
      this.signatureCtx.lineTo(x, y)
      this.signatureCtx.stroke()
      this.signatureCtx.draw(true)
    },
    clearSignature() {
      this.signatureCtx.clearRect(0, 0, 1000, 200)
      this.signatureCtx.draw(true)
    },
    // 提交预约
    submitBooking() {
      uni.showLoading({ title: '提交中...' })
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '预约成功',
          icon: 'success'
        })
      }, 1500)
    },
    // 历史记录相关方法
    cancelOrder(item) {
      uni.showModal({
        title: '取消预约',
        content: '确定要取消该预约吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '已取消预约',
              icon: 'success'
            })
          }
        }
      })
    },
    writeReview(item) {
      uni.navigateTo({
        url: `/src/pages/write-review/write-review?id=${item.orderNo}`
      })
    },
    checkProgress(item) {
      uni.navigateTo({
        url: `/src/pages/maintenance-progress/maintenance-progress?id=${item.orderNo}`
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 30rpx;
}

.tab-bar {
  display: flex;
  background: #fff;
  padding: 20rpx 40rpx;
  margin-bottom: 20rpx;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    position: relative;
    padding: 20rpx 0;
    
    &.active {
      color: #4CAF50;
      font-weight: bold;
      
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background: #4CAF50;
        border-radius: 2rpx;
      }
    }
  }
}

// 预约表单样式
.booking-form {
  padding: 20rpx;
  
  .form-section {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 30rpx;
      color: #333;
    }
    
    .form-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      .label {
        font-size: 28rpx;
        color: #333;
      }
      
      .picker {
        font-size: 28rpx;
        color: #666;
        display: flex;
        align-items: center;
      }
    }
  }
}

// 维修方案样式
.service-plan {
  .plan-item {
    padding: 20rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10rpx;
      
      .name {
        font-size: 28rpx;
        color: #333;
      }
      
      .price {
        font-size: 28rpx;
        color: #ff6b6b;
        font-weight: bold;
      }
    }
    
    .desc {
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .total-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20rpx;
    
    text {
      font-size: 28rpx;
      color: #333;
    }
    
    .amount {
      font-size: 36rpx;
      color: #ff6b6b;
      font-weight: bold;
    }
  }
}

// 签名区域样式
.signature-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 20rpx;
  
  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    
    .clear-btn {
      font-size: 24rpx;
      color: #4CAF50;
    }
  }
  
  .signature-box {
    height: 200rpx;
    border: 2rpx dashed #ddd;
    border-radius: 12rpx;
    
    .signature-canvas {
      width: 100%;
      height: 100%;
    }
  }
}

// 提交按钮样式
.submit-btn {
  background: #4CAF50;
  color: #fff;
  font-size: 32rpx;
  margin: 40rpx 20rpx;
  padding: 20rpx;
  border-radius: 40rpx;
  border: none;
}

// 历史记录列表样式
.history-list {
  padding: 20rpx;
  
  .history-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .left {
        display: flex;
        align-items: center;
        gap: 20rpx;
        
        .order-no {
          font-size: 28rpx;
          color: #333;
        }
        
        .status-tag {
          padding: 4rpx 16rpx;
          border-radius: 20rpx;
          font-size: 24rpx;
          
          &.pending {
            color: #ff9800;
            background: rgba(255, 152, 0, 0.1);
          }
          
          &.completed {
            color: #4CAF50;
            background: rgba(76, 175, 80, 0.1);
          }
          
          &.in-progress {
            color: #2196F3;
            background: rgba(33, 150, 243, 0.1);
          }
        }
      }
      
      .date {
        font-size: 26rpx;
        color: #999;
      }
    }
    
    .item-content {
      padding: 20rpx 0;
      border-top: 1rpx solid #f5f5f5;
      border-bottom: 1rpx solid #f5f5f5;
      
      .service-info {
        margin-bottom: 16rpx;
        
        .type {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
          margin-bottom: 10rpx;
          display: block;
        }
        
        .time {
          font-size: 26rpx;
          color: #666;
        }
      }
      
      .shop-info {
        .name {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 6rpx;
          display: block;
        }
        
        .address {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
    
    .item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      
      .price-info {
        .label {
          font-size: 26rpx;
          color: #666;
        }
        
        .price {
          font-size: 32rpx;
          color: #ff6b6b;
          font-weight: bold;
        }
      }
      
      .btn-group {
        display: flex;
        gap: 20rpx;
        
        .action-btn {
          font-size: 26rpx;
          padding: 12rpx 30rpx;
          border-radius: 30rpx;
          
          &.outline {
            color: #666;
            background: #fff;
            border: 1rpx solid #ddd;
          }
          
          &.primary {
            color: #fff;
            background: #4CAF50;
            border: none;
          }
        }
      }
    }
  }
}
</style> 
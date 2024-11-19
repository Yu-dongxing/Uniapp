<template>
  <view class="container">
    <!-- 车辆信息卡片 -->
    <view class="car-card" v-if="currentCar">
      <!-- 3D模型展示区域 -->
      <view class="model-viewer">
        <canvas 
          v-if="currentCar"
          id="carModel" 
          class="car-model-canvas"
          @touchstart="handleModelTouchStart"
          @touchmove="handleModelTouchMove"
          @touchend="handleModelTouchEnd"
        ></canvas>

        <view class="model-controls">
          <slider 
            class="rotate-slider" 
            :value="rotateValue" 
            @change="handleRotate" 
            min="0" 
            max="360" 
            show-value
          />
          <slider 
            class="zoom-slider" 
            :value="zoomValue" 
            @change="handleZoom" 
            min="50" 
            max="150" 
            show-value
          />
        </view>
        <view class="car-status">
          <view class="battery-info">
            <view class="battery-icon">
              <view 
                class="battery-level" 
                :style="{ width: currentCar?.batteryLevel + '%' }"
              ></view>
            </view>
            <text class="battery-text">{{ currentCar?.batteryLevel }}%</text>
            <text class="range">续航 {{ currentCar?.range }}km</text>
          </view>
        </view>
      </view>

      <!-- 远程控制面板 -->
      <view class="remote-control">
        <view class="control-header">
          <text class="title">远程控制</text>
          <switch :checked="controlEnabled" @change="toggleControl" color="#4CAF50" />
        </view>
        <view class="control-grid">
          <view class="control-item" @tap="toggleDoor('all')">
            <view class="icon-box" :class="{ active: doorStatus.all }">
              <uni-icons type="locked" size="24" :color="doorStatus.all ? '#fff' : '#333'"></uni-icons>
            </view>
            <text>车门锁</text>
          </view>
          <view class="control-item" @tap="toggleAC">
            <view class="icon-box" :class="{ active: acStatus.on }">
              <uni-icons type="wind" size="24" :color="acStatus.on ? '#fff' : '#333'"></uni-icons>
            </view>
            <text>空调</text>
          </view>
          <view class="control-item" @tap="toggleTrunk">
            <view class="icon-box" :class="{ active: trunkStatus }">
              <uni-icons type="box" size="24" :color="trunkStatus ? '#fff' : '#333'"></uni-icons>
            </view>
            <text>后备箱</text>
          </view>
          <view class="control-item" @tap="findMyCar">
            <view class="icon-box">
              <uni-icons type="sound" size="24" color="#333"></uni-icons>
            </view>
            <text>寻车</text>
          </view>
        </view>

        <!-- 空调控 -->
        <view class="ac-panel" v-if="acStatus.on">
          <view class="temp-control">
            <button class="temp-btn" @tap="adjustTemp(-1)">-</button>
            <text class="temp-value">{{ acStatus.temp }}°C</text>
            <button class="temp-btn" @tap="adjustTemp(1)">+</button>
          </view>
          <view class="fan-control">
            <text>风速</text>
            <slider :value="acStatus.fan" @change="adjustFan" min="1" max="7" show-value />
          </view>
        </view>
      </view>

      <!-- 原有的车辆状态信息 -->
      <view class="status-grid">
        <view class="status-item">
          <text class="value">{{ currentCar.mileage }}km</text>
          <text class="label">当前里程</text>
        </view>
        <view class="divider"></view>
        <view class="status-item">
          <text class="value">{{ currentCar.nextMaintenance }}km</text>
          <text class="label">下次保养</text>
        </view>
        <view class="divider"></view>
        <view class="status-item">
          <text class="value">{{ currentCar.insuranceDate }}</text>
          <text class="label">保险到期</text>
        </view>
      </view>
    </view>

    <!-- 添加车辆提 -->
    <view class="empty-state" v-else>
      <image src="/static/images/empty-car.png" mode="aspectFit"></image>
      <text class="empty-text">暂未添加车辆信息</text>
      <button class="add-btn" @tap="addCar">添加爱车</button>
    </view>

    <!-- 车辆服务入口 -->
    <view class="service-section">
      <view class="section-title">
        <text class="title-text">车辆服务</text>
      </view>
      <view class="service-grid">
        <view class="service-item" v-for="(item, index) in services" :key="index" @tap="navigateToService(item)">
          <view class="icon-box">
            <image :src="item.icon" mode="aspectFit"></image>
          </view>
          <text class="service-name">{{ item.name }}</text>
          <text class="service-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 车辆档案 -->
    <view class="record-section">
      <view class="section-title">
        <text class="title-text">车辆档案</text>
        <text class="more-text" @tap="viewAllRecords">查看全部</text>
      </view>
      <view class="record-list">
        <view class="record-item" v-for="(item, index) in records" :key="index">
          <view class="record-left">
            <text class="record-type">{{ item.type }}</text>
            <text class="record-date">{{ item.date }}</text>
          </view>
          <text class="record-mileage">{{ item.mileage }}km</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentCar: {
        brand: '大众',
        model: '帕萨特',
        plateNumber: '粤B12345',
        image: '/static/images/cars/passat.png',
        mileage: '15000',
        nextMaintenance: '5000',
        insuranceDate: '2024-12-31',
        batteryLevel: 85,
        range: 420,
        modelUrl: 'https://example.com/3d-model-viewer'
      },
      services: [
        { 
          name: '保养记录', 
          icon: '/static/images/icons/maintenance-record.png',
          desc: '查看保养历史',
          url: '/pages/maintenance-record/index' 
        },
        { 
          name: '加油记录', 
          icon: '/static/images/icons/gas-record.png',
          desc: '油耗分析',
          url: '/pages/gas-record/index' 
        },
        { 
          name: '违章记录', 
          icon: '/static/images/icons/violation-record.png',
          desc: '违章查询',
          url: '/pages/violation-record/index' 
        },
        { 
          name: '车辆档案', 
          icon: '/static/images/icons/car-file.png',
          desc: '完整档案',
          url: '/pages/car-file/index' 
        }
      ],
      records: [
        { type: '常规保养', date: '2024-01-15', mileage: '12000' },
        { type: '更换轮胎', date: '2023-12-20', mileage: '10000' },
        { type: '更换机油', date: '2023-11-05', mileage: '8000' }
      ],
      showModel: true,
      rotateValue: 0,
      zoomValue: 50,
      controlEnabled: true,
      doorStatus: {
        all: true,
        front: true,
        back: true
      },
      acStatus: {
        on: false,
        temp: 24,
        fan: 3
      },
      trunkStatus: false,
      modelContext: null,
      modelTouching: false,
      lastTouchX: 0,
      lastTouchY: 0
    }
  },
  mounted() {
    if (this.currentCar) {
      this.initModelCanvas()
    }
  },
  methods: {
    addCar() {
      uni.navigateTo({
        url: '/pages/add-car/add-car'
      })
    },
    navigateToService(service) {
      uni.navigateTo({
        url: service.url
      })
    },
    viewAllRecords() {
      uni.navigateTo({
        url: '/pages/car-records/car-records'
      })
    },
    // 3D模型控制
    handleRotate(e) {
      this.rotateValue = e.detail.value
      this.drawPlaceholderModel() // 重新渲染模型
    },
    handleZoom(e) {
      this.zoomValue = e.detail.value
      this.drawPlaceholderModel() // 重新渲染模型
    },

    // 远程控制功能
    toggleControl(e) {
      this.controlEnabled = e.detail.value
    },
    toggleDoor(position) {
      if (!this.controlEnabled) return
      this.doorStatus[position] = !this.doorStatus[position]
      // 发送远程控制指令
      uni.showToast({
        title: this.doorStatus[position] ? '车门已上锁' : '车门已解锁',
        icon: 'none'
      })
    },
    toggleAC() {
      if (!this.controlEnabled) return
      this.acStatus.on = !this.acStatus.on
      uni.showToast({
        title: this.acStatus.on ? '空调已开启' : '空调已关闭',
        icon: 'none'
      })
    },
    adjustTemp(delta) {
      if (!this.controlEnabled) return
      this.acStatus.temp = Math.max(16, Math.min(30, this.acStatus.temp + delta))
    },
    adjustFan(e) {
      if (!this.controlEnabled) return
      this.acStatus.fan = e.detail.value
    },
    toggleTrunk() {
      if (!this.controlEnabled) return
      this.trunkStatus = !this.trunkStatus
      uni.showToast({
        title: this.trunkStatus ? '后备箱已打开' : '后备箱已关闭',
        icon: 'none'
      })
    },
    findMyCar() {
      if (!this.controlEnabled) return
      uni.showToast({
        title: '寻车信号已发送',
        icon: 'none'
      })
    },
    // 初始化3D模型画布
    initModelCanvas() {
      const query = uni.createSelectorQuery().in(this)
      query.select('#carModel')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          this.modelContext = ctx
          
          // 这里可以添加实际的3D渲染逻辑
          this.drawPlaceholderModel()
        })
    },

    // 绘制占位模型（示例）
    drawPlaceholderModel() {
      if (!this.modelContext) return
      
      const ctx = this.modelContext
      const canvas = ctx.canvas
      
      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 绘制简单的汽车轮廓
      ctx.beginPath()
      ctx.strokeStyle = '#333'
      ctx.lineWidth = 2
      
      // 车身
      ctx.moveTo(50, 100)
      ctx.lineTo(150, 100)
      ctx.lineTo(200, 150)
      ctx.lineTo(250, 150)
      ctx.lineTo(300, 100)
      ctx.lineTo(350, 100)
      ctx.lineTo(350, 200)
      ctx.lineTo(50, 200)
      ctx.closePath()
      
      // 轮子
      ctx.moveTo(100, 200)
      ctx.arc(100, 200, 30, 0, Math.PI * 2)
      ctx.moveTo(300, 200)
      ctx.arc(300, 200, 30, 0, Math.PI * 2)
      
      ctx.stroke()
    },

    // 触摸事件处理
    handleModelTouchStart(e) {
      this.modelTouching = true
      this.lastTouchX = e.touches[0].x
      this.lastTouchY = e.touches[0].y
    },

    handleModelTouchMove(e) {
      if (!this.modelTouching) return
      
      const deltaX = e.touches[0].x - this.lastTouchX
      const deltaY = e.touches[0].y - this.lastTouchY
      
      // 根据触摸移动更新模型旋转角度
      this.rotateValue = (this.rotateValue + deltaX) % 360
      
      this.lastTouchX = e.touches[0].x
      this.lastTouchY = e.touches[0].y
      
      this.drawPlaceholderModel() // 重新渲染模型
    },

    handleModelTouchEnd() {
      this.modelTouching = false
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.car-card {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border-radius: 20rpx;
  padding: 30rpx;
  color: #ffffff;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.1);
  
  .car-header {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    
    .car-image {
      width: 160rpx;
      height: 100rpx;
      margin-right: 20rpx;
    }
    
    .car-details {
      flex: 1;
      
      .car-name {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
        display: block;
      }
      
      .car-plate {
        font-size: 28rpx;
        opacity: 0.9;
      }
    }
  }
  
  .status-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255,255,255,0.1);
    border-radius: 12rpx;
    padding: 20rpx;
    
    .divider {
      width: 2rpx;
      height: 60rpx;
      background: rgba(255,255,255,0.2);
    }
    
    .status-item {
      flex: 1;
      text-align: center;
      
      .value {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
        display: block;
      }
      
      .label {
        font-size: 24rpx;
        opacity: 0.8;
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;
  background: #ffffff;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  
  image {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 30rpx;
  }
  
  .empty-text {
    font-size: 28rpx;
    color: #999;
    margin-bottom: 40rpx;
  }
  
  .add-btn {
    background: #4CAF50;
    color: #ffffff;
    font-size: 28rpx;
    padding: 20rpx 60rpx;
    border-radius: 40rpx;
    border: none;
    box-shadow: 0 4rpx 12rpx rgba(76,175,80,0.2);
  }
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding: 0 10rpx;
  
  .title-text {
    font-size: 32rpx;
    font-weight: bold;
    position: relative;
    padding-left: 20rpx;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6rpx;
      height: 30rpx;
      background-color: #4CAF50;
      border-radius: 3rpx;
    }
  }
  
  .more-text {
    font-size: 24rpx;
    color: #999;
  }
}

.service-section {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  
  .service-grid {
    display: flex;
    flex-wrap: wrap;
    
    .service-item {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx 0;
      
      .icon-box {
        width: 80rpx;
        height: 80rpx;
        background: #f8f8f8;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12rpx;
        
        image {
          width: 44rpx;
          height: 44rpx;
        }
      }
      
      .service-name {
        font-size: 26rpx;
        color: #333;
        margin-bottom: 6rpx;
      }
      
      .service-desc {
        font-size: 22rpx;
        color: #999;
      }
    }
  }
}

.record-section {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  
  .record-list {
    .record-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      .record-left {
        .record-type {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 8rpx;
          display: block;
        }
        
        .record-date {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .record-mileage {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
}

.model-viewer {
  height: 400rpx;
  background: linear-gradient(to bottom, #f8f8f8, #ffffff);
  border-radius: 16rpx;
  margin: 20rpx 0;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 20rpx rgba(0,0,0,0.05);
  
  .model-controls {
    position: absolute;
    bottom: 30rpx;
    left: 30rpx;
    right: 30rpx;
    display: flex;
    gap: 30rpx;
    
    slider {
      flex: 1;
      margin: 0;
      background: rgba(255,255,255,0.8);
      border-radius: 20rpx;
      padding: 0 10rpx;
      height: 40rpx;
    }
  }
  
  .car-status {
    position: absolute;
    top: 30rpx;
    right: 30rpx;
    background: rgba(0,0,0,0.7);
    padding: 15rpx 25rpx;
    border-radius: 40rpx;
    backdrop-filter: blur(10rpx);
    
    .battery-info {
      display: flex;
      align-items: center;
      color: #fff;
      
      .battery-icon {
        width: 70rpx;
        height: 35rpx;
        border: 2rpx solid #fff;
        border-radius: 6rpx;
        margin-right: 15rpx;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          right: -6rpx;
          top: 50%;
          transform: translateY(-50%);
          width: 4rpx;
          height: 16rpx;
          background: #fff;
          border-radius: 2rpx;
        }
        
        .battery-level {
          position: absolute;
          left: 3rpx;
          top: 3rpx;
          bottom: 3rpx;
          background: linear-gradient(to right, #4CAF50, #45a049);
          border-radius: 3rpx;
          transition: width 0.3s ease;
        }
      }
      
      .battery-text {
        font-size: 26rpx;
        font-weight: 500;
        margin-right: 20rpx;
      }
      
      .range {
        font-size: 24rpx;
        opacity: 0.9;
        padding-left: 20rpx;
        border-left: 1rpx solid rgba(255,255,255,0.3);
      }
    }
  }
  
  .car-model-canvas {
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #f8f8f8, #ffffff);
  }
}

.remote-control {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin: 20rpx 0;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);
  
  .control-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .title {
      font-size: 32rpx;
      font-weight: bold;
      background: linear-gradient(to right, #4CAF50, #45a049);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  
  .control-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30rpx;
    padding: 10rpx 0;
    
    .control-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .icon-box {
        width: 110rpx;
        height: 110rpx;
        background: #f8f8f8;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12rpx;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(76,175,80,0.1), rgba(69,160,73,0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &.active {
          background: linear-gradient(135deg, #4CAF50, #45a049);
          transform: scale(1.05);
          box-shadow: 0 6rpx 20rpx rgba(76,175,80,0.3);
          
          &::before {
            opacity: 1;
          }
        }
      }
      
      text {
        font-size: 26rpx;
        color: #333;
        font-weight: 500;
      }
    }
  }
  
  .ac-panel {
    margin-top: 40rpx;
    padding-top: 30rpx;
    border-top: 1rpx solid #f5f5f5;
    
    .temp-control {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30rpx;
      
      .temp-btn {
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
        background: #f8f8f8;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40rpx;
        color: #333;
        margin: 0 40rpx;
        transition: all 0.2s ease;
        
        &:active {
          background: #f0f0f0;
          transform: scale(0.95);
        }
      }
      
      .temp-value {
        font-size: 60rpx;
        font-weight: bold;
        color: #333;
        font-family: 'DIN Alternate', sans-serif;
        
        &::after {
          content: '°C';
          font-size: 32rpx;
          margin-left: 4rpx;
          opacity: 0.7;
        }
      }
    }
    
    .fan-control {
      padding: 0 20rpx;
      
      text {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 15rpx;
        display: block;
      }
      
      slider {
        margin: 20rpx 0;
      }
    }
  }
}
</style> 
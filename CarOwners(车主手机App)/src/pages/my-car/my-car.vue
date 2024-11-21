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

        <!-- 添加模型控制器 -->
        <view class="model-controls">
          <view class="control-btn" @tap="resetModel">
            <svg-icon name="reset" type="common" size="32" />
          </view>
          <view class="control-btn" @tap="toggleAutoRotate">
            <svg-icon :name="isAutoRotating ? 'pause' : 'play'" type="common" size="32" />
          </view>
        </view>

        <!-- 优化车辆状态显示 -->
        <view class="car-status">
          <view class="battery-info" :class="{ 'low-battery': currentCar.batteryLevel < 20 }">
            <view class="battery-icon">
              <view 
                class="battery-level" 
                :style="{ width: currentCar.batteryLevel + '%' }"
              ></view>
            </view>
            <text class="battery-text">{{ currentCar.batteryLevel }}%</text>
            <text class="range">续航 {{ currentCar.range }}km</text>
          </view>
          <view class="status-tags">
            <text class="tag" v-if="currentCar.isCharging">充电中</text>
            <text class="tag" v-if="currentCar.isLocked">已上锁</text>
          </view>
        </view>
      </view>

      <!-- 改进远程控制面板 -->
      <view class="remote-control">
        <view class="control-header">
          <text class="title">远程控制</text>
          <view class="switch-box">
            <text>{{ controlEnabled ? '已开启' : '已关闭' }}</text>
            <switch 
              :checked="controlEnabled" 
              @change="toggleControl" 
              color="#4CAF50" 
            />
          </view>
        </view>

        <!-- 添加 v-if 控制整个控制面板的显示 -->
        <view v-if="controlEnabled" class="control-content">
          <view class="control-grid">
            <view 
              class="control-item" 
              v-for="(item, index) in controlItems" 
              :key="index"
              @tap="handleControl(item)"
              :class="{ 'active': item.isActive }"
            >
              <view class="icon-box">
                <svg-icon 
                  :name="item.icon" 
                  type="status" 
                  size="48"
                  :color="getIconColor(item)"
                />
                <view class="status-dot" v-if="item.status"></view>
              </view>
              <text>{{ item.name }}</text>
            </view>
          </view>

          <!-- 空调控制面板 -->
          <view class="ac-panel" v-if="showAcPanel">
            <view class="panel-header">
              <text>空调控制</text>
              <view class="close-btn" @tap="closeAcPanel">
                <svg-icon name="close" type="common" size="32" color="#999" />
              </view>
            </view>
            <view class="temp-control">
              <view class="temp-btn" @tap="adjustTemp(-1)">
                <svg-icon name="minus" type="common" size="32" color="#4CAF50" />
              </view>
              <view class="temp-display">
                <text class="value">{{ acStatus.temp }}</text>
                <text class="unit">°C</text>
              </view>
              <view class="temp-btn" @tap="adjustTemp(1)">
                <svg-icon name="plus" type="common" size="32" color="#4CAF50" />
              </view>
            </view>
            <view class="fan-control">
              <text>风速调节</text>
              <slider 
                :value="acStatus.fan" 
                @change="adjustFan" 
                min="1" 
                max="7" 
                show-value
                activeColor="#4CAF50"
                backgroundColor="#eee"
                block-size="28"
              />
            </view>
          </view>
        </view>

        <!-- 添加未开启时的提示 -->
        <view v-else class="control-disabled">
          <svg-icon name="lock" type="status" size="64" color="#999" />
          <text>请开启远程控制以使用此功能</text>
        </view>
      </view>

      <!-- 优化车辆状态信息展示 -->
      <view class="status-section">
        <view class="section-header">
          <view class="title-box">
            <text class="title">车辆状态</text>
            <text class="update-time">最后更新: {{ formattedUpdateTime }}</text>
          </view>
          <view class="refresh-btn" @tap="refreshStatus" :class="{ 'loading': isRefreshing }">
            <svg-icon name="refresh" type="common" size="28" />
            <text>刷新</text>
          </view>
        </view>
        
        <view class="status-grid">
          <view class="status-item">
            <view class="status-content">
              <view class="status-icon">
                <svg-icon name="mileage" type="status" size="48" />
              </view>
              <view class="info">
                <text class="label">当前里程</text>
                <view class="value-box">
                  <text class="value">{{ currentCar.mileage }}</text>
                  <text class="unit">km</text>
                </view>
              </view>
            </view>
            <view class="status-footer">
              <view class="progress-bar">
                <view class="progress" :style="{ width: '75%' }"></view>
              </view>
              <view class="footer-info">
                <text class="daily">今日行驶: 12.5km</text>
                <text class="total">月均: 1,250km</text>
              </view>
            </view>
          </view>

          <view class="status-item warning">
            <view class="status-content">
              <view class="status-icon">
                <svg-icon name="maintenance" type="status" size="48" />
              </view>
              <view class="info">
                <text class="label">下次保养</text>
                <view class="value-box">
                  <text class="value">{{ currentCar.nextMaintenance }}</text>
                  <text class="unit">km</text>
                </view>
              </view>
            </view>
            <view class="status-footer">
              <view class="progress-bar">
                <view class="progress" :style="{ width: '85%' }"></view>
              </view>
              <view class="footer-info">
                <text class="warning-text">建议尽快保养</text>
                <text class="countdown">剩余: 500km</text>
              </view>
            </view>
          </view>

          <view class="status-item">
            <view class="status-content">
              <view class="status-icon">
                <svg-icon name="insurance" type="status" size="48" />
              </view>
              <view class="info">
                <text class="label">保险到期</text>
                <view class="value-box">
                  <text class="value">{{ currentCar.insuranceDate }}</text>
                </view>
              </view>
            </view>
            <view class="status-footer">
              <view class="tags">
                <text class="tag">交强险</text>
                <text class="tag">商业险</text>
              </view>
              <text class="countdown">剩余180天</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 添加车辆提示 -->
    <view class="empty-state" v-else>
      <image src="/static/images/empty-car.png" mode="aspectFit"></image>
      <text class="empty-text">暂未添加车辆信息</text>
      <button class="add-btn" @tap="addCar">
        <svg-icon name="plus" type="common" size="32" color="#fff" />
        <text>添加爱车</text>
      </button>
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
        mileage: 15000,
        nextMaintenance: 5000,
        insuranceDate: '2024-12-31',
        batteryLevel: 85,
        range: 420,
        isCharging: false,
        isLocked: true,
        modelUrl: 'https://example.com/3d-model-viewer',
        dailyMileage: 12.5,
        monthlyAverage: 1250,
        maintenanceProgress: 85,
        maintenanceRemaining: 500,
        insuranceTypes: ['交强险', '商业险'],
        insuranceRemaining: 180,
        lastUpdate: new Date().toISOString(),
        healthStatus: 'good'
      },
      controlEnabled: false,
      controlItems: [
        { 
          name: '车门锁', 
          icon: 'lock',
          type: 'door',
          isActive: false
        },
        { 
          name: '空调', 
          icon: 'ac',
          type: 'ac',
          isActive: false
        },
        { 
          name: '后备箱', 
          icon: 'trunk',
          type: 'trunk',
          isActive: false
        },
        { 
          name: '寻车', 
          icon: 'find',
          type: 'find',
          isActive: false
        }
      ],
      acStatus: {
        on: false,
        temp: 24,
        fan: 3
      },
      showAcPanel: false,
      isAutoRotating: false,
      modelRotation: 0,
      modelInterval: null,
      isRefreshing: false,
      updateInterval: null,
      lastUpdateTime: null,
      updateError: null
    }
  },
  computed: {
    formattedUpdateTime() {
      if (!this.currentCar.lastUpdate) return '暂无更新'
      const updateDate = new Date(this.currentCar.lastUpdate)
      return this.formatDate(updateDate)
    },
    
    maintenanceStatus() {
      const remaining = this.currentCar.maintenanceRemaining
      if (remaining <= 500) return 'warning'
      if (remaining <= 1000) return 'notice'
      return 'normal'
    },
    
    insuranceStatus() {
      const remaining = this.currentCar.insuranceRemaining
      if (remaining <= 30) return 'warning'
      if (remaining <= 90) return 'notice'
      return 'normal'
    }
  },
  created() {
    this.initCarStatus()
  },
  mounted() {
    this.startAutoUpdate()
  },
  beforeDestroy() {
    this.stopAutoUpdate()
  },
  methods: {
    initCarStatus() {
      this.fetchCarStatus().catch(this.handleError)
    },
    
    fetchCarStatus() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            mileage: this.currentCar.mileage + Math.random() * 10,
            batteryLevel: Math.max(0, this.currentCar.batteryLevel - Math.random() * 5),
            range: Math.max(0, this.currentCar.range - Math.random() * 10),
            dailyMileage: Math.random() * 20,
            healthStatus: Math.random() > 0.8 ? 'warning' : 'good'
          })
        }, 1000)
      })
    },
    
    updateCarStatus(data) {
      Object.assign(this.currentCar, data)
      this.currentCar.lastUpdate = new Date().toISOString()
    },
    
    async refreshStatus() {
      if (this.isRefreshing) return
      
      this.isRefreshing = true
      uni.showLoading({ title: '刷新中...' })
      
      try {
        await this.fetchCarStatus()
        uni.showToast({
          title: '状态已更新',
          icon: 'success'
        })
      } catch (error) {
        this.handleError(error)
      } finally {
        this.isRefreshing = false
        uni.hideLoading()
      }
    },
    
    startAutoUpdate() {
      this.updateInterval = setInterval(() => {
        this.fetchCarStatus().catch(this.handleError)
      }, 60000)
    },
    
    stopAutoUpdate() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval)
        this.updateInterval = null
      }
    },
    
    handleError(error) {
      console.error('Error:', error)
      this.updateError = error.message
      uni.showToast({
        title: error.message || '操作失败',
        icon: 'none'
      })
    },
    
    formatDate(date) {
      const now = new Date()
      const diff = now - date
      
      if (diff < 60000) return '刚刚'
      if (diff < 3600000) return `${Math.floor(diff / 60000)}分前`
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
      
      return date.toLocaleString()
    },
    
    mockApiCall() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            mileage: this.currentCar.mileage + Math.random() * 10,
            batteryLevel: Math.max(0, this.currentCar.batteryLevel - Math.random() * 5),
            range: Math.max(0, this.currentCar.range - Math.random() * 10),
            dailyMileage: Math.random() * 20,
            healthStatus: Math.random() > 0.8 ? 'warning' : 'good'
          })
        }, 1000)
      })
    },
    
    checkHealthStatus() {
      const status = this.currentCar.healthStatus
      if (status === 'warning') {
        uni.showModal({
          title: '车辆状态提醒',
          content: '检测到车辆存在潜在问题，建议及时检查',
          confirmText: '查看详情',
          success: (res) => {
            if (res.confirm) {
              this.navigateToHealthReport()
            }
          }
        })
      }
    },
    
    navigateToHealthReport() {
      uni.navigateTo({
        url: '/pages/health-report/index'
      })
    },

    // 开关控制
    toggleControl(e) {
      this.controlEnabled = e.detail.value
      if (!this.controlEnabled) {
        // 关闭时重置所有状态
        this.resetControlStatus()
      }
    },

    // 重置控制状态
    resetControlStatus() {
      this.showAcPanel = false
      this.controlItems.forEach(item => {
        item.isActive = false
      })
      this.acStatus = {
        on: false,
        temp: 24,
        fan: 3
      }
    },

    // 处理控制项点击
    handleControl(item) {
      if (!this.controlEnabled) return
      
      switch(item.type) {
        case 'door':
          this.toggleDoor(item)
          break
        case 'ac':
          this.toggleAc(item)
          break
        case 'trunk':
          this.toggleTrunk(item)
          break
        case 'find':
          this.findCar(item)
          break
      }
    },

    // 车门控制
    toggleDoor(item) {
      item.isActive = !item.isActive
      this.currentCar.isLocked = item.isActive
      
      uni.showToast({
        title: item.isActive ? '车门已上锁' : '车门已解锁',
        icon: 'none'
      })
    },

    // 空调控制
    toggleAc(item) {
      item.isActive = !item.isActive
      this.showAcPanel = item.isActive
      this.acStatus.on = item.isActive
      
      uni.showToast({
        title: item.isActive ? '空调已开启' : '空调已关闭',
        icon: 'none'
      })
    },

    // 后备箱控制
    toggleTrunk(item) {
      item.isActive = !item.isActive
      
      uni.showToast({
        title: item.isActive ? '后备箱已打开' : '后备箱已关闭',
        icon: 'none'
      })
    },

    // 寻车控制
    findCar(item) {
      uni.showToast({
        title: '寻车信号已发送',
        icon: 'none'
      })
      
      // 闪烁效果
      item.isActive = true
      setTimeout(() => {
        item.isActive = false
      }, 3000)
    },

    // 空调温度调节
    adjustTemp(delta) {
      const newTemp = this.acStatus.temp + delta
      if (newTemp >= 16 && newTemp <= 32) {
        this.acStatus.temp = newTemp
      }
    },

    // 空调风速调节
    adjustFan(e) {
      this.acStatus.fan = e.detail.value
    },

    // 关闭空调面板
    closeAcPanel() {
      this.showAcPanel = false
      const acItem = this.controlItems.find(item => item.type === 'ac')
      if (acItem) {
        acItem.isActive = false
      }
      this.acStatus.on = false
    },

    // 获取图标颜色
    getIconColor(item) {
      if (!this.controlEnabled) return '#999'
      return item.isActive ? '#fff' : '#333'
    }
  },
  watch: {
    'currentCar.healthStatus'(newStatus, oldStatus) {
      if (newStatus === 'warning' && oldStatus !== 'warning') {
        this.checkHealthStatus()
      }
    },
    
    'currentCar.maintenanceRemaining'(newValue) {
      if (newValue <= 500 && !this.maintenanceNotified) {
        uni.showModal({
          title: '保养提醒',
          content: '您的爱车即将需要进行保养，是否立即预约？',
          confirmText: '立即预约',
          success: (res) => {
            if (res.confirm) {
              this.navigateToMaintenance()
            }
          }
        })
        this.maintenanceNotified = true
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 30rpx;
}

.model-viewer {
  position: relative;
  height: 600rpx;
  background: linear-gradient(145deg, #ffffff, #f0f2f5);
  border-radius: 30rpx;
  overflow: hidden;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.08);
  margin-bottom: 30rpx;
  
  .model-controls {
    position: absolute;
    bottom: 40rpx;
    left: 40rpx;
    display: flex;
    gap: 24rpx;
    
    .control-btn {
      width: 90rpx;
      height: 90rpx;
      background: rgba(255,255,255,0.95);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.12);
      backdrop-filter: blur(10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:active {
        transform: scale(0.92);
        box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.15);
      }
    }
  }
  
  .car-status {
    position: absolute;
    top: 40rpx;
    right: 40rpx;
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    
    .battery-info {
      background: rgba(33, 33, 33, 0.85);
      padding: 20rpx 30rpx;
      border-radius: 50rpx;
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      gap: 16rpx;
      box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.15);
      
      &.low-battery {
        background: linear-gradient(135deg, rgba(255,87,87,0.95), rgba(255,107,107,0.95));
        animation: pulse 2s infinite;
        
        .battery-level {
          background: #fff !important;
        }
      }
      
      .battery-icon {
        width: 80rpx;
        height: 40rpx;
        border: 3rpx solid #fff;
        border-radius: 8rpx;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          right: -8rpx;
          top: 50%;
          transform: translateY(-50%);
          width: 5rpx;
          height: 20rpx;
          background: #fff;
          border-radius: 3rpx;
        }
        
        .battery-level {
          position: absolute;
          left: 4rpx;
          top: 4rpx;
          bottom: 4rpx;
          background: linear-gradient(to right, #4CAF50, #45a049);
          border-radius: 4rpx;
          transition: width 0.3s ease;
        }
      }
      
      .battery-text {
        font-size: 28rpx;
        color: #fff;
        font-weight: 600;
      }
      
      .range {
        font-size: 26rpx;
        color: rgba(255,255,255,0.9);
        padding-left: 20rpx;
        border-left: 2rpx solid rgba(255,255,255,0.3);
      }
    }
    
    .status-tags {
      display: flex;
      gap: 16rpx;
      
      .tag {
        background: linear-gradient(135deg, rgba(76,175,80,0.95), rgba(69,160,73,0.95));
        color: #fff;
        font-size: 26rpx;
        font-weight: 500;
        padding: 12rpx 30rpx;
        border-radius: 40rpx;
        backdrop-filter: blur(12px);
        box-shadow: 0 6rpx 16rpx rgba(76,175,80,0.2);
      }
    }
  }
}

.remote-control {
  background: #fff;
  border-radius: 30rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.06);
  
  .control-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
    
    .title {
      font-size: 36rpx;
      font-weight: bold;
      background: linear-gradient(135deg, #4CAF50, #45a049);
      -webkit-background-clip: text;
      color: transparent;
    }
    
    .switch-box {
      display: flex;
      align-items: center;
      gap: 16rpx;
      
      text {
        font-size: 28rpx;
        color: #666;
      }
    }
  }
  
  .control-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30rpx;
    
    .control-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;
      
      &.disabled {
        opacity: 0.5;
        filter: grayscale(1);
        pointer-events: none;
      }
      
      .icon-box {
        width: 140rpx;
        height: 140rpx;
        background: linear-gradient(145deg, #ffffff, #f0f2f5);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 8rpx 8rpx 16rpx #e8e8e8, 
                   -8rpx -8rpx 16rpx #ffffff;
        position: relative;
        
        &:active {
          transform: scale(0.95);
          box-shadow: 4rpx 4rpx 8rpx #e8e8e8, 
                     -4rpx -4rpx 8rpx #ffffff;
        }
        
        .status-dot {
          position: absolute;
          top: 12rpx;
          right: 12rpx;
          width: 20rpx;
          height: 20rpx;
          border-radius: 50%;
          background: #4CAF50;
          box-shadow: 0 0 10rpx rgba(76,175,80,0.5);
          animation: pulse 2s infinite;
        }
      }
      
      &.active .icon-box {
        background: linear-gradient(135deg, #4CAF50, #45a049);
        box-shadow: 0 10rpx 20rpx rgba(76,175,80,0.3);
        
        svg-icon {
          filter: brightness(0) invert(1);
        }
      }
      
      text {
        font-size: 28rpx;
        color: #333;
        font-weight: 500;
      }
    }
  }

  // 添加未开启时的提示样式
  .control-disabled {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60rpx 0;
    gap: 20rpx;
    
    text {
      font-size: 28rpx;
      color: #999;
    }
  }

  // 添加内容区域的过渡动画
  .control-content {
    animation: fadeIn 0.3s ease;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(76,175,80,0.4);
  }
  70% {
    box-shadow: 0 0 0 10rpx rgba(76,175,80,0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76,175,80,0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ac-panel {
  margin-top: 40rpx;
  padding-top: 40rpx;
  border-top: 2rpx solid #f5f5f5;
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
    
    text {
      font-size: 32rpx;
      color: #333;
      font-weight: 600;
    }
  }
  
  .temp-control {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40rpx;
    margin-bottom: 40rpx;
    
    .temp-btn {
      width: 100rpx;
      height: 100rpx;
      background: linear-gradient(145deg, #ffffff, #f0f2f5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 8rpx 8rpx 16rpx #e8e8e8, 
                 -8rpx -8rpx 16rpx #ffffff;
      transition: all 0.3s ease;
      
      &:active {
        transform: scale(0.95);
      }
      
      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
    
    .temp-display {
      display: flex;
      align-items: baseline;
      
      .value {
        font-size: 80rpx;
        font-weight: bold;
        color: #333;
        font-family: 'DIN Alternate', sans-serif;
      }
      
      .unit {
        font-size: 40rpx;
        color: #666;
        margin-left: 8rpx;
      }
    }
  }
  
  .fan-control {
    padding: 0 30rpx;
    
    text {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 20rpx;
      display: block;
    }
    
    slider {
      margin: 30rpx 0;
    }
  }
}

.status-section {
  background: #fff;
  border-radius: 30rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 15rpx 35rpx rgba(0,0,0,0.05),
              0 5rpx 15rpx rgba(0,0,0,0.03);
  position: relative;
  overflow: hidden;

  // 添加背景装饰
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200rpx;
    height: 200rpx;
    background: linear-gradient(135deg, rgba(76,175,80,0.1), rgba(76,175,80,0));
    border-radius: 0 30rpx 0 100%;
    z-index: 0;
  }

  .section-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
    padding-bottom: 30rpx;
    border-bottom: 2rpx solid rgba(0,0,0,0.05);

    .title-box {
      .title {
        font-size: 38rpx;
        font-weight: bold;
        background: linear-gradient(135deg, #2c2c2c, #666);
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: 10rpx;
        display: block;
        letter-spacing: 1rpx;
      }

      .update-time {
        font-size: 24rpx;
        color: #999;
        display: flex;
        align-items: center;
        gap: 8rpx;
        
        &::before {
          content: '';
          width: 8rpx;
          height: 8rpx;
          background: #4CAF50;
          border-radius: 50%;
          display: inline-block;
        }
      }
    }

    .refresh-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4rpx;
      height: 56rpx;
      padding: 0 24rpx;
      border-radius: 28rpx;
      background: #fff;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
      border: 2rpx solid rgba(76,175,80,0.15);
      position: relative;
      overflow: hidden;
      min-width: 120rpx;
      
      svg-icon {
        font-size: 28rpx;
        color: #4CAF50;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
        width: 32rpx;
        height: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      text {
        font-size: 24rpx;
        color: #4CAF50;
        font-weight: 500;
        transition: color 0.3s ease;
        white-space: nowrap;
        line-height: 32rpx;
        display: inline-block;
        vertical-align: middle;
      }

      // 悬停效果
      &:hover {
        transform: translateY(-2rpx);
        box-shadow: 0 6rpx 16rpx rgba(76,175,80,0.12);
        border-color: rgba(76,175,80,0.3);
        
        &::before {
          opacity: 1;
        }

        svg-icon {
          transform: rotate(180deg);
        }
      }

      // 点击效果
      &:active {
        transform: scale(0.96);
        box-shadow: 0 2rpx 8rpx rgba(76,175,80,0.1);
      }

      // 加载状态
      &.loading {
        pointer-events: none;
        background: #f8f9fa;
        
        svg-icon {
          animation: spin 1.2s linear infinite;
        }
        
        text {
          color: #999;
        }
      }
    }
  }

  .status-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 30rpx;
    margin-bottom: 40rpx;

    .status-item {
      padding: 35rpx;
      background: linear-gradient(145deg, #ffffff, #fafafa);
      border-radius: 24rpx;
      box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.03);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2rpx solid rgba(0,0,0,0.03);
      position: relative;
      overflow: hidden;

      // 添加hover效果
      &:hover {
        transform: translateY(-4rpx);
        box-shadow: 0 12rpx 30rpx rgba(0,0,0,0.06);
      }

      // 警告状态样式优化
      &.warning {
        background: linear-gradient(145deg, #fff9f9, #fff5f5);
        border: 2rpx solid rgba(255,107,107,0.15);
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 120rpx;
          height: 120rpx;
          background: linear-gradient(135deg, rgba(255,107,107,0.1), transparent);
          border-radius: 0 24rpx 0 100%;
        }
        
        .status-icon {
          background: rgba(255,107,107,0.12);
          
          svg-icon {
            color: #ff6b6b;
            animation: pulse 2s infinite;
          }
        }
        
        .progress-bar .progress {
          background: linear-gradient(to right, #ff9b9b, #ff6b6b);
        }
        
        .warning-text {
          color: #ff6b6b;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8rpx;
          
          &::before {
            content: '!';
            width: 24rpx;
            height: 24rpx;
            background: #ff6b6b;
            border-radius: 50%;
            color: #fff;
            font-size: 20rpx;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      .status-content {
        display: flex;
        align-items: center;
        gap: 28rpx;
        margin-bottom: 28rpx;

        .status-icon {
          width: 110rpx;
          height: 110rpx;
          background: rgba(76,175,80,0.12);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          
          svg-icon {
            color: #4CAF50;
            transition: transform 0.3s ease;
          }
          
          &:hover svg-icon {
            transform: scale(1.1);
          }
        }

        .info {
          flex: 1;

          .label {
            font-size: 26rpx;
            color: #999;
            margin-bottom: 12rpx;
            display: block;
            letter-spacing: 0.5rpx;
          }

          .value-box {
            display: flex;
            align-items: baseline;
            gap: 8rpx;

            .value {
              font-size: 48rpx;
              color: #333;
              font-weight: 600;
              font-family: 'DIN Alternate', -apple-system, BlinkMacSystemFont, sans-serif;
              letter-spacing: -0.5rpx;
            }

            .unit {
              font-size: 26rpx;
              color: #666;
              margin-left: 4rpx;
            }
          }
        }
      }

      .status-footer {
        .progress-bar {
          height: 10rpx;
          background: #f0f2f5;
          border-radius: 5rpx;
          margin-bottom: 20rpx;
          overflow: hidden;
          box-shadow: inset 0 2rpx 4rpx rgba(0,0,0,0.05);

          .progress {
            height: 100%;
            background: linear-gradient(to right, #4CAF50, #45a049);
            border-radius: 5rpx;
            transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }

        .footer-info {
          display: flex;
          justify-content: space-between;
          align-items: center;

          text {
            font-size: 24rpx;
            color: #999;
            display: flex;
            align-items: center;
            gap: 6rpx;
          }
        }

        .tags {
          display: flex;
          gap: 12rpx;
          flex-wrap: wrap;

          .tag {
            font-size: 22rpx;
            color: #4CAF50;
            background: rgba(76,175,80,0.1);
            padding: 6rpx 20rpx;
            border-radius: 20rpx;
            font-weight: 500;
            transition: all 0.3s ease;
            
            &:hover {
              background: rgba(76,175,80,0.15);
              transform: translateY(-2rpx);
            }
          }
        }

        .countdown {
          font-size: 24rpx;
          color: #666;
          font-weight: 500;
        }
      }
    }
  }
}

// 添加动画
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 40rpx;
  background: #fff;
  border-radius: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.06);
  
  image {
    width: 300rpx;
    height: 300rpx;
    margin-bottom: 40rpx;
  }
  
  .empty-text {
    font-size: 32rpx;
    color: #666;
    margin-bottom: 50rpx;
  }
  
  .add-btn {
    display: flex;
    align-items: center;
    gap: 16rpx;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: #fff;
    font-size: 32rpx;
    font-weight: 500;
    padding: 24rpx 60rpx;
    border-radius: 50rpx;
    border: none;
    box-shadow: 0 10rpx 20rpx rgba(76,175,80,0.3);
    transition: all 0.3s ease;
    
    &:active {
      transform: scale(0.98);
      box-shadow: 0 6rpx 12rpx rgba(76,175,80,0.2);
    }
  }
}

// 添加旋转动画
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 
<!-- pages/scan/scan.vue -->
<template>
  <view class="container">
    <camera device-position="back" flash="auto" @error="error" class="camera">
      <cover-view class="scan-area">
        <cover-view class="corner top-left"></cover-view>
        <cover-view class="corner top-right"></cover-view>
        <cover-view class="corner bottom-left"></cover-view>
        <cover-view class="corner bottom-right"></cover-view>
      </cover-view>
      <cover-view class="scan-line"></cover-view>
    </camera>
    <view class="button-area">
      <button class="upload-button" @tap="chooseImage">
        <uni-icons type="upload" size="20" color="#fff"></uni-icons>
        上传照片
      </button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    error(e) {
      console.error(e)
      uni.showToast({
        title: '相机启动失败',
        icon: 'none'
      })
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          console.log(res.tempFilePaths[0])
          // 假设识别成功，跳转到详情页
          this.navigateToDetail(1) // 假设识别出的充电桩 ID 为 1
        }
      })
    },
    navigateToDetail(id) {
      uni.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      })
    }
  }
}
</script>

<style>
.container {
  position: relative;
  height: 100vh;
  background-color: #000;
}
.camera {
  width: 100%;
  height: 100%;
}
.scan-area {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400rpx;
  height: 400rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.5);
}
.corner {
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  border-color: #007AFF;
  border-style: solid;
}
.top-left {
  top: -2rpx;
  left: -2rpx;
  border-width: 4rpx 0 0 4rpx;
}
.top-right {
  top: -2rpx;
  right: -2rpx;
  border-width: 4rpx 4rpx 0 0;
}
.bottom-left {
  bottom: -2rpx;
  left: -2rpx;
  border-width: 0 0 4rpx 4rpx;
}
.bottom-right {
  bottom: -2rpx;
  right: -2rpx;
  border-width: 0 4rpx 4rpx 0;
}
.scan-line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 396rpx;
  height: 2rpx;
  background-color: #007AFF;
  animation: scan 2s linear infinite;
}
@keyframes scan {
  0% {
    top: 0;
  }
  100% {
    top: 400rpx;
  }
}
.button-area {
  position: absolute;
  bottom: 50rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.upload-button {
  background-color: #007AFF;
  color: white;
  font-size: 28rpx;
  padding: 20rpx 40rpx;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
}
.upload-button uni-icons {
  margin-right: 10rpx;
}
</style>
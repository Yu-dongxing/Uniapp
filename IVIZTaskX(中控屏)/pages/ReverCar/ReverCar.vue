<!-- pages/panorama/index.vue -->
<template>
  <view class="panorama-container">
    <view class="video-area">
		
      <view class="rear-view">
        <video :src="rearVideoSrc" autoplay>
			<canvas canvas-id="assistLine" class="assist-line"></canvas>
		</video>
        
      </view>
	  
      <view class="panorama-view">
        <video :src="panoramaVideoSrc" autoplay></video>
      </view>
	  
    </view>
	
    <view class="control-area">
      <button @tap="showFocusOptions">专注</button>
      <button @tap="closeApp">关闭</button>
      <button @tap="showCalibrationOptions">标定</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rearVideoSrc: 'path/to/rear/video/stream',
      panoramaVideoSrc: 'path/to/panorama/video/stream',
    }
  },
  onReady() {
    this.drawAssistLine()
  },
  methods: {
    drawAssistLine() {
      const ctx = uni.createCanvasContext('assistLine')
      ctx.setStrokeStyle('green')
      ctx.strokeRect(0, 0, 400, 80)
      ctx.draw()
    },
    showFocusOptions() {
      uni.showActionSheet({
        itemList: ['前', '后', '左', '右', '360度'],
        success: (res) => {
          console.log('选择了', res.tapIndex)
          // 根据选择切换视频源
        }
      })
    },
    closeApp() {
		uni.navigateBack({
			
		})
      // 关闭应用的逻辑
    },
    showCalibrationOptions() {
      uni.showActionSheet({
        itemList: ['去畸', '摄像头列表'],
        success: (res) => {
          if (res.tapIndex === 1) {
            this.showCameraList()
          }
        }
      })
    },
    showCameraList() {
      // 显示摄像头列表的逻辑
	  uni.showActionSheet({
	  	itemList:['1','2'],
		success: (res) => {
			if(res.tapIndex === 1){
				this.showCameraList()
			}
		}
	  })
    }
  }
}
</script>

<style lang="less">
.panorama-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	// background-color: aqua;
  .video-area {
	   display: flex;
		// background-color: aqua;
		.rear-view,.panorama-view{
			width: 50vw;
			height: 80vh;
			background-color: aqua;
			display: flex;
			justify-content: center;
			align-items: center;
			// position: relative;
			video{
				position: relative;
				width: 95%;
				height: 95%;
				border-radius: 10px;
				// display: flex;
				// align-content: center;
				// justify-content: center;
				// align-items: center;
				.assist-line {
				  position: absolute;
				  top: 80%;
				  // left: 40%;
				  margin-left: 25%;
				  width: 55%;
				  height: 80px;
				}
			}
			
		}
		.panorama-view{
			width: 50vw;
			background-color: aqua;
		}
		
	}
  .control-area {
	display: flex;
	align-content: center;
	justify-content: center;
	align-items: center;
	// background-color: aquamarine;
	box-shadow: 0 0 5px 1px #d1d1d1;
	width: 50%;
	height: 80px;
	margin-top: 10px;
	margin-left: 25%;
	border-radius: 10px;
	button{
		border-radius: 10px;
		
	}
  }
}
uni-button:after{
	content: '';
	width: 0;
	height: 0;
	position: absolute;
	top: 0;
	left: 0;
	border: 0px solid rgba(0, 0, 0, 0.2);
	transform: scale(0.5);
	transform-origin: 0 0;
	box-sizing: border-box;
	border-radius: 0px;
}
</style>

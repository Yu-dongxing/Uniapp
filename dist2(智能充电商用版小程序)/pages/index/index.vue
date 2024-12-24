<template>
  <view class="container">
    <view class="header">
      <text class="title">附近充电桩</text>
      <view class="scan-icon" @tap="goToScan">
        <uni-icons type="scan" size="30" color="#007AFF">扫一扫</uni-icons>
      </view>
    </view>
    
    <scroll-view scroll-y class="charger-list">
      <view 
        v-for="(item, index) in chargers" 
        :key="index" 
        class="charger-item" 
        @tap="goToDetail(item.id)"
        
      >
	  <!-- :style="{ animationDelay: `${index * 0.1}s` }" -->
        <image :src="item.thumbnail" mode="aspectFill" class="charger-image"></image>
        <view class="charger-info">
          <text class="charger-address">{{ item.address }}</text>
          <text class="charger-status" :class="item.status">{{ item.statusText }}</text>
          <text class="charger-distance">
            <uni-icons type="location" size="14" color="#999"></uni-icons>
            {{ item.distance }}km
          </text>
		  
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      chargers: [
              {
                id: '',
                address: '',
                status: '',
                statusText: '加载中',
                thumbnail: '',
                distance: '',
              },
              
            ]
    }
  },
  methods: {
    goToDetail(id) {
	  uni.navigateTo({
	  	url:`/pages/cdzinfo/cdzinfo?id=${id}`,
	  })
    },
	getinfo(){
		
		uni.request({
			url:"http://124.93.196.45:10001/dev-api/bs-smart-charger/pile/alllist",
			header:{
				'Authorization': `Bearer ${uni.getStorageSync('token')}`,
			},
			method:'GET',
		}).then(success=>{
			if (success.data.code!=200) {
				uni.showModal({
					title:"请登录",
					content:success.data.msg,
					success: (ref) => {
						if (ref.confirm) {
							uni.navigateTo({
								url:"/pages/login/login"
							})
						} else{
							
						}
					}
				})
			} else{
				console.log(success.data)
				// 清空原有的chargers数组
				this.chargers = [];
				success.data.data.forEach(charger=>{
					this.chargers.push({
						id: charger.chargingPileId,
						address: charger.chargingStationName+"-"+charger.chargingPileName,
						status: charger.chargingPileState,
						statusText: charger.chargingPileStateLable,
						thumbnail: charger.thumbnail || '/static/default-thumbnail.jpg', // 如果没有图片，使用默认图片
						distance: charger.distance || '无法获取', // 如果没有距离信息，留空
					})
					uni.hideLoading()
				})
			}
		}).catch(err=>{
			
		})
	},
    goToScan() {
      uni.navigateTo({
        url: '/pages/cdzinfo/cdzinfo'
      })
    }
  },
  onLoad() {
	  uni.showLoading({
	  	title:"加载中",
	  	
	  })
  	this.getinfo()
  },
  onLaunch() {
	  uni.showLoading({
	  	title:"加载中",
	  	
	  })
  	this.getinfo()
  }
}
</script>

<style>
.container {
  padding: 30rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}
.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}
.scan-icon {
  background-color: #e6f2ff;
  padding: 15rpx;
  border-radius: 50%;
}
.charger-list {
  height: calc(100vh - 120rpx);
}
.charger-item {
  display: flex;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 15rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20rpx);
}
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.charger-image {
  width: 200rpx;
  height: 200rpx;
  object-fit: cover;
}
.charger-info {
  flex: 1;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.charger-address {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}
.charger-status {
  font-size: 28rpx;
  margin-bottom: 10rpx;
  padding: 5rpx 10rpx;
  border-radius: 10rpx;
  display: inline-block;
}
.charger-distance {
  font-size: 24rpx;
  color: #999;
  display: flex;
  align-items: center;
}
.running { background-color: #e6f9e6; color: #28a745; }
.idle { background-color: #e6f2ff; color: #007bff; }
.alert { background-color: #ffeaea; color: #dc3545; }
</style>

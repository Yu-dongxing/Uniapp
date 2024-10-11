<!-- <template>
	<view class="content">
		<view class="M">
			
		</view>
		
		<view class="H">
			<view class="H_T">
				<view class="h_img">
					<img id="IMG" src="https://ts1.cn.mm.bing.net/th/id/R-C.24c5b464bc455b5e29e02cecf2b4d82e?rik=lnO0z%2fIqZBWsmQ&riu=http%3a%2f%2fwww.hngy666.com%2fUploads%2f201910%2f5d9d9d7d1e1d7.jpg&ehk=3V0btb2QF2Dag%2f%2b461gbbsD%2buc5E6kVIB2PU0cKURzE%3d&risl=&pid=ImgRaw&r=0" alt="1" style="width: 100PX;height: 100PX;border-radius: 10PX;"/>
				</view>
				<view class="h_desc">
					<view class="desc_title">
						<text id="Title">安智行龙湖天街...</text>
						<view id="KM">
							<img src="/static/dh/导航.png" alt="" style="width: 20px; height: 20px;" />3.3km</view>
					</view>
					<view class="desc_main">
						<text id="score">4.4分</text>
						<text id="aa"> | </text>
						<text id="time">最近充电一小时前</text>
						<text id="aa"> | </text>
						<text id="KF">对外开放</text>
					</view>
					<view class="desc_footer">
						<text id="morey">1.6400</text>
						<text> 元/度</text>
					</view>
					<view class="desc_xq" >
						<navigator class="xq_t" url="/pages/cdzxq/cdzxq" open-type="navigate">
							<text>充电</text>
						</navigator>
						<view class="xq_icon">
							<img src="/static/dd/右1.png" style="width: 20px; height: 20px;" alt="" />
						</view>
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
				cdz_data:[
					{id:"22",title:"",Score:"",}
				]
			}
		},
		methods: {
			getinfo(){
				this.$request("/dev-api/bs-smart-charger/pile/alllist","GET").then(res=>{
					console.log(res);
				}).catch(err=>{
					console.log(err);
				})
			}
		},
		onLoad() {
			// this.getinfo()
		},
	}
</script>

<style lang="less" scoped>
	
	.content{
		display: flex;
		align-items: center;
		flex-direction: column;
		.M,.H{
			margin-bottom: 10px;
			width: 710rpx;
			height: 100px;
			border-radius: 10px;
		}
		.M{
			margin-top: 10px;
			background-color: aqua;
		}
		.H{
			margin-top: 10px;
			// background-color: aqua;
			.H_T{
				display: flex;
				height:auto;
				box-shadow: 0 0 5px 1px #eeeeee;
				border-radius: 10px;
				margin-bottom: 10px;
				.h_img{
					margin-right: 10px;
				}
				.h_desc{
					width: 100%;
					height: auto;
					.desc_title{
						// background-color: chartreuse;
						display: flex;
						justify-content: space-between;
						flex-direction: row;
						align-items: center;
						#Title{
							width: 180px;
							font-size: 20px;
							word-break: normal;
						}
						#KM{
							display: flex;
							align-items: center;
						}
					}
					.desc_main{
						#aa{
							color: #e3e3e3;
						}
						#score,#time,#KF{
							color: #a8a8a8;
						}
					}
					.desc_footer{
						margin-top: 15px;
						#morey{
							color: #ff0004;
							font-weight: bold;
							font-size: 20px;
						}
					}
					.desc_xq{
						float: right;
						margin-right: 10px;
						margin-bottom: 10px;
						border-radius: 10px;
						width: 80px;
						height: 30px;
						background-color: #ff0004;
						display: flex;
						justify-content: center;
						align-items: center;
						.xq_t{
							color: #ffffff;
							line-height: 20px;
							margin-right: 5px;
						}
						.xq_icon{
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
			}
		}
		
	}


</style -->
<!-- pages/index/index.vue -->
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
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
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
        { id: 1, address: '充电桩A', status: 'running', statusText: '运行中', thumbnail: '/static/charger-a.jpg', distance: 0.5 },
        { id: 2, address: '充电桩B', status: 'idle', statusText: '空闲', thumbnail: '/static/charger-b.jpg', distance: 1.2 },
        { id: 3, address: '充电桩C', status: 'alert', statusText: '报警', thumbnail: '/static/charger-c.jpg', distance: 2.0 },
      ]
    }
  },
  methods: {
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/index/xq/xq?id=${id}`
      })
    },
	getinfo(){
		this.$request("/dev-api/bs-smart-charger/pile/alllist","GET").then(res=>{
			console.log(res);
		}).catch(err=>{
			console.log(err);
		})
	},
    goToScan() {
      uni.navigateTo({
        url: '/pages/index/scan/scan'
      })
    }
  },
  onLoad() {
  	// this.getinfo()
  },
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

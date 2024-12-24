<!-- pages/detail/detail.vue -->
<template>
  <view class="container">
    <view class="charger-image">
      <image :src="charger.image" mode="aspectFill"></image>
      <view class="status-overlay" :class="charger.status">
        {{ charger.statusText }}
      </view>
    </view>
    <view class="charger-info">
		<view class="info-item">
		  <h3>{{ charger.chargingStationName}}</h3>
		</view>
		
		<view class="info-item">
		  <h4>{{ charger.chargingPileName }}</h4>
		</view>
		
      <view class="info-item">
        
        <text>充电功率: {{ charger.power }}kW</text>
      </view>
      <view class="info-item">
        
        <text>电压: {{ charger.voltage }}</text>
      </view>
    </view>
	<view class="date-info">
		<view class="info">
			<h6>充电电量统计数据</h6>
			<qiun-data-charts type="line" :chartData="chartData" />
		</view>
	</view>
   <!-- <view class="payment-section">
      <text class="section-title">选择充电金额</text>
      <view class="payment-buttons">
        <button 
          v-for="amount in amounts" 
          :key="amount" 
          @tap="selectAmount(amount)"
          :class="{ 'selected': selectedAmount === amount }"
        >
          {{ amount }}￥
        </button>
        <button @tap="selectAllBalance" :class="{ 'selected': isAllBalanceSelected }">全部余额</button>
      </view>
    </view>
    <button class="start-charging" @tap="startCharging" :disabled="!selectedAmount">
      <text>开始充电</text>
      <text v-if="selectedAmount" class="amount">{{ selectedAmount }}￥</text>
    </button> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      chargerId: null,
	  chartData: {},
      charger: {
		chargingStationName:'',					//充电桩名称
        image: '/static/charger-detail.jpg',
        status: 'running',
        statusText: '运行中',
        power: 50,
        voltage: 220,
		chargingVoltage:"",
		chargingPileName:'',
		chargingPileId:''
      },
      amounts: [20, 30, 50, 100],
      selectedAmount: 0,
      isAllBalanceSelected: false,
	  PowerStatistics:{
			  year:["2024-1","2024-2","2024-3","2024-4","2024-5","2024-6"],
			  powerdate:[35,36,31,33,13,34],
			  powertime:[18,27,21,24,6,28]
		  },
    }
  },
  onLoad(option) {
	  uni.showLoading({
	  	title:"加载中"
	  })
    this.chargerId = option.id
	console.log(option.id)
	this.get_info(option.id)
	this.get_poewr_info()
  },
  onReady() {
  		this.getServerData();
  	},
  methods: {
    selectAmount(amount) {
      this.selectedAmount = amount
      this.isAllBalanceSelected = false
    },
	getServerData() {
		//模拟从服务器获取数据时的延时
		setTimeout(() => {
			let res = {
				categories: this.PowerStatistics.year,
				series: [
				{
					name: "耗电量",
					data: this.PowerStatistics.powerdate
				},
				{
					name: "充电时长",
					data: this.PowerStatistics.powertime
				},
			  ]
			};
			this.chartData = JSON.parse(JSON.stringify(res));
		});
	},
    selectAllBalance() {
      // 这里应该获取用户的所有余额
      this.selectedAmount = 200 // 假设用户有200元余额
      this.isAllBalanceSelected = true
    },
	get_info(id){
		uni.request({
			url:`http://124.93.196.45:10001/dev-api/bs-smart-charger/pile/${id}`,
			method:'GET',
			header:{
				'Authorization': `Bearer ${uni.getStorageSync('token')}`,
			},
		}).then(success=>{
			uni.hideLoading();
			console.log(success.data.data)
			this.is_status(success.data.data.chargingPileState)
				this.charger.chargingStationName=success.data.data.chargingStationName
				this.charger.voltage= success.data.data.chargingVoltageLable
				this.charger.statusText=success.data.data.chargingPileStateLable
				this.charger.chargingPileName=success.data.data.chargingPileName
				this.charger.chargingPileId=success.data.data.chargingPileId
			
		}).catch(err=>{
			console.log(err)
		})
	},
	is_status(num) {
	    const chargingPileStates = {
	        '1': 'alert',
	        '2': 'running',
	        '3': 'idle'
	    };
	
	    this.charger.status = chargingPileStates[num] || 'idle';
	},
    startCharging() {
		//设置充电桩-230 -加接口 
      if (this.selectedAmount > 0) {
        uni.showToast({
			
          title: `开始充电，金额：${this.selectedAmount}￥`,
          icon: 'success',
        })
      } else {
        uni.showToast({
          title: '请选择充电金额',
          icon: 'none'
        })
      }
    },
	get_poewr_info(){
		uni.request({
			url:"http://124.93.196.45:10001/dev-api/bs-smart-charger/record/statistics",
			method:'POST',
			header:{
				'Authorization': `Bearer ${uni.getStorageSync('token')}`,
			},
			data:JSON.stringify({
			  "beginTime": "2024-01-01 18:01:04",
			  "endTime": "2024-2-31 18:01:04",
			  "chargingPileId": 1
		   })
		}).then(success=>{
			let data = success.data.data
			console.log(data);
		}).catch(err=>{
			console.log(err);
		})
	}
  }
}
</script>

<style>
.container {
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}
.charger-image {
  position: relative;
  width: 100%;
  height: 400rpx;
}
.charger-image image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.status-overlay {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: bold;
}
.running { background-color: rgba(40, 167, 69, 0.8); color: white; }
.idle { background-color: rgba(0, 123, 255, 0.8); color: white; }
.alert { background-color: rgba(220, 53, 69, 0.8); color: white; }
.charger-info {
  background-color: white;
  padding: 30rpx;
  margin-bottom: 20rpx;
  margin: 20rpx;
  border-radius: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.info-item text {
  margin-left: 20rpx;
  font-size: 28rpx;
  color: #333;
}
.payment-section {
  background-color: white;
  padding: 30rpx;
  margin-bottom: 20rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}
.payment-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.payment-buttons button {
  width: 48%;
  margin-bottom: 20rpx;
  background-color: #f0f0f0;
  color: #333;
  font-weight: normal;
  transition: all 0.3s ease;
}
.payment-buttons button.selected {
  background-color: #00ff48;
  color: white;
}

.start-charging {
  position: fixed;
  bottom: 30rpx;
  left: 30rpx;
  right: 30rpx;
  background-color: #007AFF;
  color: white;
  font-size: 32rpx;
  padding: 20rpx 0;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.start-charging:disabled {
  background-color: #ccc;
}
.start-charging .amount {
  margin-left: 20rpx;
  font-weight: bold;
}
.date-info{
	height: 50vh;
	background-color: #ffffff;
	margin: 20rpx;
	border-radius: 20px;
	box-sizing: border-box;
	padding: 10px;
}


</style>
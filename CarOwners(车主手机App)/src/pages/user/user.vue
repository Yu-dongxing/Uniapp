<template>
  <view class="container">
    <!-- 用户信息头部 -->
    <view class="user-header">
      <view class="header-content">
        <view class="avatar-box">
          <image class="avatar" :src="userInfo.avatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
        </view>
        <view class="user-info" >
          <text class="nickname" v-if="!is_need_login">{{ userInfo.nickname || '未登录' }}</text> 
          <text class="phone" @click="gotourl()" v-if="is_need_login">{{ userInfo.phone || '点击登录' }} </text>
        </view>
<!--        <view class="setting-btn">
          <uni-icons type="gear" size="24" color="#fff"></uni-icons>
        </view> -->
      </view>
      <!-- <view class="user-stats">
        <view class="stat-item">
          <text class="value">0</text>
          <text class="label">优惠券</text>
        </view>
        <view class="stat-item">
          <text class="value">0</text>
          <text class="label">收藏</text>
        </view>
        <view class="stat-item">
          <text class="value">0</text>
          <text class="label">积分</text>
        </view>
      </view> -->
    </view>

    <!-- 我的订单 -->
<!--    <view class="card-section order-section">
      <view class="section-header">
        <view class="left">
          <text class="title">我的订单</text>
        </view>
        <view class="right" @tap="viewAllOrders">
          <text class="more">全部订单</text>
          <uni-icons type="right" size="14" color="#999"></uni-icons>
        </view>
      </view>
      <view class="order-types">
        <view class="type-item" v-for="(item, index) in orderTypes" :key="index" @tap="handleOrderType(item)">
          <view class="icon-box">
            <image :src="item.icon"></image>
            <text class="badge" v-if="item.count">{{ item.count }}</text>
          </view>
          <text class="name">{{ item.name }}</text>
        </view>
      </view>
    </view> -->

    <!-- 我的服务 -->
<!--    <view class="card-section service-section">
      <view class="section-header">
        <view class="left">
          <text class="title">我的服务</text>
        </view>
      </view>
      <view class="service-grid">
        <view class="service-item" v-for="(item, index) in serviceList" :key="index" @tap="handleService(item)">
          <image :src="item.icon"></image>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view> -->

    <!-- 功能列表 -->
<!--    <view class="card-section menu-list">
      <view class="menu-item" v-for="(item, index) in menuList" :key="index" @tap="handleMenu(item)">
        <view class="left">
          <image :src="item.icon"></image>
          <text>{{ item.name }}</text>
        </view>
        <view class="right">
          <text class="desc" v-if="item.desc">{{ item.desc }}</text>
          <uni-icons type="right" size="14" color="#999"></uni-icons>
        </view>
      </view>
    </view> -->
  </view>
  
</template>

<script>
import Login from '@/components/Login/Login.vue'
export default {
	components:{
		Login,
	},
  data() {
    return {
	is_need_login:true,
	userInfo:{
		phone:'',
		nickname:"",
		user_name:"",
		user_email:"",
		user_login_time:'',
	},
      orderTypes: [
        { name: '待付款', icon: '/static/images/icons/unpaid.png', count: 1 },
        { name: '待服务', icon: '/static/images/icons/unservice.png', count: 2 },
        { name: '待评价', icon: '/static/images/icons/unrated.png' },
        { name: '退款/售后', icon: '/static/images/icons/refund.png' }
      ],
      serviceList: [
        { 
          name: '车辆档案', 
          icon: '/static/images/icons/car-file.png',
          url: '/src/pages/car-file/index'
        },
        { 
          name: '违章记录', 
          icon: '/static/images/icons/violation.png',
          url: '/src/pages/violation-record/index'
        }
      ],
      menuList: [
        { name: '我的优惠券', icon: '/static/images/icons/coupon.png', desc: '3张可用', url: '/pages/coupon/coupon' },
        { name: '我的收藏', icon: '/static/images/icons/favorite.png', desc: '3', url: '/pages/favorite/favorite' },
        { name: '地址管理', icon: '/static/images/icons/address.png', url: '/pages/address/address' },
        { name: '联系客服', icon: '/static/images/icons/service.png', url: '/pages/service/service' },
        { name: '设置', icon: '/static/images/icons/settings.png', url: '/pages/settings/settings' }
      ]
    }
  },
  methods: {
    viewAllOrders() {
      uni.navigateTo({
        url: '/pages/order-list/order-list'
      })
    },
    handleOrderType(item) {
      uni.navigateTo({
        url: `/pages/order-list/order-list?type=${item.type}`
      })
    },
    handleService(item) {
      uni.navigateTo({
        url: item.url
      })
    },
    gotourl() {
      uni.navigateTo({
        url: '../Login/Login'
      })
    },
	is_login(){
		this.is_need_login=!this.is_need_login;
	},
	get_info(){
		uni.request({
			url:'http://124.93.196.45:10001/dev-api/getInfo',
			method:'GET',
			header:{
				'Authorization':uni.getStorageSync('token')
				},
		}).then(suc=>{
			// console.log(suc);
			this.userInfo.nickname=suc.data.user.userName;
			this.is_login();
			if(suc.data.code!=200){
				this.is_login();
			}
		}).catch(err=>{
			// console.log(err);
			this.is_login();
		})
	}
  },
  onLoad() {
  	this.get_info();
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 30rpx;
}

.user-header {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  padding: 40rpx 30rpx;
  color: #ffffff;
  
  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    
    .avatar-box {
      margin-right: 30rpx;
      
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 60rpx;
        border: 4rpx solid rgba(255,255,255,0.3);
      }
    }
    
    .user-info {
      flex: 1;
      
      .nickname {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
        display: block;
      }
      
      .phone {
        font-size: 28rpx;
        opacity: 0.9;
      }
    }
    
    .setting-btn {
      padding: 10rpx;
    }
  }
  
  .user-stats {
    display: flex;
    justify-content: space-around;
    background: rgba(255,255,255,0.1);
    border-radius: 12rpx;
    padding: 20rpx 0;
    
    .stat-item {
      text-align: center;
      
      .value {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 6rpx;
        display: block;
      }
      
      .label {
        font-size: 24rpx;
        opacity: 0.9;
      }
    }
  }
}

.card-section {
  background: #ffffff;
  border-radius: 16rpx;
  margin: 20rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .left {
      .title {
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
          background: #4CAF50;
          border-radius: 3rpx;
        }
      }
    }
    
    .right {
      display: flex;
      align-items: center;
      
      .more {
        font-size: 24rpx;
        color: #999;
        margin-right: 6rpx;
      }
    }
  }
}

.order-types {
  display: flex;
  justify-content: space-between;
  
  .type-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    
    .icon-box {
      position: relative;
      margin-bottom: 10rpx;
      
      image {
        width: 60rpx;
        height: 60rpx;
      }
      
      .badge {
        position: absolute;
        top: -10rpx;
        right: -10rpx;
        background: #ff6b6b;
        color: #fff;
        font-size: 20rpx;
        padding: 4rpx 8rpx;
        border-radius: 20rpx;
        min-width: 28rpx;
        text-align: center;
      }
    }
    
    .name {
      font-size: 24rpx;
      color: #333;
    }
  }
}

.service-grid {
  display: flex;
  flex-wrap: wrap;
  
  .service-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30rpx;
    
    image {
      width: 60rpx;
      height: 60rpx;
      margin-bottom: 10rpx;
    }
    
    text {
      font-size: 24rpx;
      color: #333;
    }
  }
}

.menu-list {
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    
    &:not(:last-child) {
      border-bottom: 1rpx solid #f5f5f5;
    }
    
    .left {
      display: flex;
      align-items: center;
      
      image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
      
      text {
        font-size: 28rpx;
        color: #333;
      }
    }
    
    .right {
      display: flex;
      align-items: center;
      
      .desc {
        font-size: 24rpx;
        color: #999;
        margin-right: 10rpx;
      }
    }
  }
}
</style> 
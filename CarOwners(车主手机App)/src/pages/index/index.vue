<template>
  <view class="container">
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <view class="search-box">
        <uni-icons type="search" size="16" color="#999"></uni-icons>
        <input type="text" placeholder="搜索服务、商品" />
      </view>
    </view>

    <!-- 轮播图 -->
    <swiper class="banner" circular :indicator-dots="true" :autoplay="true" interval="3000" duration="1000">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <image :src="item.image" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <!-- 快捷功能区 -->
    <view class="grid-section">
      <view class="grid-item" v-for="(item, index) in gridList" :key="index" @tap="handleGridClick(item)">
        <image :src="item.icon" mode="aspectFit"></image>
        <text>{{ item.name }}</text>
      </view>
    </view>

    <!-- 优惠活动 -->
    <view class="promotion-section">
      <view class="section-header">
        <text class="title">热门服务</text>
        <text class="more" @tap="navigateToMore">更多服务 ></text>
      </view>
      <scroll-view scroll-x class="promotion-scroll" show-scrollbar="false">
        <view class="promotion-item" v-for="(item, index) in promotionList" :key="index" @tap="handlePromotionClick(item)">
          <image :src="item.image" mode="aspectFill"></image>
          <view class="info">
            <text class="name">{{ item.name }}</text>
            <text class="desc">{{ item.desc }}</text>
            <view class="price-box">
              <text class="price">¥{{ item.price }}</text>
              <text class="original-price">¥{{ item.originalPrice }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 推荐商家 -->
    <view class="shop-section">
      <view class="section-header">
        <text class="title">推荐商家</text>
        <text class="more" @tap="navigateToShops">查看全部 ></text>
      </view>
      <view class="shop-list">
        <view class="shop-item" v-for="(item, index) in shopList" :key="index" @tap="handleShopClick(item)">
          <image :src="item.image" mode="aspectFill"></image>
          <view class="info">
            <text class="name">{{ item.name }}</text>
            <view class="rating">
              <uni-rate :value="item.rating" size="12" readonly></uni-rate>
              <text class="score">{{ item.rating }}分</text>
            </view>
            <text class="address">{{ item.address }}</text>
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
      bannerList: [
        { image: '/static/images/banner/banner1.png', url: '' },
        { image: '/static/images/banner/banner2.png', url: '' },
        { image: '/static/images/banner/banner3.png', url: '' }
      ],
      gridList: [
        { name: '保养维修', icon: '/static/images/icons/repair.png', url: '/src/pages/maintenance/maintenance' },
        { name: '洗车美容', icon: '/static/images/icons/wash.png', url: '/src/pages/wash/wash' },
        { name: '加油优惠', icon: '/static/images/icons/gas.png', url: '/src/pages/gas/gas' },
        { name: '违章查询', icon: '/static/images/icons/violation.png', url: '/src/pages/violation/violation' },
        { name: '停车服务', icon: '/static/images/icons/parking.png', url: '/src/pages/parking/parking' },
        { name: '车险服务', icon: '/static/images/icons/insurance.png', url: '/src/pages/insurance/insurance' },
        { name: '道路救援', icon: '/static/images/icons/rescue.png', url: '/src/pages/rescue/rescue' },
        { name: '更多服务', icon: '/static/images/icons/more.png', url: '/src/pages/more/more' }
      ],
      promotionList: [
        { 
          name: '标准保养套餐',
          desc: '机油+机滤+工时费',
          price: '299',
          originalPrice: '399',
          image: '/static/images/promotion/p1.png'
        },
        {
          name: '精致洗车',
          desc: '内外清洗+内饰护理',
          price: '39.9',
          originalPrice: '68',
          image: '/static/images/promotion/p2.png'
        }
      ],
      shopList: [
        {
          name: '车享家汽车服务中心',
          rating: 4.8,
          address: '广州市天河区天河路123号',
          image: '/static/images/shops/shop1.png'
        },
        {
          name: '一汽大众4S店',
          rating: 4.9,
          address: '广州市海珠区滨江东路456号',
          image: '/static/images/shops/shop2.png'
        }
      ]
    }
  },
  methods: {
    handleGridClick(item) {
      uni.navigateTo({
        url: item.url
      })
    },
    handlePromotionClick(item) {
      uni.navigateTo({
        url: `/src/pages/service-detail/service-detail?id=${item.id}`
      })
    },
    handleShopClick(item) {
      uni.navigateTo({
        url: `/src/pages/shop-detail/shop-detail?id=${item.id}`
      })
    },
    navigateToMore() {
      uni.switchTab({
        url: '/src/pages/maintenance/maintenance'
      })
    },
    navigateToShops() {
      uni.navigateTo({
        url: '/src/pages/shop-list/shop-list'
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20rpx;
}

.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  
  .search-box {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 15rpx 20rpx;
    border-radius: 30rpx;
    
    input {
      flex: 1;
      margin-left: 10rpx;
      font-size: 28rpx;
    }
  }
}

.banner {
  margin-top: 90rpx;
  height: 300rpx;
  
  image {
    width: 100%;
    height: 100%;
  }
}

.grid-section {
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  padding: 20rpx 10rpx;
  margin: 20rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  
  .grid-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 0;
    
    image {
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 10rpx;
    }
    
    text {
      font-size: 24rpx;
      color: #333;
    }
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  
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
      background-color: #3cc51f;
      border-radius: 3rpx;
    }
  }
  
  .more {
    font-size: 24rpx;
    color: #999;
  }
}

.promotion-section {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 12rpx;
  padding-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  
  .promotion-scroll {
    white-space: nowrap;
    padding: 0 20rpx;
    
    .promotion-item {
      display: inline-block;
      width: 300rpx;
      margin-right: 20rpx;
      background-color: #ffffff;
      border-radius: 12rpx;
      overflow: hidden;
      
      image {
        width: 100%;
        height: 200rpx;
        border-radius: 12rpx;
      }
      
      .info {
        padding: 15rpx;
        
        .name {
          font-size: 28rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
          display: block;
        }
        
        .desc {
          font-size: 24rpx;
          color: #666;
          margin-bottom: 10rpx;
          display: block;
        }
        
        .price-box {
          display: flex;
          align-items: baseline;
          
          .price {
            color: #ff6b6b;
            font-size: 32rpx;
            font-weight: bold;
            margin-right: 10rpx;
            
            &::before {
              content: '¥';
              font-size: 24rpx;
            }
          }
          
          .original-price {
            color: #999;
            font-size: 24rpx;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}

.shop-section {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 12rpx;
  padding-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  
  .shop-list {
    padding: 0 20rpx;
    
    .shop-item {
      display: flex;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #eee;
      
      &:last-child {
        border-bottom: none;
      }
      
      image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 12rpx;
        margin-right: 20rpx;
      }
      
      .info {
        flex: 1;
        
        .name {
          font-size: 30rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
          display: block;
        }
        
        .rating {
          display: flex;
          align-items: center;
          margin-bottom: 10rpx;
          
          .score {
            font-size: 24rpx;
            color: #ff6b6b;
            margin-left: 10rpx;
          }
        }
        
        .address {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
  }
}
</style> 
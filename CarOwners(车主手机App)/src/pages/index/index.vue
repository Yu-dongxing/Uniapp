<template>
  <view class="container">
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <view class="search-box" @tap="navigateToSearch">
        <svg-icon name="search" type="common" size="32" />
        <view class="search-placeholder">
          <text>搜索服务、商品</text>
        </view>
      </view>
    </view>

    <!-- 轮播图 -->
    <swiper 
      class="banner" 
      circular 
      :indicator-dots="true" 
      :autoplay="true" 
      interval="3000" 
      duration="1000"
      indicator-active-color="#4CAF50"
    >
      <swiper-item v-for="(item, index) in bannerList" :key="index" @tap="handleBannerClick(item)">
        <image :src="item.image" mode="aspectFill" />
        <view class="banner-info" v-if="item.title">
          <text class="title">{{ item.title }}</text>
          <text class="desc">{{ item.desc }}</text>
        </view>
      </swiper-item>
    </swiper>

    <!-- 快捷功能区 -->
<!--    <view class="grid-section">
      <view 
        class="grid-item" 
        v-for="(item, index) in gridList" 
        :key="index" 
        @tap="handleGridClick(item)"
      >
        <svg-icon 
          :name="item.icon" 
          type="services"
          size="80" 
          with-hover
        />
        <text>{{ item.name }}</text>
      </view>
    </view> -->

    <!-- 优惠活动 -->
<!--    <view class="promotion-section">
      <view class="section-header">
        <text class="title">热门服务</text>
        <text class="more" @tap="navigateToMore">更多服务 ></text>
      </view>
      <scroll-view 
        scroll-x 
        class="promotion-scroll" 
        enhanced
        :show-scrollbar="false"
        :scroll-anchoring="true"
      >
        <view 
          class="promotion-item" 
          v-for="(item, index) in promotionList" 
          :key="index" 
          @tap="handlePromotionClick(item)"
        >
          <image :src="item.image" mode="aspectFill" />
          <view class="info">
            <text class="name">{{ item.name }}</text>
            <text class="desc">{{ item.desc }}</text>
            <view class="price-box">
              <text class="price">¥{{ item.price }}</text>
              <text class="original-price">¥{{ item.originalPrice }}</text>
            </view>
            <view class="tag" v-if="item.tag">{{ item.tag }}</view>
          </view>
        </view>
      </scroll-view>
    </view> -->

    <!-- 推荐商家 -->
    <view class="shop-section">
      <view class="section-header">
        <text class="title">推荐商家</text>
        <text class="more" @tap="navigateToShops">查看全部 ></text>
      </view>
      <view class="shop-list">
        <view 
          class="shop-item" 
          v-for="(item, index) in shopList" 
          :key="index" 
          @tap="handleShopClick(item)"
        >
          <image :src="item.image" mode="aspectFill" />
          <view class="info">
            <view class="shop-header">
              <text class="name">{{ item.name }}</text>
              <view class="distance" v-if="item.distance">
                <text>{{ item.distance }}km</text>
              </view>
            </view>
            <view class="rating">
              <text class="score">{{ item.rating }}分</text>
              <text class="order-count">({{ item.orderCount }}单)</text>
            </view>
            <view class="tags" v-if="item.tags && item.tags.length">
              <text 
                class="tag" 
                v-for="(tag, tagIndex) in item.tags" 
                :key="tagIndex"
              >{{ tag }}</text>
            </view>
            <text class="address">{{ item.address }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue'

export default {
  components: {
    SvgIcon
  },
  data() {
    return {
      bannerList: [
        { 
          image: '/static/images/banner/banner1.jpg',
          title: '春季保养特惠',
          desc: '套餐低至299元起',
          url: '/pages/promotion/detail?id=1'
        },
        { 
          image: '/static/images/banner/banner2.jpg',
          title: '精致洗车',
          desc: '新客首单39.9元',
          url: '/pages/promotion/detail?id=2'
        },
        { 
          image: '/static/images/banner/banner3.jpg',
          title: '加油优惠',
          desc: '充100送50',
          url: '/pages/promotion/detail?id=3'
        }
      ],
      gridList: [
        { 
          name: '保养维修', 
          icon: 'repair',
          url: '/pages/maintenance/index' 
        },
        { 
          name: '洗车美容', 
          icon: 'wash',
          url: '/pages/wash/index' 
        },
        { 
          name: '加油优惠', 
          icon: 'gas',
          url: '/pages/gas/index' 
        },
        { 
          name: '违章查询', 
          icon: 'violation',
          url: '/pages/violation/index' 
        },
        { 
          name: '停车服务', 
          icon: 'parking',
          url: '/pages/parking/index' 
        },
        { 
          name: '车险服务', 
          icon: 'insurance',
          url: '/pages/insurance/index' 
        },
        { 
          name: '道路救援', 
          icon: 'rescue',
          url: '/pages/rescue/index' 
        },
        { 
          name: '更多服务', 
          icon: 'more',
          url: '/pages/services/more' 
        }
      ],
      promotionList: [
        { 
          id: 1,
          name: '准保养套餐',
          desc: '机油+机滤+工时费',
          price: '299',
          originalPrice: '399',
          image: '/static/images/services/maintenance.jpg',
          tag: '优惠'
        },
        {
          id: 2,
          name: '精致洗车',
          desc: '内外清洗+内饰护理',
          price: '39.9',
          originalPrice: '68',
          image: '/static/images/services/wash.jpg',
          tag: '新客特惠'
        },
        {
          id: 3,
          name: '加油套餐',
          desc: '充值送优惠券',
          price: '500',
          originalPrice: '600',
          image: '/static/images/services/gas.jpg',
          tag: '充送'
        }
      ],
      shopList: [
        {
          id: 1,
          name: '车享家汽车服务中心',
          rating: 4.8,
          orderCount: 2685,
          distance: 1.2,
          tags: ['保养维修', '洗车美容', '正品配件'],
          address: '广州市天河区天河路123号',
          image: '/static/images/shops/shop1.jpg'
        },
        {
          id: 2,
          name: '一汽大众4S店',
          rating: 4.9,
          orderCount: 3421,
          distance: 2.5,
          tags: ['品牌4S店', '原厂配件'],
          address: '广州市海珠区滨江东路456号',
          image: '/static/images/shops/shop2.jpg'
        }
      ]
    }
  },
  methods: {
    navigateToSearch() {
      uni.navigateTo({
        url: '/src/pages/search/search'
      })
    },
    handleBannerClick(item) {
      if (item.url) {
        uni.navigateTo({
          url: item.url
        })
      }
    },
    handleGridClick(item) {
      uni.navigateTo({
        url: item.url
      })
    },
    handlePromotionClick(item) {
      uni.navigateTo({
        url: `/pages/service/detail?id=${item.id}`
      })
    },
    handleShopClick(item) {
      uni.navigateTo({
        url: `/pages/shop/detail?id=${item.id}`
      })
    },
    navigateToMore() {
      uni.switchTab({
        url: '/pages/services/index'
      })
    },
    navigateToShops() {
      uni.navigateTo({
        url: '/pages/shop/list'
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
  background-color: #ffffff;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  padding: 20rpx 30rpx;
  margin-top: 44px;
  
  .search-box {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 15rpx 20rpx;
    border-radius: 30rpx;
    position: relative;
    z-index: 101;
    
    svg-icon {
      flex-shrink: 0;
      color: #999;
    }
    
    .search-placeholder {
      flex: 1;
      margin-left: 10rpx;
      
      text {
        font-size: 28rpx;
        color: #999;
      }
    }
    
    &:active {
      opacity: 0.8;
    }
  }
}

.banner {
  margin-top: 140rpx;
  height: 300rpx;
  
  image {
    width: 100%;
    height: 100%;
  }
  
  .banner-info {
    position: absolute;
    left: 30rpx;
    bottom: 30rpx;
    color: #fff;
    text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.3);
    
    .title {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
      display: block;
    }
    
    .desc {
      font-size: 24rpx;
      opacity: 0.9;
    }
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
    
    text {
      font-size: 24rpx;
      color: #333;
      margin-top: 16rpx;
      font-weight: 500;
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
      background-color: #4CAF50;
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
      position: relative;
      
      image {
        width: 100%;
        height: 200rpx;
        border-radius: 12rpx 12rpx 0 0;
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
        
        .tag {
          position: absolute;
          top: 16rpx;
          right: 16rpx;
          background: rgba(255,107,107,0.9);
          color: #fff;
          font-size: 20rpx;
          padding: 4rpx 12rpx;
          border-radius: 20rpx;
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
        
        .shop-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10rpx;
          
          .name {
            font-size: 30rpx;
            font-weight: bold;
          }
          
          .distance {
            font-size: 24rpx;
            color: #999;
          }
        }
        
        .rating {
          display: flex;
          align-items: center;
          margin-bottom: 10rpx;
          
          .score {
            font-size: 24rpx;
            color: #ff6b6b;
            margin: 0 10rpx;
          }
          
          .order-count {
            font-size: 24rpx;
            color: #999;
          }
        }
        
        .tags {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10rpx;
          
          .tag {
            font-size: 22rpx;
            color: #4CAF50;
            background: rgba(76,175,80,0.1);
            padding: 4rpx 12rpx;
            border-radius: 20rpx;
            margin-right: 10rpx;
            margin-bottom: 8rpx;
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
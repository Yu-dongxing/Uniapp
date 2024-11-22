<template>
  <view class="search-page">
    <view class="search-header">
      <view class="search-input-box">
        <svg-icon name="search" type="common" size="32" />
        <input
          class="search-input"
          type="text"
          v-model="searchText"
          placeholder="搜索服务、商品"
          placeholder-class="placeholder"
          focus
          confirm-type="search"
          @confirm="handleSearch"
        />
        <view class="clear-btn" v-if="searchText" @tap="clearSearch">
          <svg-icon name="close" type="common" size="28" />
        </view>
      </view>
      <text class="cancel-btn" @tap="goBack">取消</text>
    </view>

    <!-- 搜索历史 -->
    <view class="search-history" v-if="!searchText && searchHistory.length">
      <view class="history-header">
        <text class="title">搜索历史</text>
        <view class="clear-history" @tap="clearHistory">
          <svg-icon name="delete" type="common" size="28" />
        </view>
      </view>
      <view class="history-list">
        <view 
          class="history-item" 
          v-for="(item, index) in searchHistory" 
          :key="index"
          @tap="useHistoryItem(item)"
        >
          <text>{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 搜索结果 -->
    <view class="search-result" v-if="searchText">
      <!-- 这里添加搜索结果列表 -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      searchHistory: []
    }
  },
  methods: {
    handleSearch() {
      if (!this.searchText.trim()) return
      
      // 保存搜索历史
      if (!this.searchHistory.includes(this.searchText)) {
        this.searchHistory.unshift(this.searchText)
        // 限制历史记录数量
        if (this.searchHistory.length > 10) {
          this.searchHistory.pop()
        }
        // 保存到本地存储
        uni.setStorageSync('searchHistory', this.searchHistory)
      }
      
      // 执行搜索
      this.doSearch()
    },
    
    clearSearch() {
      this.searchText = ''
    },
    
    clearHistory() {
      uni.showModal({
        title: '提示',
        content: '确定要清空搜索历史吗？',
        success: (res) => {
          if (res.confirm) {
            this.searchHistory = []
            uni.removeStorageSync('searchHistory')
          }
        }
      })
    },
    
    useHistoryItem(item) {
      this.searchText = item
      this.handleSearch()
    },
    
    goBack() {
      uni.navigateBack()
    },
    
    doSearch() {
      // 实现搜索逻辑
      console.log('搜索:', this.searchText)
    }
  },
  onLoad() {
    // 加载搜索历史
    const history = uni.getStorageSync('searchHistory')
    if (history) {
      this.searchHistory = history
    }
  }
}
</script>

<style lang="scss">
.search-page {
  min-height: 100vh;
  background: #fff;
  padding-top: var(--status-bar-height);
}

.search-header {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background: #fff;
  border-bottom: 1rpx solid #f5f5f5;
  
  .search-input-box {
    flex: 1;
    display: flex;
    align-items: center;
    background: #f5f5f5;
    border-radius: 30rpx;
    padding: 15rpx 20rpx;
    margin-right: 20rpx;
    
    svg-icon {
      color: #999;
      margin-right: 10rpx;
    }
    
    .search-input {
      flex: 1;
      font-size: 28rpx;
      height: 32rpx;
      line-height: 32rpx;
    }
    
    .placeholder {
      color: #999;
    }
    
    .clear-btn {
      padding: 10rpx;
    }
  }
  
  .cancel-btn {
    font-size: 28rpx;
    color: #666;
    padding: 10rpx;
  }
}

.search-history {
  padding: 30rpx;
  
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    
    .title {
      font-size: 28rpx;
      color: #333;
      font-weight: bold;
    }
    
    .clear-history {
      padding: 10rpx;
    }
  }
  
  .history-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    
    .history-item {
      padding: 10rpx 30rpx;
      background: #f5f5f5;
      border-radius: 30rpx;
      
      text {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
}
</style> 
<!-- pages/appMarket/index.vue -->
<template>
  <view class="app-market">
    <view class="search-bar">
      <input v-model="searchKeyword" placeholder="搜索应用" />
      <button @tap="searchApps">搜索</button>

    </view>

    <view class="recommended-apps">
      <view v-for="app in recommendedApps" :key="app.id" class="app-card">
        <image :src="app.icon" mode="aspectFit"></image>

        <text>{{ app.name }}</text>

        <text>{{ app.description }}</text>

        <button @tap="downloadApp(app.id)">下载</button>

      </view>

    </view>

    <view class="hot-apps">
      <text>本周热门</text>
      <view v-for="app in hotApps" :key="app.id" class="app-item">
        <image :src="app.icon" mode="aspectFit"></image>
        <text>{{ app.name }}</text>
        <text>下载次数: {{ app.downloads }}</text>

        <button @tap="downloadApp(app.id)">下载</button>

      </view>

    </view>

    <view class="update-list">
      <text>可更新应用</text>

      <view v-for="app in updateableApps" :key="app.id" class="app-item">
        <text>{{ app.name }}</text>

        <button @tap="updateApp(app.id)">更新</button>

      </view>

    </view>

  </view>

</template>

<script>
export default {
  data() {
    return {
      searchKeyword: '',
      recommendedApps: [
        { id: '001', name: 'App1', description: '推荐App1', icon: '/static/app1-icon.png' },
        { id: '002', name: 'App2', description: '推荐App2', icon: '/static/app2-icon.png' },
      ],
      hotApps: [
        { id: '003', name: 'App3', downloads: 10000, icon: '/static/app3-icon.png' },
        { id: '004', name: 'App4', downloads: 8000, icon: '/static/app4-icon.png' },
      ],
      updateableApps: [
        { id: '005', name: 'App5' },
        { id: '006', name: 'App6' },
      ]
    }
  },
  methods: {
    searchApps() {
      console.log('搜索应用:', this.searchKeyword)
      // 这里应该调用实际的搜索API
    },
    downloadApp(appId) {
      console.log('下载应用:', appId)
      // 这里应该调用实际的下载API
    },
    updateApp(appId) {
      console.log('更新应用:', appId)
      // 这里应该调用实际的更新API
    }
  }
}
</script>

<style>
.app-market {
  padding: 20px;
}
.search-bar {
  display: flex;
  margin-bottom: 20px;
}
.app-card, .app-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>

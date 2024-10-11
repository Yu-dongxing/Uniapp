<template>
  <view class="container">
    <view class="header">
      <text class="title">应用市场</text>
      <view class="menu">
        <button @click="navigateTo('/pages/search/search')">搜索</button>
        <button @click="navigateTo('/pages/update/update')">更新</button>
      </view>
    </view>

    <view class="recommended-apps">
      <text class="section-title">推荐 App</text>
      <scroll-view scroll-x class="app-list">
        <view v-for="app in recommendedApps" :key="app.id" class="app-card">
          <image :src="app.icon" class="app-icon" />
          <view class="app-info">
            <text class="app-name">{{ app.name }}</text>
            <text class="app-description">{{ app.description }}</text>
          </view>
          <button class="download-btn" @click="downloadApp(app)">下载</button>
        </view>
      </scroll-view>
    </view>

    <view class="popular-apps">
      <text class="section-title">本周热门</text>
      <view v-for="app in popularApps" :key="app.id" class="popular-app-item">
        <image :src="app.thumbnail" class="app-thumbnail" />
        <view class="app-info">
          <text class="app-name">{{ app.name }}</text>
          <text class="download-count">下载次数: {{ app.downloadCount }}</text>
        </view>
        <button class="download-btn" @click="downloadApp(app)">下载</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const recommendedApps = ref([
  { id: 1, name: 'App 1', description: '这是一个很棒的应用', icon: '/static/app1.png' },
  { id: 2, name: 'App 2', description: '另一个很棒的应用', icon: '/static/app2.png' },
  { id: 2, name: 'App 2', description: '另一个很棒的应用', icon: '/static/app2.png' },{ id: 2, name: 'App 2', description: '另一个很棒的应用', icon: '/static/app2.png' },{ id: 2, name: 'App 2', description: '另一个很棒的应用', icon: '/static/app2.png' },
  
  // 添加更多推荐应用
])

const popularApps = ref([
  { id: 3, name: 'Popular App 1', downloadCount: 10000, thumbnail: '/static/app3.png' },
  { id: 4, name: 'Popular App 2', downloadCount: 8000, thumbnail: '/static/app4.png' },
  // 添加更多热门应用
])

const navigateTo = (url) => {
  uni.navigateTo({ url })
}

const downloadApp = (app) => {
  // 实现下载逻辑
  console.log(`Downloading app: ${app.name}`)
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.menu {
  display: flex;
  gap: 10px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.app-list {
  white-space: nowrap;
  margin-bottom: 20px;
}

.app-card {
  display: inline-block;
  width: 200px;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.app-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.app-info {
  margin-bottom: 10px;
}

.app-name {
  font-weight: bold;
}

.app-description {
  font-size: 12px;
  color: #666;
}

.popular-app-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.app-thumbnail {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.download-count {
  font-size: 12px;
  color: #666;
}

.download-btn {
  background-color: #007AFF;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
</style>
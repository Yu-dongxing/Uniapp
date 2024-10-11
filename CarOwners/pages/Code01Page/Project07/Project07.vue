<template>
  <view class="container">
    <view class="header">
      <text class="title">应用市场</text>
      <view class="menu">
        <button class="menu-btn" @click="navigateTo('/pages/search/search')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <text>搜索</text>
        </button>
        <button class="menu-btn" @click="navigateTo('/pages/update/update')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"></path></svg>
          <text>更新</text>
        </button>
      </view>
    </view>

    <view class="section recommended-apps">
      <text class="section-title">推荐 App</text>
      <scroll-view scroll-x class="app-list" show-scrollbar="false">
        <view v-for="app in recommendedApps" :key="app.id" class="app-card">
          <view class="app-icon" :style="{ backgroundColor: app.color }">
            {{ app.name[0] }}
          </view>
          <view class="app-info">
            <text class="app-name">{{ app.name }}</text>
            <text class="app-description">{{ app.description }}</text>
          </view>
          <button class="download-btn" @click="downloadApp(app)">下载</button>
        </view>
      </scroll-view>
    </view>

    <view class="section popular-apps">
      <text class="section-title">本周热门</text>
      <view class="popular-apps-grid">
        <view v-for="app in popularApps" :key="app.id" class="popular-app-item">
          <view class="app-thumbnail" :style="{ backgroundColor: app.color }">
            {{ app.name[0] }}
          </view>
          <view class="app-info">
            <text class="app-name">{{ app.name }}</text>
            <text class="download-count">下载次数: {{ formatDownloadCount(app.downloadCount) }}</text>
          </view>
          <button class="download-btn" @click="downloadApp(app)">下载</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const getRandomColor = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F06292', '#AED581', '#7986CB', '#4DB6AC', '#FFD54F']
  return colors[Math.floor(Math.random() * colors.length)]
}

const recommendedApps = ref([
  { id: 1, name: 'App 1', description: '这是一个很棒的应用', color: getRandomColor() },
  { id: 2, name: 'App 2', description: '另一个很棒的应用', color: getRandomColor() },
  { id: 3, name: 'App 3', description: '创新的应用程序', color: getRandomColor() },
  { id: 4, name: 'App 4', description: '实用的工具应用', color: getRandomColor() },
  { id: 5, name: 'App 5', description: '娱乐应用程序', color: getRandomColor() },
])

const popularApps = ref([
  { id: 6, name: 'Popular App 1', downloadCount: 1000000, color: getRandomColor() },
  { id: 7, name: 'Popular App 2', downloadCount: 800000, color: getRandomColor() },
  { id: 8, name: 'Popular App 3', downloadCount: 600000, color: getRandomColor() },
  { id: 9, name: 'Popular App 4', downloadCount: 400000, color: getRandomColor() },
  { id: 10, name: 'Popular App 5', downloadCount: 200000, color: getRandomColor() },
  { id: 11, name: 'Popular App 6', downloadCount: 100000, color: getRandomColor() },
])

const navigateTo = (url) => {
  uni.navigateTo({ url })
}

const downloadApp = (app) => {
  console.log(`Downloading app: ${app.name}`)
}

const formatDownloadCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}
</script>

<style scoped>
.container {
  padding: 32px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #1a202c;
}

.menu {
  display: flex;
  gap: 16px;
}

.menu-btn {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 16px;
  color: #4a5568;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.menu-btn:hover {
  background-color: #edf2f7;
}

.icon {
  margin-right: 8px;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 20px;
}

.app-list {
  white-space: nowrap;
  margin-bottom: 20px;
  padding: 8px 0;
}

.app-card {
  display: inline-block;
  width: 240px;
  margin-right: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.app-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.app-icon, .app-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
}

.app-thumbnail {
  width: 60px;
  height: 60px;
  font-size: 24px;
  margin-right: 16px;
  margin-bottom: 0;
}

.app-info {
  margin-bottom: 16px;
}

.app-name {
  font-weight: bold;
  font-size: 18px;
  color: #2d3748;
  margin-bottom: 8px;
}

.app-description {
  font-size: 14px;
  color: #718096;
  white-space: normal;
}

.popular-apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.popular-app-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.popular-app-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.download-count {
  font-size: 14px;
  color: #718096;
  margin-top: 4px;
}

.download-btn {
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.download-btn:hover {
  background-color: #3182ce;
}

@media (min-width: 1024px) {
  .container {
    padding: 48px 64px;
  }

  .title {
    font-size: 48px;
  }

  .section-title {
    font-size: 32px;
  }

  .app-card {
    width: 280px;
  }

  .popular-apps-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}
</style>
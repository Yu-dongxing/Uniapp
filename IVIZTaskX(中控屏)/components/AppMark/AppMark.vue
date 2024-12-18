
<template>
  <view class="app-market">
    <view class="header">
      <text class="title">应用市场</text>
      <view class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="搜索应用..." @input="searchApps" />
        <button @click="searchApps">搜索</button>
      </view>
    </view>

    <view class="recommendations">
      <text class="section-title">推荐应用</text>
      <view class="app-list">
        <view class="app-card" >
          <image src="" class="app-logo" />
          <text class="app-name">aasfsef</text>
          <text class="app-intro">aeffafsf</text>
          <text class="app-download" >下载</text>
        </view>
		<view class="app-card" >
		  <image src="" class="app-logo" />
		  <text class="app-name">aasfsef</text>
		  <text class="app-intro">aeffafsf</text>
		  <text class="app-download" >下载</text>
		</view>
		<view class="app-card" >
		  <image src="" class="app-logo" />
		  <text class="app-name">aasfsef</text>
		  <text class="app-intro">aeffafsf</text>
		  <text class="app-download" >下载</text>
		</view>
		<view class="app-card" >
		  <image src="" class="app-logo" />
		  <text class="app-name">aasfsef</text>
		  <text class="app-intro">aeffafsf</text>
		  <text class="app-download" >下载</text>
		</view>
      </view>
    </view>

    <view class="updates">
      <text class="section-title">可更新应用</text>
      <view class="app-list">
        <view class="app-card" >
          <image src="" class="app-logo" />
          <text class="app-name">aasfsef</text>
          <text class="app-intro">aeffafsf</text>
          <text class="app-download" >下载</text>
        </view>
        <view class="app-card" >
          <image src="" class="app-logo" />
          <text class="app-name">aasfsef</text>
          <text class="app-intro">aeffafsf</text>
          <text class="app-download" >下载</text>
        </view>
        <view class="app-card" >
          <image src="" class="app-logo" />
          <text class="app-name">aasfsef</text>
          <text class="app-intro">aeffafsf</text>
          <text class="app-download" >下载</text>
        </view>
        <view class="app-card">
          <image src="" class="app-logo" />
          <text class="app-name">aasfsef</text>
          <text class="app-intro">aeffafsf</text>
          <text class="app-download" >下载</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
	name: "AppMark",
  data() {
    return {
      searchQuery: '',
      recommendedApps: [
		  {id:0,apkId:1,apkName:"weqe"},
		  {id:0,apkId:1,apkName:"weqe"}
	  ], // 推荐应用列表
      updateApps: [] // 可更新应用列表
    };
  },
  methods: {
    searchApps() {
      // 实现搜索功能
      console.log('搜索应用:', this.searchQuery);
      // 这里可以添加模糊查询逻辑
    },
    downloadApp(downloadPath) {
      // 实现下载功能
      console.log('下载应用:', downloadPath);
      // 这里可以添加下载逻辑
    },
    updateApp(apkId) {
      // 实现更新功能
      console.log('更新应用:', apkId);
      // 这里可以添加更新逻辑
    },
    fetchApps() {
      // 模拟获取应用数据
      this.recommendedApps = [/* 从接口获取的推荐应用数据 */];
      this.updateApps = [/* 从接口获取的可更新应用数据 */];
    }
  },
  mounted() {
    this.fetchApps(); // 组件挂载后获取应用数据
  }
};
</script>

<style scoped lang="less">
.app-market {
  padding: 20px;
  // background-color: #f8f9fa;
}

.header {
	height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #212529;
}

.search-bar {
  display: flex;
  width: 40%; // Or a specific width/max-width if you prefer
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  overflow: hidden;
  height: 50px;
}

.search-bar input {
  height: 50px;
  flex: 1;  // Take up available space
  padding: 8px 12px;
  border: none;
  outline: none;
  box-sizing: border-box; // Include padding and border in element's total width and height
}

.search-bar button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  line-height: 30px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0069d9;
  }
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #212529;
}

.app-list {
	margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  border: 1px solid;
}

.app-card {
  flex:11 calc(33.333% - 15px);
  background-color: white;
  border-radius: 0.25rem;
  padding: 15px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);  // Subtle shadow
  overflow: hidden; // Prevents content overflow
  min-height: 250px;
  display: flex;
  flex-direction: column;
border: 1px solid;
   .app-logo {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
    object-fit: cover; // Make sure image fits within the dimensions
	border: 1px solid;
  }

  .app-name {
    font-size: 16px;
    font-weight: 600;
    color: #007bff;
    margin-bottom: 5px;
	border: 1px solid;
  }

  .app-intro {
    font-size: 14px;
    color: #6c757d; // Gray text
    margin-bottom: auto; // Push download/update button to the bottom
    flex-grow: 1;      // Allow intro text to take remaining space
    overflow: hidden;   // Hide overflow if the text is too long
    text-overflow: ellipsis;   // Add ellipsis (...) for truncated text
    display: -webkit-box;
	border: 1px solid;
  }

  .app-download, .app-update {
    padding: 8px 12px;
    background-color: #28a745; // Green for download/update
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s;
    text-align: center; // Center text within the button
	border: 1px solid;
    &:hover {
      background-color: #218838; // Darker green on hover
    }
  }
}
</style>

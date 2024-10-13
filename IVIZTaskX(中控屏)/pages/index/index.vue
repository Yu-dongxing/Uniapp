<template>
	<view class="dashboard">
		<view class="top-bar">
			<image class="avatar" src="/static/avatar.png" />
			<view class="search-bar">
				<text class="search-icon">🔍</text>
				<input type="text" placeholder="搜索关键字" />
			</view>
			<view class="settings">
				<text class="settings-icon">⚙️</text>
				<text>车机设置</text>
			</view>
			<view class="status">
				<text class="wifi-icon">📶</text>
				<text class="temperature">24°C</text>
				<text class="time">19:35</text>
			</view>
		</view>

		<view class="main-content">
			<view class="sidebar">
				<view class="sidebar-item">
					<view class="icon">🚗</view>
				</view>
				<view class="sidebar-item">
					<view class="icon">🧭</view>
				</view>
				<view class="sidebar-item">
					<view class="icon">▦</view>
				</view>
				<view class="sidebar-item">
					<view class="icon">🎵</view>
				</view>
				<view class="sidebar-item">
					<view class="icon active">⚙️</view>
				</view>
			</view>

			<view class="grid-container">
				<view class="grid-item" v-for="(item, index) in gridItems" :key="index">
					<view class="icon">{{ item.icon }}</view>
					<text>{{ item.label }}</text>
				</view>
			</view>
		</view>

		<view class="bottom-bar">
			<slider :value="24" :min="0" :max="100" show-value />
			<button class="control-btn">AUTO</button>
			<button class="control-btn">A/C</button>
			<button class="control-btn">🚗</button>
			<button class="control-btn">💨</button>
			<button class="control-btn">❄️</button>
			<slider :value="24" :min="16" :max="32" show-value /><span>℃</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridItems: [{
						icon: '❄️',
						label: '空调'
					},
					{
						icon: '🔘',
						label: '胎压'
					},
					{
						icon: '🚗',
						label: '车辆信息'
					},
					{
						icon: '🚦',
						label: '违章查询'
					},
					{
						icon: '📹',
						label: '行车记录'
					},
					{
						icon: '📋',
						label: '任务管理'
					},
					{
						icon: '📁',
						label: '文件管理'
					},
					{
						icon: '📘',
						label: '升级手册'
					},
					{
						icon: '🎥',
						label: '视频手册'
					},
				]
			}
		}
	}
</script>

<style>
.dashboard {
	background-color: #1e1e1e;
	color: white;
	height: 100vh;
	display: flex;
	flex-direction: column;
	font-family: Arial, sans-serif;
	/* border: 2px solid #0066cc; */
	/* border-radius: 20px; */
	/* overflow-x: hidden; */
	overflow: hidden;
}

.top-bar {
	display: flex;
	align-items: center;
	padding: 10px 20px;
	background-color: #2a2a2a;
}

.avatar {
	width: 40px;
	height: 40px;
	border-radius: 20px;
}

.search-bar {
	flex-grow: 1;
	margin: 0 20px;
	background-color: #3a3a3a;
	border-radius: 20px;
	padding: 5px 15px;
	display: flex;
	align-items: center;
}

.search-icon {
	margin-right: 10px;
}

.search-bar input {
	background: transparent;
	border: none;
	color: white;
	width: 100%;
}

.settings {
	display: flex;
	align-items: center;
	margin-right: 20px;
}

.settings-icon {
	margin-right: 5px;
}

.status {
	display: flex;
	align-items: center;
}

.status>* {
	margin-left: 10px;
}

.main-content {
	display: flex;
	flex-grow: 1;
	height: 80vh;
}

.sidebar {
	width: 90px;
	background-color: #2a2a2a;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20px;
	
}

.sidebar-item {
	display: flex;
	flex-direction: column;
	width: 80px;
	height: 60px;
	background-color: #3a3a3a;
	margin-bottom: 30px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
}

.sidebar .sidebar-item .icon {
	/* margin-bottom: 30px; */
	font-size: 24px;
}

.sidebar .sidebar-item .active {
	color: #0066cc;
}

.grid-container {
	display: flex;
	flex-wrap: wrap;
	padding: 20px;
	gap: 15px;
	flex-grow: 1;
	overflow: auto;
	background: linear-gradient(135deg, rgba(108, 79, 255, 0.45) 0%, rgba(5, 5, 5, 1) 100%);
}

.grid-container::-webkit-scrollbar {
	width: 5px;
	/* background-color: aliceblue; */
}

.grid-container::-webkit-scrollbar-thumb {
	background-color: aliceblue;
}

.grid-item {
	flex-basis: calc(25% - 15px);
	aspect-ratio: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #2a2a2a;
	border-radius: 10px;
}

.grid-item .icon {
	font-size: 32px;
	margin-bottom: 10px;
}

.grid-item text {
	font-size: 14px;
}

.bottom-bar {
	position: static;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	background-color: #2a2a2a;
	border-top: 1px solid #0066cc;
}

.control-btn {
	background-color: #3a3a3a;
	border: none;
	color: white;
	padding: 10px 15px;
	border-radius: 20px;
	font-size: 14px;
}

slider {
	width: 120px;
	block-size: 20px;
	/* 滑块的尺寸 */
}
</style>
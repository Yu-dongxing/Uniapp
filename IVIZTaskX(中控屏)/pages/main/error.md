<template>
	<view class="dashboard">
		<view class="sidebar">
			<view class="icon">🚗</view>
			<view class="icon">◁</view>
			<view class="icon">☰</view>
			<view class="icon">🎵</view>
			<view class="icon">⚙️</view>
		</view>
		<view class="main-content">
			<view class="top-bar">
				<view class="speed-container">
					<text class="speed">69</text>
					<view class="status">
						<text class="gear">P R N D</text>
						<text class="ready">READY</text>
					</view>
					<text class="unit">KM/H</text>
				</view>
				<view class="battery">
					<text class="battery-icon">🔋</text>
					<text class="battery-range">475KM</text>
				</view>
				<view class="top-right">
					<text class="wifi-icon">📶</text>
					<text class="temperature">24°C</text>
					<text class="time">19:35</text>
				</view>
			</view>
			<view class="menu-bar">
				<text class="menu-item active">安全辅助</text>
				<text class="menu-item">安全辅助</text>
				<text class="menu-item">车内摄像</text>
				<text class="menu-item">显示设置</text>
				<text class="menu-item">蓝牙</text>
				<text class="menu-item">WIFI</text>
			</view>
			<view class="main-display">
				<view class="left-panel">
					<view class="speed-control">
						<text class="speed-adjust minus">-</text>
						<view class="speed-limit">
							<text class="limit">80</text>
							<text class="max">MAX</text>
						</view>
						<text class="speed-adjust plus">+</text>
					</view>
					<image src="/static/car-top-view.png" class="car-view" mode="aspectFit" />
				</view>
				<view class="right-panel">
					<view class="car-info">
						<view class="car-details">
							<text class="car-model">特斯拉 Model 3</text>
							<text class="car-consumption">17.2KWH/100KM</text>
						</view>
						<image src="/static/tesla-model-3.png" class="car-image" mode="aspectFit" />
					</view>
					<view class="control-buttons">
						<button class="control-btn">
							<text class="btn-icon">🚪</text>
							<text class="btn-text">后备箱</text>
						</button>
						<button class="control-btn">
							<text class="btn-icon">💡</text>
							<text class="btn-text">灯光模式</text>
						</button>
						<button class="control-btn">
							<text class="btn-icon">🌧️</text>
							<text class="btn-text">雨刷设置</text>
						</button>
						<button class="control-btn">
							<text class="btn-icon">🚘</text>
							<text class="btn-text">驾驶模式</text>
						</button>
						<button class="control-btn">
							<text class="btn-icon">🚪</text>
							<text class="btn-text">电动尾门</text>
						</button>
						<button class="control-btn">
							<text class="btn-icon">🔌</text>
							<text class="btn-text">充电接口</text>
						</button>
					</view>
					<view class="mode-settings">
						<view class="setting-group">
							<text class="setting-title">雨刷设置</text>
							<view class="mode-buttons">
								<button class="mode-btn active">AUTO</button>
								<button class="mode-btn">OFF</button>
								<button class="mode-btn">低速</button>
								<button class="mode-btn">高速</button>
							</view>
						</view>
						<view class="setting-group">
							<text class="setting-title">驾驶模式</text>
							<view class="mode-buttons">
								<button class="mode-btn active">标准</button>
								<button class="mode-btn">单踏板</button>
								<button class="mode-btn">舒适</button>
								<button class="mode-btn">运动</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="climate-control">
				<view class="temp-slider">
					<slider :value="24" :min="16" :max="30" show-value />
				</view>
				<view class="climate-buttons">
					<button class="climate-btn active">AUTO</button>
					<button class="climate-btn">A/C</button>
					<button class="climate-btn">🚗</button>
					<button class="climate-btn">☔️</button>
					<button class="climate-btn">❄️</button>
				</view>
				<view class="temp-slider">
					<slider :value="24" :min="16" :max="30" show-value />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Dashboard',
		data() {
			return {
				// Add reactive data here if needed
			}
		},
		// Add methods, computed properties, etc. as needed
	}
</script>

<style>
	.dashboard {
		display: flex;
		background-color: #1c1c1e;
		color: white;
		height: 100vh;
		font-family: Arial, sans-serif;
	}

	.sidebar {
		width: 80px;
		background-color: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30px;
	}

	.icon {
		margin-bottom: 30px;
		font-size: 28px;
	}

	.main-content {
		flex: 1;
		padding: 30px;
		display: flex;
		flex-direction: column;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.speed-container {
		display: flex;
		align-items: baseline;
	}

	.speed {
		font-size: 72px;
		font-weight: bold;
		margin-right: 15px;
	}

	.status {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.gear {
		font-size: 18px;
		opacity: 0.7;
	}

	.ready {
		color: #4cd964;
		font-size: 16px;
	}

	.unit {
		font-size: 24px;
		opacity: 0.7;
		margin-left: 15px;
	}

	.battery {
		display: flex;
		align-items: center;
	}

	.battery-icon {
		font-size: 24px;
		margin-right: 10px;
	}

	.battery-range {
		font-size: 20px;
	}

	.top-right {
		display: flex;
		align-items: center;
	}

	.wifi-icon,
	.temperature,
	.time {
		font-size: 18px;
		margin-left: 15px;
	}

	.menu-bar {
		display: flex;
		justify-content: space-around;
		margin-bottom: 30px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 15px;
	}

	.menu-item {
		padding: 10px 20px;
		font-size: 18px;
		cursor: pointer;
	}

	.menu-item.active {
		color: #007aff;
		border-bottom: 2px solid #007aff;
	}

	.main-display {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30px;
	}

	.left-panel,
	.right-panel {
		width: 48%;
	}

	.speed-control {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30px;
	}

	.speed-adjust {
		font-size: 36px;
		cursor: pointer;
		opacity: 0.7;
	}

	.speed-limit {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 2px solid #ff3b30;
		border-radius: 50%;
		width: 100px;
		height: 100px;
		margin: 0 30px;
	}

	.limit {
		font-size: 36px;
		font-weight: bold;
		color: #ff3b30;
	}

	.max {
		font-size: 16px;
		color: #ff3b30;
	}

	.car-view {
		width: 100%;
		height: 200px;
	}

	.car-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.car-details {
		display: flex;
		flex-direction: column;
	}

	.car-model {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.car-consumption {
		font-size: 18px;
		opacity: 0.7;
	}

	.car-image {
		width: 200px;
		height: 100px;
	}

	.control-buttons {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15px;
		margin-bottom: 30px;
	}

	.control-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		padding: 15px;
		border-radius: 10px;
		cursor: pointer;
	}

	.btn-icon {
		font-size: 24px;
		margin-bottom: 5px;
	}

	.btn-text {
		font-size: 14px;
	}

	.mode-settings {
		display: flex;
		flex-direction: column;
	}

	.setting-group {
		margin-bottom: 20px;
	}

	.setting-title {
		font-size: 18px;
		margin-bottom: 10px;
	}

	.mode-buttons {
		display: flex;
		gap: 10px;
	}

	.mode-btn {
		background-color: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		padding: 10px 15px;
		border-radius: 20px;
		font-size: 14px;
		cursor: pointer;
	}

	.mode-btn.active {
		background-color: #007aff;
	}

	.climate-control {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.05);
		padding: 20px;
		border-radius: 15px;
	}

	.temp-slider {
		width: 30%;
	}

	.climate-buttons {
		display: flex;
		gap: 15px;
	}

	.climate-btn {
		background-color: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		padding: 10px 15px;
		border-radius: 20px;
		font-size: 16px;
		cursor: pointer;
	}

	.climate-btn.active {
		background-color: #007aff;
	}

	slider {
		width: 100%;
	}
</style>
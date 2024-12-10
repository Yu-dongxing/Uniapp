<template>
	<view class="dashboard">
		<maop @updateActiveIndex="handleActiveIndex"></maop>
		<scroll-view class="sidebar-r" scroll-y="true">
			<component :is="currentComponent"></component>
		</scroll-view>
	</view>
</template>

<script>
	import maop from '@/components/maop.vue'
	import maincar from '@/components/main_car.vue'
	import music from '@/components/music/music.vue'
	import Functional from '@/components/Functional/Functional.vue'
	import User from '@/components/User/User.vue'

	const componentsMap = {
		0: 'maincar',
		1: 'music',
		2: 'air',
		3: 'Functional',
		4: 'User'
	}

	export default {
		components: {
			maop,
			maincar,
			music,
			Functional,
			User
		},
		data() {
			return {
				tap: 0,
				currentComponent: 'maincar'
			}
		},
		methods: {
			handleActiveIndex(index) {
				this.tap = index;
				this.currentComponent = componentsMap[index];
			},
		},
		onLoad() {
			// 初始化操作
		}
	}
</script>

<style lang="less">
	* {
		padding: 0;
		margin: 0;
	}

	.dashboard {
		display: flex;
		height: 100vh;
		width: 100vw;
		background-color: #000000;
	}

	.sidebar-r {
		box-sizing: border-box;
		padding: 10px;
		border-bottom-left-radius: 10px;
		border-top-left-radius: 10px;
		margin-left: 5px;
		width: 100%;
		height: 100%;
		background-color: #535353;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow-y: auto; /* 使用标准属性 */
	}

	/* 移除未使用的样式 */
</style>
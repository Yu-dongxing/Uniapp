<template>
	<view class="dashboard">
		<maop @updateActiveIndex="handleActiveIndex"></maop>
		<view class="sildebar-r">
			<maincar v-if="tap==0"></maincar>
			<music v-if="tap==1"></music>
			<air v-if="tap==2" ></air>
		</view>
	</view>
</template>

<script>
	import maop from '@/components/maop.vue'
	import maincar from '@/components/main_car.vue'
	import music from '@/components/music/music.vue'
	export default {
		components:{
			maop ,
			maincar,
			music
			},//2.注册组件
		data() {
			return {
				tap:0,
				
			}
		},
		methods:{
			handleActiveIndex(index) {
				this.tap=index;
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="less">
	*{
		padding: 0px;
		margin: 0px;
	}
	:main{
		
	}
	.sildebar-l::-webkit-scrollbar{
		width: 5px;
	}
	.sildebar-l::-webkit-scrollbar-thumb{
		background-color: #535353;
	}
	.dashboard{
		--background-block:#2a2a2a;
		//var(--background-block)
		--font-size:40px;
		
	}
	.dashboard{
		display: flex;
		height: 100vh;
		width: 100vw;
		background-color: #000000;
	}
	.sildebar-r{
		box-sizing: border-box;
		padding: 10px;
		border-bottom-left-radius: 10px;
		border-top-left-radius: 10px;
		margin-left: 5px;
		width:100%;
		height:100%;
		background-color: #535353;
		display: flex;
		flex-direction: column;
		position: relative;
		}
</style>
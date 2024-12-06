<template>
		<view class="sildebar-l">
			<view class="l-item" v-for="(item,index) in index_item " :key="index" :class="{ 'l-item-ac': in_active === index }" @tap="index_active(index)">
				<view class="icon">
					<img :src="item.icon" :alt="item.title"/>
				</view>
			</view>
		</view>
</template>


<script>
	export default {
		name:"maop",
		data() {
			return {
				activeIndex: 0, // 假设这是当前激活的tab索引
				in_active:0,
				sundun_active:0,
				index_item:[
					{id:1,title:"首页汽车",icon:"/static/index_svg/in_car.svg"},
					//title:"音乐",icon:"/static/index_svg/in_music.svg"},title:"功能",icon:"/static/index_svg/in_monder.svg"},title:"导航",icon:"/static/index_svg/in_map.svg"},
					{id:2,title:"导航",icon:"/static/index_svg/in_map.svg"},
					{id:3,title:"功能",icon:"/static/index_svg/in_monder.svg"},
					{id:4,title:"音乐",icon:"/static/index_svg/in_music.svg"},
					{id:5,title:"设置",icon:"/static/index_svg/in_set.svg"}
				],
				
			};
		},
		methods:{
			// 为点击的元素添加active类
			go_to(path){
				uni.navigateTo({
					url:path
				});
			},
			activateTab(index) {
				// 移除之前激活的元素的active类
				this.activeIndex = index;
			},
			index_active(index){
				this.in_active = index;
				this.$emit('updateActiveIndex', this.in_active);
			},
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
		.sildebar-l{
			width:150px;
			height: 100%;
			// background-color: #2a2a2a;
			margin-right:5px;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			align-items: center;
			overflow: auto;
			.l-item-ac{
				background-color: #2a2a2a;
			}
			.l-item{
				transition: background-color 0.3s ease;
				margin-top: 5vh;
				width: 100px;
				height: 80px;
				border-radius: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				.icon{
					font-size: 50px;
					line-height: 50px;
					color: aliceblue;
				}
			}
		}
</style>
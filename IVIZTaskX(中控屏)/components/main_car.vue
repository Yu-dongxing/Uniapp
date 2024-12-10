<template>
	<view class="main_car">
		<view class="car_l">
			<view class="l_top">
				<view class="sundun">
					<text class="num" :class="data_list.sundun>=80?'num_red':' ' ">{{ data_list.sundun }}</text>
					<span class="km">KM/H</span>
				</view>
			</view>
			<view class="l_dun">
				<view class="dunwen_list">
					<view class="list_item" v-for="(item,index) in dunwen" >
						<view class="item_bu" :class="{ 'item_bu_active': index_dunwen === index }" @tap="in_dunwen(index)" @click="goto_page(item.path)">
							 <text>{{ item.name }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="car_r"></view>
	</view>
</template>

<script>
	export default {
		name:"macar",
		data() {
			return {
				tab_index:0,
				index_dunwen:0,
				dunwen:[
					{id:1,name:"P",path:''},
					{id:2,name:"R",path:"/pages/ReverCar/ReverCar"},
					{id:3,name:"N",path:""},
					{id:4,name:"D",path:""},
					{id:5,name:"READY",path:""},
				],
				in_active:0,
				sundun_active:0,
				main_car_lift:{
					power_icon:"/static/main_car_lift_icon/power.svg",
					voide_top_icon:"/static/main_car_lift_icon/voide_top.svg",
					chage_icon:"/static/main_car_lift_icon/chage.svg",
					sign_icon:"/static/main_car_lift_icon/sign.svg"
				},
				main_car_right:{
					wifi_icon:"/static/main_car_right_icon/wifi.svg",
				},
				
				data_list:{
					sundun:90,
					max_sundun:70,
					car_sundun_ch:"",
					power:"471",
					fuel:75,          // 油量
					tirePressure:32,  // 胎压
				},
				list:[
					{id:1,title:"安全辅助"},
					{id:2,title:"车内摄像"},
					{id:3,title:"显示设置"},
					{id:4,title:"WIFI"},
				]
			}
		},
		methods:{
			index_active(index){
				this.in_active = index;
			},
			in_dunwen(index){
				this.index_dunwen = index;
				// this.$emit('updatedunwen',this.index_dunwen);
			},
			f_sundun_active(){
				this.sundun_active= !this.sundun_active;
			},
			add_max_sundun(){
				this.data_list.max_sundun=this.data_list.max_sundun+1;
				if(this.data_list.max_sundun>=80){
					this.sundun_active=1;
				}
			},
			dell_max_sundun(){
				this.data_list.max_sundun=this.data_list.max_sundun-1;
				if(this.data_list.max_sundun<=80){
					this.sundun_active=0;
				}
			},
			goto_page(url){
				uni.navigateTo({
					url:url
				})
			}
		},
	}
</script>

<style lang="less">
	.main_car{
		--background--bg:#2a2a2a;
		--font-size-big:50px;
		--font-size-defint:15.5px;
		
	}
	.main_car{
		width: 100%;
		height: 100%;
		// background-color: var(--background--bg);
		display: flex;
		.car_l,.car_r{
			border-radius: 9.5px;
			width: 50%;
			height: 100%;
			background-color: var(--background--bg);
			.l_top{
				width: 100%;
				height: 80px;
				// background-color: var(--background--bg);
				display: flex;
				justify-content: center;
				align-items: center;
				.sundun{
					color: #ffffff;
					.num_red{
						color: red;
					}
					.num{
						font-size: var(--font-size-big);
						font-weight: bold;
					}
					.km{
						font-size:var(--font-size-defint);
					}
				}
			}
			.l_dun{
				width: 100%;
				height: 80px;
				// background-color: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				.dunwen_list{
					width: 100%;
					// background-color: aqua;
					display: flex;
					justify-content: space-around;
					.list_item{
						.item_bu{
							border-radius: 20px;
							width: 120px;
							height: 80px;
							// background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
							background-color: #7d7d7d;
							display: flex;
							justify-content: center;
							align-items: center;
							
							text{
								font-size:30px;
								font-weight: bold;
								color: #000000;
							}
						}
						.item_bu_active{
							background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
							text{
								
							}
						}
					}
				}
			}
		}
		.car_r{
			background-color: aqua;
			margin-left: 10px;
			width: calc(50% - 10px );
		}
	}
</style>
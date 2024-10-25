<template>
	<view>
		<view class="sildebar-r">
			<view class="main-t">
				<view class="t-car-l">
					<view class="l-mun">
						<span>{{ data_list.sundun }}</span>
					</view>
					<view class="l-mun-dun">
						<view class="dun-f">
							<span>P</span>
							<span>R</span>
							<span>N</span>
							<span>D</span>
							<span>READY</span>
						</view>
						<view class="km">
							<span>KM/H</span>
						</view>
						<view class="power">
							<view class="icon">
								<img :src="main_car_lift.power_icon" :alt="main_car_lift.power_icon" />
							</view>
							<span>{{ data_list.power }}KM</span>
						</view>
					</view>
					<view class="l-hr"></view>
					<view class="l-sudu">
						<view class="sudu-a">
							<button @click="dell_max_sundun()">-</button>
						</view>
						<view class="sudu-warn" :class="sundun_active ? 'sudu-warn-red' : 'sudu-warn-ok'">
							<span>{{ data_list.max_sundun }}</span>
							<view class="sudu-max">
								<span>MAX</span>
							</view>
						</view>
						<view class="sudu-b">
							<button @click="add_max_sundun()">+</button>
						</view>
					</view>
					<view class="l-car-action">
						<view class="l-l"></view>
						<view class="car"></view>
						<view class="l-r"></view>
					</view>
					<view class="l-bu">
						<!-- <view class="bu-item"> -->
							<view class="item-a1">
									<img :src="main_car_lift.voide_top_icon" alt="1" />
							</view>
							<view class="item-a2">
								<img :src="main_car_lift.chage_icon" alt="1" />
							</view>
							<view class="item-a3">
								<img :src="main_car_lift.sign_icon" alt="1" />
							</view>
						<!-- </view> -->
					</view>
				</view>
				<view class="t-car-r">
					<view class="r-wifi-show">
						<view class="wifi">
							<img :src="main_car_right.wifi_icon" alt="1" />
						</view>
						<view class="timp">
							<span>24</span>
							<span>℃</span>
						</view>
						<view class="time">
							<span>19:35</span>
						</view>
					</view>
					<view class="r-tab">
						<view class="tab-item">
							<view class="item" v-for="(item,index) in list" :key="index" :class="{ 'item_active': activeIndex === index }" @tap="activateTab(index)">
								<view class="title">
									<text>{{ item.title }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="r-car"></view>
					<view class="r-set"></view>
				</view>
			</view>
			<view class="main-b ">
				<view class="b-wd"></view>
				<view class="b-bu"></view>
				<view class="b-wd"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				in_active:0,
				sundun_active:0,
				// isDisabled:0,
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
					sundun:70,
					max_sundun:70,
					car_sundun_ch:"",
					power:"471",
					
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
				
			}
		}
	}
</script>

<style lang="less">
.sildebar-r{
	box-sizing: border-box;
	padding: 10px;
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;
	margin-left: 5px;
	width:100%;
	height:100%;
	background-color: var(--background-block);
	display: flex;
	flex-direction: column;
	position: relative;
	.main-t{
		--main-t-height:
		width: 100%;
		height: calc(100% - 100px);//.main-b
		display: flex;
		// background-color: aliceblue;
		.t-car-l{
			width: 40%;
			height: 100%;
			// background-color: aliceblue;
			.l-mun{
				width: 100%;
				height: 80px;
				background-color:var(--background-block);
				display: flex;
				justify-content: center;
				align-items: center;
				span{
					color: #ffffff;
					font-size: 45px;
				}
			}
			.l-mun-dun{
				width: 100%;
				height: 40px;
				background-color: var(--background-block);
				display: flex;
				justify-content: space-between;
				align-items: center;
				.dun-f{
					span{
						margin-left: 5px;
						color: #ffffff;
					}
				}
				.km{
					margin-left: -15px;
					color: #ffffff;
				}
				.power{
					color: #ffffff;
					display: flex;
					justify-content: space-between;
					align-items: center;
					line-height: 10px;
					margin-right: 5px;
					.icon{
					}
					span{
						margin-left: 5px;
					}
				}
				
			}
			.l-hr{
				// margin-left: 5%;
				width: 100%;
				height: 0px;
				border: 1px solid #ffffff;
			}
			.l-sudu{
				width: 100%;
				height: 80px;
				background-color:var(--background-block);
				display: flex;
				justify-content: center;
				align-items: center;
				.sudu-a{
					button{
						color: #ffffff;
						font-size: 50px;
						line-height: 30px;
						background-color: #2a2a2a;
					}
				}
				.sudu-warn-red{
					--back-color:#ff0000;//#42ff38
				}
				.sudu-warn-ok{
					--back-color:#42ff38;//#42ff38
				}
				.sudu-warn{
					// --back-color:#42ff38;//#42ff38
					width: 70px;
					height: 70px;
					border-radius: 60px;
					border: 5px solid var(--back-color);
					// background-color: #ffffff;
					margin-left: 30px;
					margin-right: 25px;
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0px 0px 5px 1px var(--back-color);
					position: relative;
					span{
						color: #ffffff;
						font-size: 40px;
					}
					.sudu-max{
						top: 70px;
						position: absolute;
						span{
							font-size: 20px;
						}
					}
				}
				.sudu-b{
					button{
						color: #ffffff;
						font-size: 50px;
						line-height: 30px;
						background-color: #2a2a2a;
					}
				}
			}
			.l-car-action{
				width: 100%;
				height: 450px;
				//calc(100% - 21px);
				// background-color: var(--background-block);
				// background-color: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				.l-l,.l-r{
					width: 1px;
					height: 100%;
					// background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 89, 255, 0.7) 100%, rgba(5, 5, 5, 1) 100%);
					background-color: #ffffff;
					transform: skew(-10deg, 0deg);
				}
				.car{
					margin: 0 35px 0 35px;
					width: 400px;
					height: 100%;
					background-color: #000000;
				}
				.l-r{
					transform: skew(10deg, 0deg);
				}
			}
			.l-bu{
				width: 100%;
				height: calc(100% - 650px);//t-car-l
				// background-color: var(--background-block);
				// background-color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				// .bu-item{
					.item-a1,.item-a2,.item-a3{
						// margin: 0 20px 0 20px ;
						width: 100px;
						height: 100px;
						// background-color: #000000;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.item-a2{}
					.item-a3{}
				// }
			}
		}
		.t-car-r{
			--r-wifi-show-hight:80px;
			--r-tab-hight:80px;
			--r-car-hight:600px;
			--r-set-hight:calc(100% - ( var(--r-wifi-show-hight) +  var(--r-tab-hight) + var(--r-car-hight) ));
			width: 60%;
			height: 100%;
			// background-color:#00530c;
			.r-wifi-show{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				width: 100%;
				height: 80px;
				// background-color: #000000;
				.wifi,.timp,.time{
					margin: 0 20px 0 20px;
				}
				.timp,.time{
					span{
						color: #ffffff;
						font-size: 40px;
					}
				}
				.time{
					
				}
			}
			.r-tab{
				width: 100%;
				height: var(--r-tab-hight);//80
				// background-color: #ffffff;
				.tab-item{
					display: flex;
					justify-content: space-around;
					align-content: center;
					align-items: center;
					.item{
						margin: 0 5px 0 5px;
						// background-color: #ff0000;
						width: 200px;
						height: var(--r-tab-hight);
						display: flex;
						justify-content: center;
						align-items: center;
						
						.title{
							transition: font-size 0.3s ease-in-out; /* 添加动画 */
							
							font-size: calc(var(--font-size) - 5px ) ;
							color: #747474;
						}
					}
					.item_active{
						transition: border-bottom-color 0.3s ease-in-out;
						border-bottom-width: 1px;
						border-bottom-style: solid;
						border-bottom-color: rgb(0, 157, 255);
						.title{
							font-size: var(--font-size);
							color: #ffffff;
						}
					}
				}
			}
			.r-car{
				width: 100%;
				height: var(--r-car-hight);//600
				// background-color: #ffffff;
				display: flex;
				.car-lift-bu{
					
				}
				.car-main{}
				.car-right-bu{}
			}
			.r-set{
				width: 100%;
				height: var(--r-set-hight);//
				// background-color: #ffffff;
			}
		}
	}
	.main-b{
		width: 100%;
		height: 100px;
		// display: block;
		background-color: #4d4d4d;
		border-radius: 20px;
		position: relative;
		.b-wd{}
		.b-bu{}
		.b-wd{}
	}
	.main-b::before {
	  content: "";
	  display: block;
	  position: absolute;
	  top: -24px;
	  left: calc(50% - 100px);
	  width: 200px;
	  height: 25px;
	  border-top-right-radius: 25px;
	  border-top-left-radius: 25px;
	  background-color: #4d4d4d;
	}
}
</style>
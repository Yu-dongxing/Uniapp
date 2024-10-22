<template>
	<view class="dashboard">
		<view class="sildebar-l">
			<view class="l-item" v-for="(item,index) in index_item " :key="index">
				<view class="icon">
					<img :src="item.icon" :alt="item.title"/>
				</view>
			</view>
		</view>
		<view class="sildebar-r">
			<view class="main-t">
				<view class="t-car-l">
					<view class="l-mun">
						<span>69</span>
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
								<svg t="1728826975947" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7193" data-spm-anchor-id="a313x.search_index.0.i17.17343a81diCCci" width="48" height="48"><path d="M1024 576v64h-64a192 192 0 0 1-192 192H192a192 192 0 0 1-192-192V384a192 192 0 0 1 192-192h576a192 192 0 0 1 192 192h64v192z m-192-192a64 64 0 0 0-64-64H192a64 64 0 0 0-64 64v256c0 35.392 28.608 64 64 64h576c35.392 0 64-28.608 64-64V384z m-384 0h64v256h-64V384z m-128 0h64v256h-64V384z m-128 0h64v256H192V384z" p-id="7194" data-spm-anchor-id="a313x.search_index.0.i18.17343a81diCCci" class="selected" fill="#1afa29"></path></svg>
							</view>
							<span>475KM</span>
						</view>
					</view>
					<view class="l-hr"></view>
					<view class="l-sudu">
						<view class="sudu-a">
							<button>-</button>
						</view>
						<view class="sudu-warn">
							<span>80</span>
							<view class="sudu-max">
								<span>MAX</span>
							</view>
						</view>
						<view class="sudu-b">
							<button>+</button>
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
									<svg t="1729064665240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15601" data-spm-anchor-id="a313x.search_index.0.i1.7fa33a814TiJdn" width="48" height="48"><path d="M896 448c0-212-172-384-384-384S128 236 128 448c0 192.8 142.4 352.8 328 380l-4 68H256v64h512v-64H573.6l-4-68C754.4 800 896 640.8 896 448zM512 768c-176.8 0-320-143.2-320-320s143.2-320 320-320 320 143.2 320 320-143.2 320-320 320z m0-560c-132.8 0-240 107.2-240 240s107.2 240 240 240 240-107.2 240-240-107.2-240-240-240zM416 512c-52.8 0-96-43.2-96-96s43.2-96 96-96 96 43.2 96 96-43.2 96-96 96z" p-id="15602" data-spm-anchor-id="a313x.search_index.0.i0.7fa33a814TiJdn" class="selected" fill="#ffffff"></path></svg>
							</view>
							<view class="item-a2">
								<svg t="1729064980958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17174" width="48" height="48"><path d="M209 540.3h228.9l-25.3 331.1c-2.7 35.3 42.1 52.1 62.6 23.4C580.7 747.7 764.7 491 764.7 491c16.6-23.2 0.2-55.7-28.1-55.7l-228.9-0.1L533 104.1c2.7-35.3-42.1-52-62.7-23.3L180.9 484.6c-16.6 23.2-0.3 55.7 28.1 55.7z" fill="#ffffff" p-id="17175" data-spm-anchor-id="a313x.search_index.0.i8.7fa33a814TiJdn" class="selected"></path></svg>
							</view>
							<view class="item-a3">
								<svg t="1729065043542" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18361" width="48" height="48"><path d="M507.52 673.6h23.68c85.12 0 154.24-65.92 154.24-147.2V198.08c0-81.28-69.12-147.2-154.24-147.2h-23.68c-85.12 0-154.24 65.92-154.24 147.2v328.32c0 81.28 69.12 147.2 154.24 147.2z" fill="#ffffff" p-id="18362" data-spm-anchor-id="a313x.search_index.0.i13.7fa33a814TiJdn" class="selected"></path><path d="M845.76 487.68a40.32 40.32 0 0 0-47.04 32c-28.48 151.68-145.92 261.76-279.04 261.76-134.08 0-251.84-111.04-279.68-264-3.84-21.76-24.96-36.16-46.72-32.32-21.76 4.16-36.48 24.96-32.32 46.72 32 175.68 161.92 307.2 317.12 327.36v118.4c0 5.76 4.48 9.92 9.92 9.92h63.04c5.76 0 9.92-4.48 9.92-9.92v-118.4c154.24-19.84 284.48-150.4 317.12-324.48 3.84-21.76-10.56-42.88-32.32-47.04z" fill="#ffffff" p-id="18363" data-spm-anchor-id="a313x.search_index.0.i14.7fa33a814TiJdn" class="selected"></path></svg>
							</view>
						<!-- </view> -->
					</view>
				</view>
				<view class="t-car-r">
					<view class="r-wifi-show">
						<view class="wifi">
							<svg t="1729065612265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19545" width="48" height="48"><path d="M0 352.832l93.12 98.752c231.296-245.44 606.464-245.44 837.76 0L1024 352.832C741.44 53.056 283.008 53.056 0 352.832z m372.352 395.008L512 896l139.648-148.16c-76.8-81.92-202.048-81.92-279.296 0zM186.24 550.4l93.12 98.752c128.448-136.32 336.96-136.32 465.408 0L837.824 550.4c-179.648-190.592-471.488-190.592-651.648 0z" fill="#ffffff" p-id="19546" data-spm-anchor-id="a313x.search_index.0.i19.7fa33a814TiJdn" class="selected"></path></svg>
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
				activeIndex: 0, // 假设这是当前激活的tab索引
				in_active:0,
				index_item:[
					{id:1,title:"首页汽车",icon:"/static/index_svg/in_car.svg"},
					{id:2,title:"导航",icon:"/static/index_svg/in_map.svg"},
					{id:3,title:"功能",icon:"/static/index_svg/in_monder.svg"},
					{id:4,title:"音乐",icon:"/static/index_svg/in_music.svg"},
					{id:5,title:"设置",icon:"/static/index_svg/in_set.svg"}
				],
				list:[
					{id:1,title:"安全辅助"},
					{id:2,title:"车内摄像"},
					{id:3,title:"显示设置"},
					{id:4,title:"WIFI"},
				]
			}
		},
		methods:{
			// 为点击的元素添加active类
			activateTab(index) {
				// 移除之前激活的元素的active类
				this.activeIndex = index;
			}
		}
	}
</script>

<style scoped lang="less">
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
			.l-item{
				margin-top: 5vh;
				width: 100px;
				height: 80px;
				// background-color: #2a2a2a;
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
						.sudu-warn{
							width: 60px;
							height: 60px;
							border-radius: 60px;
							border: 5px solid #ff0000;
							// background-color: #ffffff;
							margin-left: 30px;
							margin-right: 25px;
							display: flex;
							justify-content: center;
							align-items: center;
							box-shadow: 0px 0px 5px 1px #ff0000;
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
	}
</style>
<template>
	<view class="Launcher">
		<view class="cher-main" title="中控屏主页">
			<!-- 汽车信息卡片，展示行驶距离、出行次数、车内外温度等信息，点击卡片唤起车辆信息App。   -->
			<view class="main-lift" title="中控屏左边卡片">
				<view class="lift-item">
					<view class="item-info">
						<text class="info-name">行驶距离</text>
						<text class="info-view">100KM/H</text>
					</view>
					<view class="item-info">
						<text class="info-name">出行次数</text>
						<text class="info-view">6</text>
					</view>
					<view class="item-info">
						<text class="info-name">车内温度</text>
						<text class="info-view">25</text>
					</view>
					<view class="item-info">
						<text class="info-name">车外温度</text>
						<text class="info-view">12</text>
					</view>
				</view>
			</view>
			<view class="main-right">
				<!-- 时间卡片，展示当前时间、年月日、阴历。   -->
				<view class="right-time">
					
					<view class="year">
						<text>2024-12-18</text>
					</view>
					<view class="time">
						<text>{{ newtime }}</text>
					</view>
					<view class="rl">
						<text>阴历</text>
					</view>
				</view>
				<view class="right-mu-wr">
					<!-- 天气卡片，展示当前温度和天气情况和所在城市，点击天气卡片，在右侧显示具体天气情况。   -->
					<view class="wr">
						<view class="wr-top">
							<text class="city">合肥</text>
							<text class="updatetime">00:33更新</text>
						</view>
						<view class="wr-main">
							<view class="mian-wandun">
								<text class="c">31
								 <text>℃</text>
								</text>
							</view>
						</view>
					</view>
					<!-- 音视频卡片，显示正在播放的音视频名称，专辑封面，底部显示，【上一首】【暂停】【下一首】图标，点击对应图标完成操作。点击专辑封面打开音视频App。   -->
					<view class="music">
						<!-- 音乐名称 -->
						<view class="music-name">
							<text>音视频名称</text>
						</view>
						<!-- 音乐封面 -->
						<view class="music-main">
							<view class="main-img"></view>
						</view>
						<!-- 音乐操作 -->
						<view class="music-operate">
							<view class="music-bu">
								<view class="bu-up">
									<img src="/static/music/up.svg" alt="" />
								</view>
								<view class="bu-stop" >
									<img src="/static/music/stop.svg" alt="" />
								</view>
								<view class="bu-down">
									<img src="/static/music/down.svg" alt="" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 屏幕底部显示快捷启动栏 -->
		<view class="cher-footer">
			<view class="footer-item">
				<view class="item-app" v-for="(item,index) in AppMack" @longpress="showMenu" @click="goto_page(item.apppath)">
					<image src="../../static/Appmack/APPC.svg"  mode="aspectFit" style="width: 48px; height: 48px;">
					</image>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import videoplay from '../../components/videoplay/videoplay.vue'
	export default {
		components:{
			videoplay
		},
		data() {
			return {
				newtime:new Date().getHours()+":"+new Date().getMinutes(),
				timeout:null,
				weather:{
					id:"",
					city:'',
					udatetime:'',
					wandun:"",
				},
				voide_music:[
					{
						id:'',
						name:'',
						img:'',
						time:'',
					},
				],
				carInfo:{
					
				},
				timeDate:{
					Date:'',
					
				},
				AppMack:[
					{id:"1",appname:"",appicon:"",apppath:"/pages/video/video",appnavergotourl:""},
					{id:"2",appname:"",appicon:"",apppath:"/pages/main/main",appnavergotourl:""}
				],
				AppList:[
					
				]
				
			}
		},
		methods: {
			get_weather(area){
				uni.request({
					url:'http://124.93.196.45:10001/dev-api/bs-weather-report/weather/getCurrentDayData/'+area,
					method:'GET',
					header:{
						'Authorization':uni.getStorageSync('token')
					}
				}).then(success=>{
					if (success.data.code != 200) {
						uni.showModal({
							title:"操作失败",
							content:success.data.msg,
							success: (res) => {
								if (res.confirm) {
									
								} else{
									
								}
							}
						})
						
					} else{
						
					}
					// console.log(success);
				}).catch(err=>{
					// console.log(err);
				})
			},
			showMenu(event) {
				console.log(event);
			},
			goto_page(path){
				uni.navigateTo({
					url:path
				})
			}
		},
		onLoad() {
			this.get_weather("大连市");
			setInterval(() => {
			      this.newtime=new Date().getHours()+":"+new Date().getMinutes(); // 每秒更新一次currentTime变量的值
			}, 1000)
		}
	}
</script>

<style lang="less" scoped>
.Launcher {
--primary-100:#1F3A5F;
--primary-200:#4d648d;
--primary-300:#acc2ef;
--accent-100:#3D5A80;
--accent-200:#cee8ff;
--text-100:#FFFFFF;
--text-200:#e0e0e0;
--bg-100:#0F1C2E;
--bg-200:#1f2b3e;
// --bg-300:#374357;
//
--border-radius-10:10px;
--border-radius-20:20px;
//
--padding-10: 10px;
--padding-20: 20px;
//
--height-80:80px;
--height-100:100px;
//
--font-size-30: 30px;
--font-size-40: 40px;
--font-size-50: 50px;
--font-size-80: 80px;
//
--transition-all-01s-ease: all 0.1s ease;
--transition-all-1s-ease: all 1s ease;
--transition-all-3s-ease: all 3s ease;
	width: 100vw;
	height: 100vh;
	background-color:var(--bg-100);
  .cher-main {
--height-main:90vh;
--wight-main:100vw;
    height: 90vh;
	width: 100vw;
	box-sizing: border-box;
	padding: 10px;
	display: flex;
    .main-lift {
	  width: calc(40vw - 10px);
	  height: calc(90vh - 20px);
	  border-radius: 20px;
	  background-color: var(--bg-200);
	  padding: 10px;
	  box-sizing: border-box;
	  .lift-item{
		  width: 100%;
		  height: auto;
		  background-color: var(--bg-300);
		  border-radius: 20px;
		  padding: 10px;
		  box-sizing: border-box;
		  .item-info{
			  width: 100%;
			  height: 50px;
			  // background-color: var(--bg-100);
			  display: flex;
			  align-items: center;
			  justify-content: space-between;
			  color: var(--text-100);
			  padding: 10px;
			  box-sizing: border-box;
			  font-size: 30px;
			  // border-radius: 15px;
			  margin-top: 10px;
			  margin-bottom: 20px;
			  border-bottom: 1px solid var(--text-100);
			  .info-name{
				  
			  }
			  .info-view{
				  margin-right: 10px;
				  color: var(--text-200);
			  }
		  }
	  }
    }

    .main-right {
		width: calc(60vw - 10px);
		height: calc(90vh - 20px);
		box-sizing: border-box;
		margin-left: 10px;
      .right-time {
        height: 100px;
		width: 100%;
		border-radius: 20px;
		background-color: var(--bg-200);
		box-sizing: border-box;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		
		.time,.year,.rl{
			width: 33%;
			height: 80px;
			border-radius: 20px;
			background-color: var(--bg-300);
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				font-size: 80px;
				font-weight: bold;
				color: var(--text-100);
			}
		}
		.time {
			text{
				font-size: 80px;
				font-weight: bold;
			}
		}
		.year{
			text{
				font-size: 30px;
			}
			
		}
		.rl{
			text{
				font-size: 30px;
			}
		}
		
      }

      .right-mu-wr {
		  margin-top: 10px;
		  height: calc(100% - 110px);
		  width: 100%;
		  display: flex;
        .wr {
			  width: calc(50% - 10px );
			  height: 100%;
			  border-radius: 20px;
			  background-color: var(--bg-200);
			  box-sizing: border-box;
			  padding: 10px;
			  .wr-top,.wr-main{
				  width: 100%;
				  background-color: var(--bg-300);
				  border-radius: 20px;
				  padding: 10px;
				  box-sizing: border-box;
				  text{
					  font-size: 40px;
					  font-weight: bold;
					  color: var(--text-100);
				  }
			  }
			  .wr-top{
				 height: 80px;
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
				 .city{
					 
				 }
				 .updatetime{
					 font-size: 20px;
					 color: var(--text-200);
				 }
			  }
			  .wr-main{
				  margin-top: 10px;
				  height: calc(100% - 90px);
				  
				  .mian-wandun{
					  width: 100%;
					  height: 40%;
					  min-height: 80px;
					  background-color: var(--primary-200);
					  box-sizing: border-box;
					  padding: var(--padding-10);
					  border-radius: 20px;
					  display: flex;
					  //justify-content: space-between;
					  justify-content: center;
					  align-items: center;
					  background-image: url(/static/weater/weater01.svg);
					  background-size:  cover; /* 铺满整个容器 */
					  background-position: center; /* 可选，将图片居中显示 */
					  .c{
						  font-size: 80px;
					  }
					  .cc{
						  
					  }
				  }
			  }
        }

        .music {
			margin-left: 10px;
			width: 50%;
			height: 100%;
			border-radius: 20px;
			background-color: var(--bg-200);
			padding: var(--padding-10);
			box-sizing: border-box;
			
			.music-name,.music-main,.music-operate{
				width: 100%;
				background-color: var(--bg-300);
				border-radius: 10px;
				margin-bottom: 10px;
			}
			.music-name{
				height: 80px;
				padding: var(--padding-10);
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				text{
					color: var(--text-100);
					font-size: var(--font-size-30);
				}
			}
			.music-main{
				height: calc(100% - 250px);
				padding: var(--padding-10);
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				.main-img{
					width: 70%;
					height: 70%;
					background-color: var(--primary-100);
					border-radius: var(--border-radius-10);
					img{
						width: 10px;
						height: 10px;
					}
				}
			}
			.music-operate{
				height: 150px;
				padding: var(--padding-10);
				box-sizing: border-box;
				.music-bu{
					width: 100%;
					height: 100%;
					background-color: var(--primary-100);
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					border-radius: var(--border-radius-10);
					.bu-down,.bu-stop,.bu-up{
						transition: all 0.1s ease;
						width: 50px;
						height: 50px;
						// background-color: var(--primary-300);
						display: flex;
						justify-content: center;
						align-items: center;
						img{
							width: 50px;
							height: 50px;
						}
					}
					.bu-down:hover,.bu-stop:hover,.bu-up:hover{
						background-color: var(--primary-200);
						border-radius: var(--border-radius-10);
					}
					.bu-up{
						
					}
					.bu-stop{}
					.bu-down{}
				}
			}
        }
      }
    }
  }

  .cher-footer {
    height: 8vh;
	margin-bottom: 1.5vh;
	margin-top: 0.5vh;
	width: 99vw;
	margin-left: 0.5vw;
	// box-sizing: border-box;
	// padding: 10px;
	display: flex;
	// background-color: var(--bg-200);
	border-radius: var(--border-radius-20);
    .footer-item {
		width: 60%;
		margin-left: 20%;
		background-color: var(--bg-200);
		height: 100%;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: space-around;
      .item-app {
        // 添加 app 图标区域的具体样式
		width: 48px;
		height: 48px;
		border-radius: var(--border-radius-10);
		transition:var(--transition-all-01s-ease);
      }
	  .item-app:hover{
		  background-color: var(--bg-300);
	  }
	  
    }
  }
}
</style>

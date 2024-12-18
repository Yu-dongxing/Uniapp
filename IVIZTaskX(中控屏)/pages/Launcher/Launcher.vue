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
						<text>15:40</text>
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
								<!-- <text class="cc">℃</text> -->
							</view>
						</view>
					</view>
					<!-- 音视频卡片，显示正在播放的音视频名称，专辑封面，底部显示，【上一首】【暂停】【下一首】图标，点击对应图标完成操作。点击专辑封面打开音视频App。   -->
					<view class="mu"></view>
				</view>
			</view>
		</view>
		<!-- 屏幕底部显示快捷启动栏 -->
		<view class="cher-footer">
			<view class="footer-item">
				<view class="item-app"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
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
--bg-300:#374357;
	width: 100vw;
	height: 100vh;
	background-color:var(--bg-100);
  .cher-main {
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
			  border-radius: 15px;
			  margin-top: 10px;
			  margin-bottom: 20px;
			  border-bottom: 1px solid;
			  .info-name{
				  
			  }
			  .info-view{
				  margin-right: 10px;
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
					  padding: 10px;
					  border-radius: 20px;
					  display: flex;
					  // justify-content: space-between;
					  justify-content: center;
					  align-items: center;
					  .c{
						  font-size: 80px;
					  }
					  .cc{}
				  }
			  }
        }

        .mu {
			margin-left: 10px;
			width: 50%;
			height: 100%;
			border-radius: 20px;
			background-color: var(--bg-200);
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
	
	box-sizing: border-box;
	padding: 10px;
	display: flex;
	background-color: var(--bg-200);
	border-radius: 200px;
    .footer-item {
		
      .item-app {
        // 添加 app 图标区域的具体样式
      }
    }
  }
}
</style>

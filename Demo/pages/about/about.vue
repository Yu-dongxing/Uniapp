<template>
	<view class="About">
		<view class="About_user">
			<view class="user">
				<view class="user_img">
					<img src="/static/userimg/头像.png" alt="" style="width: 50px; height: 50px;"/>
				</view>
				<view class="user_login">
					<span style="font-weight: 800;">
						<navigator :url=navigator_url open-type="navigate">{{lonig_text}}</navigator>
						</span>
				</view>
			</view>
		</view>
		<view class="About_b">
			<view class="b_a">
				<span style="">设置</span>
			</view>
			<view class="b_b">
				<view class="b_l">
					<view class="l_img">
						<img src="/static/userimg/账号设置.png" alt="" style="width: 50px;height: 50px;" />
					</view>
					<view class="l_name">
						<span style="color: rgba(145, 145, 145, 1.0);">账号设置</span>
					</view>
				</view>
			</view>
		</view>
		<view class="About_b">
			<view class="b_a">
				<span style="">关于</span>
			</view>
			<view class="b_b">
				<view class="b_l">
					<view class="l_img">
						<img src="/static/userimg/系统开发.png" alt="" style="width: 50px;height: 50px;" />
					</view>
					<view class="l_name">
						<span style="color: rgba(145, 145, 145, 1.0);">版本号</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:uni.getStorageSync('token'),
				lonig_text:"登录/注册",
				navigator_url:"/pages/Long/Long"
			};
		},
		methods:{
			// get_user(){
			//   uni.request({
			// 	url: 'http://124.93.196.45:10001/dev-api/getInfo',
			// 	method: 'GET',
			// 	header: {
			// 	  'Content-Type': 'application/json',
			// 	  'Authorization': this.header_token
			// 	},
			// 	success: (res) => {
			// 	  console.log(res.data);
			// 	  if (res.data.code === 200) {
			// 		  this.lonig_text=res.data.user.userName
			// 	  } else {
			// 	  }
			// 	},
			// 	fail: (err) => {
			// 	  console.error('请求失败:', err);
			// 	  uni.showToast({
			// 		title: '请求失败',
			// 		icon: 'none',
			// 		duration: 2000
			// 	  });
			// 	}
			//   });
			// },
			get_re_user(){
				this.$request("/dev-api/getInfo","GET").then(res=>{
					console.log(res);
					if (res.code === 200) {
					   this.lonig_text=res.user.userName
					} else {
						
					}
				}).catch(err=>{
					console.log(err);
					uni.showToast({
						title: '请求失败',
						icon: 'none',
						duration: 2000
					});
				})
			}
		},
		onLoad() {
		  if (this.token) {
		    // 如果 token 存在，则执行相应的函数
		    this.get_re_user();
			this.navigator_url="/pages/user/user"
		  }else{
			  this.navigator_url="/pages/Long/Long"
		  }
		},
		
	}
</script>

<style lang="less" scoped>
.About{
	margin-top: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
	.About_user,.About_b{
		width: 670rpx;
		padding: 10px;
		border-radius: 10px;
		margin-bottom: 10px;
	}
	.About_user{
		height: auto;
		background-color: rgba(171, 170, 132, 1.0);
		.user{
			height: 60px;
			// background-color: aliceblue;
			display: flex;
			align-items: center;
			.user_img{
				
			}
			.user_login{
				margin-left: 10px;
				span{
					height: 60px;
					line-height: 60px;
				}
			}
		}
	}
	
	.About_b{
		// margin-top: 10px;
		margin-bottom: 10px;
		height: auto;
		background-color: rgba(255,255,255,1);
		box-shadow: 0 0 10px 2px  rgba(226, 226, 226, 1.0);
		.b_a{
			height: 30px;
		}
		.b_b{
		/* height: 80px; */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
			.b_l{
				width: 70px;
				height: 80px;
				// background-color: aliceblue;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
			}
		}
	}
}
</style>

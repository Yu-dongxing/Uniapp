<template>
	<view class="User_Control">
		<view class="Control_top">
			<h1 style="color: aliceblue;">用户中心</h1>
		</view>
		<view class="Control_main">
			<login v-if="!this.$store.state.isAuthLogin"></login>
			<view class="main_user" v-if="this.$store.state.isAuthLogin">
				<view class="user_info">
					<view class="user_name">
						<text>{{ user_info.user_name }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import store from '../../store';
	import login from '../login/login.vue';
	export default {
		name:"User",
		components:{
			login,
		},
		data(){
			return {
				islogin:false,
				user_info:{
					user_name:"",
					user_email:"",
					user_login_time:'',
				},
			};
		},
		methods:{
			get_user_info(){
				if(this.$store.state.isAuthLogin){
					console.log(this.$store.state.isAuthLogin);
					this.$request("/dev-api/getInfo",'GET').then(res=>{
						this.user_info.user_name=res.user.userName;
						console.log(res.user.userId);
						uni.setStorageSync('userid', res.user.userId );
					}).catch(err=>{
						console.log(err);
					})
				}else{
					
				}
			},
			
		},
		created(){
			// this.check_get_istoken();
			
			this.get_user_info();
		},
		onLoad(){
			this.get_user_info();
			
		}
	}

</script>

<style lang="less" scoped>
.User_Control{
	--background-de:#2a2a2a;
	--top--height:100rpx;
	--border-radius:10px;
	--font-size-de:30px;
	width: 100%;
	height: 100%;
	.Control_top{
		width: 100%;
		height: var(--top--height);
		background-color:var(--background-de);
		border-radius: var(--border-radius);
		h1{
			margin-left: 10px;
		}
	}
	.Control_main{
		margin-top: 10px;
		width: 100%;
		height: calc(100% - var(--top--height) - 10px);
		background-color:var(--background-de);
		border-radius: var(--border-radius);
		.main_user{
			width: 100%;
			height: 500rpx;
			.user_info{
				width: 50%;
				height: 100%;
				box-sizing: border-box;
				padding: 10px;
				.user_name{
					width: 250px;
					height: 80px;
					background: #667db6;
					background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);  
					background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6); 
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius:var(--border-radius);
					text{
						font-size:var(--font-size-de);
						color: aliceblue;
					}
				}
			}
		}
	}
}
</style>
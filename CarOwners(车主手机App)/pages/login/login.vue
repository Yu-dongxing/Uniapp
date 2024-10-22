<template>
	<view class="MAIN">
		<view class="LOGIN">
			<view class="Title">
				<text>登录</text>
			</view>
			<view class="login-container">
				<form>
					<view class="input-group">
						<input
							type="text" 
							v-model="username" 
							placeholder="用户名" 
							class="input"
							/>
					</view>
					<view class="input-group">
						<input 
							type="password"
							v-model="password" 
							placeholder="密码" 
							class="input"
							/>
					</view>
					<button 
						form-type="submit" 
						type="primary" 
						@click="handleSubmit"
						>
						登录
					</button>
					<text>
						{{ ttext }}
					</text>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				ttext:''
			};
		},
		methods:{
			handleSubmit(){
				console.log(this.username,this.password);
				this.$login(this.username,this.password).then(res=>{
					console.log(res);
					this.ttext=res;
				}).catch(err=>{
					console.log(err);
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.MAIN{
		display: flex;
		flex-direction: column;
		align-items: center;
		.LOGIN{
			margin-top: 10px;
			margin-bottom: 10px;
			width: 700rpx;
			height: auto;
			padding: 5px;
			border-radius: 10px;
			box-shadow: 0 0 5px 1px #ccc;
			.Title {
			  font-size: 24px;
			  font-weight: bold;
			  // text-align: center;
			  margin-bottom: 20px;
			}
			.login-container {
			  .input-group {
			    margin-bottom: 15px;
				input {
				  padding: 10px;
				  border: 1px solid #ccc;
				  border-radius: 5px;
				}
			  }
			  .switch-mode{
				  color:#0011ff;
			  }
			  .verification-code{
				  display: flex;
				  justify-content: space-between;
				  .btn-verification{
					  width: 40%;
				  }
			  }
			}
		}
	}

</style>
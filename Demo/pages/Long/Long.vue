<template>
	<view class="MAIN">
		<view class="LOGIN">
			<view class="Title">
				<text>{{ isLogin ? '登录':'注册' }}</text>
			</view>
			<view class="login-container">
				<form @submit="handleSubmit">
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
				  <view class="input-group" v-if="!isLogin" >
				    <input
				      type="password" 
				      v-model="confirmPassword" 
				      placeholder="确认密码" 
				      class="input"
				    />
				  </view>
<!-- 				  <view class="input-group verification-code" v-if="!isLogin">
				    <input 
				      type="text" 
				      v-model="verificationCode" 
				      placeholder="验证码" 
				      class="input verification-input"
				    />
				    <button 
				      @click="getVerificationCode" 
				      class="btn-verification"
				      :disabled="cooldown > 0"
				    >
				      {{ cooldown > 0 ? `${cooldown}s` : '获取验证码' }}
				    </button>
				  </view> -->
				  
			      <button 
				  form-type="submit" 
				  type="primary" 
				  @click="login"
				  >
				  {{ isLogin ? '登录':'注册' }}
				  </button>
				  <text class="switch-mode" @click="switchMode">
				    {{ isLogin ? '没有账号？立即注册' : '已有账号？立即登录' }}
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
      isLogin: true,
      username: '', //手机号
      password: '',  //密码
      confirmPassword: '', //重复密码
      verificationCode: '', //验证码
      cooldown: 0,
      timer: null // 用于存储定时器
    };
  },
  methods: {
    switchMode() {
      this.isLogin = !this.isLogin;
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.verificationCode = '';
    },
    getVerificationCode() {
      if (this.cooldown > 0) return;
      // 这里应该添加发送验证码的逻辑
      console.log('发送验证码到：', this.username);
      this.cooldown = 60;
      this.timer = setInterval(() => {
        this.cooldown--;
        if (this.cooldown === 0) {
          clearInterval(this.timer);
          this.timer = null;
			}
		}, 1000);
	},
    validateForm() {
      if (!this.username || !this.password ) {
        uni.showToast({ title: '请填写所有字段', icon: 'none' });
        return false;
      }
      if (!this.isLogin && this.password !== this.confirmPassword) {
        uni.showToast({ title: '两次输入的密码不一致', icon: 'none' });
        return false;
      }
      return true;
    },
    handleSubmit() {
      if (!this.validateForm()) return;
      if (this.isLogin) {
		  this.login();
			console.log('登录信息：', this.username, this.password, this.verificationCode);
			uni.showToast({ title: '登录成功', icon: 'success' });
		} else {
			this.zc();
			console.log('注册信息：', this.username, this.password, this.verificationCode);
			// uni.showToast({ title: '注册成功', icon: 'success' });
		  }
	},
	login(){
		if(this.username && this.password){
			const postData = {
						"username": this.username,
						"password": this.password
			};
			uni.request({
				url: 'http://124.93.196.45:10001/dev-api/login',
				method: 'POST',
				data: JSON.stringify(postData),
				success: (res) => {
				  console.log(res.data);
				  if (res.data.code === 200 && res.data.token) {
					  // 登录成功，保存 token
					  uni.setStorageSync('token', res.data.token);
					  // 跳转到指定页面
					  uni.reLaunch({
						url: '/pages/about/about' 
					  });
					// 登录成功
					uni.showToast({
					  title: '登录成功',
					  icon: 'success',
					  duration: 2000
					});
				  } else {
					// 登录失败
					uni.showToast({
					  title: '登录失败',
					  icon: 'none',
					  duration: 2000
					});
					this.error_text="用户名或密码错误"
				  }
				},
				fail: (err) => {
				  console.error('请求失败:', err);
				  uni.showToast({
					title: '请求失败',
					icon: 'none',
					duration: 2000
				  });
				}
			});
			
		}else{
			this.error_text="请输入用户名和密码"
		}
	  
	},
	//获取手机验证码的函数
	PhoneCode(phone){
		return new Promise((resolve,reject)=>{
			if(phone){
				uni.request({
					url:`http://124.93.196.45:10001/dev-api/sms/captchaNoReg?phoneNumber=${phone}`,
					method:"GET",
					success: (res) => {
						console.log("1.",res.data.data);
						resolve(res.data.data);
					},
					fail: (err) => {
						console.log("请求失败：",err);
						reject("请求错误");
					}
				});
			}else {
				reject("数据错误");
			}
		})
	},
	//注册请求函数
	postzc(user,pass,code){
		if(user && pass && code){
			const PostData = {
				"phone":user,
				"password":pass,
				"captcha":code
			};
			uni.request({
				url:'http://124.93.196.45:10001/dev-api/register',
				method:'POST',
				data:JSON.stringify(PostData),
				success: (res) => {
					console.log(res);
					if (res.data.code === 200){
						uni.showToast({
						  title: '注册成功',
						  icon: 'success',
						  duration: 2000
						});
						
					}else {
						uni.showModal({
							title:"注册失败",
							content:res.data.msg
						})
					}
				},
				fail: (err) => {
					console.log(err);
				}
			})
		}
	},
	zc(){
		if (!this.isLogin && this.password !== this.confirmPassword) {
		  uni.showToast({ title: '两次输入的密码不一致', icon: 'none' });
		}else {
			this.PhoneCode(this.username).then((code)=>{
				//注册请求
				this.postzc(this.username,this.password,code)
			}).catch((err)=>{
				 // 注册请求失败
				 console.log('注册失败', err);
			})
		}
	}
},
onLoad() {
	// this.PhoneCode(18356645917).then(verificationCode=>{
	// 	console.log(verificationCode);
	// }).catch(err=>{
	// 	console.log(err);
	// })
},
beforeDestroy() {
    // 组件销毁时清除定时器
	if (this.timer) {
	  clearInterval(this.timer);
		}
	}
};
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
import config from "../config.js";
import url from "./config.js";
import login from "./login.js";

const sign = (
	username='',
	password=''
)=>{
	return new Promise((resolve,reject)=>{
		// uni.request({
		// 	//获取手机验证码
		// 	url:config.api()+url.getphonecode_api(username),
		// 	method:"GET",
		// 	success: (res) => {
		// 		console.log(res.data.data);//验证码
		// 		//
		// 		const postdata = {
		// 			"phone":username,
		// 			"password":password,
		// 			"captcha":res.data.data
		// 		};
		// 		uni.request({
		// 			//注册请求
		// 			url:config.api()+url.sign_api(),
		// 			method:"POST",
		// 			data:JSON.stringify(postdata),
		// 			success: (resc) => {
		// 				//注册成功后执行登录获取token
						
		// 			},fail: (erro) => {
		// 				console.log(erro);
		// 				reject(erro)
		// 			}
		// 		})
		// 	},
		// 	fail: (err) => {
		// 		console.log(err);
		// 		reject(err)
		// 	}
		// })
		uni.request({
			url:config.api()+url.getphonecode_api(username),
			method:"GET",
		}).then(res=>{
			const postdata = {
				"phone":username,
				"password":password,
				"captcha":res.data.data
			};
			return uni.request({
				url:config.api()+url.sign_api(),
				method:"POST",
				data:JSON.stringify(postdata),
			}).then(ress=>{
				
			})
		}).catch(err=>{
			console.error("网络请求错误："+err);
		})
	})
}
export default sign;
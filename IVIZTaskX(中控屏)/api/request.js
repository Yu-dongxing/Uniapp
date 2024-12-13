import  config  from './config.js';
import store from '../store.js';
//http://124.93.196.45:10001/dev-api/getInfo
// 定义错误代码常量
const ERROR_CODES = [401,500,403,404];
const request = (
	url = "",
	method='GET',
	data = {},
	headers = {
		// uni.getStorageSync(KEY)
		// 从本地缓存中同步获取指定 key 对应的内容。
		'Authorization':uni.getStorageSync('token')
	}
)=>{
	return new Promise((resolve , reject )=>{
		uni.request({
			url: config.api()+url,
			method : method,
			data : data,
			header : headers,
			success: (res) => {
				//网络请求成功处理
				console.log("请求接口封装返回的数据",res);
				if(ERROR_CODES.includes(res.data.code)){
					//请求数据错误处理
					uni.removeStorageSync('token');
					uni.showModal({
						showCancel:false,
						title:"温馨提示",
						content:res.data.msg,
						success: (result) => { // 使用箭头函数
							if (result.confirm) {
								store.commit("setAuthLogin", false);
								store.dispatch('saveState');
							}
						},
					});
				}else {
					//请求数据成功返回数据
					resolve(res.data);
				};
			},
			fail: (err) => {
				//网络请求错误处理
				console.log("请求错误",err);
				uni.showToast({
					title:err.msg,
					icon:"error",
				});
				//返回错误
				reject(err);
			},
		});
	});
};

export default request;
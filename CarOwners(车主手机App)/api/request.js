import  config  from './config.js';

const request = (
	url = '',
	method='GET',
	data = {},
	header = {
		'AuthorAuthorization': "Bearer " +uni.getStorageInfoSync('token')
	}
)=>{
	return new Promise((resolve , reject )=>{
		uni.request({
			url: config.api()+url,
			method : method,
			data : data,
			header : header,
			success: (res) => {
				//网络请求成功处理
				console.log()("请求接口封装返回的数据",res);
				if(res.data.code == 500){
					//请求数据错误处理
					uni.removeStorageSync('token');
					uni.showModal({
						showCancel:false,
						title:"温馨提示",
						content:res.data.msg,
						success:function(result){
							if(result.confirm){
								uni.reLaunch({
									url:'/pages/login/login'
								});
							};
						},
					});
				}else {
					//请求数据成功返回数据
					resolve(res.data);
				};
			},
			fail: (err) => {
				//网络请求错误处理
				console.log()("请求错误",err);
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
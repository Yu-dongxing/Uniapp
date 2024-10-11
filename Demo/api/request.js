import config from './config.js';

// const request = (url = '', method = 'GET', data = {}, header = { 
// 	'Authorization': "Bearer "+uni.getStorageSync('token'),
// }) => {
// 	return new Promise((resolve, reject) => {
// 		uni.request({
// 			url: config.api() + url, 
// 			method: method, 
// 			data: data, 
// 			header: header,
// 			success: (res) => {
// 				console.log('通用接口请求封装返回数据',res);
// 				if (res.data.code == 500) { 
// 					uni.removeStorageSync('token');
// 					uni.showModal({
// 						showCancel: false,
// 						title: '温馨提示',
// 						content: res.data.msg,
// 						success: function(result) {
// 							if (result.confirm) {
// 								uni.reLaunch({
// 									url: '/pages/Long/Long'
// 								});
// 							}
// 						}
// 					});
// 				}
// 				resolve(res.data) //成功
// 			},
// 			fail: (err) => {
// 				uni.showToast({
// 					title: "" + err.msg,
// 					icon: 'none'
// 				});
// 				reject(err)
// 			}
// 		})
// 	})
// }
// 封装请求参数
function getRequestOptions(url, method, data, token) {
  return {
    url: config.api() + url,
    method: method,
    data: data,
    header: {
      'Authorization': `Bearer ${token}`,
    },
  };
}

// 封装错误处理
function handleError(err, reject) {
  uni.showToast({
    title: "" + err.msg,
    icon: 'none'
  });
  reject(err);
}

// 统一处理返回数据
function handleResponse(res, resolve, reject) {
  console.log('通用接口请求封装返回数据', res);
  if (res.code === 500||res.code === 401) {
    uni.removeStorageSync('token');
    uni.showModal({
      showCancel: false,
      title: '温馨提示',
      content: res.msg,
      success: function(result) {
        if (result.confirm) {
          uni.reLaunch({
            url: '/pages/Long/Long'
          });
        }
      }
    });
  } else {
    resolve(res);
  }
}

// 封装请求函数
function request(url = '', method = 'GET', data = {}, token = uni.getStorageSync('token')) {
  return new Promise((resolve, reject) => {
    const options = getRequestOptions(url, method, data, token);
	// console.log(token);
    uni.request({
      ...options,
      success: (res) => {
        handleResponse(res.data, resolve, reject);
      },
      fail: (err) => {
        handleError(err, reject);
      }
    });
  });
}

export default request;

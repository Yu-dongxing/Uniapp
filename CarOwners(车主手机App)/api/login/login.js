import config from "../config.js";
import url from "./config.js";

const login = (
	username='',
	password=''
)=>{
	return new Promise((resolve,reject)=>{
		const postdata = {
			"username":username,
			"password":password
		};
		uni.request({
			url:config.api()+url.login_api(),
			method:"POST",
			data:JSON.stringify(postdata),
			success: (res) => {
				console.log(res);
				resolve(res)
			},
			fail: (err) => {
				console.log(err);
				reject(err)
			}
		})
	})
}
export default login;
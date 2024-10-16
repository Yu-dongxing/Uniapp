export default {
	login_api:function(){
		return  "/dev-api/login"
	},
	sign_api:function(){
		return "/dev-api/register"
	},
	getphonecode_api:function(phone){
		return `/dev-api/sms/captchaNoReg?phoneNumber=${phone}`
	}
}
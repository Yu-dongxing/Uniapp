"use strict";const e=require("../../common/vendor.js"),t=require("../../common/assets.js"),o={data:()=>({token:e.index.getStorageSync("token"),header_token:"Bearer "+e.index.getStorageSync("token"),lonig_text:"登录/注册",navigator_url:"/pages/Long/Long"}),methods:{get_user(){e.index.request({url:"http://124.93.196.45:10001/dev-api/getInfo",method:"GET",header:{"Content-Type":"application/json",Authorization:this.header_token},success:e=>{console.log(e.data),200===e.data.code&&(this.lonig_text=e.data.user.userName)},fail:t=>{console.error("请求失败:",t),e.index.showToast({title:"请求失败",icon:"none",duration:2e3})}})}},onLoad(){this.token?(this.get_user(),this.navigator_url="/pages/user/user"):this.navigator_url="/pages/Long/Long"}};const n=e._export_sfc(o,[["render",function(o,n,r,a,s,i){return{a:t._imports_0$2,b:e.t(s.lonig_text),c:s.navigator_url,d:t._imports_1,e:t._imports_2}}],["__scopeId","data-v-6df3200d"]]);wx.createPage(n);
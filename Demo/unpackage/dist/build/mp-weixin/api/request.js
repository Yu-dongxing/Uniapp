"use strict";const e=require("../common/vendor.js"),o=require("./config.js");exports.request=(n="",t="GET",s={},r={Authorization:"Bearer "+e.index.getStorageSync("token")})=>new Promise(((i,a)=>{e.index.request({url:o.config.api()+n,method:t,data:s,header:r,success:o=>{console.log("request.js文件的通用接口请求封装返回的结果数据",o),500==o.data.code&&(e.index.removeStorageSync("token"),e.index.showModal({showCancel:!1,title:"温馨提示",content:o.data.msg,success:function(o){o.confirm&&e.index.reLaunch({url:"/pages/Long/Long"})}})),i(o.data)},fail:o=>{e.index.showToast({title:""+o.msg,icon:"none"}),a(o)}})}));

"use strict";var e=require("../../../common/vendor.js");exports.loginSuccess=function(o={}){const{showToast:t=!0,toastText:s="登录成功",autoBack:n=!0}=o;if(console.log({toastText:s,autoBack:n}),t&&e.index.showToast({title:s,icon:"none"}),n){let o=0,t=getCurrentPages();e.index.$emit("uni-id-pages-login-success",t),t.reverse().forEach(((e,t)=>{"login"==e.route.split("/")[3]&&o++})),console.log("判断需要返回几层:",o),e.index.navigateBack({delta:o})}};
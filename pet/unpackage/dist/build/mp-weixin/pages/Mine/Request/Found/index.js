"use strict";var e=require("../../../../common/vendor.js");if(!Array){e.resolveComponent("lgd-tab")()}Math||((()=>"../../../../uni_modules/lgd-tab/components/lgd-tab/lgd-tab.js")+a)();const a=()=>"../../../../components/Tab/Found/index.js",t=e.defineComponent({__name:"index",setup(a){const t=e.pn.getCurrentUserInfo().uid,n=e.reactive(["已发布","已找回"]),r=e.ref(0),o=e.ref(),s=e=>{switch(r.value=e,e){case 0:o.value=`user_id=='${t}'&&state=='已发布'`;break;case 1:o.value=`user_id=='${t}'&&state=='已找回'`}};return(a,t)=>({a:e.o(s),b:e.p({tabValue:n,tabIndex:r.value,textColor:"#ec8a9e ",underlineColor:"#ec8a9e"}),c:e.p({where:o.value})})}});wx.createPage(t);
"use strict";var e=require("../../../../common/vendor.js");if(!Array){e.resolveComponent("lgd-tab")()}Math||((()=>"../../../../uni_modules/lgd-tab/components/lgd-tab/lgd-tab.js")+a)();const a=()=>"../../../../components/Tab/CatDaily/index.js",t=e.defineComponent({__name:"index",setup(a){const t=e.reactive(["推荐","综合"]),o=e.ref(1),r=e.ref(),n=e.ref("create_time"),l=e=>{switch(e){case 0:n.value="read";break;case 1:n.value="create_time"}},d=()=>{e.index.navigateTo({url:"/pages/Home/Daily/Participation/index"})},c=e.pn.database(),i=e.ref(0),u=e.ref(0);return e.onLoad((e=>{r.value=e.image})),e.onShow((()=>{c.collection("topic").field("read").get({getCount:!0}).then((e=>{u.value=e.result.count,i.value=e.result.data.map((e=>e.read)).reduce(((e,a)=>e+a),0)}))})),(a,c)=>({a:r.value,b:e.t(i.value),c:e.t(u.value),d:e.o(l),e:e.p({tabValue:t,tabIndex:o.value,textColor:"#ec9312 ",underlineColor:"#ec9312"}),f:e.p({orderby:n.value}),g:e.o(d)})}});var o=e._export_sfc(t,[["__scopeId","data-v-555b5b6e"]]);wx.createPage(o);
"use strict";var e=require("../../../../common/vendor.js");Array||e.resolveComponent("lgd-tab")();const g=()=>"../../../../uni_modules/lgd-tab/components/lgd-tab/lgd-tab.js";Math||(g+m)();const m=()=>"../../../../components/Tab/CatDaily/index.js",b=e.defineComponent({__name:"index",setup(c){const s=e.reactive(["\u63A8\u8350","\u7EFC\u5408"]),i=e.ref(1),o=e.ref("create_time"),d=t=>{switch(t){case 0:o.value="read";break;case 1:o.value="create_time";break}},l=()=>{e.index.navigateTo({url:"/pages/Home/Daily/Participation/index"})},u=()=>{e.index.navigateTo({url:"/pages/Home/Daily/MyTopic/index"})},_=e.pn.database(),n=e.ref(0),r=e.ref(0);return e.onShow(()=>{_.collection("topic").field("read").get({getCount:!0}).then(t=>{r.value=t.result.count,n.value=t.result.data.map(a=>a.read).reduce((a,p)=>a+p,0)})}),(t,a)=>({a:e.t(n.value),b:e.t(r.value),c:e.o(d),d:e.p({tabValue:s,tabIndex:i.value,textColor:"#ec9312 ",underlineColor:"#ec9312"}),e:e.p({orderby:o.value}),f:e.o(u),g:e.o(l)})}});var v=e._export_sfc(b,[["__scopeId","data-v-048b7983"],["__file","C:/Users/yzc/Desktop/pet/pages/Home/Daily/CatDaily/index.vue"]]);wx.createPage(v);

"use strict";var e=require("../../../common/vendor.js");if(!Array){e.resolveComponent("unicloud-db")()}Math;const n=e.defineComponent({__name:"index",setup(n){const t=e.pn.getCurrentUserInfo().uid,a=e.ref(),o=e.pn.database(),r=e.ref();e.onShow((()=>{o.collection("collect").where(`user_id=='${t}'`).get().then((e=>{a.value=e.result.data.length})),o.collection("footprint").where(`user_id=='${t}'`).field("adopt_id,found_id").orderBy("create_time","desc").distinct().get().then((e=>{r.value=e.result.data.length}))}));const i=()=>{e.index.navigateTo({url:"/pages/Mine/PersonalInformation/Collect/index"})},l=()=>{e.index.navigateTo({url:"/pages/Mine/PersonalInformation/Footprint/index"})};return(n,o)=>({a:e.w((({data:n},t,a)=>{var o;return{a:e.t(null==n?void 0:n.nickname),b:null==(o=null==n?void 0:n.avatar_file)?void 0:o.url,c:a,d:t}}),{name:"d",path:"a",vueId:"93c7f5b6-0"}),b:e.t(a.value?a.value:0),c:e.o(i),d:e.t(r.value?r.value:0),e:e.o(l),f:e.p({collection:"uni-id-users",field:"nickname,avatar_file",getone:!0,where:`_id == '${e.unref(t)}'`})})}});var t=e._export_sfc(n,[["__scopeId","data-v-93c7f5b6"]]);wx.createComponent(t);

"use strict";var e=require("../../../common/vendor.js");Array||e.resolveComponent("tui-icon")();const d=()=>"../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";Math||d();const _=e.defineComponent({__name:"index",setup(n){const a=e.pn.getCurrentUserInfo().uid,s=e.pn.database(),i=e.ref([]),c=()=>{e.index.switchTab({url:"/pages/Adopt/index"})};e.onShow(()=>{s.collection("adoption").where("if_adopt==false").field("city,pet_name as petName,_id,img,issue_time,if_adopt").orderBy("issue_time","desc").limit(20).get().then(t=>{i.value=t.result.data})});const r=t=>{e.index.navigateTo({url:`/pages/ApplyAdopt/index?id=${t._id}`,success(){e.pn.callFunction({name:"footprint",data:{userId:a,adoptId:t._id}})}})};return(t,u)=>({a:e.o(c),b:e.p({size:15,name:"arrowright"}),c:e.f(i.value,(o,m,l)=>({a:o.img[0].path,b:e.t(o.petName),c:e.t(o.city[1]+o.city[2]),d:e.o(f=>r(o))}))})}});var p=e._export_sfc(_,[["__scopeId","data-v-5cb5e672"],["__file","C:/Users/yzc/Desktop/pet/pages/Home/WaitAdopt/index.vue"]]);wx.createComponent(p);

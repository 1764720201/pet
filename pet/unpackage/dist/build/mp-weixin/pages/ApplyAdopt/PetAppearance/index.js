"use strict";var e=require("../../../common/vendor.js");const t=e.defineComponent({__name:"index",props:{petInfo:null},setup(t){const n=t,a=e.ref(),o=e.pn.database();e.onLoad((()=>{o.collection("images").where("title=='已领养'").get().then((e=>{a.value=e.result.data[0].image[0].url}))}));const{petInfo:r}=e.toRefs(n);return(t,n)=>e.e({a:!e.unref(r).if_adopt},e.unref(r).if_adopt?{b:a.value}:{},{c:e.f(e.unref(r).img,((e,t,n)=>({a:e.url,b:e.fileID}))),d:e.f(e.unref(r).particular,((t,n,a)=>({a:e.t(t),b:t})))})}});var n=e._export_sfc(t,[["__scopeId","data-v-120e6d2c"]]);wx.createComponent(n);

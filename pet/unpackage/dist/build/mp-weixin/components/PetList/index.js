"use strict";var e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-dateformat")+e.resolveComponent("uni-load-more")+e.resolveComponent("unicloud-db")+e.resolveComponent("uni-icons"))()}Math||((()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js")+(()=>"../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js")+(()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"))();const o=e.defineComponent({__name:"index",props:{where:null},setup(o){const n=o,a=e.ref(),t=e.pn.database();e.onLoad((()=>{t.collection("images").where("title=='已领养'").get().then((e=>{a.value=e.result.data[0].image[0].url}))}));const i=e.ref(!1),d=e.ref(null),{where:s}=e.toRefs(n),c=()=>{i.value=!1,e.index.pageScrollTo({scrollTop:300,duration:300})};return e.onPullDownRefresh((()=>{d.value.loadData((()=>{e.index.stopPullDownRefresh()}))})),e.onReachBottom((()=>{i.value=!0,d.value.loadMore()})),(o,n)=>e.e({a:e.w((({data:o,pagination:n,loading:t,error:i,hasMore:d},s,c)=>e.e({a:i},i?{b:e.t(i.message)}:{c:e.f(o,((o,n,t)=>e.e({a:!o.if_adopt},o.if_adopt?{b:a.value}:{},{c:o.img[0].path,d:e.t(o.petName),e:e.t("男生"==o.gender?"♂":"♀"),f:e.t(o.variety),g:e.f(o.medical,((o,n,a)=>({a:e.t(o)}))),h:e.t(o.city[1]),i:e.t(o.city[2]),j:"1ec3bc45-1-"+c+"-"+t+",1ec3bc45-0",k:e.p({date:o.issueTime,format:"yyyy-MM-dd hh:mm:ss"}),l:e.o((n=>(o=>{e.index.navigateTo({url:`/pages/ApplyAdopt/index?id=${o._id}`,success(){e.pn.callFunction({name:"footprint",data:{userId:userId,adoptId:o._id}})}})})(o)),o._id),m:o._id})))},{d:t},t?{e:"1ec3bc45-2-"+c+",1ec3bc45-0",f:e.p({status:"loading"})}:{},{g:d&&!t},d&&!t?{h:"1ec3bc45-3-"+c+",1ec3bc45-0",i:e.p({status:"more"})}:d||t?{}:{k:"1ec3bc45-4-"+c+",1ec3bc45-0",l:e.p({status:"noMore"})},{j:!d&&!t,m:c,n:s})),{name:"d",path:"a",vueId:"1ec3bc45-0"}),b:e.sr(d,"1ec3bc45-0",{k:"udb"}),c:e.p({collection:"adoption",orderby:"issueTime desc",field:"pet_name as petName,_id,medical,city,issue_time as issueTime,gender,variety,img,if_adopt",getone:!1,where:e.unref(s),"page-size":5}),d:i.value},i.value?{e:e.p({type:"navigate",size:"50"}),f:e.o(c)}:{})}});var n=e._export_sfc(o,[["__scopeId","data-v-1ec3bc45"]]);wx.createComponent(n);

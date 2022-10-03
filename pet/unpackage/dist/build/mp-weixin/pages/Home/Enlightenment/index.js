"use strict";var e=require("../../../common/vendor.js");if(!Array){(e.resolveComponent("tui-icon")+e.resolveComponent("uni-dateformat")+e.resolveComponent("uni-popup-dialog")+e.resolveComponent("uni-popup"))()}Math||((()=>"../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js")+(()=>"../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+t+(()=>"../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js")+(()=>"../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"))();const t=()=>"../../../components/Message/index.js",n=e.defineComponent({__name:"index",setup(t){const n=e.pn.database(),i=e.pn.getCurrentUserInfo().uid,o=e.ref(null),a=()=>{o.value.open("center")},d=t=>{e.pn.callFunction({name:"comment",data:{comment:t,type:0,userId:i,foundId:u._id,nickname:c.nickname,avatarUrl:c.avatar_file.url},success(){e.index.showToast({title:"评论成功"}),_()},fail(e){console.log(e)}})},c=e.reactive({avatar_file:{url:""},nickname:""}),u=e.reactive({_id:"",variety:"",name:"",gender:"",type:"",city:[],introduce:"",userId:"",uploadPicture:[],wxCode:"",title:"",createTime:0,phone:""}),l=e.reactive({id:"",nickname:"",imgURL:""}),r=e.ref(""),s=()=>{e.index.makePhoneCall({phoneNumber:u.phone})},p=()=>{e.index.setClipboardData({data:u.wxCode,success:function(){e.index.showToast({title:"成功复制微信号"})}})},m=e.ref(),f=e.ref([]),_=async()=>{await n.collection("comment").where(`found_id=='${u._id}'&&comment_type==0`).get().then((e=>{f.value=e.result.data}))};e.onLoad((async e=>{n.collection("foundPet").where(`_id == '${e.id}'`).field("create_time as createTime, title,variety,name,gender,type,city,introduce,user_id as userId,uploadPicture,wx_code as wxCode,phone").get().then((e=>{Object.assign(u,e.result.data[0]),r.value=`comment_type==1&&found_id=='${u._id}'`})).then((()=>{n.collection("uni-id-users").where(`_id == '${u.userId}'`).field("nickname,avatar_file").get().then((e=>{l.id=e.result.data[0]._id,l.nickname=e.result.data[0].nickname,l.imgURL=e.result.data[0].avatar_file.url}))})).then((()=>{n.collection("uni-id-users").where(`_id=='${i}'`).field("nickname,avatar_file").get().then((e=>{Object.assign(c,e.result.data[0])}))})).then((()=>{h(),_()})).catch((e=>{console.log(e.message)}))}));const h=async()=>{await n.collection("collect").where(`user_id=='${i}'&&found_id=='${u._id}'`).get().then((e=>{e.result.data[0]?m.value=!0:m.value=!1}))},v=()=>{m.value?n.collection("collect").where(`user_id=='${i}'&&found_id=='${u._id}'`).remove().then((()=>{h()})):e.pn.callFunction({name:"collect",data:{type:1,userId:i,foundId:u._id},success(){e.index.showToast({title:"收藏成功"}),h()},fail(e){console.log(e)}})};return(t,n)=>e.e({a:e.t(u.title),b:e.p({name:"clock",size:15}),c:e.p({date:u.createTime,format:"yyyy-MM-dd hh:mm:ss"}),d:e.t(u.name),e:e.t(u.variety),f:e.t(u.gender),g:e.t(u.type),h:e.t(u.city[0]),i:e.t(u.city[1]),j:e.t(u.city[2]),k:l.imgURL,l:e.t(l.nickname),m:e.o(p),n:e.p({name:"voipphone",size:25,color:"#ff9db1"}),o:e.o(s),p:!m.value},(m.value,{}),{q:e.o(v),r:e.t(u.introduce),s:e.f(u.uploadPicture,((e,t,n)=>({a:e.path,b:e.fileId}))),t:e.o(a),v:e.p({commentList:f.value,where:r.value}),w:e.sr("inputClose","6b9626bc-5,6b9626bc-4"),x:e.o(d),y:e.p({mode:"input",title:"输入内容",placeholder:"写下你的线索吧"}),z:e.sr(o,"6b9626bc-4",{k:"inputDialog"}),A:e.p({type:"dialog"})})}});var i=e._export_sfc(n,[["__scopeId","data-v-6b9626bc"]]);wx.createPage(i);

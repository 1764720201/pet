"use strict";var e=require("../../../../../common/vendor.js");if(!Array){e.resolveComponent("uni-dateformat")()}Math||((()=>"../../../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+t)();const t=()=>"../../../../../components/AuthorInformation/index.js",a=e.defineComponent({__name:"index",setup(t){const a=e.pn.database(),i=e.reactive({_id:"",adopt_id:"",age:"",gender:"",experience:"",present:"",house:"",marriage:"",income:"",work:"",city:[],phone:"",wx_code:"",sincerity:"",state:"",create_time:0,user_id:""}),n=e.reactive({user_id:"",wx_code:"",phone:""}),r=e.reactive({nickname:"",imgURL:"",id:""}),d=e.ref("");return e.onLoad((e=>{a.collection("apply").where(`_id=='${e.inApplyId}'`).get().then((e=>{Object.assign(i,e.result.data[0])})).then((()=>{a.collection("uni-id-users").where(`_id=='${i.user_id}'`).field("nickname").get().then((e=>{d.value=e.result.data[0].nickname}))})).then((async()=>{await a.collection("adoption").where(`_id=='${i.adopt_id}'`).field("user_id,phone,wx_code").get().then((e=>{Object.assign(n,e.result.data[0])}))})).then((async()=>{await a.collection("uni-id-users").where(`_id=='${null==n?void 0:n.user_id}'`).get().then((e=>{var t;r.imgURL=null==(t=e.result.data[0].avatar_file)?void 0:t.url,r.nickname=e.result.data[0].nickname,r.id=e.result.data[0]._id}))}))})),(t,a)=>({a:e.t(i.state),b:e.p({date:i.create_time,format:"yyyy-MM-dd hh:mm:ss"}),c:e.p({nickname:r.nickname,avatarUrl:r.imgURL,userId:r.id,wxCode:n.wx_code,phone:n.phone,title:"送养人信息"}),d:e.t(d.value),e:e.t(i.age),f:e.t(i.gender),g:e.t(i.experience),h:e.t(i.city[0]+i.city[1]+i.city[2]),i:e.t(i.house),j:e.t(i.marriage),k:e.t(i.work),l:e.t(i._id.toLocaleUpperCase()),m:e.p({date:i.create_time,format:"yyyy-MM-dd hh:mm:ss"})})}});var i=e._export_sfc(a,[["__scopeId","data-v-1efb7d7c"]]);wx.createPage(i);
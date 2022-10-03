"use strict";var s=require("../../../../../common/vendor.js");const y=Array.isArray,{t:g}=s.initVueI18n(s.messages),_={load:"load",error:"error"},p={add:"add",replace:"replace"},m={auto:"auto",onready:"onready",manual:"manual"},x=["pageCurrent","pageSize","collection","action","field","getcount","orderby","where","groupby","groupField","distinct"],b={name:"UniClouddb",setup(t){const e=t.ssrKey?t.getone?s.shallowSsrRef(void 0,t.ssrKey):s.ssrRef([],t.ssrKey):t.getone?s.shallowSsrRef(void 0,"ejMlO/fkQSgm8hMB20Q5CQ=="):s.ssrRef([],"CT2D4fWLgGMuoQaRngMEfA=="),i=s.getCurrentInstance();return s.onMounted(()=>{(!e.value||e.value.length===0)&&!t.manual&&t.loadtime===m.auto&&i.proxy.loadData()}),{dataList:e}},async serverPrefetch(){if(!this.manual&&this.loadtime===m.auto)return this.loadData()},props:{options:{type:[Object,Array],default(){return{}}},spaceInfo:{type:Object,default(){return{}}},collection:{type:[String,Array],default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String,Object],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},pageIndistinct:{type:[Boolean,String],default:!1},foreignKey:{type:String,default:""},loadtime:{type:String,default:"auto"},manual:{type:Boolean,default:!1},ssrKey:{type:[String,Number],default:""}},data(){return{loading:!1,hasMore:!1,paginationInternal:{},errorMessage:""}},computed:{collectionArgs(){return y(this.collection)?this.collection:[this.collection]},isLookup(){return y(this.collection)&&this.collection.length>1||typeof this.collection=="string"&&this.collection.indexOf(",")>-1},mainCollection(){return typeof this.collection=="string"?this.collection.split(",")[0]:JSON.parse(JSON.stringify(this.collection[0])).$db[0].$param[0]}},created(){this._isEnded=!1,this.paginationInternal={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch(()=>{var t=[];return x.forEach(e=>{t.push(this[e])}),t},(t,e)=>{if(this.paginationInternal.size=this.pageSize,t[0]!==e[0]&&(this.paginationInternal.current=this.pageCurrent),this.loadtime===m.manual)return;let i=!1;for(let n=2;n<t.length;n++)if(t[n]!==e[n]){i=!0;break}i&&(this.clear(),this.reset()),this._execLoadData()})},methods:{loadData(t,e){let i=null,n=!1;return typeof t=="object"?(t.clear&&(this.pageData===p.replace?this.clear():n=t.clear,this.reset()),t.current!==void 0&&(this.paginationInternal.current=t.current),typeof e=="function"&&(i=e)):typeof t=="function"&&(i=t),this._execLoadData(i,n)},loadMore(){this._isEnded||this.loading||(this.pageData===p.add&&this.paginationInternal.current++,this._execLoadData())},refresh(){this.clear(),this._execLoadData()},clear(){this._isEnded=!1,this.dataList=[]},reset(){this.paginationInternal.current=1},add(t,{action:e,showToast:i=!0,toastTitle:n,success:a,fail:o,complete:d,needConfirm:c=!0,needLoading:l=!0,loadingTitle:h=""}={}){l&&s.index.showLoading({title:h});let u=s.pn.database(this.spaceInfo);e&&(u=u.action(e)),u.collection(this.mainCollection).add(t).then(r=>{a&&a(r),i&&s.index.showToast({title:n||g("uniCloud.component.add.success")})}).catch(r=>{o&&o(r),c&&s.index.showModal({content:r.message,showCancel:!1})}).finally(()=>{l&&s.index.hideLoading(),d&&d()})},remove(t,{action:e,success:i,fail:n,complete:a,confirmTitle:o,confirmContent:d,needConfirm:c=!0,needLoading:l=!0,loadingTitle:h=""}={}){if(!(!t||!t.length)){if(!c){this._execRemove(t,e,i,n,a,c,l,h);return}s.index.showModal({title:o||g("uniCloud.component.remove.showModal.title"),content:d||g("uniCloud.component.remove.showModal.content"),showCancel:!0,success:u=>{!u.confirm||this._execRemove(t,e,i,n,a,c,l,h)}})}},update(t,e,{action:i,showToast:n=!0,toastTitle:a,success:o,fail:d,complete:c,needConfirm:l=!0,needLoading:h=!0,loadingTitle:u=""}={}){h&&s.index.showLoading({title:u});let r=s.pn.database(this.spaceInfo);return i&&(r=r.action(i)),r.collection(this.mainCollection).doc(t).update(e).then(f=>{o&&o(f),n&&s.index.showToast({title:a||g("uniCloud.component.update.success")})}).catch(f=>{d&&d(f),l&&s.index.showModal({content:f.message,showCancel:!1})}).finally(()=>{h&&s.index.hideLoading(),c&&c()})},getTemp(t=!0){let e=s.pn.database(this.spaceInfo);this.action&&(e=e.action(this.action)),e=e.collection(...this.collectionArgs),this.foreignKey&&(e=e.foreignKey(this.foreignKey)),!this.where||!Object.keys(this.where).length||(e=e.where(this.where)),this.field&&(e=e.field(this.field)),this.groupby&&(e=e.groupBy(this.groupby)),this.groupField&&(e=e.groupField(this.groupField)),this.distinct===!0&&(e=e.distinct()),this.orderby&&(e=e.orderBy(this.orderby));const{current:i,size:n}=this.paginationInternal,a={};this.getcount&&(a.getCount=this.getcount);const o={limitLevel:this.limitlevel,startWith:this.startwith};return this.gettree&&(a.getTree=o),this.gettreepath&&(a.getTreePath=o),e=e.skip(n*(i-1)).limit(n),t?(e=e.getTemp(a),e.udb=this):e=e.get(a),e},setResult(t){t.code===0?this._execLoadDataSuccess(t):this._execLoadDataFail(new Error(t.message))},_execLoadData(t,e){if(!this.loading)return this.loading=!0,this.errorMessage="",this._getExec().then(i=>{this.loading=!1,this._execLoadDataSuccess(i.result,t,e)}).catch(i=>{this.loading=!1,this._execLoadDataFail(i,t)})},_execLoadDataSuccess(t,e,i){const{data:n,count:a}=t;this._isEnded=a!==void 0?this.paginationInternal.current*this.paginationInternal.size>=a:n.length<this.pageSize,this.hasMore=!this._isEnded;const o=this.getone?n.length?n[0]:void 0:n;this.getcount&&(this.paginationInternal.count=a),e&&e(o,this._isEnded,this.paginationInternal),this._dispatchEvent(_.load,o),this.getone||this.pageData===p.replace?this.dataList=o:i?this.dataList=o:this.dataList.push(...o)},_execLoadDataFail(t,e){this.errorMessage=t,e&&e(),this.$emit(_.error,t),console.error(t)},_getExec(){return this.getTemp(!1)},_execRemove(t,e,i,n,a,o,d,c){if(!this.collection||!t)return;const l=y(t)?t:[t];if(!l.length)return;d&&s.index.showLoading({mask:!0,title:c});const h=s.pn.database(this.spaceInfo),u=h.command;let r=h;e&&(r=r.action(e)),r.collection(this.mainCollection).where({_id:u.in(l)}).remove().then(f=>{i&&i(f.result),this.pageData===p.replace?this.refresh():this.removeData(l)}).catch(f=>{n&&n(f),o&&s.index.showModal({content:f.message,showCancel:!1})}).finally(()=>{d&&s.index.hideLoading(),a&&a()})},removeData(t){const e=t.slice(0),i=this.dataList;for(let n=i.length-1;n>=0;n--){const a=e.indexOf(i[n]._id);a>=0&&(i.splice(n,1),e.splice(a,1))}},_dispatchEvent(t,e){this._changeDataFunction?this._changeDataFunction(e,this._isEnded,this.paginationInternal):this.$emit(t,e,this._isEnded,this.paginationInternal)}}};function S(t,e,i,n,a,o){return{a:s.r("d",{options:i.options,data:n.dataList,pagination:a.paginationInternal,loading:a.loading,hasMore:a.hasMore,error:a.errorMessage})}}var w=s._export_sfc(b,[["render",S],["__file","D:/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.vue"]]);wx.createComponent(w);

"use strict";var o=require("./citySelect.js"),c=require("../../common/vendor.js");const u={props:{placeholder:{type:String,default:"\u8BF7\u8F93\u5165\u57CE\u5E02\u540D\u79F0"},formatName:{type:String,default:"cityName"},activeCity:{type:Object,default:()=>null},hotCity:{type:Array,default:()=>[]},obtainCitys:{type:Array,default:()=>[]},isSearch:{type:Boolean,default:!0}},data(){return{toView:"city-letter-Find",scrollTop:0,cityindexs:[],activeCityIndex:"",handleCity:[],serachCity:"",cityData:[]}},computed:{sortItems(){for(let t=0;t<this.handleCity.length;t++)if(this.handleCity[t].isCity){let e=this.handleCity[t].citys;e=e.sort(function(i,h){var a=i.unicode,y=h.unicode;return a-y})}return this.handleCity},searchDatas(){var t=[];for(let e=0;e<this.cityData.length;e++)this.cityData[e][this.formatName].indexOf(this.serachCity)!==-1&&t.push({oldData:this.cityData[e],name:this.cityData[e][this.formatName]});return t}},created(){this.cityData=this.obtainCitys,this.initializationCity(),this.buildCityindexs()},watch:{obtainCitys(t){this.updateCitys(t)}},methods:{updateCitys(t){t&&t.length&&(this.cityData=t,this.initializationCity(),this.buildCityindexs())},keyInput(t){this.serachCity=t.detail.value},initializationCity(){this.handleCity=[];const t=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"];for(let e=0;e<t.length;e++)this.handleCity.push({name:t[e],isCity:!1,citys:[],forName:"city-letter-"+(t[e]=="#"?"0":t[e])})},getLetter(t){return o.citySelect.getFirstLetter(t[0])},buildCityindexs(){this.cityindexs=[];for(let t=0;t<this.cityData.length;t++){const e=this.getLetter(this.cityData[t][this.formatName]).firstletter,i=this.getLetter(this.cityData[t][this.formatName]).unicode,h=this.cityIndexPosition(e);this.cityindexs.indexOf(e)===-1&&(this.handleCity[h].isCity=!0,this.cityindexs.push(e)),this.handleCity[h].citys.push({cityName:this.cityData[t][this.formatName],unicode:i,oldData:this.cityData[t]})}},cityindex(t){this.toView=t},cityIndexPosition(t){if(!t)return"";const e=65;return t==="#"?26:t.charCodeAt(0)-e},cityTrigger(t){this.$emit("cityClick",t.oldData?t.oldData:t)}}};function d(t,e,i,h,a,y){return c.e({a:i.isSearch},i.isSearch?{b:c.o((...r)=>y.keyInput&&y.keyInput(...r)),c:i.placeholder}:{},{d:i.activeCity&&!a.serachCity},i.activeCity&&!a.serachCity?{}:{},{e:i.activeCity&&!a.serachCity},i.activeCity&&!a.serachCity?{f:c.t(i.activeCity[i.formatName]),g:c.o(r=>y.cityTrigger(i.activeCity))}:{},{h:i.hotCity.length>0&&!a.serachCity},i.hotCity.length>0&&!a.serachCity?{}:{},{i:i.hotCity.length>0&&!a.serachCity},i.hotCity.length>0&&!a.serachCity?{j:c.f(i.hotCity,(r,s,l)=>({a:c.t(r[i.formatName]),b:s,c:c.o(n=>y.cityTrigger(r,"hot"),s)}))}:{},{k:!a.serachCity},a.serachCity?{}:{l:c.f(y.sortItems,(r,s,l)=>({a:c.t(r.name),b:"city-letter-"+(r.name==="#"?"0":r.name),c:c.f(r.citys,(n,C,m)=>({a:c.t(n.cityName),b:C,c:c.o(g=>y.cityTrigger(n),C)})),d:s,e:r.isCity}))},{m:a.serachCity},a.serachCity?{n:c.f(y.searchDatas,(r,s,l)=>({a:c.t(r.name),b:c.o(n=>y.cityTrigger(r),t.inx),c:s})),o:t.inx}:{},{p:a.scrollTop,q:a.toView,r:!a.serachCity},a.serachCity?{}:{s:c.f(a.handleCity,(r,s,l)=>({a:c.t(r.name),b:r.isCity,c:s,d:c.o(n=>y.cityindex(r.forName),s)}))})}var f=c._export_sfc(u,[["render",d],["__file","C:/Users/yzc/Desktop/pet/components/city-select/city-select.vue"]]);wx.createComponent(f);

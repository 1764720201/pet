"use strict";var a=require("../../common/vendor.js");const u={props:{mode:{type:Number,default:1},button:{type:String,default:"outside"},show:{type:Boolean,default:!0},radius:{type:String,default:"60"},placeholder:{type:String,default:"\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9"},backgroundColor:{type:String,default:"#fff"},border:{type:String,default:"1px #f5f5f5 solid"}},data(){return{active:!1,inputVal:"",searchName:"\u53D6\u6D88",isDelShow:!1,isFocus:!1}},methods:{focus(){this.active=!0},blur(){this.isFocus=!1,this.inputVal||(this.active=!1)},clear(){this.inputVal="",this.active=!1,this.$emit("search","")},getFocus(){this.isFocus=!0},search(){!this.inputVal||(console.log(this.inputVal),this.$emit("search",this.inputVal))}},watch:{inputVal(c){c?(this.searchName="\u641C\u7D22",this.isDelShow=!0):(this.searchName="\u53D6\u6D88",this.isDelShow=!1)}}};function r(c,h,e,o,s,i){return a.e({a:!s.active&&e.mode===2?1:"",b:s.isFocus,c:e.placeholder,d:a.o((...t)=>i.focus&&i.focus(...t)),e:a.o((...t)=>i.blur&&i.blur(...t)),f:s.inputVal,g:a.o(t=>s.inputVal=t.detail.value),h:s.isDelShow},s.isDelShow?{i:a.o((...t)=>i.clear&&i.clear(...t))}:{},{j:e.mode===2?1:"",k:s.active&&e.show&&e.button==="inside"||s.isDelShow&&e.button==="inside",l:a.o((...t)=>i.search&&i.search(...t)),m:e.radius+"px",n:e.border,o:e.button==="outside"},e.button==="outside"?{p:a.t(e.show?"\u641C\u7D22":s.searchName),q:e.show||s.active?1:"",r:a.o((...t)=>i.search&&i.search(...t))}:{},{s:e.backgroundColor})}var l=a._export_sfc(u,[["render",r],["__scopeId","data-v-c742fcb8"],["__file","C:/Users/yzc/Desktop/pet/components/mehaotian-search/mehaotian-search.vue"]]);wx.createComponent(l);

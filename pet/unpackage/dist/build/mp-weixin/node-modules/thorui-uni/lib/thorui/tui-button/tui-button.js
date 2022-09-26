"use strict";var e=require("../../../../../common/vendor.js");const t={name:"tuiButton",emits:["click","getuserinfo","contact","getphonenumber","error"],props:{type:{type:String,default:"primary"},shadow:{type:Boolean,default:!1},width:{type:String,default:"100%"},height:{type:String,default:"96rpx"},size:{type:Number,default:32},bold:{type:Boolean,default:!1},margin:{type:String,default:"0"},shape:{type:String,default:"square"},plain:{type:Boolean,default:!1},link:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},disabledGray:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},formType:{type:String,default:""},openType:{type:String,default:""},index:{type:[Number,String],default:0},preventClick:{type:Boolean,default:!1}},data:()=>({time:0}),methods:{handleClick(){if(!this.disabled){if(this.preventClick){if((new Date).getTime()-this.time<=200)return;this.time=(new Date).getTime(),setTimeout((()=>{this.time=0}),200)}this.$emit("click",{index:Number(this.index)})}},bindgetuserinfo({detail:e={}}={}){this.$emit("getuserinfo",e)},bindcontact({detail:e={}}={}){this.$emit("contact",e)},bindgetphonenumber({detail:e={}}={}){this.$emit("getphonenumber",e)},binderror({detail:e={}}={}){this.$emit("error",e)},getShadowClass:function(e,t,i){let n="";return t&&"white"!=e&&!i&&(n="tui-shadow-"+e),n},getDisabledClass:function(e,t,i){let n="";if(e&&"white"!=t&&-1==t.indexOf("-")){let e=this.disabledGray?"tui-gray-disabled":"tui-dark-disabled";n=i?"tui-dark-disabled-outline":e}return n},getShapeClass:function(e,t){let i="";return"circle"==e?i=t?"tui-outline-fillet":"tui-fillet":"rightAngle"==e&&(i=t?"tui-outline-rightAngle":"tui-rightAngle"),i},getHoverClass:function(e,t,i){let n="";return e||(n=i?"tui-outline-hover":"tui-"+(t||"primary")+"-hover"),n}}};var i=e._export_sfc(t,[["render",function(t,i,n,a,l,r){return{a:e.n(n.plain?"tui-"+n.type+"-outline":"tui-btn-"+(n.type||"primary")),b:e.n(r.getDisabledClass(n.disabled,n.type,n.plain)),c:e.n(r.getShapeClass(n.shape,n.plain)),d:e.n(r.getShadowClass(n.type,n.shadow,n.plain)),e:e.n(n.bold?"tui-text-bold":""),f:e.n(n.link?"tui-btn__link":""),g:e.n("100%"!==n.width&&n.width&&!0!==n.width?"":"tui-btn__flex-1"),h:r.getHoverClass(n.disabled,n.type,n.plain),i:n.width,j:n.height,k:n.height,l:n.size+"rpx",m:n.margin,n:n.loading,o:n.formType,p:n.openType,q:e.o(((...e)=>r.bindgetuserinfo&&r.bindgetuserinfo(...e))),r:e.o(((...e)=>r.bindgetphonenumber&&r.bindgetphonenumber(...e))),s:e.o(((...e)=>r.bindcontact&&r.bindcontact(...e))),t:e.o(((...e)=>r.binderror&&r.binderror(...e))),v:n.disabled,w:e.o(((...e)=>r.handleClick&&r.handleClick(...e)))}}],["__scopeId","data-v-12c9e9e6"]]);wx.createComponent(i);

"use strict";var e=require("../../../../common/vendor.js");const t={props:{modelValue:String,value:String,scene:{type:String,default:()=>""},focus:{type:Boolean,default:()=>!1}},computed:{val:{get(){return this.value||this.modelValue},set(e){this.$emit("update:modelValue",e)}}},data:()=>({focusCaptchaInput:!1,captchaBase64:"",loging:!1}),watch:{scene:{handler(t){t?this.getImageCaptcha(this.focus):e.index.showToast({title:"scene不能为空",icon:"none"})},immediate:!0}},methods:{getImageCaptcha(t=!0){this.loging=!0,t&&(this.val="",this.focusCaptchaInput=!0);e.pn.importObject("uni-captcha-co",{customUI:!0}).getImageCaptcha({scene:this.scene}).then((e=>{this.captchaBase64=e.captchaBase64})).catch((t=>{e.index.showToast({title:t.message,icon:"none"})})).finally((e=>{this.loging=!1}))}}};if(!Array){e.resolveComponent("uni-icons")()}Math;var a=e._export_sfc(t,[["render",function(t,a,c,o,n,s){return e.e({a:n.loging},n.loging?{b:e.p({size:"20px",color:"#BBB",type:"spinner-cycle"})}:{},{c:n.loging?1:"",d:e.o(((...e)=>s.getImageCaptcha&&s.getImageCaptcha(...e))),e:n.captchaBase64,f:e.o((e=>n.focusCaptchaInput=!1)),g:n.focusCaptchaInput,h:s.val,i:e.o((e=>s.val=e.detail.value))})}],["__scopeId","data-v-5d8d17f8"]]);wx.createComponent(a);
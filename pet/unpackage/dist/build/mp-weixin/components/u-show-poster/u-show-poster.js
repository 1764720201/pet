"use strict";var e=require("../../common/vendor.js"),a=require("../../uni_modules/sakura-canvas/js_sdk/utils/util.js");if(require("../../uni_modules/sakura-canvas/js_sdk/plugins/image-tools.js"),!Array){e.resolveComponent("u-popup")()}Math;const o={__name:"u-show-poster",props:{modelValue:Boolean,image:String},emits:["update:modelValue"],setup(o,{emit:s}){const t=o,u=()=>s("update:modelValue",!t.modelValue),n=async()=>{(await a.saveImageToPhotosAlbum(t.image)).success?u():e.index.showToast({title:"保存图片失败!!!",icon:"none"})};return(a,s)=>({a:o.image,b:e.o(n),c:e.o(u),d:e.p({show:o.modelValue,background:"transparent"})})}};var s=e._export_sfc(o,[["__scopeId","data-v-ebc6fabc"]]);wx.createComponent(s);

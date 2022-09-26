"use strict";var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,o=(t,r,a)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a,n=require("../../../../common/vendor.js"),c=require("../utils/common.js");exports.Canvas=class{constructor(e){this.drawPoster=e}clearCanvas(){const{Context:e}=this.drawPoster;e.clearRect(0,0,999999,999999)}exportImage(){const{exportImageDelayTime:e,exportImageTips:t}=this.drawPoster;return new Promise((async r=>{n.index.showLoading({title:t}),await c.sleep(e),r(await this.createCanvasFilePath())}))}createCanvasFilePath(){const{Context:e,canvas:c,canvasId:l,_this:d,is2d:h,exportImageStyle:p,dpr:w}=this.drawPoster;let{width:m,height:y,x:u,y:g,fileType:x,quality:P,destWidth:v,destHeight:f}=p;const b={};return v&&(b.destWidth=v),f&&(b.destHeight=f),h&&(m*=w,y*=w),new Promise((e=>{try{n.index.canvasToTempFilePath((h=((e,t)=>{for(var r in t||(t={}))s.call(t,r)&&o(e,r,t[r]);if(a)for(var r of a(t))i.call(t,r)&&o(e,r,t[r]);return e})({canvasId:l,canvas:c,x:u,y:g,width:Math.floor(m),height:Math.floor(y),quality:P,fileType:x},b),t(h,r({success:t=>e({success:!0,data:t.tempFilePath,msg:"绘画成功"}),fail:t=>e({success:!1,msg:`导出图片失败: ${JSON.stringify(t)}`}),complete:()=>{n.index.hideLoading()}}))),d)}catch(p){return e({success:!1,msg:"导出图片失败: 绘画错误"+p})}var h}))}canvasDraw(){const{Context:e,drawDelayTime:t,is2d:r}=this.drawPoster;return new Promise((async a=>{if(await c.sleep(t),r)return a(await this.exportImage());await e.draw(!0,(async()=>a(await this.exportImage())))}))}sortDrawArray(e=[]){return e.sort(((e,t)=>(e.zIndex||0)-(t.zIndex||0)))}};
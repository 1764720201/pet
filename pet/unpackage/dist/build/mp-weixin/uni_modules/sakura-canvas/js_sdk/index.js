"use strict";var t=Object.defineProperty,e=Object.defineProperties,a=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,n=(e,a,s)=>a in e?t(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s,o=(t,e)=>{for(var a in e||(e={}))i.call(e,a)&&n(t,a,e[a]);if(s)for(var a of s(e))r.call(e,a)&&n(t,a,e[a]);return t},h=(t,s)=>e(t,a(s)),c=(t,e)=>{var a={};for(var n in t)i.call(t,n)&&e.indexOf(n)<0&&(a[n]=t[n]);if(null!=t&&s)for(var n of s(t))e.indexOf(n)<0&&r.call(t,n)&&(a[n]=t[n]);return a},l=require("../../../common/vendor.js"),d=require("./methods/text.js"),w=require("./methods/line.js"),m=require("./methods/rect.js"),u=require("./methods/arc.js"),g=require("./methods/image.js"),y=require("./methods/triangle.js"),f=require("./methods/qrcode.js"),p=require("./methods/canvas.js"),x=require("./utils/common.js");exports.DrawPoster=class{constructor(t){const{width:e=375.0001,height:a=0,canvasId:s=null,_this:i=null,background:r={},type:n="default",unit:h="px",drawDelayTime:c=200,exportImageDelayTime:l=200,drawTipsText:d="绘制中...",exportImageTips:w="导出图片中...",fontStyle:m={},exportImageStyle:u={}}=t;this.background=o({type:"color",w:e,h:a,color:"#ffffff"},r),this.canvasId=s,this._this=i,this.type=n,this.is2d="2d"===this.type,this.unit=h,this.drawDelayTime=c,this.exportImageDelayTime=l,this.drawTipsText=d,this.exportImageTips=w,this.fontStyle=o({size:"default"===this.type?16:32,family:"sans-serif",style:"normal",variant:"normal",weight:"normal"},m),this.commonUtilMethods=new x.CommonUtilMethods({unit:h,type:this.type,width:e,height:a,fontStyle:this.fontStyle}),this.setCanvasStyle(e,a),this.exportImageStyle=o({width:e,height:a,x:0,y:0,fileType:"png",quality:1},u),this.allCallback=[],this.$eventsMap=new Map,this.createContext(),this.drawCallback=null}async createContext(){const{width:t,height:e,canvasId:a,_this:s,type:i,is2d:r}=this,n=(t,e=null)=>{this.Context=t,this.canvas=e,this.commonDrawMethods=new x.CommonDrawMethods(t,i,this.commonUtilMethods),this.commonUtilMethods.Context=t,this.commonUtilMethods.canvas=e,this.initDrawMethods(),this.$emit("init")},o=l.index.getSystemInfoSync().pixelRatio;if(this.dpr=o,r)l.index.createSelectorQuery().select(`#${a}`).fields({node:!0,size:!0}).exec((a=>{const s=a[0].node,r=s.getContext(i);s.width=this.commonUtilMethods.getConvertedValue(t)*o,s.height=this.commonUtilMethods.getConvertedValue(e)*o,r.scale(o,o),n(r,s)}));else{const t=l.index.createCanvasContext(a,s);await x.sleep(50),n(t)}}initDrawMethods(){const{Context:t,commonUtilMethods:e,commonDrawMethods:a}=this,s={Context:t,commonUtilMethods:e,commonDrawMethods:a};this.canvasMethods=new p.Canvas(this);const i=new d.DrawText(s),r=new w.drawLine(s),n=new m.DrawRect(s),o=new u.DrawArc(s),h=new g.DrawImage(s),c=new y.DrawTriangle(s),l=new f.DrawQrcode(s);this.commonDrawMethods.drawParams={drawText:i,drawLine:r,drawRect:n,drawArc:o,drawImage:h,drawTriangle:c,drawQrcode:l},this.drawText=i,this.drawLine=r,this.drawRect=n,this.drawArc=o,this.drawImage=h,this.drawTriangle=c,this.drawQrcode=l}setExportImageStyle(t){this.exportImageStyle=o(o({},this.exportImageStyle),t)}setBackgroundStyle(t){this.background=o(o({},this.background),t)}async setCanvasStyle(t,e){if(this.width=t,this.height=e,this.commonUtilMethods.width=t,this.commonUtilMethods.height=e,this.commonUtilMethods.setCanvasStyle(),this.callbackInfo={bgObj:{width:this.background.w,height:this.background.h},ctxObj:{width:t,height:e}},this.setExportImageStyle({width:t,height:e}),this.canvas){const{dpr:a,canvas:s,Context:i,commonUtilMethods:r}=this;s.width=r.getConvertedValue(t)*a,s.height=r.getConvertedValue(e)*a,i.scale(a,a),await this.drawBackground(!1),this.drawArrayFn&&await this.drawCanvas(this.drawArrayFn(this.callbackInfo),!1)}}$on(t="",e=null){if(!t||!e)return;if("function"!=typeof e)return;let a=this.$eventsMap.get(t);a||this.$eventsMap.set(t,a=new Set),a.add(e),this.$eventsMap.set(t,a)}$emit(t="",e={}){if(!t)return;const a=this.$eventsMap.get(t);a&&a.forEach((t=>{t(e)}))}drawBackground(t=!0){const{background:e,width:a,height:s,Context:i,drawRect:r,drawImage:n,unit:l,commonUtilMethods:d}=this;return new Promise((async i=>{var d,w,m,u,g;const y=e,{type:f}=y,p=c(y,["type"]);t||this.canvasMethods.clearCanvas();let x={};"color"===f?x=r.draw(h(o({},p),{w:null!=(d=p.w)?d:a,h:null!=(w=p.h)?w:s,color:null!=(m=p.color)?m:"#ffffff"})):"image"===f&&(x=await n.draw(h(o({},p),{w:null!=(u=p.w)?u:a,h:null!=(g=p.h)?g:s}))),x.style={width:x.w+l,height:x.h+l},this.background.w=x.w,this.background.h=x.h,t&&this.$emit("background",x),i(x)}))}async setAllCallBack(t){const{width:e,commonUtilMethods:a,commonDrawMethods:s}=this,{canvasWidth:i}=a;let{type:r,x:n=0,y:o=0,r:h=0,w:c=i,h:l=0,lineWidth:d=1,size:w=0,name:m="",windowAlign:u="none",drawType:y="default",mode:f="aspectFill",src:p="",offsetRight:x}=t,b=n,v=o,C=n+c,k=o+l;if("text"===r){let{text:e,textIndent:i,lastWidth:r,font:h,line:l,textAlign:d,windowAlign:w,color:m}=this.drawText.getDrawParams(t,!1);const u=s.computedFontTextLineHeight(n,o,c,e,i,r,h,l,d,w,m),g=u[u.length-1],y=u[0];k=g.ey,C=y.tx+y.w,t.textArr=a.conversionUnit(u),t.h=k-v,t.tw=y.w}else if("arc"===r)C=n+2*h,k=o+2*h,c=2*h,l=2*h;else if("line"===r)k=o+d,l=d;else if("qrcode"===r)C=n+w,k=o+w,c=w,l=w;else if("image"==r){"none"!==u&&(n=s.computedCenterX(e,c,u,x));const i=await g.getImageSrc(p);if(!i.success)return i;p=i.src;const r=await g.getImageInfo(p);if(!r.success)return Promise.resolve(!0);const h=g.getModeImage(Number(r.width),Number(r.height),a.getConvertedValue(n),a.getConvertedValue(o),a.getConvertedValue(c),a.getConvertedValue(l),f),{dx:d,dy:w,dw:m,dh:b,sw:v,sh:M,sx:I,sy:T}=h;"widthFix"===f?(l="rpx"===this.unit?a.pxToRpx(M):M,k=o+l):"heightFix"===f&&(c="rpx"===this.unit?a.pxToRpx(v):v,C=n+c),"arc"===y&&0==l&&(l=c,k=o+l),t.drawModeImage=h,t.drawSrc=p,t.drawImageInfo=r}return t.sx=b,t.sy=v,t.ex=C,t.ey=k,this.allCallback.push({sx:b,sy:v,ex:C,ey:k,w:c,h:l,name:m,before:t.before||{}}),Promise.resolve(!0)}drawCanvas(t,e=!0){const{Context:a}=this;return new Promise((async s=>{try{for(let e of t){if(e.callback&&"function"==typeof e.callback&&"custom"!==e.type){const t=0==this.allCallback.length?{}:this.allCallback[this.allCallback.length-1],a=e.callback(t,this.allCallback)||{},s=e,{callback:i}=s,r=c(s,["callback"]);e=o(o({},r),a)}switch("custom"!==e.type&&"custom"!==e.drawType&&await this.setAllCallBack(e),e.type){case"text":this.drawText.draw(e);break;case"rect":this.drawRect.draw(e);break;case"image":const t=await this.drawImage.draw(e);if(!t.success)return s(t);break;case"arc":this.drawArc.draw(e);break;case"triangle":this.drawTriangle.draw(e);break;case"line":this.drawLine.draw(e);break;case"qrcode":await this.drawQrcode.draw(e);break;case"custom":e.setDraw(a,this)}}if(s({success:!0}),!e)return;const{width:i,height:r}=this,n=this.allCallback.reduce(((t,e)=>Math.max(t,e.ey)),0),h=this.allCallback.reduce(((t,e)=>Math.max(t,e.ex)),0);this.$emit("drawComplete",{width:i,height:r,contentHeight:n,contentWidth:h})}catch(i){return s({success:!1,msg:"绘制内容失败:"+i})}finally{l.index.hideLoading()}}))}drawPoster(t){const{callbackInfo:e,drawTipsText:a}=this;return new Promise((async s=>{if(!t||"function"!=typeof t)return s({success:!1,msg:"drawPoster参数错误"});this.drawArrayFn&&(this.allCallback=[],this.canvasMethods.clearCanvas(),await this.drawBackground(!1)),this.drawArrayFn=t,l.index.showLoading({title:a});const i=await this.drawCanvas(t(e));if(!i.success)return s(i);s(await this.canvasMethods.canvasDraw()),l.index.hideLoading()}))}};

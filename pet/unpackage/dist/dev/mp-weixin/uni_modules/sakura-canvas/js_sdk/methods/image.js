"use strict";var W=Object.defineProperty,H=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var G=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var E=(t,e,a)=>e in t?W(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,F=(t,e)=>{for(var a in e||(e={}))G.call(e,a)&&E(t,a,e[a]);if(P)for(var a of P(e))X.call(e,a)&&E(t,a,e[a]);return t},_=(t,e)=>H(t,ee(e));var $=(t,e)=>{var a={};for(var r in t)G.call(t,r)&&e.indexOf(r)<0&&(a[r]=t[r]);if(t!=null&&P)for(var r of P(t))e.indexOf(r)<0&&X.call(t,r)&&(a[r]=t[r]);return a};var te=require("../../../../common/vendor.js"),z=require("../utils/util.js");class ae{constructor(e){const{Context:a,commonUtilMethods:r,commonDrawMethods:o}=e;this.Context=a,this.commonUtilMethods=r,this.commonDrawMethods=o}getDrawParams(e={},a=!0){const r=this.commonUtilMethods.getGlobalDataDrawParams(e),{src:o="",mode:c="aspectFill",triangle:s={},isCompressImage:n=!1,quality:i=100,drawSrc:d=!1,drawModeImage:m=!1,drawImageInfo:f=!1}=e,u=_(F({},r),{src:o,mode:c,drawType:e.drawType||"default",triangle:s,isCompressImage:n,quality:i,drawSrc:d,drawModeImage:m,drawImageInfo:f,drawImage:!0});return a?this.commonUtilMethods.conversionUnit(u):u}draw(e={},a=!0){const{Context:r,commonUtilMethods:o,commonDrawMethods:c}=this,{canvasWidth:s,is2d:n}=o;let g=this.getDrawParams(e,a),{w:i,src:d,windowAlign:m,drawModeImage:f,offsetRight:u,x:y}=g,p=$(g,["w","src","windowAlign","drawModeImage","offsetRight","x"]);return new Promise(async l=>{try{if(!/\S/.test(d))return l({success:!1,message:"\u56FE\u7247\u8DEF\u5F84\u4E3A\u7A7A"});if(!n){let M=await O(d);if(!M.success)return l(M);d=M.src}m!=="none"&&(y=c.computedCenterX(s,i,m,u));let w=f;if(!w&&(w=await L(d),!w.success))return l(w);const h=this.getImage(d),C=_(F({},p),{x:y,imageInfo:w,img:h,w:i,src:d,windowAlign:m,drawModeImage:f,offsetRight:u});if(n)h.onload=async()=>l(await this.drawImageByType(C));else return l(await this.drawImageByType(C))}catch(w){return l({success:!1,msg:"\u7ED8\u5236\u56FE\u7247\u51FA\u9519"+w})}})}drawImageByType(e){let{imageInfo:a,r,x:o,y:c,w:s,h:n,rotate:i,borderWidth:d,borderColor:m,color:f,alpha:u,borderType:y,triangle:p,mode:g,drawType:l,img:w,shadow:h,drawSrc:C,drawModeImage:M}=e;const{Context:x,commonDrawMethods:I,commonUtilMethods:Q}=this,{unit:R,pxToRpx:S}=Q;return new Promise(async V=>{n===0&&(n=s);let T=M;T||(T=K(Number(a.width),Number(a.height),o,c,s,n,g));const{dx:j,dy:q,dw:B,dh:k,sw:D,sh:b,sx:v,sy:N}=T;x.save(),x.beginPath(),l!=="triangle"&&I.setRotate(o,c,s,n,i);const U=async()=>{x.clip(),I.setAlpha(u),await this.drawImageContent(g,l,w,j,q,B,k,v,N,D,b),x.restore()};if(l=="default")I.setAlpha(u),await this.drawImageContent(g,l,w,j,q,B,k,v,N,D,b,o,c,s,n),x.clip(),x.restore();else if(l==="arc")I.drawParams.drawArc.draw({x:o,y:c,r:s/2,borderWidth:d,borderColor:m,color:f,drawImage:!0,shadow:h},!1),U();else if(l==="rect")g==="widthFix"?n=b:g==="heightFix"&&(s=D),I.drawParams.drawRect.draw({x:o,y:c,w:s,h:n,alpha:u,borderWidth:d,borderColor:m,borderType:y,r,color:f,drawImage:!0,shadow:h},!1),U();else if(l==="triangle"){let A=p.type||"isosceles",Y=p.coordinate||[],Z=p.direction||"top";A!=="custom"&&I.setTriangleRotate(o,c,s,n,i,A),I.drawParams.drawTriangle.draw({x:o,y:c,w:s,h:n,alpha:u,borderWidth:d,borderColor:m,color:f,coordinate:Y,direction:Z,drawType:A,drawImage:!0},!1),U()}return I.setAlpha(1),V({success:!0,w:R==="rpx"?S(s):s,h:R==="rpx"?S(n):n})})}drawImageContent(e,a,r,o,c,s,n,i,d,m,f,u,y,p,g){const{Context:l}=this;return new Promise(async w=>{a==="default"?await l.drawImage(r,u,y,p,g):e!=="default"?await l.drawImage(r,o,c,s,n,i,d,m,f):await l.drawImage(r,o,c,s,n),w(!0)})}getImage(e){const{commonUtilMethods:a}=this,{is2d:r,canvas:o}=a;if(r){const c=o.createImage();return c.src=e,c}else return e}}const K=(t,e,a,r,o,c,s)=>s==="aspectFit"?se(t,e,a,r,o,c):s==="aspectFill"?J(t,e,a,r,o,c):s==="widthFix"?re(t,e,a,r,o):s==="heightFix"?ne(t,e,a,r,o,c):s==="default"?{dw:o,dh:c,dx:a,dy:r}:J(t,e,a,r,o,c);function se(t,e,a,r,o,c){let s=e/t,n=o,i=s*n;return s>=1&&(s=t/e,i=c,n=s*i),{sw:n,sh:i,sx:a+(o-n)/2,sy:r+(c-i)/2,dw:t,dh:e,dx:0,dy:0}}function J(t,e,a,r,o,c){let s=e/t,n=o,i=s*n,d=0,m=(e-c*(e/i))/2;return s<1&&(s=t/e,i=c,n=s*i,m=0,d=(t-o*(t/n))/2),{sw:n,sh:i,sx:a,sy:r,dw:t,dh:e,dx:d,dy:m}}function re(t,e,a,r,o,c){let s=e/t,n=o,i=n*s;return{sw:n,sh:i,sx:a,sy:r,dw:t,dh:e,dx:0,dy:0}}function ne(t,e,a,r,o,c){let s=t/e,n=c;return{sw:n*s,sh:n,sx:a,sy:r,dw:t,dh:e,dx:0,dy:0}}const L=t=>new Promise(e=>{te.index.getImageInfo({src:t,success:a=>{e(F({success:!0},a))},fail:a=>{e({success:!1,msg:a})}})});function O(t){return new Promise(async e=>{if(t=await z.base64ToPathFn(t),t.includes("http")){const a=await z.downloadFile(t);if(!a.success)return e({success:!1,msg:`\u56FE\u7247\u8DEF\u5F84\u4E3A:${t}\u7684\u6587\u4EF6\u4E0B\u8F7D\u5931\u8D25`});t=a.data.tempFilePath}return e({success:!0,src:t})})}exports.DrawImage=ae;exports.getImageInfo=L;exports.getImageSrc=O;exports.getModeImage=K;

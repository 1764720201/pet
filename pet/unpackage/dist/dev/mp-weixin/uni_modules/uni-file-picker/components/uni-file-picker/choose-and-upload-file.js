"use strict";var p=require("../../../../common/vendor.js");const y="chooseAndUploadFile:ok",f="chooseAndUploadFile:fail";function x(e){const{count:t,sizeType:o=["original","compressed"],sourceType:n=["album","camera"],extension:r}=e;return new Promise((s,c)=>{p.index.chooseImage({count:t,sizeType:o,sourceType:n,extension:r,success(u){s(m(u,"image"))},fail(u){c({errMsg:u.errMsg.replace("chooseImage:fail",f)})}})})}function M(e){const{camera:t,compressed:o,maxDuration:n,sourceType:r=["album","camera"],extension:s}=e;return new Promise((c,u)=>{p.index.chooseVideo({camera:t,compressed:o,maxDuration:n,sourceType:r,extension:s,success(a){const{tempFilePath:l,duration:d,size:i,height:g,width:F}=a;c(m({errMsg:"chooseVideo:ok",tempFilePaths:[l],tempFiles:[{name:a.tempFile&&a.tempFile.name||"",path:l,size:i,type:a.tempFile&&a.tempFile.type||"",width:F,height:g,duration:d,fileType:"video",cloudPath:""}]},"video"))},fail(a){u({errMsg:a.errMsg.replace("chooseVideo:fail",f)})}})})}function P(e){const{count:t,extension:o}=e;return new Promise((n,r)=>{let s=p.index.chooseFile;if(typeof wx!="undefined"&&typeof wx.chooseMessageFile=="function"&&(s=wx.chooseMessageFile),typeof s!="function")return r({errMsg:f+" \u8BF7\u6307\u5B9A type \u7C7B\u578B\uFF0C\u8BE5\u5E73\u53F0\u4EC5\u652F\u6301\u9009\u62E9 image \u6216 video\u3002"});s({type:"all",count:t,extension:o,success(c){n(m(c))},fail(c){r({errMsg:c.errMsg.replace("chooseFile:fail",f)})}})})}function m(e,t){return e.tempFiles.forEach((o,n)=>{o.name||(o.name=o.path.substring(o.path.lastIndexOf("/")+1)),t&&(o.fileType=t),o.cloudPath=Date.now()+"_"+n+o.name.substring(o.name.lastIndexOf("."))}),e.tempFilePaths||(e.tempFilePaths=e.tempFiles.map(o=>o.path)),e}function w(e,t=5,o){e=JSON.parse(JSON.stringify(e));const n=e.length;let r=0,s=this;return new Promise(c=>{for(;r<t;)u();function u(){let a=r++;if(a>=n){!e.find(i=>!i.url&&!i.errMsg)&&c(e);return}const l=e[a],d=s.files.findIndex(i=>i.uuid===l.uuid);l.url="",delete l.errMsg,p.pn.uploadFile({filePath:l.path,cloudPath:l.cloudPath,fileType:l.fileType,onUploadProgress:i=>{i.index=d,o&&o(i)}}).then(i=>{l.url=i.fileID,l.index=d,a<n&&u()}).catch(i=>{l.errMsg=i.errMsg||i.message,l.index=d,a<n&&u()})}})}function h(e,{onChooseFile:t,onUploadProgress:o}){return e.then(n=>{if(t){const r=t(n);if(typeof r!="undefined")return Promise.resolve(r).then(s=>typeof s=="undefined"?n:s)}return n}).then(n=>n===!1?{errMsg:y,tempFilePaths:[],tempFiles:[]}:n)}function I(e={type:"all"}){return e.type==="image"?h(x(e),e):e.type==="video"?h(M(e),e):h(P(e),e)}exports.chooseAndUploadFile=I;exports.uploadCloudFiles=w;

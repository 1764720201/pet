"use strict";var e=Object.defineProperty,t=Object.defineProperties,o=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,i=(t,o,n)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[o]=n;exports.drawLine=class{constructor(e){const{Context:t,commonUtilMethods:o,commonDrawMethods:n}=e;this.Context=t,this.commonUtilMethods=o,this.commonDrawMethods=n}getDrawParams(e={},r=!0){const l=this.commonUtilMethods.getGlobalDataDrawParams(e),{algin:c="right",lineType:h="solid",pattern:p=[6,6],offset:m=6,lineCap:d="butt"}=e,f=(b=((e,t)=>{for(var o in t||(t={}))s.call(t,o)&&i(e,o,t[o]);if(n)for(var o of n(t))a.call(t,o)&&i(e,o,t[o]);return e})({},l),t(b,o({algin:c,lineType:h,pattern:p,offset:m,lineCap:d})));var b;return r?this.commonUtilMethods.conversionUnit(f):f}draw(e={},t=!0){const{Context:o,commonUtilMethods:n,commonDrawMethods:s}=this,{canvasWidth:a,is2d:i}=n;let{x:r,y:l,color:c,w:h,algin:p,alpha:m,lineType:d,pattern:f,offset:b,lineCap:w,lineWidth:g,windowAlign:D,offsetRight:y}=this.getDrawParams(e,t);switch(o.beginPath(),s.setAlpha(m),"dashed"===d&&(i?(o.setLineDash(f),o.lineDashOffset=b):o.setLineDash(f,b)),i?o.lineCap=w:o.setLineCap(w),s.setLineWidth(g),s.setStrokeStyle(c),p){case"right":"none"!==D&&(r=s.computedCenterX(a,h,D,y)),o.moveTo(r,l),o.lineTo(h+r,l);break;case"left":"none"!==D&&(r=s.computedCenterX(a,h,D,y)),o.moveTo(r,l),o.lineTo("none"==D?r-h:r+h,l);break;case"top":o.moveTo(r,l),o.lineTo(r,-(l+h));break;case"bottom":o.moveTo(r,l),o.lineTo(r,l+h)}o.stroke(),o.closePath(),i?(o.setLineDash([0,0]),o.lineDashOffset=0):o.setLineDash([0,0]),s.setAlpha(1)}};
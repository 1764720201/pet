"use strict";var e=require("../../../common/vendor.js");Array||e.resolveComponent("uni-search-bar")();const _=()=>"../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";Math||_();const u=e.defineComponent({__name:"index",setup(n){const r=e.getCurrentInstance(),a=o=>{e.index.showToast({title:"\u641C\u7D22\uFF1A"+o.value,icon:"none"})},c=o=>{var s;(s=r==null?void 0:r.proxy)==null||s.$Bus.emit("search",o.value)},t=()=>{var o;(o=r==null?void 0:r.proxy)==null||o.$Bus.emit("search","")};return(o,s)=>({a:e.o(a),b:e.o(c),c:e.o(t),d:e.p({radius:100})})}});var i=e._export_sfc(u,[["__scopeId","data-v-26cd2d23"],["__file","C:/Users/yzc/Desktop/pet/pages/Adopt/Search/index.vue"]]);wx.createComponent(i);

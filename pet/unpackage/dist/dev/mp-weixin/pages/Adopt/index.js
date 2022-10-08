"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Search + Swiper + Notice + List)();
}
const Search = () => "./Search/index.js";
const Swiper = () => "./Swiper/index.js";
const Notice = () => "./Notice/index.js";
const List = () => "./List/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Adopt/index.vue"]]);
wx.createPage(MiniProgramPage);

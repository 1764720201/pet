"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const image = common_vendor.ref();
    common_vendor.onLoad((option) => {
      image.value = option.image;
    });
    return (_ctx, _cache) => {
      return {
        a: image.value
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-048b7983"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/Daily/CatDaily/index.vue"]]);
wx.createPage(MiniProgramPage);

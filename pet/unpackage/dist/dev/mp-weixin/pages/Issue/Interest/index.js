"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_button2 = common_vendor.resolveComponent("tui-button");
  _easycom_tui_button2();
}
const _easycom_tui_button = () => "../../../node-modules/thorui-uni/lib/thorui/tui-button/tui-button.js";
if (!Math) {
  _easycom_tui_button();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const goAdoption = () => {
      common_vendor.index.navigateTo({
        url: "Adoption/index"
      });
    };
    const goFoundPet = () => {
      common_vendor.index.navigateTo({
        url: "FoundPet/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goAdoption),
        b: common_vendor.p({
          width: "140rpx",
          height: "60rpx",
          shape: "circle"
        }),
        c: common_vendor.o(goFoundPet),
        d: common_vendor.p({
          width: "140rpx",
          height: "60rpx",
          shape: "circle"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ed8d1748"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Issue/Interest/index.vue"]]);
wx.createComponent(Component);

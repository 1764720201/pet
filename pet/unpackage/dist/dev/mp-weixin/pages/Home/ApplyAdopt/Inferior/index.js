"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const goMessage = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 1300,
        duration: 300
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "chatboxes",
          size: 25
        }),
        b: common_vendor.o(goMessage),
        c: common_vendor.p({
          type: "star",
          size: 25,
          color: "#666"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/pet/pages/Home/ApplyAdopt/Inferior/index.vue"]]);
wx.createComponent(Component);

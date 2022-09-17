"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const search = (res) => {
      common_vendor.index.showToast({
        title: "\u641C\u7D22\uFF1A" + res.value,
        icon: "none"
      });
    };
    const blur = (e) => {
      var _a;
      (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$Bus.emit("search", e.value);
    };
    const cancel = () => {
      var _a;
      (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$Bus.emit("search", "");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(search),
        b: common_vendor.o(blur),
        c: common_vendor.o(cancel),
        d: common_vendor.p({
          radius: 100
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-26cd2d23"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Adopt/Search/index.vue"]]);
wx.createComponent(Component);

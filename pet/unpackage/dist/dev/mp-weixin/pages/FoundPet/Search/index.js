"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  mSearch();
}
const mSearch = () => "../../../components/mehaotian-search/mehaotian-search.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const goFoundPet = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Issue/FoundPet/index"
      });
    };
    const search = (e) => {
      var _a;
      (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$Bus.emit("found-search", e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(search),
        b: common_vendor.p({
          backgroundColor: "rgba(0,0,0,0)",
          show: false,
          placeholder: "\u8BF7\u8F93\u5165..."
        }),
        c: common_vendor.o(goFoundPet)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-74d34314"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/FoundPet/Search/index.vue"]]);
wx.createComponent(Component);

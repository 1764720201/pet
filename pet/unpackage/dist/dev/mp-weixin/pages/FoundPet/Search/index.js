"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  mSearch();
}
const mSearch = () => "../../../components/mehaotian-search/mehaotian-search.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const foundPet = common_vendor.ref();
    const db = common_vendor.pn.database();
    db.collection("images").where('title=="\u5BFB\u5BA0\u5217\u8868"').get().then((res) => {
      foundPet.value = res.result.data[0].image[0].path;
    });
    const instance = common_vendor.getCurrentInstance();
    const goFoundPet = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Issue/FoundPet/index"
      });
    };
    const search = (e) => {
      instance.proxy.$Bus.emit("found-search", e);
    };
    return (_ctx, _cache) => {
      return {
        a: foundPet.value,
        b: common_vendor.o(search),
        c: common_vendor.p({
          backgroundColor: "rgba(0,0,0,0)",
          show: false,
          placeholder: "\u8BF7\u8F93\u5165..."
        }),
        d: common_vendor.o(goFoundPet)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-74d34314"], ["__file", "C:/Users/yzc/Desktop/pet/pages/FoundPet/Search/index.vue"]]);
wx.createComponent(Component);

"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  _easycom_tui_icon2();
}
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
if (!Math) {
  _easycom_tui_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const image = common_vendor.ref();
    const db = common_vendor.pn.database();
    db.collection("images").where('title=="\u5438\u732B\u7684\u65E5\u5E38"').get().then((res) => {
      image.value = res.result.data[0].image[0].path;
    });
    const goCatDaily = () => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Daily/CatDaily/index?image=${image.value}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          size: 15,
          name: "arrowright"
        }),
        b: image.value,
        c: common_vendor.o(goCatDaily)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e9102a5"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/Daily/index.vue"]]);
wx.createComponent(Component);

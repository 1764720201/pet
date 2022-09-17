"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    petInfo: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const { petInfo } = common_vendor.toRefs(props);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(petInfo).img, (image, k0, i0) => {
          return {
            a: image.url,
            b: image.fileID
          };
        }),
        b: common_vendor.f(common_vendor.unref(petInfo).particular, (particular, k0, i0) => {
          return {
            a: common_vendor.t(particular),
            b: particular
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07ddc0c0"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/ApplyAdopt/PetAppearance/index.vue"]]);
wx.createComponent(Component);

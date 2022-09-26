"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    petInfo: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const alreadyAdopt = common_vendor.ref();
    const db = common_vendor.pn.database();
    common_vendor.onLoad(() => {
      db.collection("images").where("title=='\u5DF2\u9886\u517B'").get().then((res) => {
        alreadyAdopt.value = res.result.data[0].image[0].url;
      });
    });
    const { petInfo } = common_vendor.toRefs(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(petInfo).if_adopt
      }, !common_vendor.unref(petInfo).if_adopt ? {} : {
        b: alreadyAdopt.value
      }, {
        c: common_vendor.f(common_vendor.unref(petInfo).img, (image, k0, i0) => {
          return {
            a: image.url,
            b: image.fileID
          };
        }),
        d: common_vendor.f(common_vendor.unref(petInfo).particular, (particular, k0, i0) => {
          return {
            a: common_vendor.t(particular),
            b: particular
          };
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-334e9832"], ["__file", "C:/Users/yzc/Desktop/pet/pages/ApplyAdopt/PetAppearance/index.vue"]]);
wx.createComponent(Component);

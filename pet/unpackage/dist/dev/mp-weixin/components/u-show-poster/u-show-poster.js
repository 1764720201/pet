"use strict";
var common_vendor = require("../../common/vendor.js");
var uni_modules_sakuraCanvas_js_sdk_utils_util = require("../../uni_modules/sakura-canvas/js_sdk/utils/util.js");
require("../../uni_modules/sakura-canvas/js_sdk/plugins/image-tools.js");
if (!Array) {
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  _easycom_u_popup2();
}
const _easycom_u_popup = () => "../u-popup/u-popup.js";
if (!Math) {
  _easycom_u_popup();
}
const _sfc_main = {
  __name: "u-show-poster",
  props: {
    modelValue: Boolean,
    image: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emtis }) {
    const props = __props;
    const handleValue = () => emtis("update:modelValue", !props.modelValue);
    const saveImage = async () => {
      const res = await uni_modules_sakuraCanvas_js_sdk_utils_util.saveImageToPhotosAlbum(props.image);
      if (!res.success) {
        common_vendor.index.showToast({ title: "\u4FDD\u5B58\u56FE\u7247\u5931\u8D25!!!", icon: "none" });
        return;
      }
      handleValue();
    };
    return (_ctx, _cache) => {
      return {
        a: __props.image,
        b: common_vendor.o(saveImage),
        c: common_vendor.o(handleValue),
        d: common_vendor.p({
          show: __props.modelValue,
          background: "transparent"
        })
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5be78390"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/u-show-poster/u-show-poster.vue"]]);
wx.createComponent(Component);

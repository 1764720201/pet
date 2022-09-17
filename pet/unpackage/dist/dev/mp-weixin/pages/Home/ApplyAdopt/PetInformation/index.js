"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_tui_icon2 + _easycom_uni_dateformat2)();
}
const _easycom_tui_icon = () => "../../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_uni_dateformat = () => "../../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_tui_icon + _easycom_uni_dateformat)();
}
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
        a: common_vendor.t(common_vendor.unref(petInfo).pet_name),
        b: common_vendor.t(common_vendor.unref(petInfo).gender == "\u7537\u751F" ? "\u2642" : "\u2640"),
        c: common_vendor.t(common_vendor.unref(petInfo).pet_name),
        d: common_vendor.t(common_vendor.unref(petInfo).age),
        e: common_vendor.t(common_vendor.unref(petInfo).variety),
        f: common_vendor.t(common_vendor.unref(petInfo).gender),
        g: common_vendor.t(common_vendor.unref(petInfo).city[1]),
        h: common_vendor.t(common_vendor.unref(petInfo).city[2]),
        i: common_vendor.t(common_vendor.unref(petInfo).punch ? common_vendor.unref(petInfo).punch : "\u672A\u8BBE\u7F6E"),
        j: common_vendor.t(common_vendor.unref(petInfo).story),
        k: common_vendor.f(common_vendor.unref(petInfo).request, (request, k0, i0) => {
          return {
            a: common_vendor.t(request),
            b: request
          };
        }),
        l: common_vendor.p({
          name: "clock",
          size: 15
        }),
        m: common_vendor.p({
          date: common_vendor.unref(petInfo).issue_time,
          format: "yyyy-MM-dd hh:mm:ss"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-06ff5046"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/ApplyAdopt/PetInformation/index.vue"]]);
wx.createComponent(Component);

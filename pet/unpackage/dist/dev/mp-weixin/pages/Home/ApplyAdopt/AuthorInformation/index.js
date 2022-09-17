"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  (_easycom_uni_icons2 + _easycom_tui_icon2)();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_tui_icon = () => "../../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_tui_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    petInfo: { type: Object, required: true },
    userInfo: { type: Object, required: true },
    adopting: { type: Number, required: true },
    already: { type: Number, required: true }
  },
  setup(__props) {
    const props = __props;
    const { petInfo, userInfo, adopting, already } = common_vendor.toRefs(props);
    const callPhone = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: petInfo.value.phone
      });
    };
    const copyWxCode = () => {
      common_vendor.index.setClipboardData({
        data: petInfo.value.wx_code,
        success: function() {
          common_vendor.index.showToast({
            title: "\u6210\u529F\u590D\u5236\u5FAE\u4FE1\u53F7"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userInfo).imgURL,
        b: common_vendor.t(common_vendor.unref(userInfo).nickname),
        c: common_vendor.t(common_vendor.unref(adopting)),
        d: common_vendor.t(common_vendor.unref(already)),
        e: common_vendor.p({
          type: "chat",
          size: 22,
          color: "white"
        }),
        f: common_vendor.o(callPhone),
        g: common_vendor.p({
          name: "voipphone"
        }),
        h: common_vendor.o(copyWxCode),
        i: common_vendor.p({
          name: "wechat"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-036300de"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/ApplyAdopt/AuthorInformation/index.vue"]]);
wx.createComponent(Component);

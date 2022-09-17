"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      uid: 0
    });
    common_vendor.onShow(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
    });
    common_vendor.onLoad(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
      if (userInfo.uid == 0) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      }
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/pet/pages/Message/News/index.vue"]]);
wx.createComponent(Component);

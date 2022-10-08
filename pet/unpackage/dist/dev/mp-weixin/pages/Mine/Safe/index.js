"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const db = common_vendor.pn.database();
    const mobile = common_vendor.ref();
    common_vendor.onLoad(() => {
      db.collection(`uni-id-users`).where(`_id=='${userId}'`).field("mobile").get({ getOne: true }).then((res) => {
        mobile.value = res.result.data.mobile;
      });
    });
    const bindPhone = () => {
      if (!mobile.value) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile"
        });
      } else {
        common_vendor.index.showToast({
          title: "\u4F60\u5DF2\u7ECF\u7ED1\u5B9A\u4E86\u624B\u673A\u53F7!",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(bindPhone)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-75af31a3"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Mine/Safe/index.vue"]]);
wx.createComponent(Component);

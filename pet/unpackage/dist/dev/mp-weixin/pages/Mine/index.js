"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  (PersonalInformation + Request + Safe)();
}
const PersonalInformation = () => "./PersonalInformation/index.js";
const Request = () => "./Request/index.js";
const Safe = () => "./Safe/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      uid: 0
    });
    common_vendor.onShow(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
    });
    common_vendor.provide("userId", userInfo.uid);
    const db = common_vendor.pn.database();
    const collect = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
      if (!userInfo.uid) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      } else {
        db.collection("collect").where(`user_id=='${userInfo.uid}'`).field("_id").get().then((res) => {
          collect.value = res.result.data;
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          userInfo,
          collect: collect.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/pet/pages/Mine/index.vue"]]);
wx.createPage(MiniProgramPage);

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
    const userId = common_vendor.ref();
    const db = common_vendor.pn.database();
    const hasLogin = common_vendor.ref(false);
    const checkLogin = async () => {
      await db.collection("uni-id-users").where("_id==$cloudEnv_uid").get({ getOne: true }).then((res) => {
        userId.value = res.result.data._id;
        hasLogin.value = true;
      }).catch(() => {
        hasLogin.value = false;
      });
    };
    const collect = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      await checkLogin();
      if (!hasLogin.value) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      } else {
        db.collection("collect").where(`user_id=='${userId.value}'`).field("_id").get().then((res) => {
          collect.value = res.result.data;
        });
      }
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Mine/index.vue"]]);
wx.createPage(MiniProgramPage);

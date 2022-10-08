"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Received + News)();
}
const Received = () => "./Received/index.js";
const News = () => "./News/index.js";
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
    common_vendor.onShow(async () => {
      db.collection("chat").where(`to_uid==$cloudEnv_uid&&is_read==false`).count().then((res) => {
        if (!res.result.total) {
          common_vendor.index.removeTabBarBadge({
            index: 3
          });
        }
      });
      await checkLogin();
      if (!hasLogin.value) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          hasLogin: hasLogin.value,
          userId: userId.value
        }),
        b: common_vendor.p({
          hasLogin: hasLogin.value,
          userId: userId.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Message/index.vue"]]);
wx.createPage(MiniProgramPage);

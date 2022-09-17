"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  _easycom_unicloud_db2();
}
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  _easycom_unicloud_db();
}
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
      if (!userInfo.uid) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data
        }, s0, i0) => {
          var _a;
          return {
            a: common_vendor.t(data == null ? void 0 : data.nickname),
            b: (_a = data == null ? void 0 : data.avatar_file) == null ? void 0 : _a.url,
            c: i0,
            d: s0
          };
        }, {
          name: "d",
          path: "a",
          vueId: "1751d24c-0"
        }),
        b: common_vendor.p({
          collection: "uni-id-users",
          field: "nickname,avatar_file",
          getone: true,
          where: `_id == '${userInfo.uid}'`
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1751d24c"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Mine/PersonalInformation/index.vue"]]);
wx.createComponent(Component);

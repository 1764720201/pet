"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_lgd_tab2 = common_vendor.resolveComponent("lgd-tab");
  _easycom_lgd_tab2();
}
const _easycom_lgd_tab = () => "../../../../uni_modules/lgd-tab/components/lgd-tab/lgd-tab.js";
if (!Math) {
  (_easycom_lgd_tab + Found)();
}
const Found = () => "../../../../components/Tab/Found/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const tabValue = common_vendor.reactive(["\u5DF2\u53D1\u5E03", "\u5DF2\u627E\u56DE"]);
    const tabIndex = common_vendor.ref(0);
    const where = common_vendor.ref();
    const getIndex = (e) => {
      tabIndex.value = e;
      switch (e) {
        case 0:
          where.value = `user_id=='${userId}'&&state=='\u5DF2\u53D1\u5E03'`;
          break;
        case 1:
          where.value = `user_id=='${userId}'&&state=='\u5DF2\u627E\u56DE'`;
          break;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getIndex),
        b: common_vendor.p({
          tabValue,
          tabIndex: tabIndex.value,
          textColor: "#ec8a9e ",
          underlineColor: "#ec8a9e"
        }),
        c: common_vendor.p({
          where: where.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/pet/pages/Mine/Request/Found/index.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_lgd_tab2 = common_vendor.resolveComponent("lgd-tab");
  _easycom_lgd_tab2();
}
const _easycom_lgd_tab = () => "../../../../uni_modules/lgd-tab/components/lgd-tab/lgd-tab.js";
if (!Math) {
  (_easycom_lgd_tab + Apply)();
}
const Apply = () => "../../../../components/Tab/Apply/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const tabValue = common_vendor.reactive(["\u7533\u8BF7\u4E2D", "\u9886\u517B\u6210\u529F", "\u5DF2\u53D6\u6D88", "\u88AB\u62D2\u7EDD"]);
    const tabIndex = common_vendor.ref(0);
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const where = common_vendor.ref(`state=='\u7533\u8BF7\u4E2D'&&user_id=='${userId}'`);
    const getIndex = (e) => {
      tabIndex.value = e;
      switch (e) {
        case 0:
          where.value = `state=='\u7533\u8BF7\u4E2D'&&user_id=='${userId}'`;
          break;
        case 1:
          where.value = `state=='\u9001\u517B\u6210\u529F'&&user_id=='${userId}'`;
          break;
        case 2:
          where.value = `state=='\u5DF2\u53D6\u6D88'&&user_id=='${userId}'`;
          break;
        case 3:
          where.value = `state=='\u5DF2\u62D2\u7EDD'&&user_id=='${userId}'`;
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Mine/Request/Apply/index.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_lgd_tab2 = common_vendor.resolveComponent("lgd-tab");
  _easycom_lgd_tab2();
}
const _easycom_lgd_tab = () => "../../../../uni_modules/lgd-tab/components/lgd-tab/lgd-tab.js";
if (!Math) {
  (_easycom_lgd_tab + CatDaily)();
}
const CatDaily = () => "../../../../components/Tab/CatDaily/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const tabValue = common_vendor.reactive(["\u63A8\u8350", "\u7EFC\u5408"]);
    const tabIndex = common_vendor.ref(1);
    const orderby = common_vendor.ref("create_time");
    const getIndex = (e) => {
      switch (e) {
        case 0:
          orderby.value = "read";
          break;
        case 1:
          orderby.value = "create_time";
          break;
      }
    };
    const goParticipation = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Home/Daily/Participation/index"
      });
    };
    const goMyTopic = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Home/Daily/MyTopic/index"
      });
    };
    const db = common_vendor.pn.database();
    const readQuantity = common_vendor.ref(0);
    const disscussQuantity = common_vendor.ref(0);
    common_vendor.onShow(() => {
      db.collection("topic").field("read").get({
        getCount: true
      }).then((res) => {
        disscussQuantity.value = res.result.count;
        readQuantity.value = res.result.data.map((value) => {
          return value.read;
        }).reduce((pre, cur) => {
          return pre + cur;
        }, 0);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(readQuantity.value),
        b: common_vendor.t(disscussQuantity.value),
        c: common_vendor.o(getIndex),
        d: common_vendor.p({
          tabValue,
          tabIndex: tabIndex.value,
          textColor: "#ec9312 ",
          underlineColor: "#ec9312"
        }),
        e: common_vendor.p({
          orderby: orderby.value
        }),
        f: common_vendor.o(goMyTopic),
        g: common_vendor.o(goParticipation)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-048b7983"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Home/Daily/CatDaily/index.vue"]]);
wx.createPage(MiniProgramPage);

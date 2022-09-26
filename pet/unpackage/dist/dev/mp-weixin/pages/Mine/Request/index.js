"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const adoptQuantity = common_vendor.ref(0);
    const applyQuantity = common_vendor.ref(0);
    const receiveQuantity = common_vendor.ref(0);
    const foundQuantity = common_vendor.ref(0);
    common_vendor.onShow(async () => {
      const userId = common_vendor.pn.getCurrentUserInfo().uid;
      const db = common_vendor.pn.database();
      await db.collection("apply").where(`user_id=='${userId}'`).get().then((res) => {
        applyQuantity.value = res.result.data.length;
      });
      await db.collection("adoption").where(`user_id=='${userId}'`).get().then((res) => {
        adoptQuantity.value = res.result.data.length;
      });
      const adoption = db.collection("adoption").where(`user_id=='${userId}'`).getTemp();
      await db.collection(adoption, "apply").get().then((res) => {
        receiveQuantity.value = 0;
        res.result.data.forEach((item) => {
          item._id.apply.forEach((apply) => {
            if (apply) {
              receiveQuantity.value++;
            }
          });
        });
      });
      await db.collection("foundPet").where(`user_id=='${userId}'`).get().then((res) => {
        foundQuantity.value = res.result.data.length;
      });
    });
    const goApply = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Mine/Request/Apply/index"
      });
    };
    const goIssue = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Mine/Request/Issue/index"
      });
    };
    const goReceive = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Mine/Request/Receive/index"
      });
    };
    const goFound = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Mine/Request/Found/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(adoptQuantity.value),
        b: common_vendor.o(goIssue),
        c: common_vendor.t(applyQuantity.value),
        d: common_vendor.o(goApply),
        e: common_vendor.t(receiveQuantity.value),
        f: common_vendor.o(goReceive),
        g: common_vendor.t(foundQuantity.value),
        h: common_vendor.o(goFound)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-130bcdcf"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Mine/Request/index.vue"]]);
wx.createComponent(Component);

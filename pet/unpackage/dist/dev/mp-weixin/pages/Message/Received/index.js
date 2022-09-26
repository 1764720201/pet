"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const db = common_vendor.pn.database();
    const commentQuantity = common_vendor.ref(0);
    const collectQuantity = common_vendor.ref(0);
    const goMyComment = () => {
      common_vendor.index.navigateTo({
        url: "./MyComment/index"
      });
    };
    const goMyCollect = () => {
      common_vendor.index.navigateTo({
        url: "./MyCollect/index"
      });
    };
    const getQuantity = (res, option) => {
      res.result.data.forEach((value) => {
        if (option == "collect") {
          value._id.collect.forEach((collect) => {
            if (collect) {
              collectQuantity.value++;
            }
          });
        } else if (option == "comment") {
          value._id.comment.forEach((comment) => {
            if (comment) {
              commentQuantity.value++;
            }
          });
        }
      });
    };
    common_vendor.onLoad(async () => {
      const adoption = db.collection("adoption").where(`user_id=='${userId}'`).field("_id").getTemp();
      const foundPet = db.collection("foundPet").where(`user_id=='${userId}'`).field("_id").getTemp();
      db.collection(adoption, "comment").get().then((res) => {
        getQuantity(res, "comment");
      }).then(() => {
        db.collection(foundPet, "comment").get().then((res) => {
          getQuantity(res, "comment");
        });
      });
      db.collection(adoption, "collect").get().then((res) => {
        getQuantity(res, "collect");
      }).then(() => {
        db.collection(foundPet, "collect").get().then((res) => {
          getQuantity(res, "collect");
        });
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(collectQuantity.value),
        b: common_vendor.o(goMyCollect),
        c: common_vendor.t(commentQuantity.value),
        d: common_vendor.o(goMyComment)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5cad1fb6"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Message/Received/index.vue"]]);
wx.createComponent(Component);

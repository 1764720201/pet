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
  __name: "FoundPet",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const goPet = (foundId) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Enlightenment/index?id=${foundId}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data
        }, s0, i0) => {
          return {
            a: common_vendor.f(data, (found, k1, i1) => {
              return {
                a: common_vendor.w(({
                  data: data2
                }, s2, i2) => {
                  return common_vendor.e({
                    a: data2 == null ? void 0 : data2.title
                  }, (data2 == null ? void 0 : data2.title) ? {
                    b: data2 == null ? void 0 : data2.uploadPicture[0].url,
                    c: common_vendor.t(data2 == null ? void 0 : data2.title),
                    d: common_vendor.t(data2 == null ? void 0 : data2.variety),
                    e: common_vendor.o(($event) => goPet(found.found_id))
                  } : {}, {
                    f: i2,
                    g: s2
                  });
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("a[" + i1 + "].") + "a",
                  vueId: "9cc1e252-1-" + i0 + "-" + i1 + ",9cc1e252-0"
                }),
                b: "9cc1e252-1-" + i0 + "-" + i1 + ",9cc1e252-0",
                c: common_vendor.p({
                  collection: "foundPet",
                  where: `_id=='${found.found_id}'`,
                  getone: true
                }),
                d: found._id
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "d",
          path: "a",
          vueId: "9cc1e252-0"
        }),
        b: common_vendor.p({
          collection: "collect",
          where: `user_id=='${common_vendor.unref(userId)}'&&type==1`,
          field: "found_id,_id"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9cc1e252"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/Tab/Collect/FoundPet.vue"]]);
wx.createComponent(Component);

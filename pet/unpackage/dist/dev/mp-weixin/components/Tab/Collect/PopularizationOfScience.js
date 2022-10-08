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
  __name: "PopularizationOfScience",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const goPet = (petId) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/EncylopediaDetail/index?petId=${petId}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data
        }, s0, i0) => {
          return {
            a: common_vendor.f(data, (pet, k1, i1) => {
              return {
                a: common_vendor.w(({
                  data: data2
                }, s2, i2) => {
                  return {
                    a: data2 == null ? void 0 : data2.coverURL,
                    b: common_vendor.t(data2 == null ? void 0 : data2.name),
                    c: common_vendor.t(data2 == null ? void 0 : data2.characters),
                    d: i2,
                    e: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("a[" + i1 + "].") + "a",
                  vueId: "a8fe5390-1-" + i0 + "-" + i1 + ",a8fe5390-0"
                }),
                b: "a8fe5390-1-" + i0 + "-" + i1 + ",a8fe5390-0",
                c: common_vendor.p({
                  collection: "pet",
                  where: `_id=='${pet == null ? void 0 : pet.pet_id}'`,
                  getone: true
                }),
                d: pet._id,
                e: common_vendor.o(($event) => goPet(pet.pet_id), pet._id)
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "d",
          path: "a",
          vueId: "a8fe5390-0"
        }),
        b: common_vendor.p({
          collection: "collect",
          where: `user_id=='${common_vendor.unref(userId)}'&&type==3`,
          field: "pet_id,_id"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8fe5390"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/Tab/Collect/PopularizationOfScience.vue"]]);
wx.createComponent(Component);

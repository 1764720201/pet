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
  __name: "Adopt",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const goAdopt = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/index?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          loading,
          error,
          options
        }, s0, i0) => {
          return {
            a: common_vendor.f(data, (adopt, k1, i1) => {
              return {
                a: common_vendor.w(({
                  data: data2,
                  loading: loading2,
                  error: error2,
                  options: options2
                }, s2, i2) => {
                  var _a;
                  return {
                    a: (_a = data2 == null ? void 0 : data2.img[0]) == null ? void 0 : _a.url,
                    b: common_vendor.t(data2 == null ? void 0 : data2.pet_name),
                    c: common_vendor.t(data2 == null ? void 0 : data2.variety),
                    d: i2,
                    e: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("a[" + i1 + "].") + "a",
                  vueId: "8190c5f4-1-" + i0 + "-" + i1 + ",8190c5f4-0"
                }),
                b: "8190c5f4-1-" + i0 + "-" + i1 + ",8190c5f4-0",
                c: common_vendor.p({
                  collection: "adoption",
                  where: `_id=='${adopt == null ? void 0 : adopt.adopt_id}'`,
                  getone: true
                }),
                d: adopt._id,
                e: common_vendor.o(($event) => goAdopt(adopt.adopt_id), adopt._id)
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "d",
          path: "a",
          vueId: "8190c5f4-0"
        }),
        b: common_vendor.p({
          collection: "collect",
          where: `user_id=='${common_vendor.unref(userId)}'&&type==0`,
          field: "adopt_id,_id"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8190c5f4"], ["__file", "C:/Users/yzc/Desktop/pet/components/Tab/Collect/Adopt.vue"]]);
wx.createComponent(Component);

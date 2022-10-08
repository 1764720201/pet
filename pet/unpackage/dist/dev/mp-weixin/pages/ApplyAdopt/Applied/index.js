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
  props: {
    applyList: { type: Array, required: true }
  },
  setup(__props) {
    const props = __props;
    const { applyList } = common_vendor.toRefs(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(applyList).length
      }, common_vendor.unref(applyList).length ? {
        b: common_vendor.t(common_vendor.unref(applyList).length),
        c: common_vendor.f(common_vendor.unref(applyList), (appliedDetail, k0, i0) => {
          return {
            a: common_vendor.w(({
              data
            }, s1, i1) => {
              var _a;
              return {
                a: (_a = data == null ? void 0 : data.avatar_file) == null ? void 0 : _a.url,
                b: common_vendor.t(data == null ? void 0 : data.nickname),
                c: i1,
                d: s1
              };
            }, {
              name: "d",
              path: "c[" + i0 + "].a",
              vueId: "064ee84c-0-" + i0
            }),
            b: "064ee84c-0-" + i0,
            c: common_vendor.p({
              collection: "uni-id-users",
              where: `_id=='${appliedDetail == null ? void 0 : appliedDetail.user_id}'`,
              field: "nickname,avatar_file",
              getone: true
            }),
            d: appliedDetail == null ? void 0 : appliedDetail._id
          };
        })
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-064ee84c"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/ApplyAdopt/Applied/index.vue"]]);
wx.createComponent(Component);

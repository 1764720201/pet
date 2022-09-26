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
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const collectQuantity = common_vendor.ref();
    const db = common_vendor.pn.database();
    const footprintQuantity = common_vendor.ref();
    common_vendor.onShow(() => {
      db.collection("collect").where(`user_id=='${userId}'`).get().then((res) => {
        collectQuantity.value = res.result.data.length;
      });
      db.collection("footprint").where(`user_id=='${userId}'`).field("adopt_id,found_id").orderBy("create_time", "desc").distinct().get().then((res) => {
        footprintQuantity.value = res.result.data.length;
      });
    });
    const goCollect = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Mine/PersonalInformation/Collect/index"
      });
    };
    const goFootPrint = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Mine/PersonalInformation/Footprint/index"
      });
    };
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
        b: common_vendor.t(collectQuantity.value ? collectQuantity.value : 0),
        c: common_vendor.o(goCollect),
        d: common_vendor.t(footprintQuantity.value ? footprintQuantity.value : 0),
        e: common_vendor.o(goFootPrint),
        f: common_vendor.p({
          collection: "uni-id-users",
          field: "nickname,avatar_file",
          getone: true,
          where: `_id == '${common_vendor.unref(userId)}'`
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1751d24c"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Mine/PersonalInformation/index.vue"]]);
wx.createComponent(Component);

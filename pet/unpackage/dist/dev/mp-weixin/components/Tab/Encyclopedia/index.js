"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    where: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const udb = common_vendor.ref(null);
    const { where } = common_vendor.toRefs(props);
    const goEncyclopediaDetail = (petId) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/EncylopediaDetail/index?petId=${petId}`
      });
    };
    common_vendor.onPullDownRefresh(() => {
      var _a;
      (_a = udb.value) == null ? void 0 : _a.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      var _a;
      (_a = udb.value) == null ? void 0 : _a.loadMore();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          pagination,
          loading,
          error,
          hasMore
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : {
            c: common_vendor.f(data, (pet, k1, i1) => {
              return {
                a: pet.coverURL,
                b: common_vendor.t(pet.name),
                c: common_vendor.o(($event) => goEncyclopediaDetail(pet._id))
              };
            })
          }, {
            d: loading
          }, loading ? {
            e: "d55aa750-1-" + i0 + ",d55aa750-0",
            f: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            g: hasMore && !loading
          }, hasMore && !loading ? {
            h: "d55aa750-2-" + i0 + ",d55aa750-0",
            i: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            k: "d55aa750-3-" + i0 + ",d55aa750-0",
            l: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            j: !hasMore && !loading,
            m: i0,
            n: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "d55aa750-0"
        }),
        b: common_vendor.sr(udb, "d55aa750-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          where: common_vendor.unref(where),
          collection: "pet",
          field: "_id,pettype,name,coverURL",
          getone: false,
          ["page-size"]: 18
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d55aa750"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/Tab/Encyclopedia/index.vue"]]);
wx.createComponent(Component);

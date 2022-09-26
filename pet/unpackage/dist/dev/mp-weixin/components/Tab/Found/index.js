"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_icons2 + _easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    where: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const udb = common_vendor.ref(null);
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
    });
    const { where } = common_vendor.toRefs(props);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          pagination,
          loading,
          error,
          options,
          hasMore
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : {
            c: common_vendor.f(data, (found, k1, i1) => {
              return {
                a: found.uploadPicture[0].path,
                b: common_vendor.t(found.title),
                c: common_vendor.t(found.introduce),
                d: "e7423340-1-" + i0 + "-" + i1 + ",e7423340-0",
                e: found._id
              };
            }),
            d: common_vendor.p({
              type: "more-filled",
              size: "30",
              color: "#b4b4b4"
            })
          }, {
            e: loading
          }, loading ? {
            f: "e7423340-2-" + i0 + ",e7423340-0",
            g: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            h: hasMore && !loading
          }, hasMore && !loading ? {
            i: "e7423340-3-" + i0 + ",e7423340-0",
            j: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            l: "e7423340-4-" + i0 + ",e7423340-0",
            m: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            k: !hasMore && !loading,
            n: i0,
            o: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "e7423340-0"
        }),
        b: common_vendor.sr(udb, "e7423340-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          collection: "foundPet",
          ["page-size"]: 5,
          getone: false,
          where: common_vendor.unref(where),
          field: "_id,uploadPicture,title,state,introduce"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e7423340"], ["__file", "C:/Users/yzc/Desktop/pet/components/Tab/Found/index.vue"]]);
wx.createComponent(Component);

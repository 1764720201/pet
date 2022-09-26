"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_unicloud_db2 + _easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_unicloud_db + _easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    where: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { where } = common_vendor.toRefs(props);
    const udb = common_vendor.ref(null);
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
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
          } : common_vendor.e({
            c: common_vendor.f(data, (adopt, k1, i1) => {
              return {
                a: adopt.img[0].path,
                b: common_vendor.t(adopt.pet_name),
                c: common_vendor.w(({
                  data: data2
                }, s2, i2) => {
                  return {
                    a: common_vendor.t(data2.length),
                    b: i2,
                    c: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("c[" + i1 + "].") + "c",
                  vueId: "0f2276f7-1-" + i0 + "-" + i1 + ",0f2276f7-0"
                }),
                d: "0f2276f7-1-" + i0 + "-" + i1 + ",0f2276f7-0",
                e: common_vendor.p({
                  where: `adopt_id=='${adopt._id}'`,
                  collection: "comment"
                }),
                f: common_vendor.f(adopt.medical, (medical, k2, i2) => {
                  return {
                    a: common_vendor.t(medical)
                  };
                }),
                g: "0f2276f7-2-" + i0 + "-" + i1 + ",0f2276f7-0",
                h: adopt._id
              };
            }),
            d: common_vendor.p({
              type: "more-filled",
              size: "30",
              color: "#b4b4b4"
            }),
            e: loading
          }, loading ? {
            f: "0f2276f7-3-" + i0 + ",0f2276f7-0",
            g: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            h: hasMore && !loading
          }, hasMore && !loading ? {
            i: "0f2276f7-4-" + i0 + ",0f2276f7-0",
            j: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            l: "0f2276f7-5-" + i0 + ",0f2276f7-0",
            m: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            k: !hasMore && !loading
          }), {
            n: i0,
            o: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "0f2276f7-0"
        }),
        b: common_vendor.sr(udb, "0f2276f7-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          collection: "adoption",
          orderby: "issue_time desc",
          getone: false,
          field: "_id,pet_name,img,if_adopt,medical",
          where: common_vendor.unref(where),
          ["page-size"]: 5
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f2276f7"], ["__file", "C:/Users/yzc/Desktop/pet/components/Tab/Issue/index.vue"]]);
wx.createComponent(Component);

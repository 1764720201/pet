"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_unicloud_db2 + _easycom_uni_load_more2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_unicloud_db + _easycom_uni_load_more + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    where: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const { where } = common_vendor.toRefs(props);
    const ifApply = common_vendor.ref(true);
    common_vendor.watch(() => where.value, () => {
      if (where.value != `state=='\u7533\u8BF7\u4E2D'&&user_id=='${userId}'`) {
        ifApply.value = false;
      } else {
        ifApply.value = true;
      }
    });
    const db = common_vendor.pn.database();
    const goApplyDetail = (inApplyId) => {
      common_vendor.index.navigateTo({
        url: `/pages/Mine/Request/Apply/ApplyDetail/index?inApplyId=${inApplyId}`
      });
    };
    const udb = common_vendor.ref(null);
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
    });
    const goApply = (adoptId) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/Apply/index?adoptId=${adoptId}`
      });
    };
    const alertDialog = common_vendor.ref(null);
    const applyId = common_vendor.ref();
    const cancelApply = (id) => {
      var _a;
      applyId.value = id;
      (_a = alertDialog.value) == null ? void 0 : _a.open("center");
    };
    common_vendor.ref([]);
    const dialogConfirm = async () => {
      await db.collection("apply").where(`_id=='${applyId.value}'`).update({
        state: "\u5DF2\u53D6\u6D88"
      }).then(() => {
        udb.value.refresh();
        common_vendor.index.showToast({
          title: "\u6210\u529F\u53D6\u6D88\u8BE5\u7533\u8BF7",
          icon: "none"
        });
      });
    };
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
          } : common_vendor.e({
            c: common_vendor.f(data, (inApply, k1, i1) => {
              return {
                a: common_vendor.w(({
                  data: data2,
                  loading: loading2,
                  error: error2,
                  options: options2
                }, s2, i2) => {
                  return common_vendor.e({
                    a: error2
                  }, error2 ? {
                    b: common_vendor.t(error2.message)
                  } : common_vendor.e({
                    c: data2 == null ? void 0 : data2.img[0].url,
                    d: common_vendor.t(data2 == null ? void 0 : data2.pet_name),
                    e: common_vendor.t(data2 == null ? void 0 : data2.variety),
                    f: ifApply.value
                  }, ifApply.value ? {
                    g: common_vendor.o(($event) => goApply(data2 == null ? void 0 : data2._id))
                  } : {}, {
                    h: common_vendor.o(($event) => goApplyDetail(inApply._id)),
                    i: ifApply.value
                  }, ifApply.value ? {
                    j: common_vendor.o(($event) => cancelApply(inApply._id))
                  } : {}), {
                    k: i2,
                    l: s2
                  });
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("c[" + i1 + "].") + "a",
                  vueId: "2bc3db4c-1-" + i0 + "-" + i1 + ",2bc3db4c-0"
                }),
                b: "2bc3db4c-1-" + i0 + "-" + i1 + ",2bc3db4c-0",
                c: common_vendor.p({
                  collection: "adoption",
                  field: "_id,pet_name,img,variety,adopt_id",
                  getone: true,
                  where: `_id=='${inApply.adopt_id}'`
                }),
                d: inApply._id
              };
            }),
            d: loading
          }, loading ? {
            e: "2bc3db4c-2-" + i0 + ",2bc3db4c-0",
            f: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            g: hasMore && !loading
          }, hasMore && !loading ? {
            h: "2bc3db4c-3-" + i0 + ",2bc3db4c-0",
            i: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            k: "2bc3db4c-4-" + i0 + ",2bc3db4c-0",
            l: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            j: !hasMore && !loading
          }), {
            m: i0,
            n: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "2bc3db4c-0"
        }),
        b: common_vendor.sr(udb, "2bc3db4c-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          collection: "apply",
          ["page-size"]: 5,
          getone: false,
          where: common_vendor.unref(where)
        }),
        d: common_vendor.o(dialogConfirm),
        e: common_vendor.p({
          type: "warn",
          cancelText: "\u5173\u95ED",
          confirmText: "\u786E\u5B9A\u53D6\u6D88",
          title: "\u901A\u77E5",
          content: "\u4F60\u786E\u5B9A\u8981\u53D6\u6D88\u9886\u517B\u8BE5\u5BA0\u7269\u5417"
        }),
        f: common_vendor.sr(alertDialog, "2bc3db4c-5", {
          "k": "alertDialog"
        }),
        g: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2bc3db4c"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/Tab/Apply/index.vue"]]);
wx.createComponent(Component);

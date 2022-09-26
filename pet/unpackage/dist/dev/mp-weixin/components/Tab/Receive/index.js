"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_unicloud_db2 + _easycom_uni_load_more2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_unicloud_db + _easycom_uni_load_more + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    state: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { state } = common_vendor.toRefs(props);
    const udb = common_vendor.ref(null);
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const goProposerDetail = (applyId2) => {
      common_vendor.index.navigateTo({
        url: `/pages/Mine/Request/Receive/ProposerDetail/index?applyId=${applyId2}`
      });
    };
    const db = common_vendor.pn.database();
    let apply = common_vendor.reactive([]);
    const allow = common_vendor.ref(null);
    const refuse = common_vendor.ref(null);
    const cancel = common_vendor.ref(null);
    const applyId = common_vendor.ref();
    const adoptId = common_vendor.ref();
    const confirmAllow = () => {
      db.collection("apply").where(`_id=='${applyId.value}'`).update({
        state: "\u9001\u517B\u6210\u529F"
      }).then(() => {
        db.collection("adoption").where(`_id=='${adoptId.value}'`).update({
          if_adopt: true
        });
      }).then(() => {
        udb.value.refresh();
        common_vendor.index.showToast({
          title: "\u5DF2\u6210\u529F\u9001\u517B"
        });
      });
    };
    const confirmRefuse = () => {
      db.collection("apply").where(`_id=='${applyId.value}'`).update({
        state: "\u5DF2\u62D2\u7EDD"
      }).then(() => {
        udb.value.refresh();
        common_vendor.index.showToast({
          title: "\u5DF2\u6210\u529F\u62D2\u7EDD"
        });
      });
    };
    const confirmCancel = () => {
      db.collection("apply").where(`_id=='${applyId.value}'`).update({
        state: "\u5DF2\u53D6\u6D88"
      }).then(() => {
        udb.value.refresh();
        common_vendor.index.showToast({
          title: "\u5DF2\u6210\u529F\u53D6\u6D88"
        });
      });
    };
    const allowAdopt = (apply_id, adopt_id) => {
      applyId.value = apply_id;
      adoptId.value = adopt_id;
      allow.value.open("center");
    };
    const refuseAdopt = (apply_id, adopt_id) => {
      applyId.value = apply_id;
      adoptId.value = adopt_id;
      refuse.value.open("center");
    };
    const cancelAdopt = (apply_id, adopt_id) => {
      applyId.value = apply_id;
      adoptId.value = adopt_id;
      cancel.value.open("center");
    };
    common_vendor.watch(() => state.value, (newValue) => {
      state.value = newValue;
      apply = [
        db.collection("adoption").where(`user_id=='${userId}'`).field("_id,img,pet_name,issue_time").getTemp(),
        db.collection("apply").where(`state=='${state.value}'`).getTemp()
      ];
    }, {
      immediate: true
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
            c: common_vendor.f(data, (receive, k1, i1) => {
              var _a, _b, _c;
              return common_vendor.e({
                a: (_a = receive == null ? void 0 : receive._id) == null ? void 0 : _a.apply
              }, ((_b = receive == null ? void 0 : receive._id) == null ? void 0 : _b.apply) ? {
                b: common_vendor.f((_c = receive == null ? void 0 : receive._id) == null ? void 0 : _c.apply, (apply2, k2, i2) => {
                  return common_vendor.e(common_vendor.unref(state) == "\u7533\u8BF7\u4E2D" ? {
                    a: common_vendor.o(($event) => cancelAdopt(apply2._id, apply2.adopt_id)),
                    b: "70db907e-1-" + i0 + "-" + i1 + "-" + i2 + ",70db907e-0",
                    c: common_vendor.p({
                      type: "trash",
                      size: "25",
                      color: "#777"
                    })
                  } : {}, {
                    d: "70db907e-2-" + i0 + "-" + i1 + "-" + i2 + ",70db907e-0",
                    e: common_vendor.w(({
                      data: data2,
                      loading: loading2,
                      error: error2,
                      options
                    }, s3, i3) => {
                      return {
                        a: data2 == null ? void 0 : data2.avatar_file.url,
                        b: common_vendor.t(data2 == null ? void 0 : data2.nickname),
                        c: i3,
                        d: s3
                      };
                    }, {
                      name: "d",
                      path: "a[" + i0 + "]." + ("c[" + i1 + "]." + ("b[" + i2 + "].")) + "e",
                      vueId: "70db907e-3-" + i0 + "-" + i1 + "-" + i2 + ",70db907e-0"
                    }),
                    f: common_vendor.t(apply2 == null ? void 0 : apply2.city[0]),
                    g: common_vendor.t(apply2 == null ? void 0 : apply2.city[1]),
                    h: common_vendor.t(apply2 == null ? void 0 : apply2.city[2]),
                    i: common_vendor.t(apply2.sincerity),
                    j: "70db907e-3-" + i0 + "-" + i1 + "-" + i2 + ",70db907e-0",
                    k: common_vendor.p({
                      collection: "uni-id-users",
                      getone: true,
                      field: "avatar_file,nickname",
                      where: `_id=='${apply2.user_id}'`
                    }),
                    l: "70db907e-4-" + i0 + "-" + i1 + "-" + i2 + ",70db907e-0",
                    m: common_vendor.o(($event) => goProposerDetail(apply2._id))
                  }, common_vendor.unref(state) == "\u7533\u8BF7\u4E2D" ? {
                    n: common_vendor.o(($event) => allowAdopt(apply2._id, apply2.adopt_id))
                  } : {}, common_vendor.unref(state) == "\u7533\u8BF7\u4E2D" ? {
                    o: common_vendor.o(($event) => refuseAdopt(apply2._id, apply2.adopt_id))
                  } : {}, {
                    p: apply2._id
                  });
                }),
                c: receive.img[0].url,
                d: common_vendor.t(receive.pet_name),
                e: common_vendor.unref(state) == "\u7533\u8BF7\u4E2D",
                f: common_vendor.p({
                  date: receive.issue_time,
                  format: "yyyy-MM-dd hh:mm:ss"
                }),
                g: common_vendor.p({
                  type: "chat",
                  size: "30",
                  color: "white"
                }),
                h: common_vendor.unref(state) == "\u7533\u8BF7\u4E2D",
                i: common_vendor.unref(state) == "\u7533\u8BF7\u4E2D"
              } : {}, {
                j: receive == null ? void 0 : receive._id._value
              });
            }),
            d: loading
          }, loading ? {
            e: "70db907e-5-" + i0 + ",70db907e-0",
            f: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            g: hasMore && !loading
          }, hasMore && !loading ? {
            h: "70db907e-6-" + i0 + ",70db907e-0",
            i: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            k: "70db907e-7-" + i0 + ",70db907e-0",
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
          vueId: "70db907e-0"
        }),
        b: common_vendor.sr(udb, "70db907e-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          collection: common_vendor.unref(apply),
          orderby: "issue_time desc",
          getone: false,
          ["page-size"]: 25
        }),
        d: common_vendor.o(confirmAllow),
        e: common_vendor.p({
          type: "warning",
          cancelText: "\u53D6\u6D88",
          confirmText: "\u540C\u610F",
          title: "\u540C\u610F",
          content: "\u4F60\u786E\u5B9A\u8981\u5C06\u8BE5\u5BA0\u7269\u9001\u7ED9\u7533\u8BF7\u4EBA\u5417"
        }),
        f: common_vendor.sr(allow, "70db907e-8", {
          "k": "allow"
        }),
        g: common_vendor.p({
          type: "dialog"
        }),
        h: common_vendor.o(confirmRefuse),
        i: common_vendor.p({
          type: "warning",
          cancelText: "\u5173\u95ED",
          confirmText: "\u62D2\u7EDD",
          title: "\u62D2\u7EDD",
          content: "\u4F60\u786E\u5B9A\u8981\u62D2\u7EDD\u8BE5\u7533\u8BF7\u5417"
        }),
        j: common_vendor.sr(refuse, "70db907e-10", {
          "k": "refuse"
        }),
        k: common_vendor.p({
          type: "dialog"
        }),
        l: common_vendor.o(confirmCancel),
        m: common_vendor.p({
          type: "warning",
          cancelText: "\u5173\u95ED",
          confirmText: "\u53D6\u6D88\u7533\u8BF7",
          title: "\u53D6\u6D88\u7533\u8BF7",
          content: "\u4F60\u786E\u5B9A\u8981\u53D6\u6D88\u8BE5\u7533\u8BF7\u5417"
        }),
        n: common_vendor.sr(cancel, "70db907e-12", {
          "k": "cancel"
        }),
        o: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70db907e"], ["__file", "C:/Users/yzc/Desktop/pet/components/Tab/Receive/index.vue"]]);
wx.createComponent(Component);

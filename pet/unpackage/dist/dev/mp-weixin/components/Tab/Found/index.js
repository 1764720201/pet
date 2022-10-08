"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_tui_actionsheet2 = common_vendor.resolveComponent("tui-actionsheet");
  (_easycom_uni_icons2 + _easycom_uni_load_more2 + _easycom_unicloud_db2 + _easycom_tui_actionsheet2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_tui_actionsheet = () => "../../../node-modules/thorui-uni/lib/thorui/tui-actionsheet/tui-actionsheet.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more + _easycom_unicloud_db + _easycom_tui_actionsheet)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    where: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const udb = common_vendor.ref(null);
    const foundId = common_vendor.ref();
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
    });
    const cancel = () => {
      showActionSheet.value = false;
    };
    const choose = (e) => {
      switch (e.index) {
        case 0:
          udb.value.remove(foundId.value, {
            confirmContent: "\u4F60\u786E\u5B9A\u8981\u53D6\u6D88\u5BFB\u56DE\u5BA0\u7269\u5417"
          });
          break;
        case 1:
          udb.value.update(foundId.value, {
            state: "\u5DF2\u627E\u56DE"
          }, {
            toastTitle: "\u5DF2\u6210\u529F\u627E\u56DE",
            success() {
              udb.value.refresh();
              showActionSheet.value = false;
            }
          });
          break;
        case 2:
          common_vendor.index.navigateTo({
            url: `/pages/Home/Enlightenment/index?id=${foundId.value}`
          });
          break;
      }
    };
    const goFoundPet = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/Issue/FoundPet/index?id=${id}`
      });
    };
    const { where } = common_vendor.toRefs(props);
    const showActionSheet = common_vendor.ref(false);
    const itemList = common_vendor.reactive([
      { text: "\u653E\u5F03", color: "#2B2B2B" },
      { text: "\u5DF2\u627E\u56DE", color: "#2B2B2B" },
      { text: "\u53BB\u5206\u4EAB", color: "#ea7587" }
    ]);
    const more = (id) => {
      foundId.value = id;
      showActionSheet.value = true;
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
          } : {
            c: common_vendor.f(data, (found, k1, i1) => {
              return {
                a: found.uploadPicture[0].path,
                b: common_vendor.t(found.title),
                c: common_vendor.t(found.introduce),
                d: common_vendor.o(($event) => goFoundPet(found._id)),
                e: common_vendor.o(($event) => more(found._id)),
                f: "e7423340-1-" + i0 + "-" + i1 + ",e7423340-0",
                g: found._id
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
        }),
        d: common_vendor.o(cancel),
        e: common_vendor.o(choose),
        f: common_vendor.p({
          show: showActionSheet.value,
          ["item-list"]: itemList
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e7423340"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/Tab/Found/index.vue"]]);
wx.createComponent(Component);

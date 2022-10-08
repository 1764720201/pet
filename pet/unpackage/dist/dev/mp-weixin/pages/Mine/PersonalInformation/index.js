"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_tui_actionsheet2 = common_vendor.resolveComponent("tui-actionsheet");
  (_easycom_unicloud_db2 + _easycom_tui_actionsheet2)();
}
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_tui_actionsheet = () => "../../../node-modules/thorui-uni/lib/thorui/tui-actionsheet/tui-actionsheet.js";
if (!Math) {
  (_easycom_unicloud_db + _easycom_tui_actionsheet)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const showActionSheet = common_vendor.ref(false);
    const itemList = common_vendor.reactive([
      {
        text: "\u7231\u5FC3\u4EBA\u58EB",
        color: "#2B2B2B"
      },
      {
        text: "\u7231\u5FC3\u6551\u52A9\u4EBA",
        color: "#2B2B2B"
      },
      {
        text: "\u8D44\u6DF1\u6551\u52A9\u4EBA",
        color: "#2B2B2B"
      },
      {
        text: "\u5FD7\u613F\u8005",
        color: "#2B2B2B"
      },
      {
        text: "\u7231\u5FC3\u4E49\u5DE5",
        color: "#2B2B2B"
      }
    ]);
    const chooseLabel = () => {
      showActionSheet.value = true;
    };
    const cancel = () => {
      showActionSheet.value = false;
    };
    const choose = (e) => {
      db.collection("uni-id-users").where(`_id==$cloudEnv_uid`).update({
        label: e.text
      }).then(async () => {
        common_vendor.index.showToast({
          title: "\u66F4\u6539\u6210\u529F"
        });
        await getLabel();
        showActionSheet.value = false;
      });
    };
    const collectQuantity = common_vendor.ref(0);
    const footprintQuantity = common_vendor.ref(0);
    const userId = common_vendor.ref("");
    const db = common_vendor.pn.database();
    const goUserInfo = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
      });
    };
    const label = common_vendor.ref("+\u4E2A\u4EBA\u6807\u7B7E");
    const getLabel = async () => {
      await db.collection("uni-id-users").where(`_id==$cloudEnv_uid`).field("label").get({ getOne: true }).then((res) => {
        if (res.result.data.label) {
          label.value = res.result.data.label;
        }
      });
    };
    common_vendor.onLoad(() => {
      getLabel();
    });
    common_vendor.onShow(async () => {
      userId.value = common_vendor.pn.getCurrentUserInfo().uid;
      await db.collection("collect").where(`user_id=='${userId.value}'&&type!=4`).get().then((res) => {
        collectQuantity.value = res.result.data.length;
      });
      await db.collection("footprint").where(`user_id=='${userId.value}'`).field("adopt_id,found_id").distinct().get().then((res) => {
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
        b: common_vendor.t(label.value),
        c: common_vendor.o(chooseLabel),
        d: common_vendor.p({
          collection: "uni-id-users",
          field: "nickname,avatar_file",
          getone: true,
          where: `_id == '${userId.value}'`
        }),
        e: common_vendor.t(collectQuantity.value),
        f: common_vendor.o(goCollect),
        g: common_vendor.t(footprintQuantity.value),
        h: common_vendor.o(goFootPrint),
        i: common_vendor.o(goUserInfo),
        j: common_vendor.o(choose),
        k: common_vendor.o(cancel),
        l: common_vendor.p({
          tips: "\u8BF7\u9009\u62E9\u5C5E\u4E8E\u4F60\u7684\u4E13\u5C5E\u89D2\u8272",
          show: showActionSheet.value,
          ["item-list"]: itemList
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1751d24c"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Mine/PersonalInformation/index.vue"]]);
wx.createComponent(Component);

"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _component_Collect = common_vendor.resolveComponent("Collect");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_tui_icon2 + _component_Collect + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_tui_icon + _easycom_uni_icons + _easycom_uni_dateformat + Poster + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const Poster = () => "../Poster/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    petInfo: { type: Object, required: true }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const instance = common_vendor.getCurrentInstance();
    const userInfo = common_vendor.reactive({
      uid: ""
    });
    const alertDialog = common_vendor.ref(null);
    const ifCollect = common_vendor.ref();
    const punch = () => {
      alertDialog.value.open("center");
    };
    (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$Bus.on("ifCollect2", (res) => {
      ifCollect.value = res;
    });
    const { petInfo } = common_vendor.toRefs(props);
    common_vendor.watch(() => petInfo.value._id, (newValue) => {
      petInfo.value._id = newValue;
      db.collection("collect").where(`user_id=='${userInfo.uid}'&&adopt_id=='${petInfo.value._id}'`).get().then((res) => {
        var _a2;
        if ((_a2 = res.result.data[0]) == null ? void 0 : _a2._id) {
          ifCollect.value = true;
        } else {
          ifCollect.value = false;
        }
      });
    });
    common_vendor.onShow(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
    });
    common_vendor.onLoad(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
    });
    const db = common_vendor.pn.database();
    const collect = () => {
      var _a2;
      if (!userInfo.uid) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      } else {
        (_a2 = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a2.$Bus.emit("ifCollect", !ifCollect.value);
        if (!ifCollect.value) {
          common_vendor.pn.callFunction({
            name: "collect",
            data: {
              userId: userInfo.uid,
              adoptId: petInfo.value._id,
              type: 0
            }
          }).then(() => {
            ifCollect.value = true;
            common_vendor.index.showToast({
              title: "\u6536\u85CF\u6210\u529F",
              icon: "none"
            });
          });
        } else {
          db.collection("collect").where(`user_id=='${userInfo.uid}'&&adopt_id=='${petInfo.value._id}'`).remove().then(() => {
            ifCollect.value = false;
            common_vendor.index.showToast({
              title: "\u53D6\u6D88\u6536\u85CF",
              icon: "none"
            });
          });
        }
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(petInfo).pet_name),
        b: common_vendor.t(common_vendor.unref(petInfo).gender == "\u7537\u751F" ? "\u2642" : "\u2640"),
        c: common_vendor.p({
          name: "share",
          size: 30,
          color: "#d78797"
        }),
        d: common_vendor.p({
          type: "star",
          size: "30",
          color: ifCollect.value ? "#d78797" : "#ccc"
        }),
        e: common_vendor.o(collect),
        f: common_vendor.t(common_vendor.unref(petInfo).pet_name),
        g: common_vendor.t(common_vendor.unref(petInfo).age),
        h: common_vendor.t(common_vendor.unref(petInfo).variety),
        i: common_vendor.t(common_vendor.unref(petInfo).gender),
        j: common_vendor.t(common_vendor.unref(petInfo).city[1]),
        k: common_vendor.t(common_vendor.unref(petInfo).city[2]),
        l: common_vendor.t(common_vendor.unref(petInfo).punch ? common_vendor.unref(petInfo).punch : "\u672A\u8BBE\u7F6E"),
        m: common_vendor.o(punch),
        n: common_vendor.p({
          name: "about-fill",
          size: 15,
          color: "#d78797"
        }),
        o: common_vendor.t(common_vendor.unref(petInfo).story),
        p: common_vendor.f(common_vendor.unref(petInfo).request, (request, k0, i0) => {
          return {
            a: common_vendor.t(request),
            b: request
          };
        }),
        q: common_vendor.p({
          name: "clock",
          size: 15
        }),
        r: common_vendor.p({
          date: common_vendor.unref(petInfo).issue_time,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        s: common_vendor.p({
          petInfo: common_vendor.unref(petInfo)
        }),
        t: common_vendor.p({
          type: "info",
          cancelText: "\u53D6\u6D88",
          confirmText: "\u786E\u8BA4",
          title: "\u9886\u517B\u6253\u5361\u987B\u77E5",
          content: "\u5E73\u53F0\u6D41\u7A0B\u9886\u517B\u6210\u529F\u540E,\u5373\u53EF\u6253\u5361,\u6BCF\u5468\u81F3\u5C11\u4E00\u6B21,\u53CD\u9988\u5BA0\u7269\u52A8\u6001"
        }),
        v: common_vendor.sr(alertDialog, "911e2c18-7", {
          "k": "alertDialog"
        }),
        w: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-911e2c18"], ["__file", "C:/Users/yzc/Desktop/pet/pages/ApplyAdopt/PetInformation/index.vue"]]);
wx.createComponent(Component);

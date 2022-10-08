"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    userId: { type: String, required: true },
    wxCode: { type: String, required: true },
    phone: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    nickname: { type: String, required: true },
    title: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { userId, wxCode, phone, avatarUrl, nickname, title } = common_vendor.toRefs(props);
    const label = common_vendor.ref("\u6682\u65E0");
    const waitAdopt = common_vendor.ref(0);
    const alreadyAdopt = common_vendor.ref(0);
    const callPhone = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: phone.value
      });
    };
    const copyWxCode = () => {
      common_vendor.index.setClipboardData({
        data: wxCode.value,
        success: function() {
          common_vendor.index.showToast({
            title: "\u6210\u529F\u590D\u5236\u5FAE\u4FE1\u53F7"
          });
        }
      });
    };
    const db = common_vendor.pn.database();
    const goUserInfo = () => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/UserInfo/index?userId=${userId.value}`
      });
    };
    common_vendor.watch(() => userId.value, () => {
      db.collection("adoption").where(`user_id=='${userId.value}'`).field("if_adopt").get().then((res) => {
        res.result.data.forEach((value) => {
          if (value.if_adopt == false) {
            waitAdopt.value++;
          } else {
            alreadyAdopt.value++;
          }
        });
      }).then(() => {
        db.collection("uni-id-users").where(`_id=='${userId.value}'`).field("label").get({ getOne: true }).then((res) => {
          if (res.result.data.label) {
            label.value = res.result.data.label;
          }
        });
      });
    });
    const myId = common_vendor.pn.getCurrentUserInfo().uid;
    const goChat = () => {
      if (userId.value == myId) {
        common_vendor.index.showToast({
          title: "\u4E0D\u80FD\u81EA\u6211\u54A8\u8BE2",
          icon: "none"
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/Chat/index?id=${userId.value}`
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.unref(avatarUrl),
        c: common_vendor.o(goUserInfo),
        d: common_vendor.t(common_vendor.unref(nickname)),
        e: common_vendor.t(label.value),
        f: common_vendor.t(waitAdopt.value),
        g: common_vendor.t(alreadyAdopt.value),
        h: common_vendor.p({
          type: "chat",
          size: 22,
          color: "white"
        }),
        i: common_vendor.o(goChat),
        j: common_vendor.o(callPhone),
        k: common_vendor.o(copyWxCode)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-955e774e"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/AuthorInformation/index.vue"]]);
wx.createComponent(Component);

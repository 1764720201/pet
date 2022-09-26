"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    petInfo: { type: Object, required: true }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const instance = common_vendor.getCurrentInstance();
    (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$Bus.on("ifCollect", (res) => {
      ifCollect.value = res;
    });
    const goMessage = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 1300,
        duration: 300
      });
    };
    const userInfo = common_vendor.reactive({
      uid: ""
    });
    const ifCollect = common_vendor.ref();
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
        (_a2 = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a2.$Bus.emit("ifCollect2", !ifCollect.value);
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
    const goApply = () => {
      if (petInfo.value.if_adopt) {
        common_vendor.index.showToast({
          title: "\u5DF2\u88AB\u9886\u517B",
          icon: "error"
        });
      } else if (petInfo.value.user_id == userInfo.uid) {
        common_vendor.index.showToast({
          title: "\u4F60\u4E0D\u80FD\u9886\u517B\u81EA\u5DF1\u7684\u5BA0\u7269",
          icon: "none"
        });
      } else {
        common_vendor.index.navigateTo({
          url: `./Apply/index?adoptId=${petInfo.value._id}`
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "chatboxes",
          size: 25
        }),
        b: common_vendor.o(goMessage),
        c: common_vendor.o(goApply),
        d: common_vendor.p({
          type: "star",
          size: 25,
          color: ifCollect.value ? "#d78797" : "#ccc"
        }),
        e: common_vendor.o(collect)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/pet/pages/ApplyAdopt/Inferior/index.vue"]]);
wx.createComponent(Component);

"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  _easycom_tui_icon2();
}
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
if (!Math) {
  _easycom_tui_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const db = common_vendor.pn.database();
    const petInfoList = common_vendor.ref([]);
    const goAdopt = () => {
      common_vendor.index.switchTab({
        url: "/pages/Adopt/index"
      });
    };
    common_vendor.onShow(() => {
      db.collection("adoption").where("if_adopt==false").field("city,pet_name as petName,_id,img,issue_time,if_adopt").orderBy("issue_time", "desc").limit(20).get().then((res) => {
        petInfoList.value = res.result.data;
      });
    });
    const goPetInfo = (petInfo) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/index?id=${petInfo._id}`,
        success() {
          common_vendor.pn.callFunction({
            name: "footprint",
            data: {
              userId,
              adoptId: petInfo._id
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goAdopt),
        b: common_vendor.p({
          size: 15,
          name: "arrowright"
        }),
        c: common_vendor.f(petInfoList.value, (petInfo, k0, i0) => {
          return {
            a: petInfo.img[0].path,
            b: common_vendor.t(petInfo.petName),
            c: common_vendor.t(petInfo.city[1] + petInfo.city[2]),
            d: common_vendor.o(($event) => goPetInfo(petInfo))
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5cb5e672"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Home/WaitAdopt/index.vue"]]);
wx.createComponent(Component);

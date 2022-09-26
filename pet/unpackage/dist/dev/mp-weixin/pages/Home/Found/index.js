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
    const foundList = common_vendor.ref([]);
    const db = common_vendor.pn.database();
    common_vendor.onLoad(() => {
      db.collection("foundPet").where("state=='\u5DF2\u53D1\u5E03'").field("user_id,_id,uploadPicture,city,title,avatar_url,nickname,create_time as createTime,state").orderBy("createTime", "desc").limit(2).get().then((res) => {
        foundList.value = res.result.data;
      }).catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
    });
    const goFoundPet = () => {
      common_vendor.index.navigateTo({
        url: "/pages/FoundPet/index"
      });
    };
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const goFound = (petInfo) => {
      common_vendor.index.navigateTo({
        url: `./Enlightenment/index?id=${petInfo._id}&user_id=${petInfo.user_id}`,
        success() {
          common_vendor.pn.callFunction({
            name: "footprint",
            data: {
              userId,
              foundId: petInfo._id
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          size: 15,
          name: "arrowright"
        }),
        b: common_vendor.o(goFoundPet),
        c: common_vendor.f(foundList.value, (found, k0, i0) => {
          return {
            a: found.uploadPicture[0].url,
            b: common_vendor.t(found.title),
            c: common_vendor.t(found.city[1]),
            d: common_vendor.t(found.city[2]),
            e: found.avatar_url,
            f: common_vendor.t(found.nickname),
            g: found._id,
            h: common_vendor.o(($event) => goFound(found), found._id)
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-232dccce"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/Found/index.vue"]]);
wx.createComponent(Component);

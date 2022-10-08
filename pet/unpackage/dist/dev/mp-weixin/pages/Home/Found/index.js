"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_tui_icon2 + _easycom_unicloud_db2)();
}
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_tui_icon + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const foundList = common_vendor.ref([]);
    const db = common_vendor.pn.database();
    common_vendor.onShow(() => {
      db.collection("foundPet").where("state=='\u5DF2\u53D1\u5E03'").field("user_id,_id,uploadPicture,city,title,create_time as createTime,state").orderBy("createTime", "desc").limit(2).get().then((res) => {
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
    const goFound = (petInfo) => {
      common_vendor.index.navigateTo({
        url: `./Enlightenment/index?id=${petInfo._id}&user_id=${petInfo.user_id}`
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
            e: common_vendor.w(({
              data
            }, s1, i1) => {
              return {
                a: data == null ? void 0 : data.avatar_file.url,
                b: common_vendor.t(data == null ? void 0 : data.nickname),
                c: i1,
                d: s1
              };
            }, {
              name: "d",
              path: "c[" + i0 + "].e",
              vueId: "232dccce-1-" + i0
            }),
            f: "232dccce-1-" + i0,
            g: common_vendor.p({
              collection: "uni-id-users",
              getone: true,
              where: `_id=='${found.user_id}'`
            }),
            h: found._id,
            i: common_vendor.o(($event) => goFound(found), found._id)
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-232dccce"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Home/Found/index.vue"]]);
wx.createComponent(Component);

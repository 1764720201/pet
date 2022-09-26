"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + common_vendor.unref(PetList))();
}
const PetList = () => "../../../components/PetList/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const where = common_vendor.ref();
    const db = common_vendor.pn.database();
    const userInfo = common_vendor.reactive({
      avatarFile: { url: "" },
      nickname: ""
    });
    const waitAdoptList = common_vendor.ref(0);
    const alreadyAdoptList = common_vendor.ref(0);
    common_vendor.onLoad((option) => {
      where.value = `user_id=='${option.userId}'`;
      db.collection("uni-id-users").where(`_id=='${option.userId}'`).field("avatar_file as avatarFile,nickname").get().then((res) => {
        Object.assign(userInfo, res.result.data[0]);
      });
      db.collection("adoption").where(`user_id=='${option.userId}'`).field("if_adopt").get().then((res) => {
        res.result.data.forEach((value) => {
          if (value.if_adopt == false) {
            waitAdoptList.value++;
          } else {
            alreadyAdoptList.value++;
          }
        });
      });
    });
    return (_ctx, _cache) => {
      return {
        a: userInfo.avatarFile.url,
        b: userInfo.avatarFile.url,
        c: common_vendor.t(userInfo.nickname),
        d: common_vendor.p({
          type: "chat",
          size: 20,
          color: "white"
        }),
        e: common_vendor.t(waitAdoptList.value),
        f: common_vendor.t(alreadyAdoptList.value),
        g: common_vendor.p({
          where: where.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-69b51880"], ["__file", "C:/Users/yzc/Desktop/pet/pages/ApplyAdopt/UserInfo/index.vue"]]);
wx.createPage(MiniProgramPage);

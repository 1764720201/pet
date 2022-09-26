"use strict";
var common_vendor = require("../../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  _easycom_uni_dateformat2();
}
const _easycom_uni_dateformat = () => "../../../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (AuthorInformation + _easycom_uni_dateformat)();
}
const AuthorInformation = () => "../../../../../components/AuthorInformation/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const db = common_vendor.pn.database();
    const applyInfo = common_vendor.reactive({
      _id: "",
      user_id: "",
      adopt_id: "",
      age: "",
      gender: "",
      experience: "",
      present: "",
      house: "",
      marriage: "",
      income: "",
      work: "",
      city: [],
      phone: "",
      wx_code: "",
      sincerity: "",
      state: "",
      create_time: 0
    });
    const userInfo = common_vendor.reactive({
      avatar_file: {
        url: ""
      },
      nickname: "",
      _id: ""
    });
    common_vendor.onLoad(async (option) => {
      await db.collection("apply").where(`_id=='${option.applyId}'`).get().then((res) => {
        Object.assign(applyInfo, res.result.data[0]);
        console.log(applyInfo);
      }).then(() => {
        db.collection("uni-id-users").field("nickname,avatar_file,_id").where(`_id=='${applyInfo.user_id}'`).get().then((res) => {
          Object.assign(userInfo, res.result.data[0]);
        });
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          nickname: userInfo.nickname,
          avatarUrl: userInfo.avatar_file.url,
          userId: userInfo._id,
          wxCode: applyInfo.wx_code,
          phone: applyInfo.phone,
          title: "\u7533\u8BF7\u4EBA\u4FE1\u606F"
        }),
        b: common_vendor.t(applyInfo.age),
        c: common_vendor.t(applyInfo.gender),
        d: common_vendor.t(applyInfo.experience),
        e: common_vendor.t(applyInfo.work),
        f: common_vendor.t(applyInfo.income),
        g: common_vendor.t(applyInfo.city[0] + applyInfo.city[1] + applyInfo.city[2]),
        h: common_vendor.t(applyInfo.present),
        i: common_vendor.t(applyInfo._id.toLocaleUpperCase()),
        j: common_vendor.p({
          date: applyInfo.create_time,
          format: "yyyy-MM-dd hh:mm:ss"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9a5812b2"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Mine/Request/Receive/ProposerDetail/index.vue"]]);
wx.createPage(MiniProgramPage);

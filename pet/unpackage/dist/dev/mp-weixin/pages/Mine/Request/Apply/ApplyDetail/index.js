"use strict";
var common_vendor = require("../../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  _easycom_uni_dateformat2();
}
const _easycom_uni_dateformat = () => "../../../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_dateformat + AuthorInformation)();
}
const AuthorInformation = () => "../../../../../components/AuthorInformation/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const db = common_vendor.pn.database();
    const inApplyInfo = common_vendor.reactive({
      _id: "",
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
      create_time: 0,
      user_id: ""
    });
    const petInfo = common_vendor.reactive({
      user_id: "",
      wx_code: "",
      phone: ""
    });
    const userInfo = common_vendor.reactive({
      nickname: "",
      imgURL: "",
      id: ""
    });
    const nickname = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      db.collection("apply").where(`_id=='${option.inApplyId}'`).get().then((res) => {
        Object.assign(inApplyInfo, res.result.data[0]);
      }).then(() => {
        db.collection("uni-id-users").where(`_id=='${inApplyInfo.user_id}'`).field("nickname").get().then((res) => {
          nickname.value = res.result.data[0].nickname;
        });
      }).then(async () => {
        await db.collection("adoption").where(`_id=='${inApplyInfo.adopt_id}'`).field("user_id,phone,wx_code").get().then((res) => {
          Object.assign(petInfo, res.result.data[0]);
        });
      }).then(async () => {
        await db.collection("uni-id-users").where(`_id=='${petInfo == null ? void 0 : petInfo.user_id}'`).get().then((res) => {
          var _a;
          userInfo.imgURL = (_a = res.result.data[0].avatar_file) == null ? void 0 : _a.url;
          userInfo.nickname = res.result.data[0].nickname;
          userInfo.id = res.result.data[0]._id;
        });
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(inApplyInfo.state),
        b: common_vendor.p({
          date: inApplyInfo.create_time,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        c: common_vendor.p({
          nickname: userInfo.nickname,
          avatarUrl: userInfo.imgURL,
          userId: userInfo.id,
          wxCode: petInfo.wx_code,
          phone: petInfo.phone,
          title: "\u9001\u517B\u4EBA\u4FE1\u606F"
        }),
        d: common_vendor.t(nickname.value),
        e: common_vendor.t(inApplyInfo.age),
        f: common_vendor.t(inApplyInfo.gender),
        g: common_vendor.t(inApplyInfo.experience),
        h: common_vendor.t(inApplyInfo.city[0] + inApplyInfo.city[1] + inApplyInfo.city[2]),
        i: common_vendor.t(inApplyInfo.house),
        j: common_vendor.t(inApplyInfo.marriage),
        k: common_vendor.t(inApplyInfo.work),
        l: common_vendor.t(inApplyInfo._id.toLocaleUpperCase()),
        m: common_vendor.p({
          date: inApplyInfo.create_time,
          format: "yyyy-MM-dd hh:mm:ss"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98626484"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Mine/Request/Apply/ApplyDetail/index.vue"]]);
wx.createPage(MiniProgramPage);

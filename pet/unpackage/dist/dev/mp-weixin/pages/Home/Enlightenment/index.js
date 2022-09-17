"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_tui_icon2 + _easycom_uni_dateformat2)();
}
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_tui_icon + _easycom_uni_dateformat)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const db = common_vendor.pn.database();
    const foundInfo = common_vendor.reactive({
      variety: "",
      name: "",
      gender: "",
      type: "",
      city: [],
      introduce: "",
      userId: "",
      uploadPicture: [],
      wxCode: "",
      title: "",
      createTime: 0,
      phone: ""
    });
    const userInfo = common_vendor.reactive({
      nickname: "",
      imgURL: ""
    });
    const callPhone = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: foundInfo.phone
      });
    };
    const copyWxCode = () => {
      common_vendor.index.setClipboardData({
        data: foundInfo.wxCode,
        success: function() {
          common_vendor.index.showToast({
            title: "\u6210\u529F\u590D\u5236\u5FAE\u4FE1\u53F7"
          });
        }
      });
    };
    common_vendor.onLoad((option) => {
      db.collection("foundPet").where(`_id == '${option.id}'`).field("create_time as createTime, title,variety,name,gender,type,city,introduce,user_id as userId,uploadPicture,wx_code as wxCode,phone").get().then((res) => {
        Object.assign(foundInfo, res.result.data[0]);
      }).then(() => {
        db.collection("uni-id-users").where(`_id == '${foundInfo.userId}'`).field("nickname,avatar_file").get().then((res) => {
          userInfo.nickname = res.result.data[0].nickname;
          userInfo.imgURL = res.result.data[0].avatar_file.url;
        });
      }).catch((err) => {
        console.log(err.message);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(foundInfo.title),
        b: common_vendor.p({
          name: "clock",
          size: 15
        }),
        c: common_vendor.p({
          date: foundInfo.createTime,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        d: common_vendor.t(foundInfo.name),
        e: common_vendor.t(foundInfo.variety),
        f: common_vendor.t(foundInfo.gender),
        g: common_vendor.t(foundInfo.type),
        h: common_vendor.t(foundInfo.city[0]),
        i: common_vendor.t(foundInfo.city[1]),
        j: common_vendor.t(foundInfo.city[2]),
        k: userInfo.imgURL,
        l: common_vendor.t(userInfo.nickname),
        m: common_vendor.o(copyWxCode),
        n: common_vendor.p({
          name: "voipphone",
          size: 25,
          color: "#ff9db1"
        }),
        o: common_vendor.o(callPhone),
        p: common_vendor.t(foundInfo.introduce),
        q: common_vendor.f(foundInfo.uploadPicture, (picture, k0, i0) => {
          return {
            a: picture.path,
            b: picture.fileId
          };
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd90f0c0"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/Enlightenment/index.vue"]]);
wx.createPage(MiniProgramPage);

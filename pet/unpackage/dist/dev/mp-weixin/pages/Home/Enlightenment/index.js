"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_tui_icon2 + _easycom_uni_dateformat2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_tui_icon + _easycom_uni_dateformat + Message + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const Message = () => "../../../components/Message/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const db = common_vendor.pn.database();
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const inputDialog = common_vendor.ref(null);
    const send = () => {
      inputDialog.value.open("center");
    };
    const sendComment = (e) => {
      common_vendor.pn.callFunction({
        name: "comment",
        data: {
          comment: e,
          type: 0,
          userId,
          foundId: foundInfo._id,
          nickname: commenterInfo.nickname,
          avatarUrl: commenterInfo.avatar_file.url
        },
        success() {
          common_vendor.index.showToast({
            title: "\u8BC4\u8BBA\u6210\u529F"
          });
          getComment();
        },
        fail(err) {
          console.log(err);
        }
      });
    };
    const commenterInfo = common_vendor.reactive({
      avatar_file: {
        url: ""
      },
      nickname: ""
    });
    const foundInfo = common_vendor.reactive({
      _id: "",
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
      id: "",
      nickname: "",
      imgURL: ""
    });
    const where = common_vendor.ref("");
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
    const ifCollect = common_vendor.ref();
    const commentList = common_vendor.ref([]);
    const getComment = async () => {
      await db.collection("comment").where(`found_id=='${foundInfo._id}'&&comment_type==0`).get().then((res) => {
        commentList.value = res.result.data;
      });
    };
    common_vendor.onLoad(async (option) => {
      db.collection("foundPet").where(`_id == '${option.id}'`).field("create_time as createTime, title,variety,name,gender,type,city,introduce,user_id as userId,uploadPicture,wx_code as wxCode,phone").get().then((res) => {
        Object.assign(foundInfo, res.result.data[0]);
        where.value = `comment_type==1&&found_id=='${foundInfo._id}'`;
      }).then(() => {
        db.collection("uni-id-users").where(`_id == '${foundInfo.userId}'`).field("nickname,avatar_file").get().then((res) => {
          userInfo.id = res.result.data[0]._id;
          userInfo.nickname = res.result.data[0].nickname;
          userInfo.imgURL = res.result.data[0].avatar_file.url;
        });
      }).then(() => {
        db.collection("uni-id-users").where(`_id=='${userId}'`).field("nickname,avatar_file").get().then((res) => {
          Object.assign(commenterInfo, res.result.data[0]);
        });
      }).then(() => {
        getCollect();
        getComment();
      }).catch((err) => {
        console.log(err.message);
      });
    });
    const getCollect = async () => {
      await db.collection("collect").where(`user_id=='${userId}'&&found_id=='${foundInfo._id}'`).get().then((res) => {
        if (!res.result.data[0]) {
          ifCollect.value = false;
        } else {
          ifCollect.value = true;
        }
      });
    };
    const collect = () => {
      if (!ifCollect.value) {
        common_vendor.pn.callFunction({
          name: "collect",
          data: {
            type: 1,
            userId,
            foundId: foundInfo._id
          },
          success() {
            common_vendor.index.showToast({
              title: "\u6536\u85CF\u6210\u529F"
            });
            getCollect();
          },
          fail(err) {
            console.log(err);
          }
        });
      } else {
        db.collection("collect").where(`user_id=='${userId}'&&found_id=='${foundInfo._id}'`).remove().then(() => {
          getCollect();
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
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
        p: !ifCollect.value
      }, !ifCollect.value ? {} : {}, {
        q: common_vendor.o(collect),
        r: common_vendor.t(foundInfo.introduce),
        s: common_vendor.f(foundInfo.uploadPicture, (picture, k0, i0) => {
          return {
            a: picture.path,
            b: picture.fileId
          };
        }),
        t: common_vendor.o(send),
        v: common_vendor.p({
          commentList: commentList.value,
          where: where.value
        }),
        w: common_vendor.sr("inputClose", "dd90f0c0-5,dd90f0c0-4"),
        x: common_vendor.o(sendComment),
        y: common_vendor.p({
          mode: "input",
          title: "\u8F93\u5165\u5185\u5BB9",
          placeholder: "\u5199\u4E0B\u4F60\u7684\u7EBF\u7D22\u5427"
        }),
        z: common_vendor.sr(inputDialog, "dd90f0c0-4", {
          "k": "inputDialog"
        }),
        A: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd90f0c0"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Home/Enlightenment/index.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var common_vendor = require("../../common/vendor.js");
var common_throttle = require("../../common/throttle.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (PetAppearance + PetInformation + Remind + Applied + AuthorInformation + Explain + Message + _easycom_uni_popup_dialog + _easycom_uni_popup + Inferior)();
}
const PetInformation = () => "./PetInformation/index.js";
const AuthorInformation = () => "../../components/AuthorInformation/index.js";
const PetAppearance = () => "./PetAppearance/index.js";
const Applied = () => "./Applied/index.js";
const Explain = () => "./Explain/index.js";
const Inferior = () => "./Inferior/index.js";
const Remind = () => "./Remind/index.js";
const Message = () => "../../components/Message/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.ref("");
    common_vendor.onShow(() => {
      userId.value = common_vendor.pn.getCurrentUserInfo().uid;
    });
    const db = common_vendor.pn.database();
    const localList = common_vendor.ref([]);
    const userInfo = common_vendor.reactive({
      nickname: "",
      avatar_file: { url: "" },
      _id: ""
    });
    const commentUserInfo = common_vendor.reactive({
      nickname: "",
      avatar_file: { url: "" },
      _id: ""
    });
    const petInfo = common_vendor.reactive({
      _id: "",
      age: "",
      city: [],
      gender: "",
      img: [],
      medical: [],
      name: "",
      particular: [],
      pet_name: "",
      phone: "",
      punch: "",
      request: [""],
      source: [""],
      story: "",
      variety: "",
      wx_code: "",
      issue_time: 0,
      user_id: "",
      if_adopt: false
    });
    const dialogConfirm = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
      });
    };
    const where = common_vendor.ref("");
    const alertDialog = common_vendor.ref(null);
    const adoptingComment = common_vendor.ref();
    const send = () => {
      common_vendor.pn.callFunction({
        name: "comment",
        data: {
          comment: adoptingComment.value,
          type: 0,
          userId: userId.value,
          adoptId: petInfo._id,
          avatarUrl: commentUserInfo.avatar_file.url,
          nickname: commentUserInfo.nickname
        }
      }).then(() => {
        adoptingComment.value = "";
        common_vendor.index.showToast({
          title: "\u8BC4\u8BBA\u6210\u529F"
        });
        getComment();
      }).catch((err) => {
        console.log(err);
      });
    };
    const commentToAdoption = () => {
      userId.value = common_vendor.pn.getCurrentUserInfo().uid;
      if (!adoptingComment.value) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u6587\u5B57",
          icon: "none"
        });
      } else {
        if (!userId.value) {
          alertDialog.value.open("center");
        } else {
          common_throttle.throttle(send(), 3e3);
        }
      }
    };
    const goPetInfo = (local) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/index?id=${local._id}`
      });
    };
    const commentList = common_vendor.ref([]);
    const getComment = async () => {
      await db.collection("comment").where(`adopt_id=='${petInfo._id}'&&comment_type==0`).orderBy("create_time", "desc").get().then((res) => {
        commentList.value = res.result.data;
      });
    };
    const applyList = common_vendor.ref([]);
    const getUserInfo = async (where2, option) => {
      await db.collection("uni-id-users").where(where2).field("nickname,avatar_file,_id").get({ getOne: true }).then((res) => {
        Object.assign(option, res.result.data);
      });
    };
    common_vendor.onLoad(async (option) => {
      userId.value = common_vendor.pn.getCurrentUserInfo().uid;
      await db.collection("adoption").where(`_id == '${option.id}'`).get().then(async (res) => {
        await Object.assign(petInfo, res.result.data[0]);
        where.value = `comment_type==1&&adopt_id=='${petInfo._id}'`;
      }).then(async () => {
        reflash();
        await getUserInfo(`_id == '${userId.value}'`, commentUserInfo);
        await getUserInfo(`_id=='${petInfo.user_id}'`, userInfo);
        getComment();
      }).then(() => {
        db.collection("apply").where(`adopt_id=='${petInfo._id}'&&state=='\u7533\u8BF7\u4E2D'`).field("user_id").get().then((res) => {
          applyList.value = res.result.data;
        });
      }).catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
    });
    const skip = common_vendor.ref(0);
    const count = common_vendor.ref();
    const reflash = () => {
      db.collection("adoption").where(`city=='${petInfo.city[1]}'&&_id!='${petInfo._id}'`).field("pet_name as petName,_id,img").skip(skip.value).limit(3).get({
        getCount: true
      }).then((res) => {
        localList.value = res.result.data;
        count.value = res.result.count;
      });
    };
    const change = () => {
      if (skip.value >= count.value) {
        skip.value = 0;
        common_vendor.index.showToast({
          title: "\u6CA1\u6709\u66F4\u591A\u4E86",
          icon: "none"
        });
        reflash();
      } else {
        if (skip.value + 3 >= count.value) {
          skip.value = 0;
          common_vendor.index.showToast({
            title: "\u6CA1\u6709\u66F4\u591A\u4E86",
            icon: "none"
          });
          reflash();
        } else {
          skip.value += 3;
          reflash();
        }
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          petInfo
        }),
        b: common_vendor.p({
          petInfo
        }),
        c: common_vendor.p({
          applyList: applyList.value
        }),
        d: common_vendor.p({
          nickname: userInfo.nickname,
          avatarUrl: userInfo.avatar_file.url,
          userId: userInfo._id,
          wxCode: petInfo.wx_code,
          phone: petInfo.phone,
          title: "\u9001\u517B\u4EBA\u4FE1\u606F"
        }),
        e: common_vendor.o(change),
        f: localList.value
      }, localList.value ? {
        g: common_vendor.f(localList.value, (local, k0, i0) => {
          var _a;
          return {
            a: (_a = local == null ? void 0 : local.img[0]) == null ? void 0 : _a.url,
            b: common_vendor.t(local.petName),
            c: local._id,
            d: common_vendor.o(($event) => goPetInfo(local), local._id)
          };
        })
      } : {}, {
        h: !localList.value[0]
      }, !localList.value[0] ? {} : {}, {
        i: adoptingComment.value,
        j: common_vendor.o(($event) => adoptingComment.value = $event.detail.value),
        k: common_vendor.o(commentToAdoption),
        l: common_vendor.p({
          commentList: commentList.value,
          where: where.value
        }),
        m: common_vendor.o(dialogConfirm),
        n: common_vendor.p({
          type: "warn",
          cancelText: "\u6682\u4E0D\u767B\u5F55",
          confirmText: "\u524D\u5F80\u767B\u5F55",
          title: "\u63D0\u9192",
          content: "\u60A8\u8FD8\u672A\u767B\u5F55,\u662F\u5426\u8981\u524D\u5F80\u767B\u5F55"
        }),
        o: common_vendor.sr(alertDialog, "ba888104-7", {
          "k": "alertDialog"
        }),
        p: common_vendor.p({
          type: "dialog"
        }),
        q: common_vendor.p({
          petInfo
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ba888104"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/ApplyAdopt/index.vue"]]);
wx.createPage(MiniProgramPage);

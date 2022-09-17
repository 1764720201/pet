"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_dateformat2 + _easycom_tui_icon2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (PetAppearance + PetInformation + Remind + AuthorInformation + Explain + _easycom_uni_dateformat + _easycom_tui_icon + _easycom_uni_popup_dialog + _easycom_uni_popup + Inferior)();
}
const PetInformation = () => "./PetInformation/index.js";
const AuthorInformation = () => "./AuthorInformation/index.js";
const PetAppearance = () => "./PetAppearance/index.js";
const Explain = () => "./Explain/index.js";
const Inferior = () => "./Inferior/index.js";
const Remind = () => "./Remind/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.ref("");
    common_vendor.onShow(() => {
      userId.value = common_vendor.pn.getCurrentUserInfo().uid;
    });
    const db = common_vendor.pn.database();
    const adopting = common_vendor.ref(0);
    const already = common_vendor.ref(0);
    const localList = common_vendor.ref([]);
    const userInfo = common_vendor.reactive({
      nickname: "",
      imgURL: ""
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
      user_id: ""
    });
    const udb = common_vendor.ref(null);
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData({
        clear: true
      }, () => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    const dialogConfirm = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
      });
    };
    const alertDialog = common_vendor.ref(null);
    const adoptingComment = common_vendor.ref();
    const commentToAdoption = () => {
      if (!adoptingComment.value) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u6587\u5B57",
          icon: "none"
        });
      } else {
        if (!userId.value) {
          alertDialog.value.open("center");
        } else {
          common_vendor.pn.callFunction({
            name: "comment",
            data: {
              commentContent: adoptingComment.value,
              commentType: 0,
              userId: userId.value,
              adoptId: petInfo._id,
              avatarUrl: userInfo.imgURL,
              nickname: userInfo.nickname
            }
          }).then(() => {
            reflashMessage();
            adoptingComment.value = "";
            common_vendor.index.showToast({
              title: "\u8BC4\u8BBA\u6210\u529F"
            });
          }).catch((err) => {
            console.log(err);
          });
        }
      }
    };
    const goPetInfo = (local) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/ApplyAdopt/index?id=${local._id}`
      });
    };
    let commentList = common_vendor.ref([]);
    const reflashMessage = () => {
      const adoption = db.collection("adoption").where(`_id=='${petInfo._id}'`).field("_id").getTemp();
      const comment = db.collection("comment").where("comment_type==0").orderBy("create_time", "desc").getTemp();
      db.collection(adoption, comment).get().then((res) => {
        commentList.value = res.result.data[0]._id.comment;
      });
    };
    common_vendor.onLoad(async (option) => {
      userId.value = common_vendor.pn.getCurrentUserInfo().uid;
      await db.collection("adoption").where(`_id == '${option.id}'`).get().then((res) => {
        Object.assign(petInfo, res.result.data[0]);
      }).then(async () => {
        reflash();
        await db.collection("uni-id-users").where(`_id == '${petInfo.user_id}'`).field("nickname,avatar_file").get().then((res) => {
          userInfo.nickname = res.result.data[0].nickname;
          userInfo.imgURL = res.result.data[0].avatar_file.url;
        });
      }).then(async () => {
        await db.collection("adoption").where(`user_id=='${petInfo.user_id}'`).field("_id").get().then((res) => {
          adopting.value = res.result.data.length;
        });
      }).then(() => {
        reflashMessage();
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
          petInfo,
          userInfo,
          adopting: adopting.value,
          already: already.value
        }),
        d: common_vendor.o(change),
        e: localList.value
      }, localList.value ? {
        f: common_vendor.f(localList.value, (local, k0, i0) => {
          return {
            a: local.img[0].url,
            b: common_vendor.t(local.petName),
            c: local._id,
            d: common_vendor.o(($event) => goPetInfo(local), local._id)
          };
        })
      } : {}, {
        g: !localList.value[0]
      }, !localList.value[0] ? {} : {}, {
        h: adoptingComment.value,
        i: common_vendor.o(($event) => adoptingComment.value = $event.detail.value),
        j: common_vendor.o(commentToAdoption),
        k: common_vendor.f(common_vendor.unref(commentList), (commentInfo, k0, i0) => {
          return {
            a: commentInfo.avatar_url,
            b: common_vendor.t(commentInfo.nickname),
            c: "50ebbf6c-5-" + i0,
            d: common_vendor.p({
              date: commentInfo.create_time,
              format: "yyyy-MM-dd hh:mm:ss"
            }),
            e: "50ebbf6c-6-" + i0,
            f: common_vendor.t(commentInfo.comment),
            g: commentInfo._id
          };
        }),
        l: common_vendor.p({
          name: "message"
        }),
        m: common_vendor.o(dialogConfirm),
        n: common_vendor.p({
          type: "warn",
          cancelText: "\u6682\u4E0D\u767B\u5F55",
          confirmText: "\u524D\u5F80\u767B\u5F55",
          title: "\u63D0\u9192",
          content: "\u60A8\u8FD8\u672A\u767B\u5F55,\u662F\u5426\u8981\u524D\u5F80\u767B\u5F55"
        }),
        o: common_vendor.sr(alertDialog, "50ebbf6c-7", {
          "k": "alertDialog"
        }),
        p: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-50ebbf6c"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/ApplyAdopt/index.vue"]]);
wx.createPage(MiniProgramPage);

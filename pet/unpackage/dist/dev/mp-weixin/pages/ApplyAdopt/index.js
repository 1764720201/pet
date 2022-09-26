"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_dateformat2 + _easycom_tui_icon2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_tui_icon = () => "../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (PetAppearance + PetInformation + Remind + Applied + AuthorInformation + Explain + _easycom_uni_dateformat + _easycom_tui_icon + _easycom_uni_popup_dialog + _easycom_uni_popup + Inferior)();
}
const PetInformation = () => "./PetInformation/index.js";
const AuthorInformation = () => "../../components/AuthorInformation/index.js";
const PetAppearance = () => "./PetAppearance/index.js";
const Applied = () => "./Applied/index.js";
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
    const localList = common_vendor.ref([]);
    const userInfo = common_vendor.reactive({
      nickname: "",
      imgURL: "",
      id: ""
    });
    const commentUserInfo = common_vendor.reactive({
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
      user_id: "",
      if_adopt: false
    });
    const dialogConfirm = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
      });
    };
    const alertDialog = common_vendor.ref(null);
    const adoptingComment = common_vendor.ref();
    let valid = common_vendor.ref(true);
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
          if (!valid.value)
            return;
          valid.value = false;
          common_vendor.pn.callFunction({
            name: "comment",
            data: {
              commentContent: adoptingComment.value,
              commentType: 0,
              userId: userId.value,
              adoptId: petInfo._id,
              avatarUrl: commentUserInfo.imgURL,
              nickname: commentUserInfo.nickname
            }
          }).then(() => {
            refreshMessage();
            adoptingComment.value = "";
            common_vendor.index.showToast({
              title: "\u8BC4\u8BBA\u6210\u529F"
            });
            setTimeout(() => {
              valid.value = true;
            }, 3e3);
          }).catch((err) => {
            console.log(err);
          });
        }
      }
    };
    const inputDialog = common_vendor.ref(null);
    const replyTo = common_vendor.ref();
    const replyCommentId = common_vendor.ref();
    const commentToReply = async (comment) => {
      replyTo.value = comment.nickname;
      replyCommentId.value = comment._id;
      inputDialog.value.open("center");
    };
    const dialogInputConfirm = (comment) => {
      userId.value = common_vendor.pn.getCurrentUserInfo().uid;
      if (!comment) {
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
              commentContent: comment,
              commentType: 1,
              userId: userId.value,
              adoptId: petInfo._id,
              avatarUrl: commentUserInfo.imgURL,
              nickname: commentUserInfo.nickname,
              commentId: replyCommentId.value
            }
          }).then(() => {
            common_vendor.index.showToast({
              title: "\u8BC4\u8BBA\u6210\u529F",
              icon: "none"
            });
            refreshReply();
          });
        }
      }
    };
    const goPetInfo = (local) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/index?id=${local._id}`
      });
    };
    const replyList = common_vendor.ref([]);
    let commentList = common_vendor.ref([]);
    const refreshMessage = () => {
      const adoption = db.collection("adoption").where(`_id=='${petInfo._id}'`).field("_id").getTemp();
      const comment = db.collection("comment").where("comment_type==0").orderBy("create_time", "desc").getTemp();
      db.collection(adoption, comment).get().then((res) => {
        commentList.value = res.result.data[0]._id.comment;
      });
    };
    const refreshReply = () => {
      db.collection("comment").where("comment_type==1").get().then((res) => {
        replyList.value = res.result.data;
      });
    };
    const noLocal = common_vendor.ref();
    const applyList = common_vendor.ref([]);
    common_vendor.onLoad(async (option) => {
      userId.value = common_vendor.pn.getCurrentUserInfo().uid;
      await db.collection("adoption").where(`_id == '${option.id}'`).get().then((res) => {
        Object.assign(petInfo, res.result.data[0]);
      }).then(async () => {
        reflash();
        await db.collection("uni-id-users").where(`_id == '${userId.value}'`).field("nickname,avatar_file").get().then((res) => {
          var _a;
          commentUserInfo.nickname = res.result.data[0].nickname;
          commentUserInfo.imgURL = (_a = res.result.data[0].avatar_file) == null ? void 0 : _a.url;
        });
      }).then(() => {
        db.collection("uni-id-users").where(`_id=='${petInfo.user_id}'`).get().then((res) => {
          var _a;
          userInfo.imgURL = (_a = res.result.data[0].avatar_file) == null ? void 0 : _a.url;
          userInfo.nickname = res.result.data[0].nickname;
          userInfo.id = res.result.data[0]._id;
        });
      }).then(() => {
        db.collection("apply").where(`adopt_id=='${petInfo._id}'&&state=='\u7533\u8BF7\u4E2D'`).field("user_id").get().then((res) => {
          applyList.value = res.result.data;
        });
      }).then(() => {
        db.collection("images").where("title=='\u6CA1\u6709\u540C\u57CE'").get().then((res) => {
          noLocal.value = res.result.data[0].image[0].url;
        });
      }).then(() => {
        refreshMessage();
        refreshReply();
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
          avatarUrl: userInfo.imgURL,
          userId: userInfo.id,
          wxCode: petInfo.wx_code,
          phone: petInfo.phone,
          title: "\u9001\u517B\u4EBA\u4FE1\u606F"
        }),
        e: common_vendor.o(change),
        f: localList.value
      }, localList.value ? {
        g: common_vendor.f(localList.value, (local, k0, i0) => {
          return {
            a: local.img[0].url,
            b: common_vendor.t(local.petName),
            c: local._id,
            d: common_vendor.o(($event) => goPetInfo(local), local._id)
          };
        })
      } : {}, {
        h: !localList.value[0]
      }, !localList.value[0] ? {
        i: noLocal.value
      } : {}, {
        j: adoptingComment.value,
        k: common_vendor.o(($event) => adoptingComment.value = $event.detail.value),
        l: common_vendor.o(commentToAdoption),
        m: common_vendor.f(common_vendor.unref(commentList), (commentInfo, k0, i0) => {
          return {
            a: commentInfo.avatar_url,
            b: common_vendor.t(commentInfo.nickname),
            c: "ba888104-6-" + i0,
            d: common_vendor.p({
              date: commentInfo.create_time,
              format: "yyyy-MM-dd hh:mm:ss"
            }),
            e: common_vendor.o(($event) => commentToReply(commentInfo)),
            f: "ba888104-7-" + i0,
            g: common_vendor.t(commentInfo.comment),
            h: common_vendor.f(replyList.value, (reply, k1, i1) => {
              return common_vendor.e({
                a: reply.comment_id == commentInfo._id
              }, reply.comment_id == commentInfo._id ? {
                b: common_vendor.t(reply.nickname),
                c: common_vendor.t(reply.comment)
              } : {}, {
                d: reply._id
              });
            }),
            i: commentInfo._id
          };
        }),
        n: common_vendor.p({
          name: "message"
        }),
        o: common_vendor.o(dialogConfirm),
        p: common_vendor.p({
          type: "warn",
          cancelText: "\u6682\u4E0D\u767B\u5F55",
          confirmText: "\u524D\u5F80\u767B\u5F55",
          title: "\u63D0\u9192",
          content: "\u60A8\u8FD8\u672A\u767B\u5F55,\u662F\u5426\u8981\u524D\u5F80\u767B\u5F55"
        }),
        q: common_vendor.sr(alertDialog, "ba888104-8", {
          "k": "alertDialog"
        }),
        r: common_vendor.p({
          type: "dialog"
        }),
        s: common_vendor.sr("inputClose", "ba888104-11,ba888104-10"),
        t: common_vendor.o(dialogInputConfirm),
        v: common_vendor.p({
          title: "\u56DE\u590D",
          mode: "input",
          placeholder: "@" + replyTo.value
        }),
        w: common_vendor.sr(inputDialog, "ba888104-10", {
          "k": "inputDialog"
        }),
        x: common_vendor.p({
          type: "dialog"
        }),
        y: common_vendor.p({
          petInfo
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ba888104"], ["__file", "C:/Users/yzc/Desktop/pet/pages/ApplyAdopt/index.vue"]]);
wx.createPage(MiniProgramPage);

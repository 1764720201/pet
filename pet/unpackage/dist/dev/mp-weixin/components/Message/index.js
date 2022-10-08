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
  (_easycom_uni_dateformat + _easycom_tui_icon + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    commentList: { type: Array, required: true },
    where: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { commentList, where } = common_vendor.toRefs(props);
    common_vendor.watch(() => where.value, () => {
      getReply();
    });
    const inputDialog = common_vendor.ref(null);
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const commentInfo = common_vendor.reactive({
      commentId: "",
      commentUserId: "",
      commentNickname: "",
      adoptId: "",
      foundId: "",
      topicId: ""
    });
    const reply = (commentId, commentUserId, commentNickname, adoptId, foundId, topicId) => {
      var _a;
      commentInfo.commentId = commentId;
      commentInfo.commentNickname = commentNickname;
      commentInfo.commentUserId = commentUserId;
      commentInfo.adoptId = adoptId;
      commentInfo.foundId = foundId;
      commentInfo.topicId = topicId;
      (_a = inputDialog.value) == null ? void 0 : _a.open("center");
    };
    const db = common_vendor.pn.database();
    const userInfo = common_vendor.reactive({
      avatar_file: { url: "" },
      nickname: "",
      _id: ""
    });
    const replyList = common_vendor.ref([]);
    const getReply = async () => {
      await db.collection("comment").where(where.value).field("nickname,comment,comment_id").get().then((res) => {
        replyList.value = res.result.data;
      });
    };
    common_vendor.onLoad(async () => {
      await db.collection("uni-id-users").where(`_id=='${userId}'`).field("nickname,avatar_file").get({ getOne: true }).then((res) => {
        Object.assign(userInfo, res.result.data);
      }).catch((err) => {
        console.log(err);
      });
    });
    const dialogInputConfirm = (e) => {
      common_vendor.pn.callFunction({
        name: "comment",
        data: {
          comment: e,
          type: 1,
          userId,
          adoptId: commentInfo.adoptId,
          nickname: userInfo.nickname,
          avatarUrl: userInfo.avatar_file.url,
          commentId: commentInfo.commentId,
          commentUserId: commentInfo.commentUserId,
          foundId: commentInfo.foundId,
          topicId: commentInfo.topicId
        },
        success() {
          getReply();
          common_vendor.index.showToast({
            title: "\u56DE\u590D\u6210\u529F",
            icon: "none"
          });
        },
        fail(err) {
          console.log(err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(commentList), (comment, k0, i0) => {
          return common_vendor.e({
            a: comment.avatar_url,
            b: common_vendor.t(comment.nickname),
            c: "1bbd567f-0-" + i0,
            d: common_vendor.p({
              date: comment.create_time,
              format: "yyyy-MM-dd hh:mm:ss"
            }),
            e: common_vendor.o(($event) => reply(comment._id, comment.user_id, comment.nickname, comment.adopt_id, comment.found_id, comment.topic_id)),
            f: "1bbd567f-1-" + i0,
            g: common_vendor.t(comment.comment)
          }, replyList.value[0] ? {
            h: common_vendor.f(replyList.value, (reply2, k1, i1) => {
              return common_vendor.e({
                a: reply2.comment_id == comment._id
              }, reply2.comment_id == comment._id ? {
                b: common_vendor.t(reply2.nickname),
                c: common_vendor.t(reply2.comment)
              } : {}, {
                d: reply2._id
              });
            })
          } : {}, {
            i: comment._id
          });
        }),
        b: common_vendor.p({
          name: "message"
        }),
        c: replyList.value[0],
        d: common_vendor.sr("inputClose", "1bbd567f-3,1bbd567f-2"),
        e: common_vendor.o(dialogInputConfirm),
        f: common_vendor.p({
          title: "\u56DE\u590D",
          mode: "input",
          placeholder: "@" + commentInfo.commentNickname
        }),
        g: common_vendor.sr(inputDialog, "1bbd567f-2", {
          "k": "inputDialog"
        }),
        h: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1bbd567f"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/Message/index.vue"]]);
wx.createComponent(Component);

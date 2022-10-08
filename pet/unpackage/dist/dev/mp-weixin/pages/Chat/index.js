"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_file_picker2 + _easycom_uni_popup2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const ifAnimation = common_vendor.ref(false);
    let limit = 50;
    const db = common_vendor.pn.database();
    const scrollToView = common_vendor.ref();
    const scrollHeight = common_vendor.ref(`calc(100vh - 300rpx)`);
    const oppositeUid = common_vendor.ref("");
    const chatList = common_vendor.ref([]);
    const content = common_vendor.ref("");
    const ifTopioneer = common_vendor.ref(false);
    const scroll = async (e) => {
      const ifFresh = common_vendor.ref(true);
      if (e.detail.scrollTop < 1550 && ifFresh.value) {
        limit += 50;
        ifFresh.value = false;
        await getChatList();
        ifFresh.value = true;
      }
    };
    const opposite = common_vendor.reactive({
      avatar_file: { url: "" },
      nickname: "",
      _id: ""
    });
    const current = common_vendor.reactive({
      avatar_file: { url: "" },
      nickname: "",
      _id: ""
    });
    common_vendor.onLoad(async (option) => {
      var _a;
      oppositeUid.value = option.id;
      await getUserInfo(`_id=='${option.id}'`, opposite);
      await getUserInfo("_id==$cloudEnv_uid", current);
      await getChatList();
      await getPioneerChat();
      await emptyUnread();
      scrollToView.value = "msg" + ((_a = chatList.value[chatList.value.length - 1]) == null ? void 0 : _a._id);
    });
    const getUserInfo = async (where, option) => {
      await db.collection("uni-id-users").where(where).field("nickname,avatar_file").get({ getOne: true }).then((res) => {
        Object.assign(option, res.result.data);
      });
    };
    common_vendor.index.onPushMessage(async () => {
      var _a;
      await getChatList();
      scrollToView.value = "msg" + ((_a = chatList.value[chatList.value.length - 1]) == null ? void 0 : _a._id);
    });
    const emptyUnread = async () => {
      await db.collection("chat").field("from_uid,to_uid,is_read").where(`from_uid=='${oppositeUid.value}'&&to_uid==$cloudEnv_uid&&is_read==false`).update({
        is_read: true
      }).catch((err) => {
        console.log(err);
      });
    };
    const pioneerChat = common_vendor.ref();
    const getChatList = async () => {
      await db.collection("chat").where(`(from_uid==$cloudEnv_uid&&to_uid=='${oppositeUid.value}')||(from_uid=='${oppositeUid.value}'&&to_uid==$cloudEnv_uid)`).orderBy("create_date", "desc").limit(limit).get().then((res) => {
        chatList.value = res.result.data.reverse();
      });
    };
    const getPioneerChat = async () => {
      await db.collection("chat").where(`from_uid=='${oppositeUid.value}'&&to_uid==$cloudEnv_uid&&is_read==false`).orderBy("create_date", "desc").get().then((res) => {
        var _a;
        const data = res.result.data;
        if (data.length > 10) {
          ifTopioneer.value = true;
          pioneerChat.value = "msg" + ((_a = res.result.data[0]) == null ? void 0 : _a._id);
        }
      });
    };
    const toPioneerChat = () => {
      scrollToView.value = pioneerChat.value;
      ifTopioneer.value = false;
    };
    const send = async () => {
      ifAnimation.value = true;
      if (!content.value) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u6587\u5B57!",
          icon: "none"
        });
      } else {
        common_vendor.pn.callFunction({
          name: "push",
          data: {
            userId: oppositeUid.value,
            content: content.value
          },
          fail(err) {
            console.log(err);
          }
        });
        await db.collection("chat").add({
          to_uid: oppositeUid.value,
          body: { text: content.value },
          type: "text"
        }).then(async () => {
          var _a;
          await getChatList();
          scrollToView.value = "msg" + ((_a = chatList.value[chatList.value.length - 1]) == null ? void 0 : _a._id);
          content.value = "";
        }).catch((err) => {
          console.log(err);
        });
      }
    };
    const popup = common_vendor.ref(null);
    const more = () => {
      popup.value.open();
    };
    const imageStyles = common_vendor.reactive({
      width: 74,
      height: 74,
      border: {
        color: "#afafaf",
        radio: 10
      }
    });
    const clear = common_vendor.ref(null);
    const select = async () => {
      await popup.value.close();
    };
    const sendPicture = async (e) => {
      ifAnimation.value = true;
      e.tempFilePaths.forEach(async (value) => {
        common_vendor.pn.callFunction({
          name: "push",
          data: {
            userId: oppositeUid.value,
            content: content.value
          }
        });
        await db.collection("chat").add({
          to_uid: oppositeUid.value,
          body: { image: value },
          type: "image"
        }).then(async () => {
          var _a;
          await getChatList();
          scrollToView.value = "msg" + ((_a = chatList.value[chatList.value.length - 1]) == null ? void 0 : _a._id);
          clear.value.clearFiles();
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: ifTopioneer.value
      }, ifTopioneer.value ? {
        b: common_vendor.o(toPioneerChat)
      } : {}, {
        c: common_vendor.f(chatList.value, (chat, k0, i0) => {
          return common_vendor.e({
            a: chat.from_uid == (current == null ? void 0 : current._id)
          }, chat.from_uid == (current == null ? void 0 : current._id) ? common_vendor.e({
            b: common_vendor.t(current.nickname),
            c: current.avatar_file.url,
            d: chat.type == "text"
          }, chat.type == "text" ? {
            e: common_vendor.t(chat.body.text)
          } : {}, {
            f: chat.type == "image"
          }, chat.type == "image" ? {
            g: chat.body.image
          } : {}) : {}, {
            h: chat.from_uid == (opposite == null ? void 0 : opposite._id)
          }, chat.from_uid == (opposite == null ? void 0 : opposite._id) ? common_vendor.e({
            i: opposite.avatar_file.url,
            j: common_vendor.t(opposite.nickname),
            k: chat.type == "text"
          }, chat.type == "text" ? {
            l: common_vendor.t(chat.body.text)
          } : {}, {
            m: chat.type == "image"
          }, chat.type == "image" ? {
            n: chat.body.image
          } : {}) : {}, {
            o: chat == null ? void 0 : chat._id,
            p: "msg" + (chat == null ? void 0 : chat._id)
          });
        }),
        d: common_vendor.o(scroll),
        e: scrollToView.value,
        f: scrollHeight.value,
        g: ifAnimation.value,
        h: content.value,
        i: common_vendor.o(($event) => content.value = $event.detail.value),
        j: common_vendor.o(more),
        k: common_vendor.o(send),
        l: common_vendor.sr(clear, "b75d0198-1,b75d0198-0", {
          "k": "clear"
        }),
        m: common_vendor.o(sendPicture),
        n: common_vendor.o(select),
        o: common_vendor.p({
          ["del-icon"]: false,
          limit: "6",
          imageStyles
        }),
        p: common_vendor.sr(popup, "b75d0198-0", {
          "k": "popup"
        }),
        q: common_vendor.p({
          type: "bottom",
          backgroundColor: "#fff"
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b75d0198"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Chat/index.vue"]]);
wx.createPage(MiniProgramPage);

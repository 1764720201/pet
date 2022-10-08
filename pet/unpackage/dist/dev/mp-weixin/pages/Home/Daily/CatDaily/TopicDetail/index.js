"use strict";
var common_vendor = require("../../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_dateformat2 + _easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_dateformat = () => "../../../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_icons = () => "../../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_icons + Message + _easycom_uni_popup)();
}
const Message = () => "../../../../../components/Message/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const popup = common_vendor.ref(null);
    const where = common_vendor.ref("");
    const topicId = common_vendor.ref();
    const commentContent = common_vendor.ref();
    const openInput = () => {
      if (!userId) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      } else {
        popup.value.open("bottom");
      }
    };
    const cancelInput = () => {
      popup.value.close();
    };
    const comment = () => {
      if (!commentContent.value) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u5185\u5BB9"
        });
      } else {
        common_vendor.pn.callFunction({
          name: "comment",
          data: {
            type: 0,
            comment: commentContent.value,
            topicId: topicId.value,
            userId,
            avatarUrl: commneterInfo.avatar_file.url,
            nickname: commneterInfo.nickname
          },
          success() {
            commentContent.value = "";
            getComment();
            popup.value.close();
            common_vendor.index.showToast({
              title: "\u8BC4\u8BBA\u6210\u529F",
              icon: "none"
            });
          },
          fail(err) {
            console.log(err);
          }
        });
      }
    };
    const userInfo = common_vendor.reactive({
      avatar_file: { url: "" },
      nickname: "",
      _id: ""
    });
    const commneterInfo = common_vendor.reactive({
      avatar_file: { url: "" },
      nickname: "",
      _id: ""
    });
    const topicInfo = common_vendor.reactive({
      content: "",
      image: [],
      user_id: "",
      create_time: 0
    });
    const commentList = common_vendor.ref([]);
    const db = common_vendor.pn.database();
    const ifPraise = common_vendor.ref();
    const getPraise = () => {
      db.collection("collect").where(`user_id=='${userId}'&&topic_id=='${topicId.value}'`).get({ getOne: true }).then((res) => {
        if (res.result.data) {
          ifPraise.value = true;
        } else {
          ifPraise.value = false;
        }
      });
    };
    const praise = () => {
      if (!ifPraise.value) {
        common_vendor.pn.callFunction({
          name: "collect",
          data: {
            type: 4,
            topicId: topicId.value,
            userId
          },
          success() {
            getPraise();
            common_vendor.index.showToast({
              title: "\u6210\u529F\u70B9\u8D5E"
            });
          }
        });
      } else {
        db.collection("collect").where(`user_id=='${userId}'&&topic_id=='${topicId.value}'`).remove().then(() => {
          getPraise();
        });
      }
    };
    const getComment = () => {
      db.collection("comment").where(`topic_id=='${topicId.value}'&&comment_type==0`).get().then((res) => {
        commentList.value = res.result.data;
      });
    };
    common_vendor.onLoad(async (option) => {
      topicId.value = option.id;
      await db.collection("topic").where(`_id=='${option.id}'`).field("image,content,user_id,create_time").get({ getOne: true }).then((res) => {
        Object.assign(topicInfo, res.result.data);
        where.value = `topic_id=='${topicId.value}'&&comment_type==1`;
        getPraise();
      }).then(() => {
        db.collection("uni-id-users").where(`_id=='${topicInfo.user_id}'`).field("nickname,avatar_file").get({ getOne: true }).then((res) => {
          Object.assign(userInfo, res.result.data);
        });
      }).then(() => {
        db.collection("uni-id-users").where(`_id=='${userId}'`).field("nickname,avatar_file").get({ getOne: true }).then((res) => {
          Object.assign(commneterInfo, res.result.data);
        });
      }).then(() => {
        getComment();
      });
    });
    return (_ctx, _cache) => {
      return {
        a: userInfo.avatar_file.url,
        b: common_vendor.t(userInfo.nickname),
        c: common_vendor.p({
          date: topicInfo.create_time,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        d: common_vendor.t(topicInfo.content),
        e: common_vendor.f(topicInfo.image, (image, index, i0) => {
          return {
            a: image.path,
            b: index
          };
        }),
        f: common_vendor.p({
          type: "info",
          size: "20",
          color: "#ccc"
        }),
        g: common_vendor.p({
          commentList: commentList.value,
          where: where.value
        }),
        h: common_vendor.o(openInput),
        i: common_vendor.o(praise),
        j: common_vendor.p({
          type: "hand-up",
          size: "26",
          color: ifPraise.value ? "#ec9312" : "#ccc"
        }),
        k: common_vendor.o(cancelInput),
        l: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        m: common_vendor.o(comment),
        n: commentContent.value,
        o: common_vendor.o(($event) => commentContent.value = $event.detail.value),
        p: common_vendor.sr(popup, "2179aa18-4", {
          "k": "popup"
        }),
        q: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2179aa18"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Home/Daily/CatDaily/TopicDetail/index.vue"]]);
wx.createPage(MiniProgramPage);

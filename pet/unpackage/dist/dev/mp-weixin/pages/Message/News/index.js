"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _easycom_uni_badge2 + _easycom_uni_icons2 + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_badge = () => "../../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_badge + _easycom_uni_icons + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    hasLogin: { type: Boolean, required: true },
    userId: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { hasLogin, userId } = common_vendor.toRefs(props);
    const ifLoading = common_vendor.ref(true);
    common_vendor.watch(() => hasLogin.value, async () => {
      await getChat();
    });
    const db = common_vendor.pn.database();
    const chatListInfo = common_vendor.reactive([]);
    const result = common_vendor.reactive([]);
    const getChat = async () => {
      result.length = 0;
      await db.collection("chat").where(`from_uid=='${userId.value}'||to_uid=='${userId.value}'`).groupBy("from_uid,to_uid").orderBy("create_date", "desc").get().then((res) => {
        const arr = [];
        const newArr = arr.concat(res.result.data);
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].from_id) {
            chatListInfo.push({
              userId: newArr[i].from_uid,
              unread: 0
            });
          } else {
            chatListInfo.push({ userId: newArr[i].to_uid, unread: 0 });
          }
        }
        let obj = {};
        for (let i of chatListInfo) {
          if (!obj[i.userId] && i.userId !== userId.value) {
            result.push(i);
            obj[i.userId] = 1;
          }
        }
      });
      getChatTotal();
    };
    const getChatTotal = () => {
      result.forEach((item) => {
        db.collection("chat").where(`from_uid=='${item.userId}'&&to_uid==$cloudEnv_uid&&is_read==false`).count().then((res) => {
          item.unread = res.result.total;
        });
      });
    };
    const goChat = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/Chat/index?id=${id}`
      });
    };
    common_vendor.onShow(async () => {
      ifLoading.value = true;
      await getChat();
      ifLoading.value = false;
    });
    common_vendor.index.onPushMessage(() => {
      getChat();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: ifLoading.value
      }, ifLoading.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {
        c: common_vendor.f(result, (chat, k0, i0) => {
          return {
            a: common_vendor.w(({
              data
            }, s1, i1) => {
              return {
                a: data == null ? void 0 : data.avatar_file.url,
                b: "c1d2b1d2-2-" + i0 + "-" + i1 + "," + ("c1d2b1d2-1-" + i0),
                c: common_vendor.t(data == null ? void 0 : data.nickname),
                d: "c1d2b1d2-3-" + i0 + "-" + i1 + "," + ("c1d2b1d2-1-" + i0),
                e: i1,
                f: s1
              };
            }, {
              name: "d",
              path: "c[" + i0 + "].a",
              vueId: "c1d2b1d2-1-" + i0
            }),
            b: common_vendor.p({
              text: chat.unread,
              absolute: "rightTop",
              size: "small",
              ["max-num"]: 99
            }),
            c: common_vendor.o(($event) => goChat(chat.userId)),
            d: "c1d2b1d2-1-" + i0,
            e: common_vendor.p({
              collection: "uni-id-users",
              getone: true,
              field: "nickname,avatar_file",
              where: `_id=='${chat.userId}'`
            }),
            f: chat.userId
          };
        }),
        d: common_vendor.p({
          type: "forward",
          size: "23",
          color: "#bfbfbf"
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c1d2b1d2"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Message/News/index.vue"]]);
wx.createComponent(Component);

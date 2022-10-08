"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_dateformat2 + _easycom_tui_icon2 + _easycom_uni_load_more2)();
}
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_tui_icon + _easycom_uni_load_more)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    orderby: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { orderby } = common_vendor.toRefs(props);
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const limit = common_vendor.ref(3);
    const count = common_vendor.ref();
    const ifLoading = common_vendor.ref(true);
    common_vendor.onShareAppMessage((res) => {
      if (res.from === "button") {
        console.log(res.target);
      }
      console.log(res);
      return {
        title: "\u81EA\u5B9A\u4E49\u5206\u4EAB\u6807\u9898",
        path: "/pages/test/test?id=123"
      };
    });
    common_vendor.onReachBottom(() => {
      limit.value += 3;
      ifLoading.value = true;
      getPraiseList();
      if (limit.value > count.value) {
        ifLoading.value = false;
      }
    });
    const topicList = common_vendor.ref([]);
    const getPraiseList = () => {
      db.collection(topic, "comment", "uni-id-users", "collect").limit(limit.value).get({ getCount: true }).then((res) => {
        count.value = res.result.count;
        topicList.value = res.result.data;
      });
    };
    common_vendor.onShow(() => {
      getPraiseList();
      getPraise();
    });
    const read = common_vendor.ref();
    const db = common_vendor.pn.database();
    const topic = db.collection("topic").orderBy(orderby.value, "desc").getTemp();
    const praiseList = common_vendor.ref([]);
    const user = db.collection("uni-id-users").where(`_id=='${userId}'`).field("_id").getTemp();
    const getPraise = () => {
      db.collection(user, "collect").field("_id.collect as collect").get({ getOne: true }).then((res) => {
        praiseList.value = res.result.data.collect.filter((value) => {
          return value.type == 4 && value.user_id == userId;
        }).map((value) => {
          return value.topic_id;
        });
      });
    };
    const ifPraise = common_vendor.ref();
    const praise = async (topicId) => {
      const getCollect = async () => {
        await db.collection("collect").where(`topic_id=='${topicId}'&&user_id=='${userId}'`).get({ getOne: true }).then((res) => {
          if (res.result.data) {
            ifPraise.value = true;
          } else {
            ifPraise.value = false;
          }
        });
      };
      getCollect().then(() => {
        if (!ifPraise.value) {
          common_vendor.pn.callFunction({
            name: "collect",
            data: {
              type: 4,
              topicId,
              userId
            },
            success() {
              common_vendor.index.showToast({
                title: "\u70B9\u8D5E\u6210\u529F"
              });
              getPraise();
              getPraiseList();
              getCollect();
            },
            fail(err) {
              console.log(err);
            }
          });
        } else {
          db.collection("collect").where(`topic_id=='${topicId}'&&user_id=='${userId}'`).remove().then(() => {
            getPraise();
            getPraiseList();
            getCollect();
          });
        }
      });
    };
    const goTopicDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Daily/CatDaily/TopicDetail/index?id=${id}`,
        async success() {
          await db.collection("topic").where(`_id=='${id}'`).field("read").get({ getOne: true }).then((res) => {
            read.value = res.result.data.read;
          });
          db.collection("topic").where(`_id=='${id}'`).update({
            read: read.value + 1
          });
        },
        fail(err) {
          console.log(err);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(topicList.value, (topic2, k0, i0) => {
          return {
            a: topic2.user_id[0].avatar_file.url,
            b: common_vendor.t(topic2.user_id[0].nickname),
            c: "5cbb5e1b-0-" + i0,
            d: common_vendor.p({
              date: topic2.create_time,
              format: "MM-dd hh:mm"
            }),
            e: common_vendor.t(topic2.content),
            f: common_vendor.o(($event) => goTopicDetail(topic2._id._value)),
            g: common_vendor.f(topic2.image, (image, index, i1) => {
              return {
                a: image.path,
                b: index
              };
            }),
            h: common_vendor.o(($event) => goTopicDetail(topic2._id._value)),
            i: "5cbb5e1b-1-" + i0,
            j: common_vendor.p({
              name: "agree",
              size: "23",
              color: praiseList.value.includes(topic2._id._value) ? "#ec9312" : "#ccc"
            }),
            k: common_vendor.t(topic2._id.collect.length),
            l: common_vendor.o(($event) => praise(topic2._id._value)),
            m: "5cbb5e1b-2-" + i0,
            n: common_vendor.t(topic2._id.comment.length),
            o: topic2.create_time
          };
        }),
        b: common_vendor.p({
          name: "message",
          size: "25"
        }),
        c: ifLoading.value
      }, ifLoading.value ? {
        d: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        e: !ifLoading.value
      }, !ifLoading.value ? {
        f: common_vendor.p({
          status: "noMore"
        })
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5cbb5e1b"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/Tab/CatDaily/index.vue"]]);
wx.createComponent(Component);

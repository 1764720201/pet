"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_dateformat2 + _easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_load_more + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const db = common_vendor.pn.database();
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const goAdopt = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/index?id=${id}`
      });
    };
    const goFound = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Enlightenment/index?id=${id}`
      });
    };
    const goTopic = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Daily/CatDaily/TopicDetail/index?id=${id}`
      });
    };
    const goUserInfo = (userId2) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/UserInfo/index?userId=${userId2}`
      });
    };
    const udb = common_vendor.ref(null);
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
    });
    const comment = common_vendor.reactive([
      db.collection("comment").getTemp(),
      db.collection("adoption").where(`user_id=='${userId}'`).field("img,user_id,_id").getTemp(),
      db.collection("foundPet").where(`user_id=='${userId}'`).field("uploadPicture,user_id,_id").getTemp(),
      db.collection("topic").where(`user_id=='${userId}'`).field("image,user_id,_id").getTemp()
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          pagination,
          loading,
          error,
          hasMore
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : {
            c: common_vendor.f(data, (comment2, k1, i1) => {
              return common_vendor.e({
                a: comment2.found_id[0] || comment2.topic_id[0] || comment2.adopt_id[0]
              }, comment2.found_id[0] || comment2.topic_id[0] || comment2.adopt_id[0] ? common_vendor.e({
                b: comment2 == null ? void 0 : comment2.avatar_url,
                c: common_vendor.o(($event) => goUserInfo(comment2 == null ? void 0 : comment2.user_id)),
                d: common_vendor.t(comment2 == null ? void 0 : comment2.nickname),
                e: "4c9599b6-1-" + i0 + "-" + i1 + ",4c9599b6-0",
                f: common_vendor.p({
                  date: comment2 == null ? void 0 : comment2.create_time,
                  format: "yyyy-MM-dd hh:mm:ss"
                }),
                g: comment2.adopt_id[0]
              }, comment2.adopt_id[0] ? {
                h: comment2.adopt_id[0].img[0].url,
                i: common_vendor.o(($event) => goAdopt(comment2.adopt_id[0]._id))
              } : {}, {
                j: comment2.found_id[0]
              }, comment2.found_id[0] ? {
                k: comment2.found_id[0].uploadPicture[0].url,
                l: common_vendor.o(($event) => goFound(comment2.found_id[0]._id))
              } : {}, {
                m: comment2.topic_id[0]
              }, comment2.topic_id[0] ? {
                n: comment2.topic_id[0].image[0].url,
                o: common_vendor.o(($event) => goTopic(comment2.topic_id[0]._id))
              } : {}, {
                p: common_vendor.t(comment2 == null ? void 0 : comment2.comment)
              }) : {}, {
                q: comment2._id
              });
            })
          }, {
            d: loading
          }, loading ? {
            e: "4c9599b6-2-" + i0 + ",4c9599b6-0",
            f: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            g: hasMore && !loading
          }, hasMore && !loading ? {
            h: "4c9599b6-3-" + i0 + ",4c9599b6-0",
            i: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            k: "4c9599b6-4-" + i0 + ",4c9599b6-0",
            l: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            j: !hasMore && !loading,
            m: i0,
            n: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "4c9599b6-0"
        }),
        b: common_vendor.sr(udb, "4c9599b6-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          where: `comment_type==0||comment_user_id=='${common_vendor.unref(userId)}'`,
          orderby: "create_time desc",
          field: "adopt_id,found_id,_id,avatar_url,user_id,nickname,create_time,comment,topic_id",
          collection: comment,
          getone: false
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c9599b6"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Message/MyComment/index.vue"]]);
wx.createPage(MiniProgramPage);

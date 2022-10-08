"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_unicloud_db2)();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_unicloud_db = () => "../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const udb = common_vendor.ref(null);
    const deleteTopic = (id) => {
      udb.value.remove(id, {
        confirmContent: "\u4F60\u786E\u8BA4\u8981\u5220\u9664\u8BE5\u8BDD\u9898\u5417"
      });
    };
    const goTopic = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Daily/CatDaily/TopicDetail/index?id=${id}`
      });
    };
    const goParticipation = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Daily/Participation/index?id=${id}`
      });
    };
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
            c: common_vendor.f(data, (topic, k1, i1) => {
              return {
                a: topic.image[0].url,
                b: common_vendor.o(($event) => goTopic(topic._id)),
                c: common_vendor.t(topic.content),
                d: common_vendor.o(($event) => deleteTopic(topic._id)),
                e: "3873d14e-1-" + i0 + "-" + i1 + ",3873d14e-0",
                f: "3873d14e-2-" + i0 + "-" + i1 + ",3873d14e-0",
                g: common_vendor.p({
                  date: topic.create_time,
                  format: "yyyy-MM-dd hh:mm:ss"
                }),
                h: "3873d14e-3-" + i0 + "-" + i1 + ",3873d14e-0",
                i: common_vendor.t(topic.read),
                j: common_vendor.w(({
                  data: data2
                }, s2, i2) => {
                  return {
                    a: "3873d14e-5-" + i0 + "-" + i1 + "-" + i2 + "," + ("3873d14e-4-" + i0 + "-" + i1),
                    b: common_vendor.t(data2.length),
                    c: i2,
                    d: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("c[" + i1 + "].") + "j",
                  vueId: "3873d14e-4-" + i0 + "-" + i1 + ",3873d14e-0"
                }),
                k: "3873d14e-4-" + i0 + "-" + i1 + ",3873d14e-0",
                l: common_vendor.p({
                  collection: "collect",
                  where: `topic_id=='${topic._id}'`
                }),
                m: common_vendor.o(($event) => goParticipation(topic._id)),
                n: topic._id
              };
            }),
            d: common_vendor.p({
              type: "trash-filled",
              size: "20"
            }),
            e: common_vendor.p({
              type: "eye",
              size: "20"
            }),
            f: common_vendor.p({
              type: "hand-up",
              size: "20"
            })
          }, {
            g: i0,
            h: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "3873d14e-0"
        }),
        b: common_vendor.sr(udb, "3873d14e-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          collection: "topic",
          orderby: "create_time desc",
          field: "content,image,user_id,create_time,read,_id",
          where: `user_id=='${common_vendor.unref(userId)}'`,
          getone: false,
          ["page-size"]: 4
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3873d14e"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Home/Daily/MyTopic/index.vue"]]);
wx.createPage(MiniProgramPage);

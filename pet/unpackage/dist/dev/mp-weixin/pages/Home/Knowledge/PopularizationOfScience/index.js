"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_icons2 + _easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const udb = common_vendor.ref(null);
    const db = common_vendor.pn.database();
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
    });
    const goEncyclopedia = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/index"
      });
    };
    const watch = common_vendor.ref();
    const goKnowledge = (knowledgeId) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Knowledge/PopularizationOfScience/Knowledge/index?knowledgeId=${knowledgeId}`,
        success() {
          db.collection("petKnowledge").where(`_id=='${knowledgeId}'`).get({
            getOne: true
          }).then((res) => {
            watch.value = res.result.data.watch;
          }).then(async () => {
            await db.collection("petKnowledge").where(`_id=='${knowledgeId}'`).update({
              watch: watch.value + 1
            });
            udb.value.refresh();
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search",
          size: "30",
          color: "white"
        }),
        b: common_vendor.o(goEncyclopedia),
        c: common_vendor.w(({
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
            c: common_vendor.f(data, (knowledge, k1, i1) => {
              return {
                a: common_vendor.t(knowledge.title),
                b: "0a8805bd-2-" + i0 + "-" + i1 + ",0a8805bd-1",
                c: common_vendor.t(knowledge == null ? void 0 : knowledge.watch),
                d: knowledge.image,
                e: knowledge._id,
                f: common_vendor.o(($event) => goKnowledge(knowledge._id), knowledge._id)
              };
            }),
            d: common_vendor.p({
              type: "eye",
              size: "18",
              color: "#666"
            })
          }, {
            e: loading
          }, loading ? {
            f: "0a8805bd-3-" + i0 + ",0a8805bd-1",
            g: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            h: hasMore && !loading
          }, hasMore && !loading ? {
            i: "0a8805bd-4-" + i0 + ",0a8805bd-1",
            j: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            l: "0a8805bd-5-" + i0 + ",0a8805bd-1",
            m: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            k: !hasMore && !loading,
            n: i0,
            o: s0
          });
        }, {
          name: "d",
          path: "c",
          vueId: "0a8805bd-1"
        }),
        d: common_vendor.sr(udb, "0a8805bd-1", {
          "k": "udb"
        }),
        e: common_vendor.p({
          collection: "petKnowledge",
          field: "_id,title,image,watch",
          getone: false,
          where: _ctx.where,
          ["page-size"]: 5
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a8805bd"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/Knowledge/PopularizationOfScience/index.vue"]]);
wx.createPage(MiniProgramPage);

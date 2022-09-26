"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  _easycom_unicloud_db2();
}
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  _easycom_unicloud_db();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Knowledge",
  setup(__props) {
    const watch = common_vendor.ref();
    const db = common_vendor.pn.database();
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
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
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          loading,
          error,
          options
        }, s0, i0) => {
          return {
            a: common_vendor.f(data, (knowledge, k1, i1) => {
              return {
                a: common_vendor.w(({
                  data: data2,
                  loading: loading2,
                  error: error2,
                  options: options2
                }, s2, i2) => {
                  return {
                    a: data2 == null ? void 0 : data2.image,
                    b: common_vendor.t(data2 == null ? void 0 : data2.title),
                    c: common_vendor.t(data2 == null ? void 0 : data2.main),
                    d: i2,
                    e: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("a[" + i1 + "].") + "a",
                  vueId: "1bc653d4-1-" + i0 + "-" + i1 + ",1bc653d4-0"
                }),
                b: "1bc653d4-1-" + i0 + "-" + i1 + ",1bc653d4-0",
                c: common_vendor.p({
                  collection: "petKnowledge",
                  where: `_id=='${knowledge == null ? void 0 : knowledge.knowledge_id}'`,
                  getone: true
                }),
                d: knowledge._id,
                e: common_vendor.o(($event) => goKnowledge(knowledge.knowledge_id), knowledge._id)
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "d",
          path: "a",
          vueId: "1bc653d4-0"
        }),
        b: common_vendor.p({
          collection: "collect",
          where: `user_id=='${common_vendor.unref(userId)}'&&type==2`,
          field: "knowledge_id,_id"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1bc653d4"], ["__file", "C:/Users/yzc/Desktop/pet/components/Tab/Collect/Knowledge.vue"]]);
wx.createComponent(Component);

"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const goFoundPet = () => {
      common_vendor.index.navigateTo({
        url: "/pages/FoundPet/index"
      });
    };
    const goPopularizationOfScience = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Home/Knowledge/PopularizationOfScience/index"
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
          });
        }
      });
    };
    const knowledgeList = common_vendor.ref([]);
    const db = common_vendor.pn.database();
    common_vendor.onLoad(() => {
      db.collection("petKnowledge").get().then((res) => {
        knowledgeList.value = res.result.data;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(knowledgeList.value, (knowledge, k0, i0) => {
          return {
            a: common_vendor.t(knowledge.title),
            b: knowledge._id,
            c: common_vendor.o(($event) => goKnowledge(knowledge._id), knowledge._id)
          };
        }),
        b: common_vendor.o(goPopularizationOfScience),
        c: common_vendor.o(goFoundPet)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6d33d24a"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/Knowledge/index.vue"]]);
wx.createComponent(Component);

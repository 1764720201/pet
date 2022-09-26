"use strict";
var common_vendor = require("../../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const knowledge = common_vendor.reactive({
      title: "",
      watch: null,
      content: [],
      main: "",
      image: "",
      _id: ""
    });
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const db = common_vendor.pn.database();
    const collect = () => {
      if (!ifCollect.value) {
        common_vendor.pn.callFunction({
          name: "collect",
          data: {
            userId,
            type: 2,
            knowledgeId: knowledge._id
          },
          success() {
            common_vendor.index.showToast({
              title: "\u6536\u85CF\u6210\u529F"
            });
            getCollect();
          }
        });
      } else {
        db.collection("collect").where(`knowledge_id=='${knowledge._id}'&&type==${2}`).remove().then(() => {
          getCollect();
        });
      }
    };
    const ifCollect = common_vendor.ref();
    const getCollect = async () => {
      await db.collection("collect").where(`knowledge_id=='${knowledge._id}'&&type==${2}`).get({
        getOne: true
      }).then((res) => {
        if (res.result.data) {
          ifCollect.value = true;
        } else {
          ifCollect.value = false;
        }
      });
    };
    common_vendor.onLoad((option) => {
      db.collection("petKnowledge").where(`_id=='${option.knowledgeId}'`).get({
        getOne: true
      }).then((res) => {
        Object.assign(knowledge, res.result.data);
      }).then(() => {
        getCollect();
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(knowledge.title),
        b: common_vendor.p({
          type: "eye",
          size: "18",
          color: "#666"
        }),
        c: common_vendor.t(knowledge.watch),
        d: common_vendor.p({
          type: "star",
          size: "20",
          color: ifCollect.value ? "#e6612c" : "#666"
        }),
        e: !ifCollect.value
      }, !ifCollect.value ? {} : {}, {
        f: common_vendor.o(collect),
        g: common_vendor.t(knowledge.main),
        h: knowledge.image,
        i: common_vendor.f(knowledge.content, (knowledgeContent, index, i0) => {
          return {
            a: common_vendor.t(knowledgeContent[0]),
            b: common_vendor.t(knowledgeContent[1]),
            c: index
          };
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-31a5ace8"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/Knowledge/PopularizationOfScience/Knowledge/index.vue"]]);
wx.createPage(MiniProgramPage);

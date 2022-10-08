"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    hasLogin: { type: Boolean, required: true },
    userId: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { hasLogin, userId } = common_vendor.toRefs(props);
    const db = common_vendor.pn.database();
    const getQuantity = async () => {
      const comment = db.collection("comment").where(`comment_type==0||comment_user_id=='${userId.value}'`).getTemp();
      const collect = db.collection("collect").where("type==0||type==1||type==4").field("adopt_id,topic_id,found_id,_id,type").getTemp();
      getSum(comment, "comment");
      getSum(collect, "collect");
    };
    common_vendor.watch(() => hasLogin.value, async () => {
      await getQuantity();
    });
    common_vendor.onShow(async () => {
      await getQuantity();
    });
    const commentQuantity = common_vendor.ref(0);
    const collectQuantity = common_vendor.ref(0);
    const goMyComment = () => {
      common_vendor.index.navigateTo({
        url: "./MyComment/index"
      });
    };
    const goMyCollect = () => {
      common_vendor.index.navigateTo({
        url: "./MyCollect/index"
      });
    };
    const getSum = async (collection, option) => {
      collectQuantity.value = 0;
      commentQuantity.value = 0;
      const col = option;
      const adoption = db.collection("adoption").where(`user_id=='${userId.value}'`).getTemp();
      const foundPet = db.collection("foundPet").where(`user_id=='${userId.value}'`).getTemp();
      const topic = db.collection("topic").where(`user_id=='${userId.value}'`).getTemp();
      await db.collection(collection, adoption, foundPet, topic).field("size(adopt_id) as adopt,size(topic_id) as topic,size(found_id) as found").groupBy("num").groupField("sum(adopt) as sumAdopt,sum(found) as sumFound,sum(topic) as sumTopic").get({ getOne: true }).then((res) => {
        const arr = Object.values(res.result.data);
        if (col == "collect") {
          for (let i = 1; i < 4; i++) {
            collectQuantity.value += arr[i];
          }
        } else if (col == "comment") {
          for (let i = 1; i < 4; i++) {
            commentQuantity.value += arr[i];
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(collectQuantity.value),
        b: common_vendor.o(goMyCollect),
        c: common_vendor.t(commentQuantity.value),
        d: common_vendor.o(goMyComment)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5cad1fb6"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Message/Received/index.vue"]]);
wx.createComponent(Component);

"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "PetDetail",
  props: {
    petId: { type: String, required: true },
    field: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { petId, field } = common_vendor.toRefs(props);
    const db = common_vendor.pn.database();
    const petIntroduce = common_vendor.reactive({});
    common_vendor.watch(() => [field.value, petId.value], () => {
      db.collection("pet").where(`_id=='${petId.value}'`).field(field.value).get().then((res) => {
        Object.assign(petIntroduce, res.result.data[0]);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(petIntroduce[common_vendor.unref(field)])
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55583fb6"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/Tab/Encyclopedia/PetDetail.vue"]]);
wx.createComponent(Component);

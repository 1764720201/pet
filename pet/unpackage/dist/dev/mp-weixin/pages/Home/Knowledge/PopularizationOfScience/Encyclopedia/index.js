"use strict";
var common_vendor = require("../../../../../common/vendor.js");
if (!Math) {
  common_vendor.unref(Encyclopedia)();
}
const Encyclopedia = () => "../../../../../components/Tab/Encyclopedia/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const categoryList = common_vendor.reactive([
      {
        text: "\u732B\u732B",
        value: 0
      },
      {
        text: "\u72D7\u72D7",
        value: 1
      },
      {
        text: "\u722C\u884C\u7C7B",
        value: 2
      },
      {
        text: "\u5C0F\u5BA0\u7269\u7C7B",
        value: 3
      }
    ]);
    const where = common_vendor.ref("pettype==0");
    const currentIndex = common_vendor.ref(0);
    const choose = (index) => {
      currentIndex.value = index;
      where.value = `pettype==${index}`;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(categoryList, (category, k0, i0) => {
          return {
            a: common_vendor.t(category.text),
            b: category.value,
            c: common_vendor.o(($event) => choose(category.value), category.value),
            d: currentIndex.value == category.value ? 1 : ""
          };
        }),
        b: common_vendor.p({
          where: where.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ea30d0b0"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/index.vue"]]);
wx.createPage(MiniProgramPage);

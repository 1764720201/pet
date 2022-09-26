"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_lgd_tab2 = common_vendor.resolveComponent("lgd-tab");
  _easycom_lgd_tab2();
}
const _easycom_lgd_tab = () => "../../../../uni_modules/lgd-tab/components/lgd-tab/lgd-tab.js";
if (!Math) {
  (_easycom_lgd_tab + Adopt + FoundPet + Knowledge + PopularizationOfScience)();
}
const Adopt = () => "../../../../components/Tab/Collect/Adopt.js";
const FoundPet = () => "../../../../components/Tab/Collect/FoundPet.js";
const Knowledge = () => "../../../../components/Tab/Collect/Knowledge.js";
const PopularizationOfScience = () => "../../../../components/Tab/Collect/PopularizationOfScience.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const tabValue = common_vendor.reactive(["\u9886\u517B", "\u5BFB\u5BA0", "\u79D1\u666E", "\u767E\u79D1"]);
    const tabIndex = common_vendor.ref(0);
    const getIndex = (e) => {
      tabIndex.value = e;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(getIndex),
        b: common_vendor.p({
          tabValue,
          tabIndex: tabIndex.value,
          textColor: "#ec8a9e ",
          underlineColor: "#ec8a9e"
        }),
        c: tabIndex.value == 0
      }, tabIndex.value == 0 ? {} : {}, {
        d: tabIndex.value == 1
      }, tabIndex.value == 1 ? {} : {}, {
        e: tabIndex.value == 2
      }, tabIndex.value == 2 ? {} : {}, {
        f: tabIndex.value == 3
      }, tabIndex.value == 3 ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/pet/pages/Mine/PersonalInformation/Collect/index.vue"]]);
wx.createPage(MiniProgramPage);

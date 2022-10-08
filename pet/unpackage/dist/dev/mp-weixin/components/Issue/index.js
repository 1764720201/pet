"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    issue: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { issue } = common_vendor.toRefs(props);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(issue)),
        b: common_vendor.o(($event) => _ctx.$emit("click", $event))
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19370411"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/Issue/index.vue"]]);
wx.createComponent(Component);

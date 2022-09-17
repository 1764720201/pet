"use strict";
var common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "tuiIcon",
  emits: ["click"],
  props: {
    name: {
      type: String,
      default: ""
    },
    size: {
      type: [Number, String],
      default: 32
    },
    unit: {
      type: String,
      default: "px"
    },
    color: {
      type: String,
      default: "#999"
    },
    bold: {
      type: Boolean,
      default: false
    },
    margin: {
      type: String,
      default: "0"
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      icons: common_vendor.icons
    };
  },
  methods: {
    handleClick() {
      this.$emit("click", {
        index: this.index
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.icons[$props.name]),
    b: $props.color || "#999",
    c: $props.size + $props.unit,
    d: $props.bold ? "bold" : "normal",
    e: $props.margin,
    f: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0a9259bf"], ["__file", "C:/Users/yzc/Desktop/pet/node_modules/thorui-uni/lib/thorui/tui-icon/tui-icon.vue"]]);
wx.createComponent(Component);

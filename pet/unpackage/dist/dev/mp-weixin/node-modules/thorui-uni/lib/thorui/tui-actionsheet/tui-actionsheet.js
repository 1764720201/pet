"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "tuiActionsheet",
  emits: ["click", "cancel"],
  props: {
    maskClosable: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    itemList: {
      type: Array,
      default: function() {
        return [{
          text: "\u786E\u5B9A",
          color: "#2B2B2B"
        }];
      }
    },
    tips: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#808080"
    },
    size: {
      type: Number,
      default: 26
    },
    radius: {
      type: Boolean,
      default: true
    },
    isCancel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClickMask() {
      if (!this.maskClosable)
        return;
      this.handleClickCancel();
    },
    handleClickItem(e) {
      if (!this.show)
        return;
      const index = Number(e.currentTarget.dataset.index);
      this.$emit("click", __spreadValues({
        index
      }, this.itemList[index]));
    },
    handleClickCancel() {
      this.$emit("cancel");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.tips
  }, $props.tips ? {
    b: common_vendor.t($props.tips),
    c: $props.size + "rpx",
    d: $props.color
  } : {}, {
    e: common_vendor.f($props.itemList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: !$props.isCancel && index == $props.itemList.length - 1 ? 1 : "",
        c: index,
        d: item.color || "#2B2B2B",
        e: index
      };
    }),
    f: common_vendor.o((...args) => $options.handleClickItem && $options.handleClickItem(...args)),
    g: common_vendor.n($props.isCancel ? "tui-operate-box" : ""),
    h: $props.isCancel
  }, $props.isCancel ? {
    i: common_vendor.o((...args) => $options.handleClickCancel && $options.handleClickCancel(...args))
  } : {}, {
    j: $props.show ? 1 : "",
    k: $props.radius ? 1 : "",
    l: $props.show ? 1 : "",
    m: common_vendor.o((...args) => $options.handleClickMask && $options.handleClickMask(...args)),
    n: common_vendor.o(() => {
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1c232509"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/node_modules/thorui-uni/lib/thorui/tui-actionsheet/tui-actionsheet.vue"]]);
wx.createComponent(Component);

"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    mode: {
      type: Number,
      default: 1
    },
    button: {
      type: String,
      default: "outside"
    },
    show: {
      type: Boolean,
      default: true
    },
    radius: {
      type: String,
      default: "60"
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9"
    },
    backgroundColor: {
      type: String,
      default: "#fff"
    },
    border: { type: String, default: "1px #f5f5f5 solid" }
  },
  data() {
    return {
      active: false,
      inputVal: "",
      searchName: "\u53D6\u6D88",
      isDelShow: false,
      isFocus: false
    };
  },
  methods: {
    focus() {
      this.active = true;
    },
    blur() {
      this.isFocus = false;
      if (!this.inputVal) {
        this.active = false;
      }
    },
    clear() {
      this.inputVal = "";
      this.active = false;
      this.$emit("search", "");
    },
    getFocus() {
      this.isFocus = true;
    },
    search() {
      if (!this.inputVal)
        return;
      console.log(this.inputVal);
      this.$emit("search", this.inputVal);
    }
  },
  watch: {
    inputVal(newVal) {
      if (newVal) {
        this.searchName = "\u641C\u7D22";
        this.isDelShow = true;
      } else {
        this.searchName = "\u53D6\u6D88";
        this.isDelShow = false;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.active && $props.mode === 2 ? 1 : "",
    b: $data.isFocus,
    c: $props.placeholder,
    d: common_vendor.o((...args) => $options.focus && $options.focus(...args)),
    e: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    f: $data.inputVal,
    g: common_vendor.o(($event) => $data.inputVal = $event.detail.value),
    h: $data.isDelShow
  }, $data.isDelShow ? {
    i: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}, {
    j: $props.mode === 2 ? 1 : "",
    k: $data.active && $props.show && $props.button === "inside" || $data.isDelShow && $props.button === "inside",
    l: common_vendor.o((...args) => $options.search && $options.search(...args)),
    m: $props.radius + "px",
    n: $props.border,
    o: $props.button === "outside"
  }, $props.button === "outside" ? {
    p: common_vendor.t(!$props.show ? $data.searchName : "\u641C\u7D22"),
    q: $props.show || $data.active ? 1 : "",
    r: common_vendor.o((...args) => $options.search && $options.search(...args))
  } : {}, {
    s: $props.backgroundColor
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c742fcb8"], ["__file", "C:/Users/yzc/Desktop/pet/components/mehaotian-search/mehaotian-search.vue"]]);
wx.createComponent(Component);

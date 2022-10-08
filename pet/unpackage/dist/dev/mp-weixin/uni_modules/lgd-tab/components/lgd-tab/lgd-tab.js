"use strict";
var common_vendor = require("../../../../common/vendor.js");
let valueChange = false;
const _sfc_main = {
  props: {
    tabValue: {
      type: Array,
      default: [],
      required: true
    },
    textColor: {
      type: String,
      default: "#333"
    },
    underlineColor: {
      type: String,
      default: "#34b2fa"
    },
    fontSize: {
      type: Number,
      default: 16
    },
    background: {
      type: String,
      default: "#fff"
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      windowsWidth: 0,
      boxLeft: 0,
      isOutWindow: false,
      inderWidth: 0,
      indexLeft: 0,
      scrollLeft: 0,
      tIndex: 0
    };
  },
  watch: {
    tabValue() {
      valueChange = true;
      this.$nextTick(() => {
        this.init();
      });
    },
    tabIndex(newValue, oldValue) {
      if (!valueChange)
        this.clickTab(newValue);
    }
  },
  methods: {
    init() {
      let that = this;
      common_vendor.index.createSelectorQuery().in(this).selectAll(".items").boundingClientRect().exec((data) => {
        if (data[0][that.tabValue.length - 1].right > that.windowsWidth) {
          that.isOutWindow = true;
        }
        that.$nextTick(() => {
          that.clickTab(that.tabIndex);
        });
      });
    },
    clickTab(index) {
      this.tIndex = index;
      this.$emit("getIndex", index);
      if (this.isOutWindow && index >= 0) {
        common_vendor.index.createSelectorQuery().in(this).select(".tabBox").boundingClientRect().exec((data) => {
          if (index == 0) {
            this.boxLeft = 0;
          } else {
            this.boxLeft = -data[0].left;
          }
        });
      }
      common_vendor.index.createSelectorQuery().in(this).selectAll(".items").boundingClientRect().exec((data) => {
        let width = data[0][index].width;
        let left = data[0][index].left;
        let newLeft = 0;
        if (this.isOutWindow) {
          if (index == 0) {
            left = 0;
          }
          for (let i = 0; i < index; i++) {
            newLeft += data[0][i].width;
          }
          if (this.windowsWidth / 2 < newLeft + width) {
            this.scrollLeft = width / 2 - (this.windowsWidth / 2 - newLeft);
          } else {
            this.scrollLeft = 0;
          }
        }
        this.inderWidth = width / 2;
        this.indexLeft = (width - width / 2) / 2 + left;
        valueChange = false;
      });
    }
  },
  mounted() {
    this.windowsWidth = common_vendor.index.getSystemInfoSync().windowWidth;
    this.init();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabValue, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.n(index == $data.tIndex ? "active" : ""),
        c: index == $data.tIndex ? $props.textColor : "",
        d: index,
        e: common_vendor.o(($event) => $options.clickTab(index), index)
      };
    }),
    b: $props.fontSize + "px",
    c: $data.isOutWindow ? "" : "space-around",
    d: $data.inderWidth + "px",
    e: $data.indexLeft + $data.boxLeft + "px",
    f: $props.underlineColor,
    g: $data.scrollLeft,
    h: $props.background
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/uni_modules/lgd-tab/components/lgd-tab/lgd-tab.vue"]]);
wx.createComponent(Component);

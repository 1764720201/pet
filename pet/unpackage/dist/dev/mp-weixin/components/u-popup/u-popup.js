"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "u-popup",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    titleStyle: {
      type: Object,
      default: () => ({})
    },
    round: {
      type: Boolean,
      default: false
    },
    roundSize: {
      type: [String, Number],
      default: 0
    },
    close: {
      type: Boolean,
      default: false
    },
    closeStyle: {
      type: Object,
      default: () => ({})
    },
    overlay: {
      type: Boolean,
      default: true
    },
    overlayStopEmit: {
      type: Boolean,
      default: false
    },
    overlayBackground: {
      type: String,
      default: "#000"
    },
    overlayOpacity: {
      type: [String, Number],
      default: 0.5
    },
    background: {
      type: String,
      default: "#FFF"
    },
    mode: {
      type: String,
      default: "center"
    },
    duration: {
      type: [String, Number],
      default: 500
    },
    zIndex: {
      type: [String, Number],
      default: 9
    },
    throttleTime: {
      type: [String, Number],
      default: 1e3
    },
    hidden: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    let count = 0;
    const popupContentStyle = common_vendor.computed$1(() => {
      const { mode, zIndex, duration, show } = props;
      const style = {
        position: "fixed",
        zIndex,
        transitionDuration: !show && count === 0 ? 0 : duration + "ms"
      };
      if (count === 0) {
        count++;
      }
      style[mode] = 0 + "rpx";
      if (mode === "bottom" || mode === "top") {
        style.left = 0 + "rpx";
        style.right = 0 + "rpx";
      }
      if (mode === "left" || mode === "right") {
        style.top = 0 + "rpx";
        style.bottom = 0 + "rpx";
      }
      if (mode === "center") {
        style.left = "50%";
        style.top = "50%";
      }
      return style;
    });
    const overlayStyle = common_vendor.computed$1(() => {
      const { overlayBackground, overlayOpacity, duration, zIndex } = props;
      return {
        background: overlayBackground,
        opacity: overlayOpacity,
        transitionDuration: duration + "ms",
        zIndex
      };
    });
    const popupDataStyle = common_vendor.computed$1(() => {
      const style = {};
      const { round, roundSize, background, mode, hidden } = props;
      style.background = background;
      if (round) {
        const radius = roundSize + "rpx";
        if (mode === "bottom") {
          style.borderRadius = `${radius} ${radius} 0 0`;
        }
        if (mode === "top") {
          style.borderRadius = `0 0 ${radius} ${radius} `;
        }
        if (mode === "left") {
          style.borderRadius = `0 ${radius} ${radius} 0`;
        }
        if (mode === "right") {
          style.borderRadius = `${radius} 0 0 ${radius}`;
        }
        if (mode === "center") {
          style.borderRadius = radius;
        }
      }
      style.overflow = hidden ? "hidden" : "visible";
      return style;
    });
    const getAnimationName = (mode) => {
      if (mode === "bottom") {
        return "slide-up";
      }
      if (mode === "top") {
        return "slide-down";
      }
      if (mode === "left") {
        return "slide-left";
      }
      if (mode === "right") {
        return "slide-right";
      }
      if (mode === "center") {
        return "slide-center";
      }
    };
    const animationClass = (name) => ({
      enter: `${name}_enter`,
      leave: `${name}_leave`
    });
    const popupClass = common_vendor.computed$1(() => props.show ? "u-popup_overlay_enter" : "u-popup_overlay_leave");
    const popupContentClass = common_vendor.computed$1(() => {
      const { mode, show } = props;
      const classes = animationClass(getAnimationName(mode));
      return show ? classes.enter : classes.leave;
    });
    const sendEmit = () => {
      if (props.overlayStopEmit)
        return;
      emits("close");
    };
    const inited = common_vendor.ref(false);
    let transitionEnded = false;
    const overlayLeave = () => {
      if (transitionEnded)
        return;
      transitionEnded = true;
      setTimeout(() => {
        inited.value = false;
        transitionEnded = false;
      }, props.duration);
    };
    common_vendor.watch(() => props.show, (value) => {
      value ? inited.value = true : overlayLeave();
    }, {
      immediate: true
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: inited.value
      }, inited.value ? {
        b: common_vendor.n(common_vendor.unref(popupClass)),
        c: common_vendor.s(common_vendor.unref(overlayStyle)),
        d: common_vendor.o(sendEmit)
      } : {}, {
        e: __props.title
      }, __props.title ? {
        f: common_vendor.t(__props.title),
        g: common_vendor.s(__props.titleStyle)
      } : {}, {
        h: __props.close
      }, __props.close ? {
        i: common_vendor.s(__props.closeStyle),
        j: common_vendor.o(sendEmit)
      } : {}, {
        k: common_vendor.s(common_vendor.unref(popupDataStyle)),
        l: common_vendor.s(common_vendor.unref(popupContentStyle)),
        m: common_vendor.n(common_vendor.unref(popupContentClass))
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71654aae"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/u-popup/u-popup.vue"]]);
wx.createComponent(Component);

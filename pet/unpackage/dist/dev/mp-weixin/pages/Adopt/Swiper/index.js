"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const swiperList = common_vendor.reactive([
      {
        id: 0,
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/a9604a76-f5a8-46ba-886d-a59bb059ee76.jpeg"
      },
      {
        id: 1,
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/29ddc065-1587-44b6-ba34-75771c27e396.jpeg"
      },
      {
        id: 2,
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/cdc01a15-8b2d-46ec-bc6c-465d9f135388.jpeg"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList, (swiper, k0, i0) => {
          return {
            a: swiper.url,
            b: swiper.id
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb15a81a"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Adopt/Swiper/index.vue"]]);
wx.createComponent(Component);

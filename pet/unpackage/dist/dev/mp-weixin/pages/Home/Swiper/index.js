"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const swiperList = common_vendor.reactive([
      {
        id: 0,
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/0b4346a4-b894-4e94-bcf3-2e4a1c8e7eb2.jpeg"
      },
      {
        id: 1,
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/b727b6ca-ae3a-4483-9e6a-627e32b9d773.jpeg"
      },
      {
        id: 2,
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/a2e8a92d-6ae8-4e90-acab-69b782e35d62.jpeg"
      },
      {
        id: 3,
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/406cb3a0-8ff1-48bd-9e6a-d2afe7154fea.jpeg"
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
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4b6e2702"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Home/Swiper/index.vue"]]);
wx.createComponent(Component);

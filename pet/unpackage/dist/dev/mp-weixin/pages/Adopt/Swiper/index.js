"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const swiperList = common_vendor.ref([]);
    const db = common_vendor.pn.database();
    db.collection("images").where('title=="\u9886\u517B\u8F6E\u64AD\u56FE"').get().then((res) => {
      swiperList.value = res.result.data[0].image;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList.value, (swiper, index, i0) => {
          return {
            a: swiper.path,
            b: index
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb15a81a"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Adopt/Swiper/index.vue"]]);
wx.createComponent(Component);

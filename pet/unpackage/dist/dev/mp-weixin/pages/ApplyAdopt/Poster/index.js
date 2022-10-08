"use strict";
var common_vendor = require("../../../common/vendor.js");
var uni_modules_sakuraCanvas_js_sdk_index = require("../../../uni_modules/sakura-canvas/js_sdk/index.js");
require("../../../uni_modules/sakura-canvas/js_sdk/methods/text.js");
require("../../../uni_modules/sakura-canvas/js_sdk/utils/util.js");
require("../../../uni_modules/sakura-canvas/js_sdk/plugins/image-tools.js");
require("../../../uni_modules/sakura-canvas/js_sdk/methods/line.js");
require("../../../uni_modules/sakura-canvas/js_sdk/methods/rect.js");
require("../../../uni_modules/sakura-canvas/js_sdk/methods/arc.js");
require("../../../uni_modules/sakura-canvas/js_sdk/methods/image.js");
require("../../../uni_modules/sakura-canvas/js_sdk/methods/triangle.js");
require("../../../uni_modules/sakura-canvas/js_sdk/methods/qrcode.js");
require("../../../uni_modules/sakura-canvas/js_sdk/plugins/qrcodeAlg.js");
require("../../../uni_modules/sakura-canvas/js_sdk/methods/canvas.js");
require("../../../uni_modules/sakura-canvas/js_sdk/utils/common.js");
if (!Math) {
  uShowPoster();
}
const uShowPoster = () => "../../../components/u-show-poster/u-show-poster.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    petInfo: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const { petInfo } = common_vendor.toRefs(props);
    const { ctx } = common_vendor.getCurrentInstance();
    const canvasId = "poster";
    const canvasStyle = common_vendor.reactive({
      width: "600rpx",
      height: "1000rpx"
    });
    const showPoster = common_vendor.ref(false);
    const posterImage = common_vendor.ref("");
    let draw = null;
    const createDraw = () => {
      draw = new uni_modules_sakuraCanvas_js_sdk_index.DrawPoster({
        width: 600,
        height: 1e3,
        canvasId,
        _this: ctx,
        unit: "rpx",
        type: "default",
        background: {
          type: "color",
          color: "#fff"
        },
        drawDelayTime: 200,
        exportImageDelayTime: 600
      });
      draw.$on("init", async () => {
        await draw.drawBackground();
      });
    };
    const posterData = common_vendor.reactive({
      image: "",
      petImg: "",
      petName: "",
      petAge: "",
      city: "",
      story: ""
    });
    setTimeout(() => {
      const petData = common_vendor.reactive({
        image: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/36038397-4ec7-4037-a639-4749ae6cd106.png",
        petImg: petInfo.value.img[0].url,
        petName: "\u6211\u53EB" + petInfo.value.pet_name,
        petAge: "\u6211\u4ECA\u5E74" + petInfo.value.age + "\u4E86",
        city: "\u6211\u5728" + petInfo.value.city[0] + petInfo.value.city[1] + petInfo.value.city[2],
        story: petInfo.value.story
      });
      Object.assign(posterData, petData);
    }, 1e3);
    const drawPoster = async () => {
      const { image, petImg, petName, petAge, city, story } = posterData;
      const res = await draw.drawPoster(({ ctxObj, bgObj }) => {
        const { width, height } = ctxObj;
        const background = {
          name: "background",
          type: "rect",
          w: width,
          h: height,
          color: "#ffffff",
          shadow: {
            show: false,
            blur: 30,
            color: "rgba(0, 0, 0, .15)"
          }
        };
        const backImg = {
          unit: "rpx",
          type: "image",
          drawType: "rect",
          src: image,
          h: 1e3,
          w: 600,
          mode: "aspectFill"
        };
        const petInfoImg = {
          unit: "rpx",
          type: "image",
          drawType: "rect",
          src: petImg,
          windowAlign: "center",
          y: 155,
          h: 315,
          w: 370
        };
        const name = {
          type: "text",
          text: petName,
          y: 550,
          x: 50,
          font: {
            size: 25,
            weight: 900
          }
        };
        const age = {
          type: "text",
          text: petAge,
          y: 550,
          x: 350,
          font: {
            size: 25,
            weight: 900
          }
        };
        const petCity = {
          type: "text",
          text: city,
          w: 650,
          y: 600,
          x: 50,
          font: {
            size: 25,
            weight: 900
          }
        };
        const petStory = {
          type: "text",
          text: story,
          y: 650,
          x: 35,
          w: 560,
          font: {
            size: 25,
            weight: 900
          },
          LineHeight: {
            height: 35
          }
        };
        return [background, backImg, petInfoImg, name, age, petCity, petStory];
      });
      if (!res.success)
        return;
      showPoster.value = true;
      posterImage.value = res.data;
    };
    common_vendor.onMounted(() => {
      createDraw();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(drawPoster),
        b: canvasId,
        c: canvasId,
        d: common_vendor.s(canvasStyle),
        e: common_vendor.o(($event) => showPoster.value = $event),
        f: common_vendor.p({
          image: posterImage.value,
          modelValue: showPoster.value
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4d441e98"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/ApplyAdopt/Poster/index.vue"]]);
wx.createComponent(Component);

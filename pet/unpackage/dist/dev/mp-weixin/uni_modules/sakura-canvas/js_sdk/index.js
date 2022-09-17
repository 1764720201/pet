"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var common_vendor = require("../../../common/vendor.js");
var uni_modules_sakuraCanvas_js_sdk_methods_text = require("./methods/text.js");
var uni_modules_sakuraCanvas_js_sdk_methods_line = require("./methods/line.js");
var uni_modules_sakuraCanvas_js_sdk_methods_rect = require("./methods/rect.js");
var uni_modules_sakuraCanvas_js_sdk_methods_arc = require("./methods/arc.js");
var uni_modules_sakuraCanvas_js_sdk_methods_image = require("./methods/image.js");
var uni_modules_sakuraCanvas_js_sdk_methods_triangle = require("./methods/triangle.js");
var uni_modules_sakuraCanvas_js_sdk_methods_qrcode = require("./methods/qrcode.js");
var uni_modules_sakuraCanvas_js_sdk_methods_canvas = require("./methods/canvas.js");
var uni_modules_sakuraCanvas_js_sdk_utils_common = require("./utils/common.js");
class DrawPoster {
  constructor(options) {
    const {
      width = 375.0001,
      height = 0,
      canvasId = null,
      _this = null,
      background = {},
      type = "default",
      unit = "px",
      drawDelayTime = 200,
      exportImageDelayTime = 200,
      drawTipsText = "\u7ED8\u5236\u4E2D...",
      exportImageTips = "\u5BFC\u51FA\u56FE\u7247\u4E2D...",
      fontStyle = {},
      exportImageStyle = {}
    } = options;
    this.background = __spreadValues({
      type: "color",
      w: width,
      h: height,
      color: "#ffffff"
    }, background);
    this.canvasId = canvasId;
    this._this = _this;
    this.type = type;
    this.is2d = this.type === "2d";
    this.unit = unit;
    this.drawDelayTime = drawDelayTime;
    this.exportImageDelayTime = exportImageDelayTime;
    this.drawTipsText = drawTipsText;
    this.exportImageTips = exportImageTips;
    this.fontStyle = __spreadValues({
      size: this.type === "default" ? 16 : 32,
      family: "sans-serif",
      style: "normal",
      variant: "normal",
      weight: "normal"
    }, fontStyle);
    this.commonUtilMethods = new uni_modules_sakuraCanvas_js_sdk_utils_common.CommonUtilMethods({
      unit,
      type: this.type,
      width,
      height,
      fontStyle: this.fontStyle
    });
    this.setCanvasStyle(width, height);
    this.exportImageStyle = __spreadValues({
      width,
      height,
      x: 0,
      y: 0,
      fileType: "png",
      quality: 1
    }, exportImageStyle);
    this.allCallback = [];
    this.$eventsMap = /* @__PURE__ */ new Map();
    this.createContext();
    this.drawCallback = null;
  }
  async createContext() {
    const { width, height, canvasId, _this, type, is2d } = this;
    const setValue = (Context, canvas = null) => {
      this.Context = Context;
      this.canvas = canvas;
      this.commonDrawMethods = new uni_modules_sakuraCanvas_js_sdk_utils_common.CommonDrawMethods(Context, type, this.commonUtilMethods);
      this.commonUtilMethods.Context = Context;
      this.commonUtilMethods.canvas = canvas;
      this.initDrawMethods();
      this.$emit("init");
    };
    const dpr = common_vendor.index.getSystemInfoSync().pixelRatio;
    this.dpr = dpr;
    if (!is2d) {
      const Context = common_vendor.index.createCanvasContext(canvasId, _this);
      await uni_modules_sakuraCanvas_js_sdk_utils_common.sleep(50);
      setValue(Context);
    } else {
      common_vendor.index.createSelectorQuery().select(`#${canvasId}`).fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node;
        const Context = canvas.getContext(type);
        canvas.width = this.commonUtilMethods.getConvertedValue(width) * dpr;
        canvas.height = this.commonUtilMethods.getConvertedValue(height) * dpr;
        Context.scale(dpr, dpr);
        setValue(Context, canvas);
      });
    }
  }
  initDrawMethods() {
    const { Context, commonUtilMethods, commonDrawMethods } = this;
    const initParams = {
      Context,
      commonUtilMethods,
      commonDrawMethods
    };
    this.canvasMethods = new uni_modules_sakuraCanvas_js_sdk_methods_canvas.Canvas(this);
    const drawText = new uni_modules_sakuraCanvas_js_sdk_methods_text.DrawText(initParams);
    const drawLine = new uni_modules_sakuraCanvas_js_sdk_methods_line.drawLine(initParams);
    const drawRect = new uni_modules_sakuraCanvas_js_sdk_methods_rect.DrawRect(initParams);
    const drawArc = new uni_modules_sakuraCanvas_js_sdk_methods_arc.DrawArc(initParams);
    const drawImage = new uni_modules_sakuraCanvas_js_sdk_methods_image.DrawImage(initParams);
    const drawTriangle = new uni_modules_sakuraCanvas_js_sdk_methods_triangle.DrawTriangle(initParams);
    const drawQrcode = new uni_modules_sakuraCanvas_js_sdk_methods_qrcode.DrawQrcode(initParams);
    this.commonDrawMethods.drawParams = {
      drawText,
      drawLine,
      drawRect,
      drawArc,
      drawImage,
      drawTriangle,
      drawQrcode
    };
    this.drawText = drawText;
    this.drawLine = drawLine;
    this.drawRect = drawRect;
    this.drawArc = drawArc;
    this.drawImage = drawImage;
    this.drawTriangle = drawTriangle;
    this.drawQrcode = drawQrcode;
  }
  setExportImageStyle(options) {
    this.exportImageStyle = __spreadValues(__spreadValues({}, this.exportImageStyle), options);
  }
  setBackgroundStyle(options) {
    this.background = __spreadValues(__spreadValues({}, this.background), options);
  }
  async setCanvasStyle(width, height) {
    this.width = width;
    this.height = height;
    this.commonUtilMethods.width = width;
    this.commonUtilMethods.height = height;
    this.commonUtilMethods.setCanvasStyle();
    this.callbackInfo = {
      bgObj: {
        width: this.background.w,
        height: this.background.h
      },
      ctxObj: {
        width,
        height
      }
    };
    this.setExportImageStyle({
      width,
      height
    });
    if (this.canvas) {
      const { dpr, canvas, Context, commonUtilMethods } = this;
      canvas.width = commonUtilMethods.getConvertedValue(width) * dpr;
      canvas.height = commonUtilMethods.getConvertedValue(height) * dpr;
      Context.scale(dpr, dpr);
      await this.drawBackground(false);
      if (this.drawArrayFn) {
        await this.drawCanvas(this.drawArrayFn(this.callbackInfo), false);
      }
    }
  }
  $on(type = "", callback = null) {
    if (!type || !callback)
      return;
    if (typeof callback !== "function")
      return;
    let eventSet = this.$eventsMap.get(type);
    if (!eventSet) {
      this.$eventsMap.set(type, eventSet = /* @__PURE__ */ new Set());
    }
    eventSet.add(callback);
  }
  $emit(type = "", ...args) {
    if (!type)
      return;
    const eventSet = this.$eventsMap.get(type);
    if (eventSet) {
      eventSet.forEach((event) => {
        event.apply(this, args);
      });
    }
  }
  drawBackground(isSendEvent = true) {
    const { background, width, height, Context, drawRect, drawImage, unit, commonUtilMethods } = this;
    return new Promise(async (resolve) => {
      var _b, _c, _d, _e, _f;
      const _a = background, { type } = _a, params = __objRest(_a, ["type"]);
      if (!isSendEvent) {
        this.canvasMethods.clearCanvas();
      }
      let result = {};
      if (type === "color") {
        result = drawRect.draw(__spreadProps(__spreadValues({}, params), {
          w: (_b = params.w) != null ? _b : width,
          h: (_c = params.h) != null ? _c : height,
          color: (_d = params.color) != null ? _d : "#ffffff"
        }));
      } else if (type === "image") {
        result = await drawImage.draw(__spreadProps(__spreadValues({}, params), {
          w: (_e = params.w) != null ? _e : width,
          h: (_f = params.h) != null ? _f : height
        }));
      }
      result.style = {
        width: result.w + unit,
        height: result.h + unit
      };
      this.background.w = result.w;
      this.background.h = result.h;
      if (isSendEvent) {
        this.$emit("background", result);
      }
      resolve(result);
    });
  }
  async setAllCallBack(params) {
    const { width, commonUtilMethods, commonDrawMethods } = this;
    const { canvasWidth } = commonUtilMethods;
    let {
      type,
      x = 0,
      y = 0,
      r = 0,
      w = canvasWidth,
      h = 0,
      lineWidth = 1,
      size = 0,
      name = "",
      windowAlign = "none",
      drawType = "default",
      mode = "aspectFill",
      src = "",
      offsetRight
    } = params;
    let sx = x;
    let sy = y;
    let ex = x + w;
    let ey = y + h;
    if (type === "text") {
      let {
        text,
        textIndent,
        lastWidth,
        font,
        line,
        textAlign,
        windowAlign: windowAlign2,
        color
      } = this.drawText.getDrawParams(params, false);
      const textArr = commonDrawMethods.computedFontTextLineHeight(x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign2, color);
      const lastText = textArr[textArr.length - 1];
      const firstText = textArr[0];
      ey = lastText.ey;
      ex = firstText.tx + firstText.w;
      params.textArr = commonUtilMethods.conversionUnit(textArr);
      params.h = ey - sy;
      params.tw = firstText.w;
    } else if (type === "arc") {
      ex = x + r * 2;
      ey = y + r * 2;
      w = r * 2;
      h = r * 2;
    } else if (type === "line") {
      ey = y + lineWidth;
      h = lineWidth;
    } else if (type === "qrcode") {
      ex = x + size;
      ey = y + size;
      w = size;
      h = size;
    } else if (type === "image") {
      if (windowAlign !== "none") {
        x = commonDrawMethods.computedCenterX(width, w, windowAlign, offsetRight);
      }
      const srcRes = await uni_modules_sakuraCanvas_js_sdk_methods_image.getImageSrc(src);
      if (!srcRes.success) {
        return srcRes;
      }
      src = srcRes.src;
      const imageInfo = await uni_modules_sakuraCanvas_js_sdk_methods_image.getImageInfo(src);
      if (!imageInfo.success) {
        return Promise.resolve(true);
      }
      const modeImage = uni_modules_sakuraCanvas_js_sdk_methods_image.getModeImage(Number(imageInfo.width), Number(imageInfo.height), commonUtilMethods.getConvertedValue(x), commonUtilMethods.getConvertedValue(y), commonUtilMethods.getConvertedValue(w), commonUtilMethods.getConvertedValue(h), mode);
      const { dx, dy, dw, dh, sw, sh, sx: sx2, sy: sy2 } = modeImage;
      if (mode === "widthFix") {
        h = this.unit === "rpx" ? commonUtilMethods.pxToRpx(sh) : sh;
        ey = y + h;
      } else if (mode === "heightFix") {
        w = this.unit === "rpx" ? commonUtilMethods.pxToRpx(sw) : sw;
        ex = x + w;
      }
      if (drawType === "arc" && h == 0) {
        h = w;
        ey = y + h;
      }
      params.drawModeImage = modeImage;
      params.drawSrc = src;
      params.drawImageInfo = imageInfo;
    }
    params.sx = sx;
    params.sy = sy;
    params.ex = ex;
    params.ey = ey;
    this.allCallback.push({
      sx,
      sy,
      ex,
      ey,
      w,
      h,
      name,
      before: params.before || {}
    });
    return Promise.resolve(true);
  }
  drawCanvas(drawArray, isSendEvent = true) {
    const { Context } = this;
    return new Promise(async (resolve) => {
      try {
        for (let i of drawArray) {
          if (i.callback && typeof i.callback === "function" && i.type !== "custom") {
            const beforeInfo = this.allCallback.length == 0 ? {} : this.allCallback[this.allCallback.length - 1];
            const callBackInfo = i.callback(beforeInfo, this.allCallback) || {};
            const _a = i, { callback } = _a, data = __objRest(_a, ["callback"]);
            i = __spreadValues(__spreadValues({}, data), callBackInfo);
          }
          if (i.type !== "custom" && i.drawType !== "custom") {
            await this.setAllCallBack(i);
          }
          switch (i.type) {
            case "text":
              this.drawText.draw(i);
              break;
            case "rect":
              this.drawRect.draw(i);
              break;
            case "image":
              const image = await this.drawImage.draw(i);
              if (!image.success) {
                return resolve(image);
              }
              break;
            case "arc":
              this.drawArc.draw(i);
              break;
            case "triangle":
              this.drawTriangle.draw(i);
              break;
            case "line":
              this.drawLine.draw(i);
              break;
            case "qrcode":
              await this.drawQrcode.draw(i);
              break;
            case "custom":
              i.setDraw(Context, this);
              break;
          }
        }
        resolve({
          success: true
        });
        if (!isSendEvent)
          return;
        const { width, height } = this;
        const contentHeight = this.allCallback.reduce((a, data) => Math.max(a, data.ey), 0);
        const contentWidth = this.allCallback.reduce((a, data) => Math.max(a, data.ex), 0);
        this.$emit("drawComplete", {
          width,
          height,
          contentHeight,
          contentWidth
        });
      } catch (e) {
        return resolve({
          success: false,
          msg: "\u7ED8\u5236\u5185\u5BB9\u5931\u8D25:" + e
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    });
  }
  drawPoster(drawArrayFn) {
    const { callbackInfo, drawTipsText } = this;
    return new Promise(async (resolve) => {
      if (!drawArrayFn || typeof drawArrayFn !== "function") {
        return resolve({
          success: false,
          msg: "drawPoster\u53C2\u6570\u9519\u8BEF"
        });
      }
      if (this.drawArrayFn) {
        this.allCallback = [];
        this.canvasMethods.clearCanvas();
        await this.drawBackground(false);
      }
      this.drawArrayFn = drawArrayFn;
      common_vendor.index.showLoading({ title: drawTipsText });
      const result = await this.drawCanvas(drawArrayFn(callbackInfo));
      if (!result.success) {
        return resolve(result);
      }
      resolve(await this.canvasMethods.canvasDraw());
      common_vendor.index.hideLoading();
    });
  }
}
exports.DrawPoster = DrawPoster;

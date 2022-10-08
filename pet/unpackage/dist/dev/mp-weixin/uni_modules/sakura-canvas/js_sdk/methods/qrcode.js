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
var uni_modules_sakuraCanvas_js_sdk_plugins_qrcodeAlg = require("../plugins/qrcodeAlg.js");
class DrawQrcode {
  constructor(params) {
    const { Context, commonUtilMethods, commonDrawMethods } = params;
    this.Context = Context;
    this.commonUtilMethods = commonUtilMethods;
    this.commonDrawMethods = commonDrawMethods;
  }
  getDrawParams(params = {}, conversion = true) {
    const globalDataParams = this.commonUtilMethods.getGlobalDataDrawParams(params);
    const { text = "", image = {}, size = 100, lv = 3, background = "#ffffff", foreground = "#000000", pdground = "#000000" } = params;
    const qrCodeParams = __spreadProps(__spreadValues({}, globalDataParams), {
      text: String(text) || "",
      image,
      size,
      correctLevel: lv,
      background,
      foreground,
      pdground
    });
    return conversion ? this.commonUtilMethods.conversionUnit(qrCodeParams) : qrCodeParams;
  }
  draw(params = {}, conversion = true) {
    const { Context, commonUtilMethods, commonDrawMethods } = this;
    const { canvasWidth, is2d } = commonUtilMethods;
    let _a = this.getDrawParams(params, conversion), { x, y, image, windowAlign, offsetRight } = _a, options = __objRest(_a, ["x", "y", "image", "windowAlign", "offsetRight"]);
    return new Promise(async (resolve) => {
      if (windowAlign !== "none") {
        x = commonDrawMethods.computedCenterX(canvasWidth, options.size, windowAlign, offsetRight);
      }
      let qrcodeAlgObjCache = [];
      let qrCodeAlg = null;
      let l = qrcodeAlgObjCache.length;
      let d = 0;
      for (let i = 0; i < l; i++) {
        d = i;
        if (qrcodeAlgObjCache[i].text == options.text && qrcodeAlgObjCache[i].text.correctLevel == options.correctLevel) {
          qrCodeAlg = qrcodeAlgObjCache[i].obj;
          break;
        }
      }
      if (d == l) {
        qrCodeAlg = new uni_modules_sakuraCanvas_js_sdk_plugins_qrcodeAlg.QRCodeAlg(options.text, options.correctLevel);
        qrcodeAlgObjCache.push({
          text: options.text,
          correctLevel: options.correctLevel,
          obj: qrCodeAlg
        });
      }
      let getForeGround = function(config) {
        let options2 = config.options;
        if (options2.pdground && (config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 || config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.col < 5 || config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count - 2)) {
          return options2.pdground;
        }
        return options2.foreground;
      };
      let count = qrCodeAlg.getModuleCount();
      let ratioSize = options.size;
      let ratioImgSize = commonUtilMethods.getConvertedValue(image.size) || 30;
      let tileW = (ratioSize / count).toPrecision(4);
      let tileH = (ratioSize / count).toPrecision(4);
      for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
          let w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
          let h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
          let foreground = getForeGround({
            row,
            col,
            count,
            options
          });
          commonDrawMethods.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background);
          Context.fillRect(x + Math.round(col * tileW), y + Math.round(row * tileH), w, h);
        }
      }
      if (image.src) {
        const { src, r, color, borderWidth, borderColor } = conversion ? this.commonUtilMethods.conversionUnit(image) : image;
        const dx = x + Number(((ratioSize - ratioImgSize) / 2).toFixed(2));
        const dy = y + Number(((ratioSize - ratioImgSize) / 2).toFixed(2));
        const drawImage = await commonDrawMethods.drawParams.drawImage.draw({
          x: dx,
          y: dy,
          w: ratioImgSize,
          h: ratioImgSize,
          src,
          r,
          color,
          borderWidth,
          borderColor,
          drawType: "rect",
          isCompressImage: false
        }, false);
        if (!drawImage.success) {
          return resolve(drawImage);
        }
      }
      return resolve({
        success: true
      });
    });
  }
}
exports.DrawQrcode = DrawQrcode;

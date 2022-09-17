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
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_sakuraCanvas_js_sdk_utils_common = require("../utils/common.js");
class Canvas {
  constructor(drawPoster) {
    this.drawPoster = drawPoster;
  }
  clearCanvas() {
    const { Context } = this.drawPoster;
    Context.clearRect(0, 0, 999999, 999999);
  }
  exportImage() {
    const { exportImageDelayTime, exportImageTips } = this.drawPoster;
    return new Promise(async (resolve) => {
      common_vendor.index.showLoading({ title: exportImageTips });
      await uni_modules_sakuraCanvas_js_sdk_utils_common.sleep(exportImageDelayTime);
      resolve(await this.createCanvasFilePath());
    });
  }
  createCanvasFilePath() {
    const { Context, canvas, canvasId, _this, is2d, exportImageStyle, dpr } = this.drawPoster;
    let { width, height, x, y, fileType, quality, destWidth, destHeight } = exportImageStyle;
    const params = {};
    if (destWidth) {
      params.destWidth = destWidth;
    }
    if (destHeight) {
      params.destHeight = destHeight;
    }
    if (is2d) {
      width = width * dpr;
      height = height * dpr;
    }
    return new Promise((resolve) => {
      try {
        common_vendor.index.canvasToTempFilePath(__spreadProps(__spreadValues({
          canvasId,
          canvas,
          x,
          y,
          width: Math.floor(width),
          height: Math.floor(height),
          quality,
          fileType
        }, params), {
          success: (res) => {
            return resolve({
              success: true,
              data: res.tempFilePath,
              msg: "\u7ED8\u753B\u6210\u529F"
            });
          },
          fail: (err) => {
            return resolve({
              success: false,
              msg: `\u5BFC\u51FA\u56FE\u7247\u5931\u8D25: ${JSON.stringify(err)}`
            });
          },
          complete: () => {
            common_vendor.index.hideLoading();
          }
        }), _this);
      } catch (e) {
        return resolve({
          success: false,
          msg: "\u5BFC\u51FA\u56FE\u7247\u5931\u8D25: \u7ED8\u753B\u9519\u8BEF" + e
        });
      }
    });
  }
  canvasDraw() {
    const { Context, drawDelayTime, is2d } = this.drawPoster;
    return new Promise(async (resolve) => {
      await uni_modules_sakuraCanvas_js_sdk_utils_common.sleep(drawDelayTime);
      if (is2d) {
        return resolve(await this.exportImage());
      } else {
        await Context.draw(true, async () => {
          return resolve(await this.exportImage());
        });
      }
    });
  }
  sortDrawArray(drawArray = []) {
    return drawArray.sort((after, current) => {
      const aZIndex = after.zIndex || 0;
      const cZIndex = current.zIndex || 0;
      return aZIndex - cZIndex;
    });
  }
}
exports.Canvas = Canvas;

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
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_sakuraCanvas_js_sdk_utils_util = require("../utils/util.js");
class DrawImage {
  constructor(params) {
    const { Context, commonUtilMethods, commonDrawMethods } = params;
    this.Context = Context;
    this.commonUtilMethods = commonUtilMethods;
    this.commonDrawMethods = commonDrawMethods;
  }
  getDrawParams(params = {}, conversion = true) {
    const globalDataParams = this.commonUtilMethods.getGlobalDataDrawParams(params);
    const {
      src = "",
      mode = "aspectFill",
      triangle = {},
      isCompressImage = false,
      quality = 100,
      drawSrc = false,
      drawModeImage = false,
      drawImageInfo = false
    } = params;
    const imageParams = __spreadProps(__spreadValues({}, globalDataParams), {
      src,
      mode,
      drawType: params.drawType || "default",
      triangle,
      isCompressImage,
      quality,
      drawSrc,
      drawModeImage,
      drawImageInfo,
      drawImage: true
    });
    return conversion ? this.commonUtilMethods.conversionUnit(imageParams) : imageParams;
  }
  draw(params = {}, conversion = true) {
    const { Context, commonUtilMethods, commonDrawMethods } = this;
    const { canvasWidth, is2d } = commonUtilMethods;
    let _a = this.getDrawParams(params, conversion), {
      w,
      src,
      windowAlign,
      drawModeImage,
      offsetRight,
      x
    } = _a, otherParams = __objRest(_a, [
      "w",
      "src",
      "windowAlign",
      "drawModeImage",
      "offsetRight",
      "x"
    ]);
    return new Promise(async (resolve) => {
      try {
        if (!/\S/.test(src)) {
          return resolve({
            success: false,
            message: "\u56FE\u7247\u8DEF\u5F84\u4E3A\u7A7A"
          });
        }
        if (!is2d) {
          let srcRes = await getImageSrc(src);
          if (!srcRes.success) {
            return resolve(srcRes);
          }
          src = srcRes.src;
        }
        if (windowAlign !== "none") {
          x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight);
        }
        let imageInfo = drawModeImage;
        if (!imageInfo) {
          imageInfo = await getImageInfo(src);
          if (!imageInfo.success) {
            return resolve(imageInfo);
          }
        }
        const img = this.getImage(src);
        const drawImageParams = __spreadProps(__spreadValues({}, otherParams), { x, imageInfo, img, w, src, windowAlign, drawModeImage, offsetRight });
        if (is2d) {
          img.onload = async () => {
            return resolve(await this.drawImageByType(drawImageParams));
          };
        } else {
          return resolve(await this.drawImageByType(drawImageParams));
        }
      } catch (e) {
        return resolve({
          success: false,
          msg: "\u7ED8\u5236\u56FE\u7247\u51FA\u9519" + e
        });
      }
    });
  }
  drawImageByType(params) {
    let {
      imageInfo,
      r,
      x,
      y,
      w,
      h,
      rotate,
      borderWidth,
      borderColor,
      color,
      alpha,
      borderType,
      triangle,
      mode,
      drawType,
      img,
      shadow,
      drawSrc,
      drawModeImage
    } = params;
    const { Context, commonDrawMethods, commonUtilMethods } = this;
    const { unit, pxToRpx } = commonUtilMethods;
    return new Promise(async (resolve) => {
      if (h === 0) {
        h = w;
      }
      let modeImage = drawModeImage;
      if (!modeImage) {
        modeImage = getModeImage(Number(imageInfo.width), Number(imageInfo.height), x, y, w, h, mode);
      }
      const { dx, dy, dw, dh, sw, sh, sx, sy } = modeImage;
      Context.save();
      Context.beginPath();
      if (drawType !== "triangle") {
        commonDrawMethods.setRotate(x, y, w, h, rotate);
      }
      const drawEnd = async () => {
        Context.clip();
        commonDrawMethods.setAlpha(alpha);
        await this.drawImageContent(mode, drawType, img, dx, dy, dw, dh, sx, sy, sw, sh);
        Context.restore();
      };
      if (drawType == "default") {
        commonDrawMethods.setAlpha(alpha);
        await this.drawImageContent(mode, drawType, img, dx, dy, dw, dh, sx, sy, sw, sh, x, y, w, h);
        Context.clip();
        Context.restore();
      } else if (drawType === "arc") {
        commonDrawMethods.drawParams.drawArc.draw({
          x,
          y,
          r: w / 2,
          borderWidth,
          borderColor,
          color,
          drawImage: true,
          shadow
        }, false);
        drawEnd();
      } else if (drawType === "rect") {
        if (mode === "widthFix") {
          h = sh;
        } else if (mode === "heightFix") {
          w = sw;
        }
        commonDrawMethods.drawParams.drawRect.draw({
          x,
          y,
          w,
          h,
          alpha,
          borderWidth,
          borderColor,
          borderType,
          r,
          color,
          drawImage: true,
          shadow
        }, false);
        drawEnd();
      } else if (drawType === "triangle") {
        let type = triangle.type || "isosceles";
        let coordinate = triangle.coordinate || [];
        let direction = triangle.direction || "top";
        if (type !== "custom") {
          commonDrawMethods.setTriangleRotate(x, y, w, h, rotate, type);
        }
        commonDrawMethods.drawParams.drawTriangle.draw({
          x,
          y,
          w,
          h,
          alpha,
          borderWidth,
          borderColor,
          color,
          coordinate,
          direction,
          drawType: type,
          drawImage: true
        }, false);
        drawEnd();
      }
      commonDrawMethods.setAlpha(1);
      return resolve({
        success: true,
        w: unit === "rpx" ? pxToRpx(w) : w,
        h: unit === "rpx" ? pxToRpx(h) : h
      });
    });
  }
  drawImageContent(mode, drawType, img, dx, dy, dw, dh, sx, sy, sw, sh, x, y, w, h) {
    const { Context } = this;
    return new Promise(async (resolve) => {
      if (drawType === "default") {
        await Context.drawImage(img, x, y, w, h);
      } else if (mode !== "default") {
        await Context.drawImage(img, dx, dy, dw, dh, sx, sy, sw, sh);
      } else {
        await Context.drawImage(img, dx, dy, dw, dh);
      }
      resolve(true);
    });
  }
  getImage(src) {
    const { commonUtilMethods } = this;
    const { is2d, canvas } = commonUtilMethods;
    if (is2d) {
      const img = canvas.createImage();
      img.src = src;
      return img;
    } else {
      return src;
    }
  }
}
const getModeImage = (oWidth, oHeight, x, y, width, height, mode) => {
  if (mode === "aspectFit") {
    return getAspectFitModelInfo(oWidth, oHeight, x, y, width, height);
  }
  if (mode === "aspectFill") {
    return getAspectFillModelInfo(oWidth, oHeight, x, y, width, height);
  }
  if (mode === "widthFix") {
    return getWidthFixModelInfo(oWidth, oHeight, x, y, width);
  }
  if (mode === "heightFix") {
    return getHeightFixModelInfo(oWidth, oHeight, x, y, width, height);
  }
  if (mode === "default") {
    return {
      dw: width,
      dh: height,
      dx: x,
      dy: y
    };
  }
  return getAspectFillModelInfo(oWidth, oHeight, x, y, width, height);
};
function getAspectFitModelInfo(oWidth, oHeight, x, y, width, height) {
  let aspect = oHeight / oWidth;
  let sw = width;
  let sh = aspect * sw;
  if (aspect >= 1) {
    aspect = oWidth / oHeight;
    sh = height;
    sw = aspect * sh;
  }
  return {
    sw,
    sh,
    sx: x + (width - sw) / 2,
    sy: y + (height - sh) / 2,
    dw: oWidth,
    dh: oHeight,
    dx: 0,
    dy: 0
  };
}
function getAspectFillModelInfo(oWidth, oHeight, x, y, width, height) {
  let aspect = oHeight / oWidth;
  let sw = width;
  let sh = aspect * sw;
  let dx = 0;
  let dy = (oHeight - height * (oHeight / sh)) / 2;
  if (aspect < 1) {
    aspect = oWidth / oHeight;
    sh = height;
    sw = aspect * sh;
    dy = 0;
    dx = (oWidth - width * (oWidth / sw)) / 2;
  }
  return {
    sw,
    sh,
    sx: x,
    sy: y,
    dw: oWidth,
    dh: oHeight,
    dx,
    dy
  };
}
function getWidthFixModelInfo(oWidth, oHeight, x, y, width, height) {
  let aspect = oHeight / oWidth;
  let sw = width;
  let sh = sw * aspect;
  let dx = 0;
  let dy = 0;
  return {
    sw,
    sh,
    sx: x,
    sy: y,
    dw: oWidth,
    dh: oHeight,
    dx,
    dy
  };
}
function getHeightFixModelInfo(oWidth, oHeight, x, y, width, height) {
  let aspect = oWidth / oHeight;
  let sh = height;
  let sw = sh * aspect;
  let dx = 0;
  let dy = 0;
  return {
    sw,
    sh,
    sx: x,
    sy: y,
    dw: oWidth,
    dh: oHeight,
    dx,
    dy
  };
}
const getImageInfo = (src) => {
  return new Promise((resolve) => {
    common_vendor.index.getImageInfo({
      src,
      success: (res) => {
        resolve(__spreadValues({
          success: true
        }, res));
      },
      fail: (e) => {
        resolve({
          success: false,
          msg: e
        });
      }
    });
  });
};
function getImageSrc(src) {
  return new Promise(async (resolve) => {
    src = await uni_modules_sakuraCanvas_js_sdk_utils_util.base64ToPathFn(src);
    if (src.includes("http")) {
      const downlaod = await uni_modules_sakuraCanvas_js_sdk_utils_util.downloadFile(src);
      if (!downlaod.success) {
        return resolve({
          success: false,
          msg: `\u56FE\u7247\u8DEF\u5F84\u4E3A:${src}\u7684\u6587\u4EF6\u4E0B\u8F7D\u5931\u8D25`
        });
      }
      src = downlaod.data.tempFilePath;
    }
    return resolve({
      success: true,
      src
    });
  });
}
exports.DrawImage = DrawImage;
exports.getImageInfo = getImageInfo;
exports.getImageSrc = getImageSrc;
exports.getModeImage = getModeImage;

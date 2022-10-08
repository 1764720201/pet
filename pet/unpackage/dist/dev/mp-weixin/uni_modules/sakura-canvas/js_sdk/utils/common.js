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
var uni_modules_sakuraCanvas_js_sdk_utils_util = require("./util.js");
class CommonUtilMethods {
  constructor(options) {
    const { unit, type, width, height, fontStyle } = options;
    this.unit = unit;
    this.type = type;
    this.is2d = type === "2d";
    this.width = width;
    this.height = height;
    this.fontStyle = fontStyle;
    this.Context = null;
    this.canvas = null;
  }
  setCanvasStyle() {
    const { width, height } = this;
    this.canvasWidth = this.getConvertedValue(width);
    this.canvasHeight = this.getConvertedValue(height);
  }
  getConvertedValue(value = 0) {
    if (value === 0)
      return 0;
    if (this.unit === "px") {
      return value;
    }
    return value === 375.0001 ? 375.0001 : common_vendor.index.upx2px(value);
  }
  pxToRpx(value = 0) {
    return value / (common_vendor.index.upx2px(100) / 100);
  }
  rpxToPx(value = 0) {
    let type = false;
    if (value.includes("px") && !value.includes("r") && !value.includes("u")) {
      value = Number(value.split("px")[0]);
      type = true;
    } else if (value.includes("rpx")) {
      value = Number(value.split("rpx")[0]);
    } else if (value.includes("upx")) {
      value = Number(value.split("upx")[0]);
    }
    return type ? value : common_vendor.index.upx2px(value);
  }
  conversionUnit(params) {
    return uni_modules_sakuraCanvas_js_sdk_utils_util.conversionUnit(params, this.getConvertedValue, this);
  }
  getGlobalDataDrawParams(params = {}) {
    const { width } = this;
    const {
      x = 0,
      y = 0,
      w = width,
      h = 0,
      r = 0,
      color = "black",
      alpha = 1,
      isFill = true,
      lineWidth = 1,
      windowAlign = "none",
      rotate = {},
      drawImage = false,
      borderColor = "#000000",
      borderWidth = 0,
      borderType = "default",
      offsetRight = 0,
      shadow,
      gradient = {}
    } = params;
    const drawParams = { x, y, w, h, r };
    return __spreadProps(__spreadValues({}, drawParams), {
      color,
      lineWidth,
      borderWidth,
      borderColor,
      borderType,
      alpha,
      isFill,
      windowAlign,
      rotate,
      shadow: this.getShadow(shadow),
      gradient,
      offsetRight,
      drawImage
    });
  }
  getShadow(shadow = {}) {
    const { show = false, x = 0, y = 0, blur = 0, color = "#000000" } = shadow;
    return { show, x, y, blur, color };
  }
  getGradient(type = "linear", relative = true, position = {}, colors = [], box = {}) {
    const { x0 = 0, y0 = 0, x1 = 0, y1 = 0, x = 0, y = 0, r = 0 } = position;
    if (type == "linear") {
      position.x0 = relative ? x0 + box.x : x0;
      position.y0 = relative ? y0 + box.y : y0;
      position.x1 = relative ? x1 + box.x : x1;
      position.y1 = relative ? y1 + box.y : y1;
    } else {
      position.x = relative ? x + box.x : x;
      position.y = relative ? y + box.y : y;
      position.r = r;
    }
    return type == "linear" ? this.getLinearGradient(position, colors) : this.getCircularGradient(position, colors);
  }
  getLinearGradient(position = {}, colors = []) {
    const { Context } = this;
    const { x0, y0, x1, y1 } = position;
    const grd = Context.createLinearGradient(x0, y0, x1, y1);
    for (let i of colors) {
      grd.addColorStop(i.stop, i.color);
    }
    return grd;
  }
  getCircularGradient(position = {}, colors = []) {
    const { Context } = this;
    const { x, y, r } = position;
    const grd = Context.createCircularGradient(x, y, r);
    for (let i of colors) {
      grd.addColorStop(i.stop, i.color);
    }
    return grd;
  }
}
class CommonDrawMethods {
  constructor(Context, type, commonUtilMethods) {
    this.Context = Context;
    this.type = type;
    this.is2d = type === "2d";
    this.commonUtilMethods = commonUtilMethods;
    this.drawParams = {};
  }
  setAlpha(alpha = 1) {
    const { Context, is2d } = this;
    if (is2d) {
      Context.globalAlpha = alpha;
    } else {
      Context.setGlobalAlpha(alpha);
    }
  }
  setFillStyle(style) {
    const { Context, is2d } = this;
    if (is2d) {
      Context.fillStyle = style;
    } else {
      Context.setFillStyle(style);
    }
  }
  setLineWidth(width) {
    const { Context, is2d } = this;
    if (is2d) {
      Context.lineWidth = width;
    } else {
      Context.setLineWidth(width);
    }
  }
  setStrokeStyle(style) {
    const { Context, is2d } = this;
    if (is2d) {
      Context.strokeStyle = style;
    } else {
      Context.setStrokeStyle(style);
    }
  }
  setShadow(x, y, blur, color) {
    const { Context, is2d } = this;
    Context.shadowOffsetX = x;
    Context.shadowOffsetY = y;
    Context.shadowColor = color;
    Context.shadowBlur = blur;
  }
  setRotate(x, y, w, h, rotate) {
    const { Context } = this;
    const { deg = 0, type = "middle" } = rotate;
    let rx = x;
    let ry = y;
    switch (type) {
      case "topLeft":
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "topMiddle":
        rx = x + w / 2;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "topRight":
        rx = x + w;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "bottomLeft":
        ry = y + h;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "bottomMiddle":
        rx = x + w / 2;
        ry = y + h;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "bottomRight":
        rx = x + w;
        ry = y + h;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "middleLeft":
        ry = y + h / 2;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "middleRight":
        rx = x + w;
        ry = y + h / 2;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "middle":
        rx = x + w / 2;
        ry = y + h / 2;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
    }
  }
  setTriangleRotate(x, y, w, h, rotate, triangType) {
    const { Context } = this;
    const { deg = 0, type = "middle" } = rotate;
    let rx = x;
    let ry = y;
    switch (type) {
      case "top":
        if (triangType == "right") {
          rx = x;
          ry = y;
        } else {
          rx = x + w / 2;
          ry = y;
        }
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "left":
        rx = x;
        ry = y + h;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "right":
        rx = x + w;
        ry = y + h;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
      case "middle":
        rx = x + w / 2;
        ry = y + h / 2;
        Context.translate(rx, ry);
        Context.rotate(deg * Math.PI / 180);
        Context.translate(-rx, -ry);
        break;
    }
  }
  computedCenterX(boxWidth, contentWidth, type = "center", offsetRight = 0) {
    if (type === "center") {
      return (boxWidth - contentWidth) / 2 - offsetRight;
    }
    if (type === "right") {
      return boxWidth - contentWidth - offsetRight;
    }
    return 0;
  }
  computedFontTextLineHeight(x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign, color, offsetRight) {
    const { Context, commonUtilMethods } = this;
    const { canvasWidth, getConvertedValue, is2d } = commonUtilMethods;
    const { fontSize } = font;
    Context.font = font.style;
    let { lineNum, lineHeight, lineStyle } = line;
    let textLength = uni_modules_sakuraCanvas_js_sdk_utils_util.countTextLength(Context, text, fontSize);
    if (w == 0 || w == 375.0001) {
      textLength > canvasWidth ? w = canvasWidth : w = textLength + fontSize;
    }
    let rowData = [];
    function getRowData(text2) {
      let txt = "";
      const row = [];
      const allData = [];
      for (let i in text2) {
        txt += text2[i];
        let length = uni_modules_sakuraCanvas_js_sdk_utils_util.countTextLength(Context, txt, fontSize);
        if (textIndent != 0 && row.length === 0) {
          length += textIndent;
        }
        if (length >= w - fontSize || i == text2.length - 1) {
          const current = row.length == 0 ? 0 : row[row.length - 1].index;
          const newAllData = Object.assign([], allData).splice(current, i);
          const limitLastText = lastWidth != 0 && newAllData.length != 0 && newAllData.reverse().find((item) => item.length <= lastWidth);
          row.push({
            length,
            text: txt,
            index: i - 1,
            lastText: txt.substring(0, txt.length - 1) + "...",
            limitText: limitLastText ? limitLastText.text + "..." : "",
            limitTextWidth: uni_modules_sakuraCanvas_js_sdk_utils_util.countTextLength(Context, limitLastText.text + "...", fontSize)
          });
          txt = "";
        }
        allData.push({
          index: i,
          text: txt,
          length
        });
      }
      return row;
    }
    if (text.includes("\n")) {
      const texts = text.split("\n");
      for (let text2 of texts) {
        rowData.push(...getRowData(text2));
      }
    } else {
      rowData = getRowData(text);
    }
    lineHeight = lineHeight == 1 ? fontSize + 2 : lineHeight;
    let lineSize = rowData.length;
    let size = lineNum != -1 ? lineNum : lineSize;
    if (size > lineSize) {
      size = lineSize;
    }
    let textArr = [];
    for (let i = 0; i < size; i++) {
      let { text: text2, length: textLength2, lastText, limitText, limitTextWidth } = rowData[i];
      let obj = {};
      let wx = x;
      let tx = x;
      if (i == 0 && textIndent != 0 && textAlign == "none" && windowAlign == "none") {
        textLength2 += textIndent;
        wx += textIndent;
        tx = wx;
      }
      if (text2 && lineNum != -1 && i == lineNum - 1) {
        if (lastWidth > 0) {
          text2 = limitText;
          textLength2 = limitTextWidth;
        } else {
          text2 = textLength2 + fontSize >= w ? lastText : text2;
        }
      }
      if (textAlign !== "none" && textLength2 <= w) {
        let textW = w;
        if (textLength2 == w) {
          textW = canvasWidth;
        }
        tx = this.computedCenterX(textW, textLength2, textAlign);
        wx += tx;
      }
      if (windowAlign !== "none" && textAlign !== "none") {
        wx = this.computedCenterX(canvasWidth, w, windowAlign, offsetRight);
        wx += tx;
        tx = wx;
      } else if (windowAlign !== "none") {
        wx = this.computedCenterX(canvasWidth, w, windowAlign, offsetRight);
        tx = wx;
      }
      let tw = 0;
      let ty = y + i * lineHeight;
      if (lineStyle !== "none") {
        tx = tx + getConvertedValue(0);
        tw = textLength2 + getConvertedValue(0);
        if (lineStyle == "underline") {
          ty += fontSize + 1;
        } else if (lineStyle == "lineThrough") {
          ty += fontSize / 2;
          if (common_vendor.index.getSystemInfoSync().platform === "android" && this.type !== "2d") {
            ty += font.fontSize / 6;
          }
        }
      }
      obj.w = textLength2;
      obj.text = text2;
      obj.x = wx;
      if (lineHeight == 0) {
        obj.y = y + fontSize * i;
        ty = ty + fontSize * i;
      } else {
        obj.y = y + lineHeight * i;
      }
      obj.fontColor = color;
      obj.lineColor = color;
      obj.tw = tw;
      obj.ty = ty;
      obj.tx = tx;
      obj.ey = obj.y + fontSize;
      text2 && textArr.push(obj);
    }
    return textArr;
  }
}
function sleep(time = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
exports.CommonDrawMethods = CommonDrawMethods;
exports.CommonUtilMethods = CommonUtilMethods;
exports.sleep = sleep;

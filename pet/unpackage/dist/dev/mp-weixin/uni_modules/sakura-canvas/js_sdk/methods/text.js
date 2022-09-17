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
class DrawText {
  constructor(params) {
    const { Context, commonUtilMethods, commonDrawMethods } = params;
    this.Context = Context;
    this.commonUtilMethods = commonUtilMethods;
    this.commonDrawMethods = commonDrawMethods;
  }
  getDrawParams(params = {}, conversion = true) {
    const globalDataParams = this.commonUtilMethods.getGlobalDataDrawParams(params);
    const {
      text = "",
      textIndent = 0,
      lastWidth = 0,
      font = {},
      textAlign = "none",
      baseline = "top",
      line = {},
      highlightText = [],
      textRect = { show: false, isFill: true, lineWidth: 1 }
    } = params;
    const textParams = __spreadProps(__spreadValues({}, globalDataParams), {
      text: String(text) || "",
      textIndent,
      lastWidth,
      font: conversion ? this.commonUtilMethods.conversionUnit(this.getFontStyle(font)) : this.getFontStyle(font, conversion),
      textAlign,
      baseline,
      line: this.getTextLine(line, conversion),
      highlightText,
      textRect
    });
    return conversion ? this.commonUtilMethods.conversionUnit(textParams) : textParams;
  }
  draw(params = {}, conversion = true) {
    var _b;
    const { Context, commonUtilMethods, commonDrawMethods } = this;
    const { canvasWidth, is2d } = commonUtilMethods;
    let {
      x,
      y,
      w,
      h,
      text,
      textIndent,
      lastWidth,
      font,
      color,
      alpha,
      isFill,
      line,
      windowAlign,
      textAlign,
      baseline,
      highlightText,
      textRect,
      offsetRight
    } = this.getDrawParams(params, conversion);
    Context.save();
    Context.beginPath();
    commonDrawMethods.setAlpha(alpha);
    Context.font = font.style;
    if (!is2d) {
      Context.setTextBaseline(baseline);
    } else {
      Context.textBaseline = baseline;
    }
    if (typeof text !== "string") {
      text += "";
    }
    let textArr = params.textArr;
    if (!textArr) {
      textArr = commonDrawMethods.computedFontTextLineHeight(x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign, color, offsetRight);
    }
    if (highlightText.length != 0) {
      textArr = this.getHighlightText(textArr, highlightText, color, font);
    }
    if (textRect.show) {
      const _a = commonUtilMethods.conversionUnit(textRect), { vorizontal, vertical } = _a, textReactParmas = __objRest(_a, ["vorizontal", "vertical"]);
      const firstText = textArr[0];
      let tw = w === canvasWidth ? (_b = commonUtilMethods.conversionUnit(params).tw) != null ? _b : firstText.w : w;
      let tx = firstText.x - vorizontal;
      let ty = firstText.y - vertical;
      let ey = textArr[textArr.length - 1].y + font.fontSize;
      let th = ey - firstText.y;
      th += vertical * 2;
      if (common_vendor.index.getSystemInfoSync().platform === "android") {
        ty += font.fontSize / 3;
        th -= font.fontSize / 3;
      }
      tw += vorizontal * 2;
      commonDrawMethods.drawParams.drawRect.draw(__spreadValues({
        x: tx,
        y: ty,
        w: tw,
        h: th
      }, textReactParmas), false);
    }
    Context.font = font.style;
    textArr.forEach((item) => {
      let { text: text2, x: x2, y: y2, tx, ty, tw, fontColor } = item;
      if (isFill) {
        commonDrawMethods.setFillStyle(fontColor);
        Context.fillText(text2, x2, y2);
      } else {
        commonDrawMethods.setStrokeStyle(fontColor);
        Context.strokeText(text2, x2, y2);
      }
      if (line.lineStyle !== "none") {
        if (isFill) {
          commonDrawMethods.setFillStyle(color);
        } else {
          commonDrawMethods.setStrokeStyle(color);
        }
        commonDrawMethods.drawParams.drawLine.draw({
          x: tx,
          y: ty,
          w: tw,
          color,
          lineType: line.lineType,
          lineWidth: line.lineWidth
        }, false);
      }
    });
    Context.restore();
    Context.font = this.getFontStyle().style;
    commonDrawMethods.setAlpha(1);
  }
  getFontStyle(fontStyle = {}, conversion = true) {
    const { size, family, style, variant, weight } = __spreadValues(__spreadValues({}, this.commonUtilMethods.fontStyle), fontStyle);
    return {
      fontSize: size,
      fontSizeBefore: size,
      fontFamily: family,
      fontStyle: style,
      fontVariant: variant,
      fontWeight: weight,
      style: `${style} ${variant} ${weight} ${conversion ? this.commonUtilMethods.getConvertedValue(size) : size}px ${family}`
    };
  }
  getTextLine(line = {}, conversion = true) {
    const { num = -1, height = 0, style = "none", type = "solid", width = 1 } = line;
    return {
      lineNum: num,
      lineHeight: conversion ? this.commonUtilMethods.getConvertedValue(height) : height,
      lineStyle: style,
      lineType: type,
      lineWidth: width
    };
  }
  getHighlightText(textArr, highlightText, color, font) {
    const highlightTextArr = [];
    const highlightColorArr = [];
    const { fontSize } = font;
    highlightText.map((item) => {
      const { text, color: color2 } = item;
      return [...text].map((i) => {
        return {
          text: i,
          color: color2
        };
      });
    }).forEach((item) => {
      const texts = item.map((item2) => item2.text);
      const colors = item.map((item2) => item2.color);
      highlightTextArr.push(...texts);
      highlightColorArr.push(...colors);
    });
    const rowData = [];
    textArr.forEach((item, index) => {
      const { x, y, w, text, tx, ty, tw } = item;
      const texts = [...text];
      let position = [];
      for (let i in texts) {
        const data = texts[i];
        const current = highlightTextArr.findIndex((i2) => data == i2);
        if (current === -1)
          continue;
        if (current !== -1) {
          const ruleData = {
            text: data,
            index: i,
            x: x + uni_modules_sakuraCanvas_js_sdk_utils_util.countTextLength(this.Context, texts.join("").substring(0, i), fontSize),
            fontColor: highlightColorArr[current],
            y,
            tx,
            ty,
            tw,
            w
          };
          const beforeIndex = position.length == 0 ? 0 : Number(position[position.length - 1].index);
          const currentIndex = Number(ruleData.index);
          if (currentIndex - beforeIndex > 1) {
            const other = {
              text: texts.join("").substring(position[beforeIndex] ? beforeIndex + 1 : beforeIndex, currentIndex),
              index: beforeIndex === 0 ? 0 : beforeIndex + 1,
              x: x + uni_modules_sakuraCanvas_js_sdk_utils_util.countTextLength(this.Context, texts.join("").substring(0, position[beforeIndex] ? beforeIndex + 1 : beforeIndex), fontSize),
              fontColor: color,
              y,
              tx,
              ty,
              tw,
              w
            };
            rowData.push(other);
          }
          position.push(ruleData);
          rowData.push(ruleData);
        }
      }
      if (position.length === 0) {
        rowData.push(__spreadProps(__spreadValues({}, item), {
          tx,
          ty,
          tw,
          w,
          fontColor: color
        }));
      } else {
        const lastIndex = Number(position[position.length - 1].index) + 1;
        const length = texts.length;
        if (lastIndex === length)
          return;
        const other = {
          text: texts.join("").substring(lastIndex, length),
          index: lastIndex,
          x: x + uni_modules_sakuraCanvas_js_sdk_utils_util.countTextLength(this.Context, texts.join("").substring(0, lastIndex), fontSize),
          fontColor: color,
          y,
          tx,
          ty,
          tw,
          w
        };
        rowData.push(other);
      }
    });
    return rowData;
  }
}
exports.DrawText = DrawText;

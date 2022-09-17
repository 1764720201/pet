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
class drawLine {
  constructor(params) {
    const { Context, commonUtilMethods, commonDrawMethods } = params;
    this.Context = Context;
    this.commonUtilMethods = commonUtilMethods;
    this.commonDrawMethods = commonDrawMethods;
  }
  getDrawParams(params = {}, conversion = true) {
    const globalDataParams = this.commonUtilMethods.getGlobalDataDrawParams(params);
    const { algin = "right", lineType = "solid", pattern = [6, 6], offset = 6, lineCap = "butt" } = params;
    const lineParams = __spreadProps(__spreadValues({}, globalDataParams), {
      algin,
      lineType,
      pattern,
      offset,
      lineCap
    });
    return conversion ? this.commonUtilMethods.conversionUnit(lineParams) : lineParams;
  }
  draw(params = {}, conversion = true) {
    const { Context, commonUtilMethods, commonDrawMethods } = this;
    const { canvasWidth, is2d } = commonUtilMethods;
    let {
      x,
      y,
      color,
      w,
      algin,
      alpha,
      lineType,
      pattern,
      offset,
      lineCap,
      lineWidth,
      windowAlign,
      offsetRight
    } = this.getDrawParams(params, conversion);
    Context.beginPath();
    commonDrawMethods.setAlpha(alpha);
    if (lineType === "dashed") {
      if (!is2d) {
        Context.setLineDash(pattern, offset);
      } else {
        Context.setLineDash(pattern);
        Context.lineDashOffset = offset;
      }
    }
    if (!is2d) {
      Context.setLineCap(lineCap);
    } else {
      Context.lineCap = lineCap;
    }
    commonDrawMethods.setLineWidth(lineWidth);
    commonDrawMethods.setStrokeStyle(color);
    switch (algin) {
      case "right":
        if (windowAlign !== "none") {
          x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight);
        }
        Context.moveTo(x, y);
        Context.lineTo(w + x, y);
        break;
      case "left":
        if (windowAlign !== "none") {
          x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight);
        }
        Context.moveTo(x, y);
        Context.lineTo(windowAlign == "none" ? x - w : x + w, y);
        break;
      case "top":
        Context.moveTo(x, y);
        Context.lineTo(x, -(y + w));
        break;
      case "bottom":
        Context.moveTo(x, y);
        Context.lineTo(x, y + w);
        break;
    }
    Context.stroke();
    Context.closePath();
    if (!is2d) {
      Context.setLineDash([0, 0]);
    } else {
      Context.setLineDash([0, 0]);
      Context.lineDashOffset = 0;
    }
    commonDrawMethods.setAlpha(1);
  }
}
exports.drawLine = drawLine;

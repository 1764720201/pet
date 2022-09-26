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
class DrawTriangle {
  constructor(params) {
    const { Context, commonUtilMethods, commonDrawMethods } = params;
    this.Context = Context;
    this.commonUtilMethods = commonUtilMethods;
    this.commonDrawMethods = commonDrawMethods;
  }
  getDrawParams(params = {}, conversion = true) {
    const globalDataParams = this.commonUtilMethods.getGlobalDataDrawParams(params);
    const { coordinate = [], drawType = "isosceles", direction = "top" } = params;
    const triangleParams = __spreadProps(__spreadValues({}, globalDataParams), {
      coordinate,
      drawType,
      direction
    });
    return conversion ? this.commonUtilMethods.conversionUnit(triangleParams) : triangleParams;
  }
  draw(params = {}, conversion = true) {
    const { Context, commonUtilMethods, commonDrawMethods } = this;
    const { canvasWidth, is2d } = commonUtilMethods;
    let {
      x,
      y,
      w,
      h,
      color,
      alpha,
      isFill,
      lineWidth,
      drawType,
      offsetRight,
      coordinate,
      rotate,
      windowAlign,
      direction,
      borderWidth,
      borderColor,
      drawImage
    } = this.getDrawParams(params, conversion);
    if (windowAlign !== "none" && drawType != "custom") {
      x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight);
    }
    if (rotate.deg && drawType !== "custom") {
      Context.save();
      commonDrawMethods.setTriangleRotate(x, y, w, h, rotate, drawType);
    }
    Context.beginPath();
    commonDrawMethods.setAlpha(alpha);
    if (drawType === "isosceles") {
      switch (direction) {
        case "top":
          Context.lineTo(x + w / 2, y);
          Context.lineTo(x, y + h);
          Context.lineTo(x + w, y + h);
          break;
        case "bottom":
          Context.lineTo(x, y);
          Context.lineTo(x + w, y);
          Context.lineTo(x + w / 2, y + h);
          break;
        case "right":
          Context.lineTo(x, y);
          Context.lineTo(x, y + h);
          Context.lineTo(x + w, y + h / 2);
          break;
        case "left":
          Context.lineTo(x + w, y);
          Context.lineTo(x + w, y + h);
          Context.lineTo(x, y + h / 2);
          break;
      }
    } else if (drawType === "right") {
      switch (direction) {
        case "top":
          Context.lineTo(x, y);
          Context.lineTo(x, y + h);
          Context.lineTo(x + w, y + h);
          break;
        case "bottom":
          Context.lineTo(x, y);
          Context.lineTo(x + w, y);
          Context.lineTo(x, y + h);
          break;
        case "left":
          Context.lineTo(x, y);
          Context.lineTo(x, y + h);
          Context.lineTo(x + w, y);
          break;
        case "right":
          Context.lineTo(x, y + h);
          Context.lineTo(x + w, y + h);
          Context.lineTo(x + w, y);
          break;
      }
    } else if (drawType === "custom") {
      for (let i of coordinate) {
        Context.lineTo(i[0], i[1]);
      }
    }
    Context.closePath();
    if (isFill) {
      if (borderWidth !== 0) {
        commonDrawMethods.setLineWidth(borderWidth);
        commonDrawMethods.setStrokeStyle(borderColor);
        Context.stroke();
      }
      if (!drawImage) {
        commonDrawMethods.setFillStyle(color);
        Context.fill();
      }
    } else {
      commonDrawMethods.setLineWidth(lineWidth);
      commonDrawMethods.setStrokeStyle(color);
      Context.stroke();
    }
    commonDrawMethods.setAlpha(1);
    if (rotate.deg && drawType !== "custom") {
      Context.restore();
    }
  }
}
exports.DrawTriangle = DrawTriangle;

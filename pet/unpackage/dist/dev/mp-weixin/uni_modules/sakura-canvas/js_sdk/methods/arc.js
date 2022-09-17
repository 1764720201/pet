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
class DrawArc {
  constructor(params) {
    const { Context, commonUtilMethods, commonDrawMethods } = params;
    this.Context = Context;
    this.commonUtilMethods = commonUtilMethods;
    this.commonDrawMethods = commonDrawMethods;
  }
  getDrawParams(params = {}, conversion = true) {
    const globalDataParams = this.commonUtilMethods.getGlobalDataDrawParams(params);
    const { s = 0, e = Math.PI * 2, d = false } = params;
    const arcParams = __spreadProps(__spreadValues({}, globalDataParams), {
      s,
      e,
      d
    });
    return conversion ? this.commonUtilMethods.conversionUnit(arcParams) : arcParams;
  }
  draw(params = {}, conversion = true) {
    const { Context, commonUtilMethods, commonDrawMethods } = this;
    const { canvasWidth, is2d } = commonUtilMethods;
    let {
      x,
      y,
      r,
      s,
      e,
      d,
      alpha,
      isFill,
      lineWidth,
      color,
      rotate,
      windowAlign,
      borderColor,
      borderWidth,
      offsetRight,
      drawImage,
      shadow,
      gradient
    } = this.getDrawParams(params, conversion);
    if (color === "black" && drawImage) {
      color = "none";
    } else if (color === "black") {
      color = "#ffffff";
    }
    if (shadow.show) {
      commonDrawMethods.setShadow(shadow.x, shadow.y, shadow.blur, shadow.color);
    }
    x = x + r;
    y = y + r;
    if (windowAlign !== "none") {
      x = commonDrawMethods.computedCenterX(canvasWidth, r * 2, windowAlign, offsetRight);
      x += r;
    }
    if (!drawImage && rotate.deg) {
      Context.save();
      commonDrawMethods.setRotate(x - r, y - r, r * 2, r * 2, rotate);
    }
    Context.beginPath();
    commonDrawMethods.setAlpha(alpha);
    Context.arc(x, y, r, s, e, d);
    if (isFill) {
      if (borderWidth != 0) {
        commonDrawMethods.setLineWidth(borderWidth);
        commonDrawMethods.setStrokeStyle(borderColor);
        Context.stroke();
      }
      if (gradient.show) {
        const { type, relative, position, colors } = gradient;
        color = commonUtilMethods.getGradient(type || "linear", relative, commonUtilMethods.conversionUnit(position), colors, { x, y });
      }
      if (!drawImage || drawImage && color !== "none") {
        commonDrawMethods.setFillStyle(color);
        Context.fill();
      }
    } else {
      commonDrawMethods.setLineWidth(lineWidth);
      commonDrawMethods.setStrokeStyle(color);
      Context.stroke();
    }
    commonDrawMethods.setAlpha(1);
    if (!drawImage && rotate.deg) {
      Context.restore();
    }
    if (shadow.show) {
      commonDrawMethods.setShadow(0, 0, 0, "black");
    }
  }
}
exports.DrawArc = DrawArc;

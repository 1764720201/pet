"use strict";
class DrawRect {
  constructor(params) {
    const { Context, commonUtilMethods, commonDrawMethods } = params;
    this.Context = Context;
    this.commonUtilMethods = commonUtilMethods;
    this.commonDrawMethods = commonDrawMethods;
  }
  getDrawParams(params = {}, conversion = true) {
    const globalDataParams = this.commonUtilMethods.getGlobalDataDrawParams(params);
    return conversion ? this.commonUtilMethods.conversionUnit(globalDataParams) : globalDataParams;
  }
  draw(params = {}, conversion = true) {
    const { Context, commonUtilMethods, commonDrawMethods } = this;
    const { canvasWidth, is2d, pxToRpx, unit } = commonUtilMethods;
    let {
      x,
      y,
      w,
      h,
      r,
      color,
      alpha,
      isFill,
      lineWidth,
      windowAlign,
      rotate,
      drawImage,
      borderColor,
      borderWidth,
      borderType,
      shadow,
      gradient,
      offsetRight
    } = this.getDrawParams(params, conversion);
    if (color === "black")
      color = "#ffffff";
    if (typeof r === "number") {
      if (r * 2 > h) {
        r = h / 2;
      }
    }
    if (windowAlign !== "none") {
      x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight) || x;
    }
    if (!drawImage && rotate.deg) {
      Context.save();
      commonDrawMethods.setRotate(x, y, w, h, rotate);
    }
    if (drawImage && shadow.show) {
      commonDrawMethods.setShadow(shadow.x, shadow.y, shadow.blur, shadow.color);
    }
    if (!drawImage && shadow.show) {
      commonDrawMethods.setShadow(shadow.x, shadow.y, shadow.blur, shadow.color);
    }
    Context.beginPath();
    commonDrawMethods.setAlpha(alpha);
    let tr = 0;
    let tl = 0;
    let br = 0;
    let bl = 0;
    if (typeof r === "object") {
      const length = r.length;
      if (length === 1) {
        tl = r[0];
        tr = r[0];
        br = r[0];
        bl = r[0];
      }
      if (length === 2) {
        tl = r[0];
        tr = r[1];
        br = r[0];
        bl = r[1];
      }
      if (length === 3) {
        tl = r[0];
        tr = r[1];
        br = r[2];
        bl = r[1];
      }
      if (length === 4) {
        tl = r[0];
        tr = r[1];
        br = r[2];
        bl = r[3];
      }
    } else if (typeof borderType === "string") {
      switch (borderType) {
        case "tr":
          tr = r;
          break;
        case "tl":
          tl = r;
          break;
        case "br":
          br = r;
          break;
        case "bl":
          bl = r;
          break;
        default:
          tr = r;
          tl = r;
          br = r;
          bl = r;
      }
    } else if (borderType instanceof Array && typeof r === "number") {
      if (borderType.includes("tr")) {
        tr = r;
      }
      if (borderType.includes("tl")) {
        tl = r;
      }
      if (borderType.includes("br")) {
        br = r;
      }
      if (borderType.includes("bl")) {
        bl = r;
      }
      if (borderType.includes("default")) {
        tr = r;
        tl = r;
        br = r;
        bl = r;
      }
    }
    Context.lineTo(x + tl, y);
    Context.arc(x + w - tr, y + tr, tr, Math.PI * 1.5, 0, false);
    Context.lineTo(x + w, y + h - br);
    Context.arc(x + w - br, y + h - br, br, 0, Math.PI * 0.5, false);
    Context.lineTo(x + bl, y + h);
    Context.arc(x + bl, y + h - bl, bl, Math.PI * 0.5, Math.PI, false);
    Context.lineTo(x, y + tl);
    Context.arc(x + tl, y + tl, tl, Math.PI * 1, Math.PI * 1.5, false);
    Context.closePath();
    if (isFill) {
      if (borderWidth != 0) {
        commonDrawMethods.setLineWidth(borderWidth);
        commonDrawMethods.setStrokeStyle(borderColor);
        Context.stroke();
      }
      if (gradient.show) {
        const { type = "linear", relative, position, colors } = gradient;
        color = commonUtilMethods.getGradient(type, relative, commonUtilMethods.conversionUnit(position), colors, { x, y });
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
    if (!drawImage && rotate.deg) {
      Context.restore();
    }
    if (shadow.show) {
      commonDrawMethods.setShadow(0, 0, 0, "black");
    }
    return {
      success: true,
      w: unit === "rpx" ? pxToRpx(w) : w,
      h: unit === "rpx" ? pxToRpx(h) : h
    };
  }
}
exports.DrawRect = DrawRect;

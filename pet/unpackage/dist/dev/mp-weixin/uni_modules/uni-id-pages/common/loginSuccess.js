"use strict";
var common_vendor = require("../../../common/vendor.js");
function loginSuccess(e = {}) {
  const {
    showToast = true,
    toastText = "\u767B\u5F55\u6210\u529F",
    autoBack = true
  } = e;
  console.log({
    toastText,
    autoBack
  });
  if (showToast) {
    common_vendor.index.showToast({
      title: toastText,
      icon: "none"
    });
  }
  if (autoBack) {
    let delta = 0;
    let pages = getCurrentPages();
    common_vendor.index.$emit("uni-id-pages-login-success", pages);
    pages.reverse().forEach((page, index) => {
      if (page.route.split("/")[3] == "login") {
        delta++;
      }
    });
    console.log("\u5224\u65AD\u9700\u8981\u8FD4\u56DE\u51E0\u5C42:", delta);
    common_vendor.index.navigateBack({
      delta
    });
  }
}
exports.loginSuccess = loginSuccess;

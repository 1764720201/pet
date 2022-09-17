"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var uni_modules_uniIdPages_init = require("./uni_modules/uni-id-pages/init.js");
require("./uni_modules/uni-id-pages/config.js");
if (!Math) {
  "./pages/Home/index.js";
  "./pages/Adopt/index.js";
  "./pages/FoundPet/index.js";
  "./pages/Issue/index.js";
  "./pages/Home/Enlightenment/index.js";
  "./pages/Message/index.js";
  "./pages/Home/ApplyAdopt/index.js";
  "./pages/Mine/index.js";
  "./pages/Issue/Adoption/index.js";
  "./uni_modules/uni-id-pages/pages/userinfo/userinfo.js";
  "./uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage.js";
  "./uni_modules/uni-id-pages/pages/common/webview/webview.js";
  "./pages/Issue/FoundPet/index.js";
  "./uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.js";
  "./uni_modules/uni-id-pages/pages/login/login-withoutpwd.js";
  "./pages/City/index.js";
}
const _sfc_main = {
  onLaunch: async function() {
    console.log("App Launch");
    await uni_modules_uniIdPages_init.uniIdPageInit();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/pet/App.vue"]]);
const Mitt = common_vendor.mitt();
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$Bus = Mitt;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

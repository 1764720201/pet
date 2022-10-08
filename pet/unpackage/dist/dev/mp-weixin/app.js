"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var uni_modules_uniIdPages_init = require("./uni_modules/uni-id-pages/init.js");
require("./uni_modules/uni-id-pages/config.js");
if (!Math) {
  "./pages/Home/index.js";
  "./pages/Chat/index.js";
  "./pages/Adopt/index.js";
  "./pages/FoundPet/index.js";
  "./pages/Home/Daily/CatDaily/index.js";
  "./pages/Home/Daily/Participation/index.js";
  "./pages/Home/Daily/MyTopic/index.js";
  "./pages/Home/Daily/CatDaily/TopicDetail/index.js";
  "./pages/Issue/index.js";
  "./pages/Home/Knowledge/PopularizationOfScience/index.js";
  "./pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/index.js";
  "./pages/Home/Knowledge/PopularizationOfScience/Knowledge/index.js";
  "./pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/EncylopediaDetail/index.js";
  "./pages/Home/Enlightenment/index.js";
  "./pages/Message/index.js";
  "./pages/Message/MyCollect/index.js";
  "./pages/Message/MyComment/index.js";
  "./pages/ApplyAdopt/index.js";
  "./pages/ApplyAdopt/Apply/index.js";
  "./pages/Mine/Request/Apply/ApplyDetail/index.js";
  "./pages/Mine/index.js";
  "./pages/ApplyAdopt/UserInfo/index.js";
  "./pages/Mine/PersonalInformation/Collect/index.js";
  "./pages/Mine/PersonalInformation/Footprint/index.js";
  "./pages/Mine/Request/Apply/index.js";
  "./pages/Mine/Request/Issue/index.js";
  "./pages/Mine/Request/Receive/index.js";
  "./pages/Mine/Request/Found/index.js";
  "./pages/Mine/Request/Receive/ProposerDetail/index.js";
  "./pages/Issue/Adoption/index.js";
  "./uni_modules/uni-id-pages/pages/userinfo/userinfo.js";
  "./uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage.js";
  "./uni_modules/uni-id-pages/pages/common/webview/webview.js";
  "./pages/Issue/FoundPet/index.js";
  "./uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.js";
  "./uni_modules/uni-id-pages/pages/login/login-withoutpwd.js";
  "./components/city-select/City/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    const db = common_vendor.pn.database();
    const getUnread = () => {
      db.collection("chat").where(`to_uid==$cloudEnv_uid&&is_read==false`).count().then((res) => {
        if (res.result.total) {
          common_vendor.index.setTabBarBadge({
            index: 3,
            text: String(res.result.total)
          });
        }
      });
    };
    common_vendor.index.onPushMessage(() => {
      getUnread();
    });
    const uniIdCo = common_vendor.pn.importObject("uni-id-co");
    common_vendor.index.getPushClientId({
      async success(e) {
        await uniIdCo.setPushCid({
          pushClientId: e.cid
        });
      }
    });
    common_vendor.onLaunch(async () => {
      console.log("App Launch");
      await uni_modules_uniIdPages_init.uniIdPageInit();
      getUnread();
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/App.vue"]]);
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

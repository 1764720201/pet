"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  (Received + News + _easycom_uni_file_picker)();
}
const Received = () => "./Received/index.js";
const News = () => "./News/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      uid: 0
    });
    common_vendor.onShow(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
    });
    common_vendor.onLoad(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
      if (userInfo.uid == 0) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      }
    });
    const imageValue = common_vendor.ref([]);
    const upload = () => {
      common_vendor.pn.callFunction({
        name: "uploadPicture",
        data: {
          image: imageValue.value
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => imageValue.value = $event),
        b: common_vendor.p({
          fileMediatype: "image",
          mode: "grid",
          modelValue: imageValue.value
        }),
        c: common_vendor.o(upload)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/yzc/Desktop/pet/pages/Message/index.vue"]]);
wx.createPage(MiniProgramPage);

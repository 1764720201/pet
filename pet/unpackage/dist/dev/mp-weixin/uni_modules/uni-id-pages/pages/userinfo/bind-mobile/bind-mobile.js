"use strict";
var common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        mobile: "",
        code: "",
        captcha: ""
      },
      focusMobile: true
    };
  },
  computed: {
    tipText() {
      return `\u9A8C\u8BC1\u7801\u5DF2\u901A\u8FC7\u77ED\u4FE1\u53D1\u9001\u81F3 ${this.formData.mobile}\u3002\u5BC6\u7801\u4E3A6 - 20\u4F4D`;
    }
  },
  onLoad(event) {
  },
  onReady() {
  },
  methods: {
    submit() {
      if (!/^1\d{10}$/.test(this.formData.mobile)) {
        this.focusMobile = true;
        return common_vendor.index.showToast({
          title: "\u624B\u673A\u53F7\u7801\u683C\u5F0F\u4E0D\u6B63\u786E",
          icon: "none"
        });
      }
      if (!/^\d{6}$/.test(this.formData.code)) {
        this.$refs.smsForm.focusSmsCodeInput = true;
        return common_vendor.index.showToast({
          title: "\u9A8C\u8BC1\u7801\u683C\u5F0F\u4E0D\u6B63\u786E",
          icon: "none"
        });
      }
      console.log(this.formData);
      const uniIdCo = common_vendor.pn.importObject("uni-id-co");
      uniIdCo.bindMobileBySms(this.formData).then((e) => {
        console.log(e);
        common_vendor.index.showToast({
          title: e.errMsg,
          icon: "none"
        });
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit("getUserInfo");
        common_vendor.index.navigateBack();
      }).catch((e) => {
        console.log(e);
        if (e.errCode == "uni-id-captcha-required") {
          this.$refs.popup.open();
        }
      }).finally((e) => {
        this.formData.captcha = "";
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_id_pages_sms_form2 = common_vendor.resolveComponent("uni-id-pages-sms-form");
  const _easycom_uni_popup_captcha2 = common_vendor.resolveComponent("uni-popup-captcha");
  (_easycom_uni_easyinput2 + _easycom_uni_id_pages_sms_form2 + _easycom_uni_popup_captcha2)();
}
const _easycom_uni_easyinput = () => "../../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_id_pages_sms_form = () => "../../../components/uni-id-pages-sms-form/uni-id-pages-sms-form.js";
const _easycom_uni_popup_captcha = () => "../../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_id_pages_sms_form + _easycom_uni_popup_captcha)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.focusMobile = false),
    b: common_vendor.o(($event) => $data.formData.mobile = $event),
    c: common_vendor.p({
      clearable: true,
      focus: $data.focusMobile,
      type: "number",
      inputBorder: false,
      maxlength: "11",
      placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
      modelValue: $data.formData.mobile
    }),
    d: common_vendor.sr("smsForm", "5792b493-1"),
    e: common_vendor.o(($event) => $data.formData.code = $event),
    f: common_vendor.p({
      type: "bind-mobile-by-sms",
      phone: $data.formData.mobile,
      modelValue: $data.formData.code
    }),
    g: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    h: common_vendor.sr("popup", "5792b493-2"),
    i: common_vendor.o($options.submit),
    j: common_vendor.o(($event) => $data.formData.captcha = $event),
    k: common_vendor.p({
      scene: "bind-mobile-by-sms",
      modelValue: $data.formData.captcha
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.vue"]]);
wx.createPage(MiniProgramPage);

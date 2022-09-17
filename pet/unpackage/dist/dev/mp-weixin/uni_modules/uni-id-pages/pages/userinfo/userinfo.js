"use strict";
var common_vendor = require("../../../../common/vendor.js");
const db = common_vendor.pn.database();
const usersTable = db.collection("uni-id-users");
const uniIdCo = common_vendor.pn.importObject("uni-id-co");
const _sfc_main = {
  data() {
    return {
      univerifyStyle: {
        authButton: {
          "title": "\u672C\u673A\u53F7\u7801\u4E00\u952E\u7ED1\u5B9A"
        },
        otherLoginButton: {
          "title": "\u5176\u4ED6\u53F7\u7801\u7ED1\u5B9A"
        }
      },
      userInfo: {
        mobile: "",
        nickname: ""
      },
      hasLogin: false,
      hasPwd: false
    };
  },
  async onShow() {
    this.univerifyStyle.authButton.title = "\u672C\u673A\u53F7\u7801\u4E00\u952E\u7ED1\u5B9A";
    this.univerifyStyle.otherLoginButton.title = "\u5176\u4ED6\u53F7\u7801\u7ED1\u5B9A";
  },
  async onLoad() {
    this.getUserInfo();
    let res = await uniIdCo.getAccountInfo();
    this.hasPwd = res.isPasswordSet;
  },
  methods: {
    login() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd",
        complete: (e) => {
          console.log(e);
        }
      });
    },
    async logout() {
      await uniIdCo.logout();
      common_vendor.index.removeStorageSync("uni_id_token");
      common_vendor.index.setStorageSync("uni_id_token_expired", 0);
      common_vendor.index.redirectTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
      });
    },
    changePassword() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd",
        complete: (e) => {
          console.log(e);
        }
      });
    },
    getUserInfo(e) {
      common_vendor.index.showLoading({
        mask: true
      });
      usersTable.where("'_id' == $cloudEnv_uid").field("mobile,nickname").get().then((res) => {
        console.log({ res });
        this.userInfo = res.result.data[0];
        console.log("this.userInfo", this.userInfo);
        this.hasLogin = true;
      }).catch((e2) => {
        this.userInfo = {};
        this.hasLogin = false;
        console.log(e2.message, e2.errCode);
      }).finally((e2) => {
        common_vendor.index.hideLoading();
      });
    },
    bindMobile() {
      this.$refs["bind-mobile"].open();
    },
    univerify() {
      common_vendor.index.login({
        "provider": "univerify",
        "univerifyStyle": this.univerifyStyle,
        success: async (e) => {
          console.log(e.authResult);
          uniIdCo.bindMobileByUniverify(e.authResult).then((res) => {
            console.log(res);
            this.getUserInfo();
          }).catch((e2) => {
            console.log(e2);
          }).finally((e2) => {
            console.log(e2);
            common_vendor.index.closeAuthView();
          });
        },
        fail: (err) => {
          console.log(err);
          if (err.code == "30002" || err.code == "30001") {
            this.bindMobileBySmsCode();
          }
        }
      });
    },
    bindMobileBySmsCode() {
      common_vendor.index.navigateTo({
        url: "./bind-mobile/bind-mobile",
        events: {
          getUserInfo: () => {
            this.getUserInfo();
          }
        },
        complete(e) {
          console.log(e);
        }
      });
    },
    setNickname(nickname) {
      console.log(nickname);
      if (nickname) {
        usersTable.where("_id==$env.uid").update({
          nickname
        }).then((e) => {
          console.log(e);
          if (e.result.updated) {
            common_vendor.index.showToast({
              title: "\u66F4\u65B0\u6210\u529F",
              icon: "none"
            });
            this.userInfo.nickname = nickname;
          } else {
            common_vendor.index.showToast({
              title: "\u6CA1\u6709\u6539\u53D8",
              icon: "none"
            });
          }
        });
        this.$refs.dialog.close();
      } else {
        this.$refs.dialog.open();
      }
    },
    deactivate() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_id_pages_avatar2 = common_vendor.resolveComponent("uni-id-pages-avatar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_id_pages_bind_mobile2 = common_vendor.resolveComponent("uni-id-pages-bind-mobile");
  (_easycom_uni_id_pages_avatar2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_id_pages_bind_mobile2)();
}
const _easycom_uni_id_pages_avatar = () => "../../components/uni-id-pages-avatar/uni-id-pages-avatar.js";
const _easycom_uni_list_item = () => "../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../../uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_id_pages_bind_mobile = () => "../../components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.js";
if (!Math) {
  (_easycom_uni_id_pages_avatar + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_id_pages_bind_mobile)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      width: "260rpx",
      height: "260rpx"
    }),
    b: common_vendor.o(($event) => $options.setNickname("")),
    c: common_vendor.p({
      title: "\u6635\u79F0",
      rightText: $data.userInfo.nickname || "\u672A\u8BBE\u7F6E",
      link: true
    }),
    d: common_vendor.o($options.bindMobile),
    e: common_vendor.p({
      title: "\u624B\u673A\u53F7",
      rightText: $data.userInfo.mobile || "\u672A\u7ED1\u5B9A",
      link: true
    }),
    f: $data.hasPwd
  }, $data.hasPwd ? {
    g: common_vendor.o($options.changePassword),
    h: common_vendor.p({
      title: "\u4FEE\u6539\u5BC6\u7801",
      link: true
    })
  } : {}, {
    i: common_vendor.o($options.deactivate),
    j: common_vendor.p({
      title: "\u6CE8\u9500\u8D26\u53F7",
      link: "navigateTo"
    }),
    k: common_vendor.o($options.setNickname),
    l: common_vendor.p({
      mode: "input",
      value: $data.userInfo.nickname,
      title: "\u8BBE\u7F6E\u6635\u79F0",
      placeholder: "\u8BF7\u8F93\u5165\u8981\u8BBE\u7F6E\u7684\u6635\u79F0"
    }),
    m: common_vendor.sr("dialog", "451985ee-7"),
    n: common_vendor.p({
      type: "dialog"
    }),
    o: common_vendor.sr("bind-mobile-by-sms", "451985ee-9"),
    p: common_vendor.o($options.getUserInfo),
    q: $data.hasLogin
  }, $data.hasLogin ? {
    r: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  } : {
    s: common_vendor.o((...args) => $options.login && $options.login(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-451985ee"], ["__file", "C:/Users/yzc/Desktop/pet/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue"]]);
wx.createPage(MiniProgramPage);

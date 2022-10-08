"use strict";
var common_vendor = require("../../../../common/vendor.js");
const pickerAddress = () => "../../../../components/gtc-pickerAddress/pickerAddress.js";
const Issue = () => "../../../../components/Issue/index.js";
const db = common_vendor.pn.database();
const usersTable = db.collection("uni-id-users");
common_vendor.pn.importObject("uni-id-co");
const _sfc_main = {
  components: {
    pickerAddress,
    Issue
  },
  data() {
    const currentDate = this.getDate({
      format: true
    });
    return {
      userInfo: {
        nickname: "",
        gender: 0,
        city: ["\u8BF7\u9009\u62E9\u57CE\u5E02"],
        introduction: "",
        birthday: "\u8BF7\u9009\u62E9\u65E5\u671F",
        wxcode: ""
      },
      introuctionLength: 0,
      genderList: [
        {
          text: "\u7537\u751F",
          value: 1
        },
        {
          text: "\u5973\u751F",
          value: 2
        }
      ],
      hasLogin: false,
      date: currentDate
    };
  },
  async onLoad() {
    this.getUserInfo();
  },
  methods: {
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear() - 20;
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    bindDateChange(e) {
      this.userInfo.birthday = e.detail.value;
    },
    change(e) {
      this.userInfo.city = e.data;
    },
    login() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd",
        complete: (e) => {
          console.log(e);
        }
      });
    },
    getUserInfo(e) {
      common_vendor.index.showLoading({
        mask: true
      });
      usersTable.where("'_id' == $cloudEnv_uid").field("mobile,nickname,city,introduction,birthday,gender,wxcode").get().then((res) => {
        console.log(res.result.data[0]);
        const data = res.result.data[0];
        this.userInfo = Object.assign(this.userInfo, JSON.parse(JSON.stringify(data)));
        this.hasLogin = true;
      }).catch((e2) => {
        this.userInfo = {};
        this.hasLogin = false;
        console.log(e2.message, e2.errCode);
      }).finally((e2) => {
        common_vendor.index.hideLoading();
      });
    },
    saveAmend() {
      usersTable.where("_id==$env.uid").update({
        nickname: this.userInfo.nickname,
        gender: this.userInfo.gender,
        birthday: this.userInfo.birthday,
        introduction: this.userInfo.introduction,
        city: this.userInfo.city,
        wxcode: this.userInfo.wxcode
      }).then((e) => {
        console.log(e);
        if (e.result.updated) {
          common_vendor.index.showToast({
            title: "\u66F4\u65B0\u6210\u529F",
            icon: "none"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 300);
        } else {
          common_vendor.index.showToast({
            title: "\u6CA1\u6709\u6539\u53D8",
            icon: "none"
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    }
  },
  watch: {
    userInfo: {
      handler(_, newValue) {
        this.introuctionLength = newValue.introduction.length;
      },
      deep: true
    }
  }
};
if (!Array) {
  const _easycom_uni_id_pages_avatar2 = common_vendor.resolveComponent("uni-id-pages-avatar");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _component_pickerAddress = common_vendor.resolveComponent("pickerAddress");
  const _component_Issue = common_vendor.resolveComponent("Issue");
  const _easycom_uni_id_pages_bind_mobile2 = common_vendor.resolveComponent("uni-id-pages-bind-mobile");
  (_easycom_uni_id_pages_avatar2 + _easycom_uni_data_checkbox2 + _component_pickerAddress + _component_Issue + _easycom_uni_id_pages_bind_mobile2)();
}
const _easycom_uni_id_pages_avatar = () => "../../components/uni-id-pages-avatar/uni-id-pages-avatar.js";
const _easycom_uni_data_checkbox = () => "../../../uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_id_pages_bind_mobile = () => "../../components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.js";
if (!Math) {
  (_easycom_uni_id_pages_avatar + _easycom_uni_data_checkbox + _easycom_uni_id_pages_bind_mobile)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return {
    a: common_vendor.p({
      width: "260rpx",
      height: "260rpx"
    }),
    b: $data.userInfo.nickname,
    c: common_vendor.o(($event) => $data.userInfo.nickname = $event.detail.value),
    d: common_vendor.o(($event) => $data.userInfo.gender = $event),
    e: common_vendor.p({
      mode: "tag",
      localdata: $data.genderList,
      modelValue: $data.userInfo.gender
    }),
    f: common_vendor.t($data.userInfo.birthday),
    g: $data.date,
    h: $options.startDate,
    i: $options.endDate,
    j: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    k: common_vendor.t((_a = $data.userInfo) == null ? void 0 : _a.city.join("")),
    l: common_vendor.o($options.change),
    m: $data.userInfo.wxcode,
    n: common_vendor.o(($event) => $data.userInfo.wxcode = $event.detail.value),
    o: $data.userInfo.introduction,
    p: common_vendor.o(($event) => $data.userInfo.introduction = $event.detail.value),
    q: common_vendor.t($data.introuctionLength),
    r: common_vendor.o($options.saveAmend),
    s: common_vendor.p({
      issue: "\u4FDD\u5B58\u4FEE\u6539"
    }),
    t: common_vendor.sr("bind-mobile-by-sms", "451985ee-4"),
    v: common_vendor.o($options.getUserInfo)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-451985ee"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue"]]);
wx.createPage(MiniProgramPage);

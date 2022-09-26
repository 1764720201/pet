"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  _easycom_tui_icon2();
}
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
if (!Math) {
  (_easycom_tui_icon + PetList)();
}
const PetList = () => "../../../components/PetList/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    var _a;
    const where = common_vendor.ref();
    const instance = common_vendor.getCurrentInstance();
    (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$Bus.on("search", (res) => {
      if (res) {
        where.value = `pet_name=='${res}'`;
      } else {
        where.value = "";
      }
    });
    const currentCity = common_vendor.ref("\u5168\u90E8");
    const starList = ["\u5168\u90E8", "\u6C6A\u661F\u4EBA", "\u55B5\u661F\u4EBA", "\u5176\u5B83"];
    const ageList = ["\u5168\u90E8", "\u4E0D\u6EE11\u4E2A\u6708", "1\u4E2A\u6708", "2\u4E2A\u6708", "3-6\u4E2A\u6708", "6\u4E2A\u6708-1\u5C81", "1\u5C81", "2\u5C81", "3\u5C81\u53CA\u4EE5\u4E0A"];
    const genderList = ["\u5168\u90E8", "\u7537\u751F", "\u5973\u751F"];
    const starIndex = common_vendor.ref();
    const genderIndex = common_vendor.ref();
    const ageIndex = common_vendor.ref();
    const changeStar = (e) => {
      starIndex.value = starList[e.detail.value];
      if (starIndex.value == "\u5168\u90E8") {
        where.value = "";
      } else {
        where.value = `star=='${starIndex.value}'`;
      }
    };
    const changeGender = (e) => {
      genderIndex.value = genderList[e.detail.value];
      if (genderIndex.value == "\u5168\u90E8") {
        where.value = "";
      } else {
        where.value = `gender=='${genderIndex.value}'`;
      }
    };
    const changeAge = (e) => {
      ageIndex.value = ageList[e.detail.value];
      if (ageIndex.value == "\u5168\u90E8") {
        where.value = "";
      } else {
        where.value = `age=='${ageIndex.value}'`;
      }
    };
    common_vendor.onLoad(async (option) => {
      if (option.cityName) {
        currentCity.value = option.cityName;
        where.value = `city=='${option.cityName}'`;
      } else {
        where.value = "";
      }
    });
    const chooseCity = () => {
      common_vendor.index.navigateTo({
        url: "/components/city-select/City/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "gps",
          size: "15"
        }),
        b: common_vendor.t(currentCity.value),
        c: common_vendor.p({
          name: "arrowdown",
          size: "15"
        }),
        d: common_vendor.o(chooseCity),
        e: common_vendor.o(changeStar),
        f: starList,
        g: common_vendor.p({
          name: "arrowdown",
          size: "15"
        }),
        h: common_vendor.o(changeGender),
        i: genderList,
        j: common_vendor.p({
          name: "arrowdown",
          size: "15"
        }),
        k: common_vendor.o(changeAge),
        l: ageList,
        m: common_vendor.p({
          name: "arrowdown",
          size: "15"
        }),
        n: common_vendor.p({
          where: where.value
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-16c5d499"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Adopt/List/index.vue"]]);
wx.createComponent(Component);

"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  PetList();
}
const PetList = () => "../../../components/PetList/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    var _a;
    const where = common_vendor.ref([]);
    const instance = common_vendor.getCurrentInstance();
    (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$Bus.on("search", (res) => {
      if (res) {
        where.value[0] = `pet_name=='${res}'||city=='${res}'||gender=='${res}'||star=='${res}'||variety=='${res}'`;
      } else {
        where.value = [];
        currentCity.value = "\u5730\u533A";
        starIndex.value = "\u661F\u7403";
        genderIndex.value = "\u6027\u522B";
        ageIndex.value = "\u5E74\u9F84";
      }
    });
    const currentCity = common_vendor.ref("\u5730\u533A");
    const starList = ["\u5168\u90E8", "\u6C6A\u661F\u4EBA", "\u55B5\u661F\u4EBA", "\u5176\u5B83"];
    const ageList = [
      "\u5168\u90E8",
      "\u4E0D\u6EE11\u4E2A\u6708",
      "1\u4E2A\u6708",
      "2\u4E2A\u6708",
      "3-6\u4E2A\u6708",
      "6\u4E2A\u6708-1\u5C81",
      "1\u5C81",
      "2\u5C81",
      "3\u5C81\u53CA\u4EE5\u4E0A"
    ];
    const genderList = ["\u5168\u90E8", "\u7537\u751F", "\u5973\u751F"];
    const starIndex = common_vendor.ref("\u661F\u7403");
    const genderIndex = common_vendor.ref("\u6027\u522B");
    const ageIndex = common_vendor.ref("\u5E74\u9F84");
    const changeStar = (e) => {
      starIndex.value = starList[e.detail.value];
      if (starIndex.value == "\u5168\u90E8") {
        where.value[1] = "";
      } else {
        where.value[1] = `star=='${starIndex.value}'`;
      }
    };
    const changeGender = (e) => {
      genderIndex.value = genderList[e.detail.value];
      if (genderIndex.value == "\u5168\u90E8") {
        where.value[2] = "";
      } else {
        where.value[2] = `gender=='${genderIndex.value}'`;
      }
    };
    const changeAge = (e) => {
      ageIndex.value = ageList[e.detail.value];
      if (ageIndex.value == "\u5168\u90E8") {
        where.value[3] = "";
      } else {
        where.value[3] = `age=='${ageIndex.value}'`;
      }
    };
    common_vendor.onLoad(async (option) => {
      if (option.cityName) {
        currentCity.value = option.cityName;
        where.value[0] = `city=='${option.cityName}'`;
      } else {
        where.value[0] = "";
      }
    });
    const chooseCity = () => {
      common_vendor.index.navigateTo({
        url: "/components/city-select/City/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(currentCity.value),
        b: common_vendor.o(chooseCity),
        c: common_vendor.t(starIndex.value),
        d: common_vendor.o(changeStar),
        e: starList,
        f: common_vendor.t(genderIndex.value),
        g: common_vendor.o(changeGender),
        h: genderList,
        i: common_vendor.t(ageIndex.value),
        j: common_vendor.o(changeAge),
        k: ageList,
        l: common_vendor.p({
          where: where.value.filter((v) => v).join("&&")
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-16c5d499"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Adopt/List/index.vue"]]);
wx.createComponent(Component);

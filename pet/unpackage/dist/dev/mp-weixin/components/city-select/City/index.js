"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_amapWx_130 = require("../../../common/amap-wx.130.js");
var components_citySelect_City_citys_citys = require("./citys/citys.js");
const citySelect = () => "../city-select.js";
const _sfc_main = {
  data() {
    return {
      location: {},
      amapPlugin: null,
      key: "b675910771e04f68544a7cc6492f034f",
      formatName: "title",
      activeCity: {
        id: 1,
        title: "\u5357\u4EAC\u5E02"
      },
      hotCity: [
        {
          id: 0,
          title: "\u5357\u4EAC\u5E02"
        },
        {
          id: 1,
          title: "\u5357\u4EAC\u5E02"
        }
      ],
      obtainCitys: [
        {
          id: 0,
          title: "\u5357\u4EAC"
        },
        {
          id: 1,
          title: "\u5317\u4EAC"
        },
        {
          id: 2,
          title: "\u5929\u6D25"
        },
        {
          id: 3,
          title: "\u4E1C\u4EAC"
        }
      ]
    };
  },
  components: {
    citySelect
  },
  onLoad() {
    common_vendor.index.authorize({
      scope: "scope.userLocation",
      success: (res) => {
        console.log(res);
      }
    });
    try {
      this.amapPlugin = new common_amapWx_130.amapFile.AMapWX({
        key: this.key
      });
    } catch (e) {
      console.log(e);
    }
    common_vendor.index.showLoading({
      title: "\u83B7\u53D6\u4FE1\u606F\u4E2D"
    });
    this.amapPlugin.getRegeo({
      success: (data) => {
        this.activeCity = {
          cityName: data[0].regeocodeData.addressComponent.city,
          cityCode: Number(data[0].regeocodeData.addressComponent.adcode.slice(0, 4) + "00")
        };
        common_vendor.index.hideLoading();
      }
    });
    setTimeout(() => {
      this.formatName = "cityName";
      this.hotCity = [
        {
          cityName: "\u5357\u4EAC",
          cityCode: 110100
        },
        {
          cityName: "\u5317\u4EAC",
          cityCode: 110102
        },
        {
          cityName: "\u5B81\u6CE2\u5E02",
          cityCode: 330200
        },
        {
          cityName: "\u676D\u5DDE\u5E02",
          cityCode: 330100
        },
        {
          cityName: "\u4E0A\u6D77\u5E02",
          cityCode: 310100
        },
        {
          cityCode: 610100,
          cityName: "\u897F\u5B89\u5E02"
        },
        {
          cityName: "\u5E7F\u5DDE\u5E02",
          cityCode: 440100
        },
        {
          cityName: "\u6DF1\u5733\u5E02",
          cityCode: 440300
        },
        {
          cityName: "\u6210\u90FD\u5E02",
          cityCode: 510100
        },
        {
          cityName: "\u6B66\u6C49\u5E02",
          cityCode: 420100
        },
        {
          cityName: "\u5929\u6D25",
          cityCode: 120100
        },
        {
          cityName: "\u82CF\u5DDE\u5E02",
          cityCode: 320500
        }
      ];
      this.obtainCitys = components_citySelect_City_citys_citys.citys;
    }, 100);
  },
  methods: {
    cityClick(item) {
      common_vendor.index.reLaunch({
        url: `/pages/Adopt/index?cityName=${item.cityName}`
      });
    },
    getRegeo() {
    }
  }
};
if (!Array) {
  const _easycom_city_select2 = common_vendor.resolveComponent("city-select");
  _easycom_city_select2();
}
const _easycom_city_select = () => "../city-select.js";
if (!Math) {
  _easycom_city_select();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("citys", "3a47f437-0"),
    b: common_vendor.o($options.cityClick),
    c: common_vendor.p({
      formatName: $data.formatName,
      activeCity: $data.activeCity,
      hotCity: $data.hotCity,
      obtainCitys: $data.obtainCitys,
      isSearch: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/yzc/Desktop/pet/components/city-select/City/index.vue"]]);
wx.createPage(MiniProgramPage);

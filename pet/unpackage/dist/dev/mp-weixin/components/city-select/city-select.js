"use strict";
var components_citySelect_citySelect = require("./citySelect.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u57CE\u5E02\u540D\u79F0"
    },
    formatName: {
      type: String,
      default: "cityName"
    },
    activeCity: {
      type: Object,
      default: () => null
    },
    hotCity: {
      type: Array,
      default: () => []
    },
    obtainCitys: {
      type: Array,
      default: () => []
    },
    isSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      toView: "city-letter-Find",
      scrollTop: 0,
      cityindexs: [],
      activeCityIndex: "",
      handleCity: [],
      serachCity: "",
      cityData: []
    };
  },
  computed: {
    sortItems() {
      for (let index = 0; index < this.handleCity.length; index++) {
        if (this.handleCity[index].isCity) {
          let cityArr = this.handleCity[index].citys;
          cityArr = cityArr.sort(function(a, b) {
            var value1 = a.unicode;
            var value2 = b.unicode;
            return value1 - value2;
          });
        }
      }
      return this.handleCity;
    },
    searchDatas() {
      var searchData = [];
      for (let i = 0; i < this.cityData.length; i++) {
        if (this.cityData[i][this.formatName].indexOf(this.serachCity) !== -1) {
          searchData.push({
            oldData: this.cityData[i],
            name: this.cityData[i][this.formatName]
          });
        }
      }
      return searchData;
    }
  },
  created() {
    this.cityData = this.obtainCitys;
    this.initializationCity();
    this.buildCityindexs();
  },
  watch: {
    obtainCitys(newData) {
      this.updateCitys(newData);
    }
  },
  methods: {
    updateCitys(data) {
      if (data && data.length) {
        this.cityData = data;
        this.initializationCity();
        this.buildCityindexs();
      }
    },
    keyInput(event) {
      this.serachCity = event.detail.value;
    },
    initializationCity() {
      this.handleCity = [];
      const cityLetterArr = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#"
      ];
      for (let index = 0; index < cityLetterArr.length; index++) {
        this.handleCity.push({
          name: cityLetterArr[index],
          isCity: false,
          citys: [],
          forName: "city-letter-" + (cityLetterArr[index] == "#" ? "0" : cityLetterArr[index])
        });
      }
    },
    getLetter(str) {
      return components_citySelect_citySelect.citySelect.getFirstLetter(str[0]);
    },
    buildCityindexs() {
      this.cityindexs = [];
      for (let i = 0; i < this.cityData.length; i++) {
        const cityLetter = this.getLetter(this.cityData[i][this.formatName]).firstletter;
        const unicode = this.getLetter(this.cityData[i][this.formatName]).unicode;
        const index = this.cityIndexPosition(cityLetter);
        if (this.cityindexs.indexOf(cityLetter) === -1) {
          this.handleCity[index].isCity = true;
          this.cityindexs.push(cityLetter);
        }
        this.handleCity[index].citys.push({
          cityName: this.cityData[i][this.formatName],
          unicode,
          oldData: this.cityData[i]
        });
      }
    },
    cityindex(id) {
      this.toView = id;
    },
    cityIndexPosition(letter) {
      if (!letter) {
        return "";
      }
      const ACode = 65;
      return letter === "#" ? 26 : letter.charCodeAt(0) - ACode;
    },
    cityTrigger(item) {
      this.$emit("cityClick", item.oldData ? item.oldData : item);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isSearch
  }, $props.isSearch ? {
    b: common_vendor.o((...args) => $options.keyInput && $options.keyInput(...args)),
    c: $props.placeholder
  } : {}, {
    d: $props.activeCity && !$data.serachCity
  }, $props.activeCity && !$data.serachCity ? {} : {}, {
    e: $props.activeCity && !$data.serachCity
  }, $props.activeCity && !$data.serachCity ? {
    f: common_vendor.t($props.activeCity[$props.formatName]),
    g: common_vendor.o(($event) => $options.cityTrigger($props.activeCity))
  } : {}, {
    h: $props.hotCity.length > 0 && !$data.serachCity
  }, $props.hotCity.length > 0 && !$data.serachCity ? {} : {}, {
    i: $props.hotCity.length > 0 && !$data.serachCity
  }, $props.hotCity.length > 0 && !$data.serachCity ? {
    j: common_vendor.f($props.hotCity, (item, index, i0) => {
      return {
        a: common_vendor.t(item[$props.formatName]),
        b: index,
        c: common_vendor.o(($event) => $options.cityTrigger(item, "hot"), index)
      };
    })
  } : {}, {
    k: !$data.serachCity
  }, !$data.serachCity ? {
    l: common_vendor.f($options.sortItems, (city, index, i0) => {
      return {
        a: common_vendor.t(city.name),
        b: "city-letter-" + (city.name === "#" ? "0" : city.name),
        c: common_vendor.f(city.citys, (item, inx, i1) => {
          return {
            a: common_vendor.t(item.cityName),
            b: inx,
            c: common_vendor.o(($event) => $options.cityTrigger(item), inx)
          };
        }),
        d: index,
        e: city.isCity
      };
    })
  } : {}, {
    m: $data.serachCity
  }, $data.serachCity ? {
    n: common_vendor.f($options.searchDatas, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.cityTrigger(item), _ctx.inx),
        c: index
      };
    }),
    o: _ctx.inx
  } : {}, {
    p: $data.scrollTop,
    q: $data.toView,
    r: !$data.serachCity
  }, !$data.serachCity ? {
    s: common_vendor.f($data.handleCity, (cityIns, index, i0) => {
      return {
        a: common_vendor.t(cityIns.name),
        b: cityIns.isCity,
        c: index,
        d: common_vendor.o(($event) => $options.cityindex(cityIns.forName), index)
      };
    })
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/city-select/city-select.vue"]]);
wx.createComponent(Component);

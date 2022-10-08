"use strict";
var components_gtcPickerAddress_data = require("./data.js");
var common_vendor = require("../../common/vendor.js");
let selectVal = ["", "", ""];
const _sfc_main = {
  data() {
    return {
      value: [0, 0, 0],
      array: [],
      index: 0
    };
  },
  created() {
    this.initSelect();
  },
  methods: {
    initSelect() {
      this.updateSourceDate().updateAddressDate().$forceUpdate();
    },
    columnchange(d) {
      this.updateSelectIndex(d.detail.column, d.detail.value).updateSourceDate().updateAddressDate().$forceUpdate();
    },
    updateSourceDate() {
      this.array = [];
      this.array[0] = components_gtcPickerAddress_data.areaData.map((obj) => {
        return {
          name: obj.name
        };
      });
      this.array[1] = components_gtcPickerAddress_data.areaData[this.value[0]].cityList.map((obj) => {
        return {
          name: obj.name
        };
      });
      this.array[2] = components_gtcPickerAddress_data.areaData[this.value[0]].cityList[this.value[1]].areaList.map((obj) => {
        return {
          name: obj.name
        };
      });
      return this;
    },
    updateSelectIndex(column, value) {
      let arr = JSON.parse(JSON.stringify(this.value));
      arr[column] = value;
      if (column === 0) {
        arr[1] = 0;
        arr[2] = 0;
      }
      if (column === 1) {
        arr[2] = 0;
      }
      this.value = arr;
      return this;
    },
    updateAddressDate() {
      selectVal[0] = this.array[0][this.value[0]].name;
      selectVal[1] = this.array[1][this.value[1]].name;
      selectVal[2] = this.array[2][this.value[2]].name;
      return this;
    },
    bindPickerChange(e) {
      this.$emit("change", {
        index: this.value,
        data: selectVal,
        array: this.array
      });
      return this;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    b: common_vendor.o((...args) => $options.columnchange && $options.columnchange(...args)),
    c: $data.array,
    d: $data.value
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/components/gtc-pickerAddress/pickerAddress.vue"]]);
wx.createComponent(Component);

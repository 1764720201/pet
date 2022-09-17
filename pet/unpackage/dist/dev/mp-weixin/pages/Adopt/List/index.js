"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_tui_icon2 + _easycom_uni_dateformat2 + _easycom_uni_icons2 + _easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_tui_icon + _easycom_uni_dateformat + _easycom_uni_icons + _easycom_uni_load_more + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    var _a;
    const navigateTop = common_vendor.ref(false);
    const where = common_vendor.ref();
    const udb = common_vendor.ref(null);
    const instance = common_vendor.getCurrentInstance();
    (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$Bus.on("search", (res) => {
      console.log(res);
      if (res) {
        where.value = `pet_name=='${res}'`;
      } else {
        where.value = "";
      }
    });
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
      navigateTop.value = true;
    });
    const navigateToTop = () => {
      navigateTop.value = false;
      common_vendor.index.pageScrollTo({
        scrollTop: 300,
        duration: 300
      });
    };
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
    const goPetInfo = (petInfo) => {
      common_vendor.index.navigateTo({
        url: `../Home/ApplyAdopt/index?id=${petInfo._id}`
      });
    };
    const chooseCity = () => {
      common_vendor.index.navigateTo({
        url: "/pages/City/index"
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
        n: common_vendor.w(({
          data,
          pagination,
          loading,
          error,
          hasMore
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : common_vendor.e({
            c: common_vendor.f(data, (petInfo, k1, i1) => {
              return {
                a: petInfo.img[0].path,
                b: common_vendor.t(petInfo.petName),
                c: common_vendor.t(petInfo.gender == "\u7537\u751F" ? "\u2642" : "\u2640"),
                d: common_vendor.t(petInfo.variety),
                e: common_vendor.f(petInfo.medical, (med, k2, i2) => {
                  return {
                    a: common_vendor.t(med)
                  };
                }),
                f: common_vendor.t(petInfo.city[1]),
                g: common_vendor.t(petInfo.city[2]),
                h: "16c5d499-6-" + i0 + "-" + i1 + ",16c5d499-5",
                i: common_vendor.p({
                  date: petInfo.issueTime,
                  format: "yyyy-MM-dd hh:mm:ss"
                }),
                j: common_vendor.o(($event) => goPetInfo(petInfo), petInfo._id),
                k: petInfo._id
              };
            }),
            d: navigateTop.value
          }, navigateTop.value ? {
            e: "16c5d499-7-" + i0 + ",16c5d499-5",
            f: common_vendor.p({
              type: "navigate",
              size: "50"
            }),
            g: common_vendor.o(navigateToTop)
          } : {}), {
            h: loading
          }, loading ? {
            i: "16c5d499-8-" + i0 + ",16c5d499-5",
            j: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            k: hasMore && !loading
          }, hasMore && !loading ? {
            l: "16c5d499-9-" + i0 + ",16c5d499-5",
            m: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            o: "16c5d499-10-" + i0 + ",16c5d499-5",
            p: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            n: !hasMore && !loading,
            q: i0,
            r: s0
          });
        }, {
          name: "d",
          path: "n",
          vueId: "16c5d499-5"
        }),
        o: common_vendor.sr(udb, "16c5d499-5", {
          "k": "udb"
        }),
        p: common_vendor.p({
          collection: "adoption",
          orderby: "issueTime desc",
          field: "pet_name as petName,_id,medical,city,issue_time as issueTime,gender,variety,img",
          getone: false,
          where: where.value,
          ["page-size"]: 5
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-16c5d499"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Adopt/List/index.vue"]]);
wx.createComponent(Component);

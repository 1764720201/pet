"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_dateformat2 + _easycom_uni_load_more2 + _easycom_unicloud_db2 + _easycom_uni_icons2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_load_more + _easycom_unicloud_db + _easycom_uni_icons)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    where: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const alreadyAdopt = common_vendor.ref();
    const db = common_vendor.pn.database();
    common_vendor.onLoad(() => {
      db.collection("images").where("title=='\u5DF2\u9886\u517B'").get().then((res) => {
        alreadyAdopt.value = res.result.data[0].image[0].url;
      });
    });
    const navigateTop = common_vendor.ref(false);
    const udb = common_vendor.ref(null);
    const { where } = common_vendor.toRefs(props);
    const navigateToTop = () => {
      navigateTop.value = false;
      common_vendor.index.pageScrollTo({
        scrollTop: 300,
        duration: 300
      });
    };
    const goPetInfo = (petInfo) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/index?id=${petInfo._id}`,
        success() {
          common_vendor.pn.callFunction({
            name: "footprint",
            data: {
              userId,
              adoptId: petInfo._id
            }
          });
        }
      });
    };
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      navigateTop.value = true;
      udb.value.loadMore();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.w(({
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
          } : {
            c: common_vendor.f(data, (petInfo, k1, i1) => {
              return common_vendor.e({
                a: !petInfo.if_adopt
              }, !petInfo.if_adopt ? {} : {
                b: alreadyAdopt.value
              }, {
                c: petInfo.img[0].path,
                d: common_vendor.t(petInfo.petName),
                e: common_vendor.t(petInfo.gender == "\u7537\u751F" ? "\u2642" : "\u2640"),
                f: common_vendor.t(petInfo.variety),
                g: common_vendor.f(petInfo.medical, (med, k2, i2) => {
                  return {
                    a: common_vendor.t(med)
                  };
                }),
                h: common_vendor.t(petInfo.city[1]),
                i: common_vendor.t(petInfo.city[2]),
                j: "eec1dd56-1-" + i0 + "-" + i1 + ",eec1dd56-0",
                k: common_vendor.p({
                  date: petInfo.issueTime,
                  format: "yyyy-MM-dd hh:mm:ss"
                }),
                l: common_vendor.o(($event) => goPetInfo(petInfo), petInfo._id),
                m: petInfo._id
              });
            })
          }, {
            d: loading
          }, loading ? {
            e: "eec1dd56-2-" + i0 + ",eec1dd56-0",
            f: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            g: hasMore && !loading
          }, hasMore && !loading ? {
            h: "eec1dd56-3-" + i0 + ",eec1dd56-0",
            i: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            k: "eec1dd56-4-" + i0 + ",eec1dd56-0",
            l: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            j: !hasMore && !loading,
            m: i0,
            n: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "eec1dd56-0"
        }),
        b: common_vendor.sr(udb, "eec1dd56-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          collection: "adoption",
          orderby: "issueTime desc",
          field: "pet_name as petName,_id,medical,city,issue_time as issueTime,gender,variety,img,if_adopt",
          getone: false,
          where: common_vendor.unref(where),
          ["page-size"]: 5
        }),
        d: navigateTop.value
      }, navigateTop.value ? {
        e: common_vendor.p({
          type: "navigate",
          size: "50"
        }),
        f: common_vendor.o(navigateToTop)
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eec1dd56"], ["__file", "C:/Users/yzc/Desktop/pet/components/PetList/index.vue"]]);
wx.createComponent(Component);

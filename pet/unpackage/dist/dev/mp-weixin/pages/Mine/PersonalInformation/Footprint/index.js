"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_unicloud_db2 + _easycom_uni_load_more2)();
}
const _easycom_unicloud_db = () => "../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_load_more = () => "../../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_unicloud_db + _easycom_uni_load_more)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const goAdopt = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/index?id=${id}`
      });
    };
    const goFoundPet = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Enlightenment/index?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
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
            c: common_vendor.f(data, (footprint, index, i1) => {
              return common_vendor.e({
                a: footprint.adopt_id
              }, footprint.adopt_id ? {
                b: common_vendor.w(({
                  data: data2
                }, s2, i2) => {
                  return {
                    a: data2 == null ? void 0 : data2.img[0].path,
                    b: common_vendor.t(data2 == null ? void 0 : data2.pet_name),
                    c: common_vendor.t(data2 == null ? void 0 : data2.variety),
                    d: i2,
                    e: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("c[" + i1 + "].") + "b",
                  vueId: "49f2349c-1-" + i0 + "-" + i1 + ",49f2349c-0"
                }),
                c: common_vendor.o(($event) => goAdopt(footprint.adopt_id)),
                d: "49f2349c-1-" + i0 + "-" + i1 + ",49f2349c-0",
                e: common_vendor.p({
                  collection: "adoption",
                  field: "pet_name,img,variety",
                  getone: true,
                  where: `_id=='${footprint == null ? void 0 : footprint.adopt_id}'`
                })
              } : {}, {
                f: footprint.found_id
              }, footprint.found_id ? {
                g: common_vendor.w(({
                  data: data2
                }, s2, i2) => {
                  return {
                    a: data2 == null ? void 0 : data2.uploadPicture[0].path,
                    b: common_vendor.t(data2 == null ? void 0 : data2.title),
                    c: common_vendor.t(data2 == null ? void 0 : data2.variety),
                    d: i2,
                    e: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("c[" + i1 + "].") + "g",
                  vueId: "49f2349c-2-" + i0 + "-" + i1 + ",49f2349c-0"
                }),
                h: common_vendor.o(($event) => goFoundPet(footprint.found_id)),
                i: "49f2349c-2-" + i0 + "-" + i1 + ",49f2349c-0",
                j: common_vendor.p({
                  collection: "foundPet",
                  field: "title,uploadPicture,variety",
                  getone: true,
                  where: `_id=='${footprint == null ? void 0 : footprint.found_id}'`
                })
              } : {}, {
                k: index
              });
            })
          }, {
            d: loading
          }, loading ? {
            e: "49f2349c-3-" + i0 + ",49f2349c-0",
            f: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            g: hasMore && !loading
          }, hasMore && !loading ? {
            h: "49f2349c-4-" + i0 + ",49f2349c-0",
            i: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            k: "49f2349c-5-" + i0 + ",49f2349c-0",
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
          vueId: "49f2349c-0"
        }),
        b: common_vendor.sr("udb", "49f2349c-0"),
        c: common_vendor.p({
          collection: "footprint",
          orderby: "create_time desc",
          field: "found_id,adopt_id",
          getone: false,
          where: `user_id=='${common_vendor.unref(userId)}'`,
          ["page-size"]: 5,
          distinct: true
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-49f2349c"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Mine/PersonalInformation/Footprint/index.vue"]]);
wx.createPage(MiniProgramPage);

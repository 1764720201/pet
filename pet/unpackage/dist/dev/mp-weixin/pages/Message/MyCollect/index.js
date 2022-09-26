"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _easycom_uni_dateformat2 + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_dateformat + _easycom_unicloud_db)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const udb = common_vendor.ref(null);
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
    });
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const db = common_vendor.pn.database();
    const collect = common_vendor.reactive([
      db.collection("collect").field("adopt_id,found_id,_id,create_time,type,user_id").orderBy("create_time", "desc").getTemp(),
      db.collection("adoption").where(`user_id=='${userId}'`).field("_id,img").getTemp(),
      db.collection("foundPet").where(`user_id=='${userId}'`).field("_id,uploadPicture").getTemp()
    ]);
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
    const goUserInfo = (userId2) => {
      common_vendor.index.navigateTo({
        url: `/pages/ApplyAdopt/UserInfo/index?userId=${userId2}`
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
            a: loading
          }, loading ? {
            b: "4959e430-1-" + i0 + ",4959e430-0",
            c: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            d: hasMore && !loading
          }, hasMore && !loading ? {
            e: "4959e430-2-" + i0 + ",4959e430-0",
            f: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            h: "4959e430-3-" + i0 + ",4959e430-0",
            i: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            g: !hasMore && !loading,
            j: error
          }, error ? {
            k: common_vendor.t(error.message)
          } : {
            l: common_vendor.f(data, (collect2, k1, i1) => {
              var _a, _b;
              return common_vendor.e({
                a: collect2.adopt_id[0] || collect2.found_id[0]
              }, collect2.adopt_id[0] || collect2.found_id[0] ? common_vendor.e({
                b: common_vendor.w(({
                  data: data2
                }, s2, i2) => {
                  return {
                    a: data2 == null ? void 0 : data2.avatar_file.url,
                    b: common_vendor.t(data2 == null ? void 0 : data2.nickname),
                    c: "4959e430-5-" + i0 + "-" + i1 + "-" + i2 + "," + ("4959e430-4-" + i0 + "-" + i1),
                    d: i2,
                    e: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("l[" + i1 + "].") + "b",
                  vueId: "4959e430-4-" + i0 + "-" + i1 + ",4959e430-0"
                }),
                c: common_vendor.o(($event) => goUserInfo(collect2.user_id)),
                d: common_vendor.p({
                  date: collect2 == null ? void 0 : collect2.create_time,
                  format: "yyyy-MM-dd hh:mm:ss"
                }),
                e: "4959e430-4-" + i0 + "-" + i1 + ",4959e430-0",
                f: common_vendor.p({
                  collection: "uni-id-users",
                  where: `_id=='${collect2.user_id}'`,
                  getone: true,
                  field: "nickname,avatar_file"
                }),
                g: collect2.adopt_id[0]
              }, collect2.adopt_id[0] ? {
                h: common_vendor.w(({
                  data: data2
                }, s2, i2) => {
                  return {
                    a: data2 == null ? void 0 : data2.img[0].path,
                    b: i2,
                    c: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("l[" + i1 + "].") + "h",
                  vueId: "4959e430-6-" + i0 + "-" + i1 + ",4959e430-0"
                }),
                i: common_vendor.o(($event) => {
                  var _a2;
                  return goAdopt((_a2 = collect2.adopt_id[0]) == null ? void 0 : _a2._id);
                }),
                j: "4959e430-6-" + i0 + "-" + i1 + ",4959e430-0",
                k: common_vendor.p({
                  collection: "adoption",
                  getone: true,
                  where: `_id=='${(_a = collect2.adopt_id[0]) == null ? void 0 : _a._id}'`,
                  field: "img,_id"
                })
              } : {}, {
                l: collect2.found_id[0]
              }, collect2.found_id[0] ? {
                m: common_vendor.w(({
                  data: data2
                }, s2, i2) => {
                  return {
                    a: data2 == null ? void 0 : data2.uploadPicture[0].path,
                    b: i2,
                    c: s2
                  };
                }, {
                  name: "d",
                  path: "a[" + i0 + "]." + ("l[" + i1 + "].") + "m",
                  vueId: "4959e430-7-" + i0 + "-" + i1 + ",4959e430-0"
                }),
                n: common_vendor.o(($event) => {
                  var _a2;
                  return goFoundPet((_a2 = collect2.found_id[0]) == null ? void 0 : _a2._id);
                }),
                o: "4959e430-7-" + i0 + "-" + i1 + ",4959e430-0",
                p: common_vendor.p({
                  collection: "foundPet",
                  getone: true,
                  where: `_id=='${(_b = collect2.found_id[0]) == null ? void 0 : _b._id}'`,
                  field: "uploadPicture,_id"
                })
              } : {}) : {}, {
                q: collect2._id
              });
            })
          }, {
            m: i0,
            n: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "4959e430-0"
        }),
        b: common_vendor.sr(udb, "4959e430-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          where: "type==0||type==1",
          collection: collect,
          getone: false,
          ["page-size"]: 10
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4959e430"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Message/MyCollect/index.vue"]]);
wx.createPage(MiniProgramPage);

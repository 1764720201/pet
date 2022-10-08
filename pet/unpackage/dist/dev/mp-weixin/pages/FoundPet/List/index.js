"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_tui_icon2 + _easycom_uni_dateformat2 + _easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_tui_icon = () => "../../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (pickRegions + _easycom_tui_icon + _easycom_uni_dateformat + _easycom_uni_load_more + _easycom_unicloud_db)();
}
const pickRegions = () => "../../../components/pick-regions/pick-regions.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    var _a;
    const where = common_vendor.ref([]);
    const starList = common_vendor.ref(["\u5168\u90E8", "\u55B5\u661F\u4EBA", "\u6C6A\u661F\u4EBA", "\u5176\u5B83"]);
    const genderList = common_vendor.ref(["\u5168\u90E8", "\u7537\u751F", "\u5973\u751F"]);
    const timeList = common_vendor.ref(["\u5168\u90E8", "\u8FD1\u4E00\u5468", "\u8FD1\u4E00\u4E2A\u6708", "\u8FD1\u4E09\u4E2A\u6708"]);
    const currentTime = Date.now();
    const currentStar = common_vendor.ref("\u661F\u7403");
    const currentGender = common_vendor.ref("\u6027\u522B");
    const currentRegion = common_vendor.ref("\u5730\u533A");
    const currentRecently = common_vendor.ref("\u65F6\u95F4");
    const changeStar = (e) => {
      currentStar.value = starList.value[e.detail.value];
      if (starList.value[e.detail.value] != "\u5168\u90E8") {
        where.value[0] = `star=='${starList.value[e.detail.value]}'`;
      } else {
        where.value[0] = "";
      }
    };
    const changeGender = (e) => {
      currentGender.value = genderList.value[e.detail.value];
      if (genderList.value[e.detail.value] != "\u5168\u90E8") {
        where.value[1] = `gender=='${genderList.value[e.detail.value]}'`;
      } else {
        where.value[1] = "";
      }
    };
    const oneWeek = currentTime - 604800;
    const oneMonth = currentTime - 2678400;
    const thereMonth = currentTime - 8035200;
    const changeTime = (e) => {
      currentRecently.value = timeList.value[e.detail.value];
      switch (timeList.value[e.detail.value]) {
        case "\u5168\u90E8":
          where.value[3] = "";
          break;
        case "\u8FD1\u4E00\u5468":
          where.value[3] = `create_time<=${oneWeek}`;
          break;
        case "\u8FD1\u4E00\u4E2A\u6708":
          where.value[3] = `create_time<=${oneMonth}&&create_time>${oneWeek}`;
          break;
        case "\u8FD1\u4E09\u4E2A\u6708":
          where.value[3] = `create_time<=${thereMonth}&&create_time>${oneMonth}`;
          break;
      }
    };
    const handleGetRegion = (region) => {
      currentRegion.value = region[2].name;
      where.value[2] = `city=='${region[2].name}'`;
    };
    const instance = common_vendor.getCurrentInstance();
    (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$Bus.on("found-search", (e) => {
      where.value[0] = `variety=='${e}'||star=='${e}'||type=='${e}'||city=='${e}'||gender=='${e}'`;
    });
    const goEnlightenment = (foundId) => {
      common_vendor.index.navigateTo({
        url: `/pages/Home/Enlightenment/index?id=${foundId}`
      });
    };
    const udb = common_vendor.ref(null);
    common_vendor.onPullDownRefresh(() => {
      udb.value.loadData(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      udb.value.loadMore();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(currentStar.value),
        b: common_vendor.o(changeStar),
        c: starList.value,
        d: common_vendor.t(currentGender.value),
        e: common_vendor.o(changeGender),
        f: genderList.value,
        g: common_vendor.t(currentRegion.value),
        h: common_vendor.o(handleGetRegion),
        i: common_vendor.t(currentRecently.value),
        j: common_vendor.o(changeTime),
        k: timeList.value,
        l: common_vendor.w(({
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
            c: common_vendor.f(data, (foundInfo, k1, i1) => {
              return common_vendor.e({
                a: foundInfo.uploadPicture[0].path,
                b: foundInfo.reward
              }, foundInfo.reward ? {
                c: common_vendor.t("\u916C\u91D1" + foundInfo.reward + "\u5143")
              } : {}, {
                d: common_vendor.t(foundInfo.type),
                e: common_vendor.t(foundInfo.title),
                f: common_vendor.t(foundInfo.variety),
                g: common_vendor.t(foundInfo.gender),
                h: "428ab2ca-2-" + i0 + "-" + i1 + ",428ab2ca-1",
                i: common_vendor.t(foundInfo.city[1]),
                j: common_vendor.t(foundInfo.city[2]),
                k: "428ab2ca-3-" + i0 + "-" + i1 + ",428ab2ca-1",
                l: common_vendor.p({
                  date: foundInfo.create_time,
                  format: "yyyy-MM-dd hh:mm:ss"
                }),
                m: foundInfo._id,
                n: common_vendor.o(($event) => goEnlightenment(foundInfo._id), foundInfo._id)
              });
            }),
            d: common_vendor.p({
              name: "position",
              size: 24
            })
          }, {
            e: loading
          }, loading ? {
            f: "428ab2ca-4-" + i0 + ",428ab2ca-1",
            g: common_vendor.p({
              status: "loading"
            })
          } : {}, {
            h: hasMore && !loading
          }, hasMore && !loading ? {
            i: "428ab2ca-5-" + i0 + ",428ab2ca-1",
            j: common_vendor.p({
              status: "more"
            })
          } : !hasMore && !loading ? {
            l: "428ab2ca-6-" + i0 + ",428ab2ca-1",
            m: common_vendor.p({
              status: "noMore"
            })
          } : {}, {
            k: !hasMore && !loading,
            n: i0,
            o: s0
          });
        }, {
          name: "d",
          path: "l",
          vueId: "428ab2ca-1"
        }),
        m: common_vendor.sr(udb, "428ab2ca-1", {
          "k": "udb"
        }),
        n: common_vendor.p({
          collection: "foundPet",
          orderby: "create_time desc",
          field: "reward,create_time,city,title,gender,uploadPicture,_id,type,variety",
          getone: false,
          where: where.value.filter((i) => i).join("&&"),
          ["page-size"]: 4
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-428ab2ca"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/FoundPet/List/index.vue"]]);
wx.createComponent(Component);

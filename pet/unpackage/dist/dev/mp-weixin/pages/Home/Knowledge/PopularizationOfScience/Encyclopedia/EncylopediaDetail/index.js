"use strict";
var common_vendor = require("../../../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_lgd_tab2 = common_vendor.resolveComponent("lgd-tab");
  (_easycom_uni_icons2 + _easycom_lgd_tab2)();
}
const _easycom_uni_icons = () => "../../../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_lgd_tab = () => "../../../../../../uni_modules/lgd-tab/components/lgd-tab/lgd-tab.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_lgd_tab + PetDetail)();
}
const PetDetail = () => "../../../../../../components/Tab/Encyclopedia/PetDetail.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const tabValue = ["\u63CF\u8FF0", "\u7279\u70B9", "\u6027\u683C\u7279\u5F81", "\u6838\u5FC3\u4FE1\u606F", "\u5582\u517B\u8981\u70B9"];
    const tabIndex = common_vendor.ref(0);
    const field = common_vendor.ref("");
    const getIndex = (index) => {
      switch (index) {
        case 0:
          field.value = "desc";
          break;
        case 1:
          field.value = "feature";
          break;
        case 2:
          field.value = "characterFeature";
          break;
        case 3:
          field.value = "careKnowledge";
          break;
        case 4:
          field.value = "feedPoints";
          break;
      }
    };
    const petDetail = common_vendor.reactive({
      _id: "",
      pettype: null,
      name: "",
      engName: "",
      characters: "",
      nation: "",
      easyOfDisease: "",
      life: "",
      price: "",
      desc: "",
      feature: "",
      characterFeature: "",
      careKnowledge: "",
      feedPoints: "",
      url: "",
      coverURL: ""
    });
    const db = common_vendor.pn.database();
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const ifCollect = common_vendor.ref();
    const collect = () => {
      if (!ifCollect.value) {
        common_vendor.pn.callFunction({
          name: "collect",
          data: {
            type: 3,
            petId: petDetail._id,
            userId
          }
        }).then(() => {
          checkCollect();
          common_vendor.index.showToast({
            title: "\u6536\u85CF\u6210\u529F"
          });
        });
      } else {
        db.collection("collect").where(`user_id=='${userId}'&&pet_id=='${petDetail._id}'`).remove();
        checkCollect();
      }
    };
    const checkCollect = () => {
      db.collection("collect").where(`user_id=='${userId}'&&pet_id=='${petDetail._id}'`).get().then((res) => {
        if (res.result.data[0]) {
          ifCollect.value = true;
        } else {
          ifCollect.value = false;
        }
      });
    };
    common_vendor.watch(() => petDetail._id, (newValue) => {
      petDetail._id = newValue;
      checkCollect();
    });
    common_vendor.onLoad((option) => {
      db.collection("pet").where(`_id=='${option.petId}'`).get().then((res) => {
        Object.assign(petDetail, res.result.data[0]);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: petDetail.coverURL,
        b: common_vendor.t(petDetail.name),
        c: common_vendor.p({
          type: "star",
          size: "15",
          color: ifCollect.value ? "red" : "#ccc"
        }),
        d: common_vendor.o(collect),
        e: common_vendor.t(petDetail.engName),
        f: common_vendor.t(petDetail.characters),
        g: common_vendor.t(petDetail.nation),
        h: common_vendor.t(petDetail.easyOfDisease),
        i: common_vendor.t(petDetail.price),
        j: common_vendor.t(petDetail.life),
        k: common_vendor.o(getIndex),
        l: common_vendor.p({
          tabValue,
          tabIndex: tabIndex.value,
          textColor: "#ec8a9e ",
          underlineColor: "#ec8a9e"
        }),
        m: common_vendor.p({
          petId: petDetail._id,
          field: field.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-54964e22"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/EncylopediaDetail/index.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_checkbox2 + _easycom_uni_forms_item2 + _easycom_uni_icons2 + _easycom_uni_data_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_forms_item + _easycom_uni_icons + _easycom_uni_data_picker + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const ageIndex = common_vendor.ref(5);
    const houseIndex = common_vendor.ref(0);
    const incomeIndex = common_vendor.ref(2);
    const rules = common_vendor.reactive({
      phone: {
        rules: [
          {
            required: true,
            errorMessage: "\u624B\u673A\u53F7\u4E0D\u80FD\u4E3A\u7A7A"
          },
          {
            pattern: "^\\+?[0-9-]{3,20}$",
            errorMessage: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7"
          }
        ]
      },
      city: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u6240\u5728\u7684\u57CE\u5E02"
          }
        ]
      },
      work: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u804C\u4E1A"
          }
        ]
      },
      wxCode: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u5FAE\u4FE1\u53F7"
          }
        ]
      }
    });
    const chooseAge = (e) => {
      ageIndex.value = e.detail.value;
      formData.age = ageList[e.detail.value];
    };
    const chooseHouse = (e) => {
      houseIndex.value = e.detail.value;
      formData.house = houseList[e.detail.value];
    };
    const chooseIncome = (e) => {
      incomeIndex.value = e.detail.value;
      formData.income = incomeList[e.detail.value];
    };
    const changeAddress = (e) => {
      formData.city.push(e.detail.value[0].text);
      formData.city.push(e.detail.value[1].text);
      formData.city.push(e.detail.value[2].text);
    };
    const genderList = common_vendor.reactive([
      {
        value: 0,
        text: "\u5973\u94F2\u5C4E\u5B98"
      },
      {
        value: 1,
        text: "\u7537\u94F2\u5C4E\u5B98"
      }
    ]);
    const experienceList = common_vendor.reactive([
      {
        value: 0,
        text: "\u6709"
      },
      {
        value: 1,
        text: "\u65E0"
      }
    ]);
    const presentList = common_vendor.reactive([
      {
        value: 0,
        text: "\u6709\u732B"
      },
      {
        value: 1,
        text: "\u6709\u72D7"
      },
      {
        value: 2,
        text: "\u732B\u72D7"
      },
      {
        value: 3,
        text: "\u65E0"
      }
    ]);
    const marriageList = common_vendor.reactive([
      {
        value: 0,
        text: "\u5355\u8EAB"
      },
      {
        value: 1,
        text: "\u604B\u7231"
      },
      {
        value: 2,
        text: "\u5DF2\u5A5A"
      }
    ]);
    const ageList = [
      "40\u540E",
      "50\u540E",
      "60\u540E",
      "70\u540E",
      "80\u540E",
      "90\u540E",
      "00\u540E",
      "10\u540E"
    ];
    const houseList = ["\u81EA\u6709\u4F4F\u623F", "\u6574\u79DF", "\u5408\u79DF", "\u5176\u4ED6"];
    const incomeList = ["\u5C0F\u4E8E3\u5343", "3-6\u5343", "6\u5343-1\u4E07", "\u4E00\u4E07\u4EE5\u4E0A"];
    const formData = common_vendor.reactive({
      adoptId: "",
      age: ageList[ageIndex.value],
      genderIndex: 0,
      experienceIndex: 0,
      presentIndex: 0,
      house: houseList[houseIndex.value],
      marriageIndex: 0,
      income: incomeList[incomeIndex.value],
      work: "",
      city: [],
      phone: "",
      wxCode: "",
      sincerity: "",
      state: ""
    });
    const db = common_vendor.pn.database();
    const ifApplied = common_vendor.ref(false);
    const newGenderList = genderList.map((value) => {
      return value.text;
    });
    const newExperienceList = experienceList.map((value) => {
      return value.text;
    });
    const newMarriageList = marriageList.map((value) => {
      return value.text;
    });
    const newPresentList = presentList.map((value) => {
      return value.text;
    });
    common_vendor.onLoad(async (option) => {
      const userId = common_vendor.pn.getCurrentUserInfo().uid;
      formData.adoptId = option.adoptId;
      await db.collection("apply").where(`adopt_id=='${formData.adoptId}'&&user_id=='${userId}'&&state=='\u7533\u8BF7\u4E2D'`).get().then((res) => {
        if (res.result.data[0]) {
          ifApplied.value = true;
        } else {
          ifApplied.value = false;
        }
      }).then(() => {
        if (ifApplied.value) {
          db.collection("apply").where(`adopt_id=='${formData.adoptId}'&&user_id=='${userId}'`).get().then((res) => {
            const petDetail = res.result.data[0];
            formData.sincerity = petDetail.sincerity;
            formData.work = petDetail.work;
            formData.phone = petDetail.phone;
            ageIndex.value = ageList.indexOf(petDetail.age);
            houseIndex.value = houseList.indexOf(petDetail.house);
            incomeIndex.value = incomeList.indexOf(petDetail.income);
            formData.wxCode = petDetail.wx_code;
            formData.genderIndex = newGenderList.indexOf(petDetail.gender);
            formData.experienceIndex = newExperienceList.indexOf(petDetail.experience);
            formData.marriageIndex = newMarriageList.indexOf(petDetail.marriage);
            formData.presentIndex = newPresentList.indexOf(petDetail.present);
          });
        }
      });
    });
    const form = common_vendor.ref(null);
    const sumbitApply = async () => {
      if (!ifApplied.value) {
        await form.value.validate().then(() => {
          common_vendor.pn.callFunction({
            name: "apply",
            data: {
              adoptId: formData.adoptId,
              age: formData.age,
              gender: genderList[formData.genderIndex].text,
              experience: experienceList[formData.experienceIndex].text,
              present: presentList[formData.presentIndex].text,
              house: formData.house,
              marriage: marriageList[formData.marriageIndex].text,
              income: formData.income,
              work: formData.work,
              city: formData.city,
              phone: formData.phone,
              wxCode: formData.wxCode,
              sincerity: formData.sincerity,
              state: "\u7533\u8BF7\u4E2D"
            },
            success() {
              common_vendor.index.showToast({
                title: "\u7533\u8BF7\u6210\u529F"
              });
              common_vendor.index.redirectTo({
                url: "/pages/Mine/Request/Apply/index"
              });
            },
            fail(err) {
              console.log(err);
            }
          });
        }).catch((err) => {
          console.log(err);
        });
      } else {
        form.value.validate().then(() => {
          db.collection("apply").update({
            adopt_id: formData.adoptId,
            age: formData.age,
            gender: genderList[formData.genderIndex].text,
            experience: experienceList[formData.experienceIndex].text,
            present: presentList[formData.presentIndex].text,
            house: formData.house,
            marriage: marriageList[formData.marriageIndex].text,
            income: formData.income,
            work: formData.work,
            city: formData.city,
            phone: formData.phone,
            wx_code: formData.wxCode,
            sincerity: formData.sincerity,
            state: "\u7533\u8BF7\u4E2D"
          });
        }).then(() => {
          common_vendor.index.navigateBack();
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.genderIndex = $event),
        b: common_vendor.p({
          mode: "tag",
          localdata: genderList,
          modelValue: formData.genderIndex
        }),
        c: common_vendor.p({
          name: "genderIndex",
          label: "\u6027\u522B"
        }),
        d: common_vendor.t(ageList[ageIndex.value]),
        e: common_vendor.p({
          type: "right",
          size: "23",
          color: "#ccc"
        }),
        f: common_vendor.o(chooseAge),
        g: ageIndex.value,
        h: ageList,
        i: common_vendor.p({
          name: "age",
          label: "\u5E74\u9F84"
        }),
        j: common_vendor.o(($event) => formData.experienceIndex = $event),
        k: common_vendor.p({
          mode: "tag",
          localdata: experienceList,
          modelValue: formData.experienceIndex
        }),
        l: common_vendor.p({
          name: "experienceIndex",
          label: "\u517B\u5BA0\u7ECF\u9A8C"
        }),
        m: common_vendor.o(($event) => formData.presentIndex = $event),
        n: common_vendor.p({
          mode: "tag",
          localdata: presentList,
          modelValue: formData.presentIndex
        }),
        o: common_vendor.p({
          name: "presentIndex",
          label: "\u76EE\u524D\u5BA0\u7269"
        }),
        p: common_vendor.t(houseList[houseIndex.value]),
        q: common_vendor.p({
          type: "right",
          size: "23",
          color: "#ccc"
        }),
        r: common_vendor.o(chooseHouse),
        s: houseIndex.value,
        t: houseList,
        v: common_vendor.p({
          name: "house",
          label: "\u4F4F\u623F\u60C5\u51B5"
        }),
        w: common_vendor.o(($event) => formData.marriageIndex = $event),
        x: common_vendor.p({
          mode: "tag",
          localdata: marriageList,
          modelValue: formData.marriageIndex
        }),
        y: common_vendor.p({
          name: "marriageIndex",
          label: "\u5A5A\u59FB\u72B6\u51B5"
        }),
        z: common_vendor.t(incomeList[incomeIndex.value]),
        A: common_vendor.p({
          type: "right",
          size: "23",
          color: "#ccc"
        }),
        B: common_vendor.o(chooseIncome),
        C: incomeIndex.value,
        D: incomeList,
        E: common_vendor.p({
          name: "income",
          label: "\u6708\u6536\u5165"
        }),
        F: formData.work,
        G: common_vendor.o(($event) => formData.work = $event.detail.value),
        H: common_vendor.p({
          name: "work",
          label: "\u804C\u4E1A"
        }),
        I: common_vendor.o(changeAddress),
        J: common_vendor.p({
          placeholder: "\u8BF7\u9009\u62E9\u5730\u5740",
          ["popup-title"]: "\u8BF7\u9009\u62E9\u57CE\u5E02",
          collection: "opendb-city-china",
          field: "code as value, name as text",
          orderby: "value asc",
          ["step-searh"]: true,
          ["self-field"]: "code",
          ["parent-field"]: "parent_code"
        }),
        K: common_vendor.p({
          label: "\u6240\u5728\u57CE\u5E02",
          name: "city"
        }),
        L: formData.phone,
        M: common_vendor.o(($event) => formData.phone = $event.detail.value),
        N: common_vendor.p({
          name: "phone",
          label: "\u624B\u673A\u53F7"
        }),
        O: formData.wxCode,
        P: common_vendor.o(($event) => formData.wxCode = $event.detail.value),
        Q: common_vendor.p({
          name: "wxCode",
          label: "\u5FAE\u4FE1\u53F7"
        }),
        R: formData.sincerity,
        S: common_vendor.o(($event) => formData.sincerity = $event.detail.value),
        T: common_vendor.p({
          name: "sincerity"
        }),
        U: common_vendor.o(sumbitApply),
        V: common_vendor.sr(form, "0025aefd-0", {
          "k": "form"
        }),
        W: common_vendor.p({
          model: formData,
          ["label-width"]: 100,
          rules
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0025aefd"], ["__file", "C:/Users/yzc/Desktop/pet/pages/ApplyAdopt/Apply/index.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_file_picker2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_data_select2 + _easycom_uni_icons2 + _easycom_uni_forms2)();
}
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_data_select + pickerAddress + _easycom_uni_icons + _easycom_uni_forms + Issue)();
}
const pickerAddress = () => "../../../components/gtc-pickerAddress/pickerAddress.js";
const Issue = () => "../../../components/Issue/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userId = common_vendor.ref();
    const db = common_vendor.pn.database();
    const hasLogin = common_vendor.ref(false);
    const checkLogin = async () => {
      await db.collection("uni-id-users").where("_id==$cloudEnv_uid").get({ getOne: true }).then((res) => {
        userId.value = res.result.data._id;
        hasLogin.value = true;
      }).catch(() => {
        hasLogin.value = false;
      });
    };
    common_vendor.onShow(async () => {
      await checkLogin();
      if (!hasLogin.value) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      }
      await db.collection("uni-id-users").where(`_id=='${userId.value}'`).field("nickname as name,mobile as phone,wxcode as wxCode,city").get({ getOne: true }).then((res) => {
        const data = res.result.data;
        if (data.city[0] == "\u8BF7\u9009\u62E9\u57CE\u5E02") {
          data.city == formData.city;
        }
        Object.assign(formData, data);
      });
    });
    const imageStyles = common_vendor.reactive({
      width: 74,
      height: 74,
      border: {
        color: "#afafaf",
        radio: 10
      }
    });
    const change = (e) => {
      formData.city = e.data;
    };
    const ifCompile = common_vendor.ref();
    const adoptionId = common_vendor.ref();
    common_vendor.onLoad((option) => {
      if (option.id) {
        ifCompile.value = true;
        adoptionId.value = option.id;
      } else {
        ifCompile.value = false;
      }
      if (ifCompile.value) {
        db.collection("adoption").where(`_id=='${adoptionId.value}'&&user_id=='${userId.value}'`).get({ getOne: true }).then((res) => {
          const adoptDetail = res.result.data;
          formData.uploadPicture = adoptDetail.img;
          formData.video = adoptDetail.video;
          formData.city = adoptDetail.city;
          formData.phone = adoptDetail.phone;
          formData.wxCode = adoptDetail.wx_code;
          formData.variety = adoptDetail.variety;
          formData.petName = adoptDetail.pet_name;
          formData.story = adoptDetail.story;
          formData.starIndex = newList[5].indexOf(adoptDetail.star);
          formData.genderIndex = newList[4].indexOf(adoptDetail.gender);
          formData.punchIndex = newList[0].indexOf(adoptDetail.punch);
          formData.age = newList[2].indexOf(adoptDetail.age);
          formData.medical = getNewMutiple(adoptDetail.medical, 1);
          formData.source = getNewMutiple(adoptDetail.source, 3);
          formData.request = getNewMutiple(adoptDetail.request, 6);
          formData.particular = getNewMutiple(adoptDetail.particular, 7);
        });
      }
    });
    const getNewList = (optionList) => {
      return optionList.map((value) => {
        return value.text;
      });
    };
    const getNewMutiple = (option, index) => {
      return option.map((value) => {
        return newList[index].indexOf(value);
      });
    };
    const form = common_vendor.ref(null);
    const rules = common_vendor.reactive({
      petName: {
        rules: [
          {
            required: true,
            errorMessage: "\u5BA0\u7269\u540D\u4E0D\u80FD\u4E3A\u7A7A"
          },
          {
            maxLength: 5,
            errorMessage: "\u5BA0\u7269\u540D\u6700\u591A5\u4E2A\u5B57"
          }
        ]
      },
      name: {
        rules: [
          {
            required: true,
            errorMessage: "\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      wxCode: {
        rules: [
          {
            required: true,
            errorMessage: "\u5FAE\u4FE1\u53F7\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      request: {
        rules: [
          {
            required: true,
            errorMessage: "\u9886\u517B\u8981\u6C42\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      source: {
        rules: [
          {
            required: true,
            errorMessage: "\u6765\u6E90\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      medical: {
        rules: [
          {
            required: true,
            errorMessage: "\u533B\u7597\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      uploadPicture: {
        rules: [
          {
            required: true,
            errorMessage: "\u56FE\u7247\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      story: {
        rules: [
          {
            required: true,
            errorMessage: "\u5B9D\u8D1D\u6545\u4E8B\u4E0D\u80FD\u4E3A\u7A7A"
          },
          {
            maxLength: 200,
            errorMessage: "\u5B57\u6570\u6700\u591A200"
          }
        ]
      },
      variety: {
        rules: [
          {
            required: true,
            errorMessage: "\u54C1\u79CD\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      age: {
        rules: [
          {
            required: true,
            errorMessage: "\u5E74\u9F84\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      city: {
        rules: [
          {
            required: true,
            errorMessage: "\u57CE\u5E02\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      phone: {
        rules: [
          {
            required: true,
            errorMessage: "\u624B\u673A\u53F7\u4E0D\u80FD\u4E3A\u7A7A"
          },
          {
            format: "number",
            errorMessage: "\u624B\u673A\u53F7\u5FC5\u987B\u4E3A\u6570\u5B57"
          }
        ]
      }
    });
    const formData = common_vendor.reactive({
      story: "",
      name: "",
      variety: "",
      phone: "",
      city: ["\u6D59\u6C5F\u7701", "\u5B81\u6CE2\u5E02", "\u5B81\u6D77\u53BF"],
      petName: "",
      genderIndex: 0,
      punchIndex: 0,
      age: 0,
      wxCode: "",
      uploadPicture: [],
      medical: [],
      source: [],
      request: [],
      particular: [],
      starIndex: 1,
      video: []
    });
    const starList = common_vendor.reactive([
      {
        text: "\u6C6A\u661F\u4EBA",
        value: 0
      },
      {
        text: "\u55B5\u661F\u4EBA",
        value: 1
      },
      {
        text: "\u5176\u4ED6",
        value: 2
      }
    ]);
    const genderList = common_vendor.reactive([
      {
        text: "\u7537\u751F",
        value: 0
      },
      {
        text: "\u5973\u751F",
        value: 1
      }
    ]);
    const medicalList = common_vendor.reactive([
      {
        text: "\u5DF2\u7EDD\u80B2",
        value: 0
      },
      {
        text: "\u5DF2\u514D\u75AB",
        value: 1
      },
      {
        text: "\u5DF2\u9A71\u866B",
        value: 2
      }
    ]);
    const sourceList = common_vendor.reactive([
      {
        text: "\u5BB6\u517B",
        value: 0
      },
      {
        text: "\u4E2A\u4EBA\u6C42\u52A9",
        value: 1
      },
      {
        text: "\u6D41\u6D6A\u57FA\u5730",
        value: 2
      }
    ]);
    const ageList = common_vendor.reactive([
      {
        text: "\u4E0D\u6EE11\u4E2A\u6708",
        value: 0
      },
      {
        text: "1\u4E2A\u6708",
        value: 1
      },
      {
        text: "2\u4E2A\u6708",
        value: 2
      },
      {
        text: "3-6\u4E2A\u6708",
        value: 3
      },
      {
        text: "6\u4E2A\u6708-1\u5C81",
        value: 4
      },
      {
        text: "1\u5C81",
        value: 5
      },
      {
        text: "2\u5C81",
        value: 6
      },
      {
        text: "3\u5C81\u53CA\u4EE5\u4E0A",
        value: 7
      }
    ]);
    const particularList = common_vendor.reactive([
      {
        text: "\u9AD8\u51B7",
        value: 0
      },
      {
        text: "\u7C98\u4EBA",
        value: 1
      },
      {
        text: "\u94C1\u61A8\u61A8",
        value: 2
      },
      {
        text: "\u751C\u7F8E",
        value: 3
      },
      {
        text: "\u6E29\u6587\u5C14\u96C5",
        value: 4
      },
      {
        text: "\u4E56\u5DE7",
        value: 5
      },
      {
        text: "\u8D2A\u73A9",
        value: 6
      },
      {
        text: "\u80C6\u5C0F",
        value: 7
      },
      {
        text: "\u53DB\u9006",
        value: 8
      },
      {
        text: "\u61D2\u60F0",
        value: 9
      },
      {
        text: "\u65E0\u653B\u51FB\u6027",
        value: 10
      },
      {
        text: "\u4E0D\u6311\u98DF",
        value: 11
      },
      {
        text: "\u4E0D\u4E71\u53EB",
        value: 12
      },
      {
        text: "\u8BB2\u536B\u751F",
        value: 13
      }
    ]);
    const requestList = common_vendor.reactive([
      {
        text: "\u4EC5\u9650\u540C\u57CE",
        value: 0
      },
      {
        text: "\u63A5\u53D7\u56DE\u8BBF",
        value: 1
      },
      {
        text: "\u7B7E\u8BA2\u534F\u8BAE",
        value: 2
      },
      {
        text: "\u7EDD\u80B2",
        value: 3
      },
      {
        text: "\u5B89\u88C5\u7EB1\u7A97",
        value: 4
      },
      {
        text: "\u529E\u7406\u72D7\u8BC1",
        value: 5
      },
      {
        text: "\u51FA\u95E8\u7275\u7EF3",
        value: 6
      }
    ]);
    const punchList = common_vendor.reactive([
      {
        text: "\u4E0D\u9700\u8981\u6253\u5361",
        value: 0
      },
      {
        text: "4\u5468",
        value: 1
      },
      {
        text: "5\u5468",
        value: 2
      },
      {
        text: "8\u5468",
        value: 3
      },
      {
        text: "12\u5468",
        value: 4
      },
      {
        text: "16\u5468",
        value: 5
      }
    ]);
    const newList = [
      punchList,
      medicalList,
      ageList,
      sourceList,
      genderList,
      starList,
      requestList,
      particularList
    ].map((value) => {
      return getNewList(value);
    });
    const getData = (option, optionList) => {
      return option.map((index) => {
        return optionList[index].text;
      });
    };
    const confirmIssue = () => {
      const medical = getData(formData.medical, medicalList);
      const source = getData(formData.source, sourceList);
      const particular = getData(formData.particular, particularList);
      const request = getData(formData.request, requestList);
      if (!ifCompile.value) {
        form.value.validate().then(() => {
          common_vendor.pn.callFunction({
            name: "adoption",
            data: {
              user_id: userId.value,
              imageList: formData.uploadPicture,
              petName: formData.petName,
              star: starList[formData.starIndex].text,
              variety: formData.variety,
              gender: genderList[formData.genderIndex].text,
              age: ageList[formData.age].text,
              medicalList: medical,
              source,
              particularList: particular,
              story: formData.story,
              requestList: request,
              punch: punchList[formData.punchIndex].text,
              name: formData.name,
              city: formData.city,
              phone: formData.phone,
              wx_code: formData.wxCode,
              video: formData.video,
              ifAdopt: false
            },
            success() {
              common_vendor.index.showToast({
                title: "\u53D1\u5E03\u6210\u529F"
              });
            },
            fail(err) {
              console.log(err);
            }
          });
        }).then(() => {
          common_vendor.index.navigateBack();
        }).catch((err) => {
          console.log(err);
        });
      } else {
        form.value.validate().then(() => {
          db.collection("adoption").where(`_id=='${adoptionId.value}'&&user_id=='${userId.value}'`).update({
            img: formData.uploadPicture,
            pet_name: formData.petName,
            star: starList[formData.starIndex].text,
            variety: formData.variety,
            gender: genderList[formData.genderIndex].text,
            age: ageList[formData.age].text,
            medical,
            source,
            particular,
            story: formData.story,
            request,
            punch: punchList[formData.punchIndex].text,
            name: formData.name,
            city: formData.city,
            phone: formData.phone,
            wx_code: formData.wxCode
          }).then(() => {
            common_vendor.index.showToast({
              title: "\u4FEE\u6539\u6210\u529F",
              icon: "none",
              success() {
                setTimeout(() => {
                  common_vendor.index.navigateBack();
                }, 500);
              }
            });
          }).catch((err) => {
            console.log(err);
          });
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.uploadPicture = $event),
        b: common_vendor.p({
          limit: "3",
          ["file-mediatype"]: "image",
          mode: "grid",
          imageStyles,
          modelValue: formData.uploadPicture
        }),
        c: common_vendor.p({
          name: "uploadPicture"
        }),
        d: common_vendor.o(($event) => formData.video = $event),
        e: common_vendor.p({
          limit: "1",
          ["file-mediatype"]: "video",
          modelValue: formData.video
        }),
        f: formData.petName,
        g: common_vendor.o(($event) => formData.petName = $event.detail.value),
        h: common_vendor.p({
          label: "\u5BA0\u7269\u6635\u79F0",
          name: "petName"
        }),
        i: common_vendor.o(($event) => formData.starIndex = $event),
        j: common_vendor.p({
          mode: "tag",
          localdata: starList,
          modelValue: formData.starIndex
        }),
        k: common_vendor.p({
          label: "\u661F\u7403",
          name: "star"
        }),
        l: formData.variety,
        m: common_vendor.o(($event) => formData.variety = $event.detail.value),
        n: common_vendor.p({
          label: "\u54C1\u79CD",
          name: "variety"
        }),
        o: common_vendor.o(($event) => formData.genderIndex = $event),
        p: common_vendor.p({
          mode: "tag",
          localdata: genderList,
          modelValue: formData.genderIndex
        }),
        q: common_vendor.p({
          label: "\u6027\u522B",
          name: "gender"
        }),
        r: common_vendor.o(($event) => formData.age = $event),
        s: common_vendor.p({
          localdata: ageList,
          modelValue: formData.age
        }),
        t: common_vendor.p({
          label: "\u5E74\u9F84",
          name: "age"
        }),
        v: common_vendor.o(($event) => formData.medical = $event),
        w: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: medicalList,
          modelValue: formData.medical
        }),
        x: common_vendor.p({
          label: "\u533B\u7597",
          name: "medical"
        }),
        y: common_vendor.o(($event) => formData.source = $event),
        z: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: sourceList,
          modelValue: formData.source
        }),
        A: common_vendor.p({
          label: "\u5BA0\u7269\u6765\u6E90",
          name: "source"
        }),
        B: common_vendor.o(($event) => formData.particular = $event),
        C: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: particularList,
          max: "3",
          modelValue: formData.particular
        }),
        D: common_vendor.p({
          name: "particular"
        }),
        E: formData.story,
        F: common_vendor.o(($event) => formData.story = $event.detail.value),
        G: common_vendor.p({
          name: "story"
        }),
        H: common_vendor.o(($event) => formData.request = $event),
        I: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: requestList,
          modelValue: formData.request
        }),
        J: common_vendor.p({
          name: "request"
        }),
        K: common_vendor.o(($event) => formData.punchIndex = $event),
        L: common_vendor.p({
          localdata: punchList,
          clear: false,
          modelValue: formData.punchIndex
        }),
        M: common_vendor.p({
          label: "\u9001\u517B\u6210\u529F\u540E,\u8981\u6C42\u9886\u517B\u4EBA\u6253\u5361",
          name: "punch"
        }),
        N: formData.name,
        O: common_vendor.o(($event) => formData.name = $event.detail.value),
        P: common_vendor.p({
          label: "\u59D3\u540D",
          name: "name"
        }),
        Q: common_vendor.t(formData.city.join("")),
        R: common_vendor.o(change),
        S: common_vendor.p({
          type: "right",
          size: "20"
        }),
        T: common_vendor.p({
          label: "\u6240\u5728\u57CE\u5E02",
          name: "city"
        }),
        U: formData.phone,
        V: common_vendor.o(($event) => formData.phone = $event.detail.value),
        W: common_vendor.p({
          label: "\u624B\u673A\u53F7",
          name: "phone"
        }),
        X: formData.wxCode,
        Y: common_vendor.o(($event) => formData.wxCode = $event.detail.value),
        Z: common_vendor.p({
          label: "\u5FAE\u4FE1\u53F7",
          name: "wxCode"
        }),
        aa: common_vendor.sr(form, "d77e4bec-0", {
          "k": "form"
        }),
        ab: common_vendor.p({
          rules,
          ["label-width"]: "150",
          modelValue: formData
        }),
        ac: common_vendor.o(confirmIssue),
        ad: common_vendor.p({
          issue: "\u786E\u8BA4\u53D1\u5E03"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d77e4bec"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Issue/Adoption/index.vue"]]);
wx.createPage(MiniProgramPage);

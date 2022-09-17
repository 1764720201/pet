"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_file_picker2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_data_picker2 + _easycom_uni_data_select2 + _easycom_uni_forms2)();
}
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_data_picker + _easycom_uni_data_select + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      uid: 0
    });
    const db = common_vendor.pn.database();
    common_vendor.onShow(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
    });
    common_vendor.onLoad(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
      if (!userInfo.uid) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      } else {
        db.collection("uni-id-users").where(`_id=='${userInfo.uid}'`).field("nickname").get().then((res) => {
          formData.name = res.result.data[0].nickname;
          console.log(formData.name);
        });
      }
    });
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
      stroy: {
        rules: [
          {
            required: true,
            errorMessage: "\u9886\u517B\u8981\u6C42\u4E0D\u80FD\u4E3A\u7A7A"
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
      city: [],
      petName: "",
      genderIndex: 0,
      punchIndex: 0,
      age: "",
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
    const changeAddress = (e) => {
      e.detail.value.forEach((value) => {
        formData.city.push(value.text);
      });
    };
    const changeAge = (e) => {
      formData.age = e.detail.value[0].text;
    };
    const confirmIssue = () => {
      const medicalArr = formData.medical.map((index) => {
        return medicalList[index].text;
      });
      const sourceArr = formData.source.map((index) => {
        return sourceList[index].text;
      });
      const particularArr = formData.particular.map((index) => {
        return particularList[index].text;
      });
      const requestArr = formData.request.map((index) => {
        return requestList[index].text;
      });
      form.value.validate().then(() => {
        common_vendor.pn.callFunction({
          name: "adoption",
          data: {
            user_id: userInfo.uid,
            imageList: formData.uploadPicture,
            petName: formData.petName,
            star: starList[formData.starIndex].text,
            variety: formData.variety,
            gender: genderList[formData.genderIndex].text,
            age: formData.age,
            medicalList: medicalArr,
            source: sourceArr,
            particularList: particularArr,
            story: formData.story,
            requestList: requestArr,
            punch: punchList[formData.punchIndex].text,
            name: formData.name,
            city: formData.city,
            phone: formData.phone,
            wx_code: formData.wxCode,
            video: formData.video,
            ifAdopt: false,
            issue_time: new Date().getTime()
          },
          success() {
            common_vendor.index.showToast({
              title: "\u53D1\u5E03\u6210\u529F"
            });
          }
        });
      }).then(() => {
        common_vendor.index.navigateBack();
      }).catch((err) => {
        console.log(err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.uploadPicture = $event),
        b: common_vendor.p({
          limit: "3",
          ["file-mediatype"]: "image",
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
        r: common_vendor.o(changeAge),
        s: common_vendor.o(($event) => formData.age = $event),
        t: common_vendor.p({
          localdata: ageList,
          ["popup-title"]: "\u8BF7\u9009\u62E9\u5E74\u9F84",
          modelValue: formData.age
        }),
        v: common_vendor.p({
          label: "\u5E74\u9F84",
          name: "age"
        }),
        w: common_vendor.o(($event) => formData.medical = $event),
        x: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: medicalList,
          modelValue: formData.medical
        }),
        y: common_vendor.p({
          label: "\u533B\u7597",
          name: "medical"
        }),
        z: common_vendor.o(($event) => formData.source = $event),
        A: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: sourceList,
          modelValue: formData.source
        }),
        B: common_vendor.p({
          label: "\u5BA0\u7269\u6765\u6E90",
          name: "source"
        }),
        C: common_vendor.o(($event) => formData.particular = $event),
        D: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: particularList,
          max: "3",
          modelValue: formData.particular
        }),
        E: common_vendor.p({
          name: "particular"
        }),
        F: formData.story,
        G: common_vendor.o(($event) => formData.story = $event.detail.value),
        H: common_vendor.p({
          name: "story"
        }),
        I: common_vendor.o(($event) => formData.request = $event),
        J: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: requestList,
          modelValue: formData.request
        }),
        K: common_vendor.p({
          name: "request"
        }),
        L: common_vendor.o(($event) => formData.punchIndex = $event),
        M: common_vendor.p({
          localdata: punchList,
          clear: false,
          modelValue: formData.punchIndex
        }),
        N: common_vendor.p({
          label: "\u9001\u517B\u6210\u529F\u540E,\u8981\u6C42\u9886\u517B\u4EBA\u6253\u5361",
          name: "punch"
        }),
        O: formData.name,
        P: common_vendor.o(($event) => formData.name = $event.detail.value),
        Q: common_vendor.p({
          label: "\u59D3\u540D",
          name: "name"
        }),
        R: common_vendor.o(changeAddress),
        S: common_vendor.p({
          placeholder: "\u8BF7\u9009\u62E9\u5730\u5740",
          ["popup-title"]: "\u8BF7\u9009\u62E9\u57CE\u5E02",
          collection: "opendb-city-china",
          field: "code as value, name as text",
          orderby: "value asc",
          ["step-searh"]: true,
          ["self-field"]: "code",
          ["parent-field"]: "parent_code"
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
        ac: common_vendor.o(confirmIssue)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d77e4bec"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Issue/Adoption/index.vue"]]);
wx.createPage(MiniProgramPage);

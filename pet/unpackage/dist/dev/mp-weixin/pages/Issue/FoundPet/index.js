"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_file_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_data_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_file_picker + _easycom_uni_data_checkbox + _easycom_uni_data_picker + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      uid: 0
    });
    common_vendor.onShow(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
    });
    common_vendor.onLoad(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
      if (!userInfo.uid) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      }
    });
    const formData = common_vendor.reactive({
      city: [],
      name: "",
      introduce: "",
      title: "",
      uploadPicture: [],
      wxCode: "",
      phone: "",
      authorName: "",
      reward: "",
      typeIndex: 0,
      starIndex: 0,
      genderIndex: 0,
      variety: "",
      avatarURL: ""
    });
    const rules = common_vendor.reactive({
      title: {
        rules: [
          {
            required: true,
            errorMessage: "\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A"
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
      introduce: {
        rules: [
          {
            required: true,
            errorMessage: "\u4ECB\u7ECD\u4E0D\u80FD\u4E3A\u7A7A"
          },
          {
            maxLength: 200,
            errorMessage: "\u6700\u5927\u957F\u5EA6\u4E3A200"
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
    const form = common_vendor.ref(null);
    const changeAddress = (e) => {
      formData.city.push(e.detail.value[0].text);
      formData.city.push(e.detail.value[1].text);
      formData.city.push(e.detail.value[2].text);
    };
    const db = common_vendor.pn.database();
    const confirmIssue = async () => {
      await db.collection("uni-id-users").where(`_id=='${userInfo.uid}'`).field("avatar_file,nickname").get().then((res) => {
        formData.avatarURL = res.result.data[0].avatar_file.url;
        formData.authorName = res.result.data[0].nickname;
      }).then(() => {
        form.value.validate().then(() => {
          common_vendor.pn.callFunction({
            name: "foundPet",
            data: {
              type: typeList[formData.typeIndex].text,
              imageList: formData.uploadPicture,
              name: formData.name,
              star: starList[formData.starIndex].text,
              variety: formData.variety,
              gender: genderList[formData.genderIndex].text,
              introduce: formData.introduce,
              title: formData.title,
              city: formData.city,
              phone: formData.phone,
              wxCode: formData.wxCode,
              reward: formData.reward,
              avatarURL: formData.avatarURL,
              authorName: formData.authorName
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
        });
      }).then(() => {
        common_vendor.index.navigateBack();
      }).catch((err) => {
        console.log(err);
      });
    };
    const typeList = common_vendor.reactive([
      {
        text: "\u5BFB\u5BA0",
        value: 0
      },
      {
        text: "\u5BFB\u4E3B",
        value: 1
      }
    ]);
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
    return (_ctx, _cache) => {
      return {
        a: formData.title,
        b: common_vendor.o(($event) => formData.title = $event.detail.value),
        c: common_vendor.p({
          name: "title"
        }),
        d: common_vendor.o(($event) => formData.introduce = $event),
        e: common_vendor.p({
          type: "textarea",
          cols: "40",
          rows: "5",
          placeholder: "\u5B9D\u8D1D\u7279\u5F81\u4ECB\u7ECD~",
          modelValue: formData.introduce
        }),
        f: common_vendor.p({
          name: "introduce"
        }),
        g: common_vendor.o(($event) => formData.uploadPicture = $event),
        h: common_vendor.p({
          limit: "3",
          ["file-mediatype"]: "image",
          modelValue: formData.uploadPicture
        }),
        i: common_vendor.p({
          name: "uploadPicture"
        }),
        j: common_vendor.o(($event) => formData.typeIndex = $event),
        k: common_vendor.p({
          mode: "tag",
          localdata: typeList,
          modelValue: formData.typeIndex
        }),
        l: common_vendor.p({
          label: "\u7C7B\u578B",
          name: "type"
        }),
        m: formData.variety,
        n: common_vendor.o(($event) => formData.variety = $event.detail.value),
        o: common_vendor.p({
          label: "\u54C1\u79CD",
          name: "variety"
        }),
        p: formData.name,
        q: common_vendor.o(($event) => formData.name = $event.detail.value),
        r: common_vendor.p({
          label: "\u59D3\u540D",
          name: "name"
        }),
        s: formData.phone,
        t: common_vendor.o(($event) => formData.phone = $event.detail.value),
        v: common_vendor.p({
          label: "\u7535\u8BDD",
          name: "phone"
        }),
        w: formData.wxCode,
        x: common_vendor.o(($event) => formData.wxCode = $event.detail.value),
        y: common_vendor.p({
          label: "\u5FAE\u4FE1\u53F7",
          name: "wxCode"
        }),
        z: common_vendor.o(changeAddress),
        A: common_vendor.p({
          placeholder: "\u8BF7\u9009\u62E9\u5730\u5740",
          ["popup-title"]: "\u8BF7\u9009\u62E9\u57CE\u5E02",
          collection: "opendb-city-china",
          field: "code as value, name as text",
          orderby: "value asc",
          ["step-searh"]: true,
          ["self-field"]: "code",
          ["parent-field"]: "parent_code"
        }),
        B: common_vendor.p({
          label: "\u8D70\u5931\u57CE\u5E02",
          name: "city"
        }),
        C: common_vendor.o(($event) => formData.starIndex = $event),
        D: common_vendor.p({
          mode: "tag",
          localdata: starList,
          modelValue: formData.starIndex
        }),
        E: common_vendor.p({
          label: "\u4E22\u4E86\u4EC0\u4E48",
          name: "star"
        }),
        F: common_vendor.o(($event) => formData.genderIndex = $event),
        G: common_vendor.p({
          mode: "tag",
          localdata: genderList,
          modelValue: formData.genderIndex
        }),
        H: common_vendor.p({
          label: "\u6027\u522B",
          name: "gender"
        }),
        I: formData.reward,
        J: common_vendor.o(($event) => formData.reward = $event.detail.value),
        K: common_vendor.p({
          label: "\u60AC\u8D4F\u91D1\u989D",
          name: "reward"
        }),
        L: common_vendor.sr(form, "3fdeabaf-0", {
          "k": "form"
        }),
        M: common_vendor.p({
          modelValue: formData,
          ["label-width"]: "150",
          rules
        }),
        N: common_vendor.o(confirmIssue)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3fdeabaf"], ["__file", "C:/Users/yzc/Desktop/pet/pages/Issue/FoundPet/index.vue"]]);
wx.createPage(MiniProgramPage);

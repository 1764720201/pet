"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_file_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_icons2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_file_picker + _easycom_uni_data_checkbox + pickerAddress + _easycom_uni_icons + _easycom_uni_forms + Issue)();
}
const Issue = () => "../../../components/Issue/index.js";
const pickerAddress = () => "../../../components/gtc-pickerAddress/pickerAddress.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      uid: 0
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
    common_vendor.onShow(() => {
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
    });
    const ifIssueFound = common_vendor.ref();
    const foundId = common_vendor.ref();
    const getNewList = (optionList) => {
      return optionList.map((value) => {
        return value.text;
      });
    };
    common_vendor.onLoad((option) => {
      if (option.id) {
        ifIssueFound.value = true;
        foundId.value = option.id;
      } else {
        ifIssueFound.value = false;
      }
      Object.assign(userInfo, common_vendor.pn.getCurrentUserInfo());
      if (!userInfo.uid) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin"
        });
      } else {
        db.collection("uni-id-users").where(`_id=='${userInfo.uid}'`).field("mobile as phone,wxcode as wxCode,city").get({
          getOne: true
        }).then((res) => {
          const data = res.result.data;
          if (data.city == ["\u8BF7\u9009\u62E9\u57CE\u5E02"]) {
            data.city == formData.city;
          }
          Object.assign(formData, data);
        });
        if (ifIssueFound.value) {
          db.collection("foundPet").where(`_id=='${foundId.value}'&&user_id=='${userInfo.uid}'`).get({ getOne: true }).then((res) => {
            const foundDetail = res.result.data;
            formData.city = foundDetail.city;
            formData.title = foundDetail.title;
            formData.introduce = foundDetail.introduce;
            formData.uploadPicture = foundDetail.uploadPicture;
            formData.variety = foundDetail.variety;
            formData.name = foundDetail.name;
            formData.phone = foundDetail.phone;
            formData.wxCode = foundDetail.wx_code;
            formData.reward = foundDetail.reward;
            formData.typeIndex = newList[0].indexOf(foundDetail.type);
            formData.starIndex = newList[1].indexOf(foundDetail.star);
            formData.genderIndex = newList[2].indexOf(foundDetail.gender);
          });
        }
      }
    });
    const formData = common_vendor.reactive({
      city: ["\u6D59\u6C5F\u7701", "\u5B81\u6CE2\u5E02", "\u5B81\u6D77\u53BF"],
      name: "",
      introduce: "",
      title: "",
      uploadPicture: [],
      wxCode: "",
      phone: "",
      reward: "",
      typeIndex: 0,
      starIndex: 0,
      genderIndex: 0,
      variety: ""
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
      variety: {
        rules: [
          {
            required: true,
            errorMessage: "\u54C1\u79CD\u4E0D\u80FD\u4E3A\u7A7A"
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
    const db = common_vendor.pn.database();
    const confirmIssue = async () => {
      if (!ifIssueFound.value) {
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
              authorName: formData.authorName,
              state: "\u5DF2\u53D1\u5E03"
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
          db.collection("foundPet").where(`_id=='${foundId.value}'&&user_id=='${userInfo.uid}'`).update({
            type: typeList[formData.typeIndex].text,
            uploadPicture: formData.uploadPicture,
            name: formData.name,
            star: starList[formData.starIndex].text,
            variety: formData.variety,
            gender: genderList[formData.genderIndex].text,
            introduce: formData.introduce,
            title: formData.title,
            city: formData.city,
            phone: formData.phone,
            wx_code: formData.wxCode,
            reward: formData.reward
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
          });
        });
      }
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
    const newList = [typeList, starList, genderList].map((value) => {
      return getNewList(value);
    });
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
          mode: "grid",
          imageStyles,
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
        z: common_vendor.t(formData.city.join("")),
        A: common_vendor.o(change),
        B: common_vendor.p({
          type: "right",
          size: "20"
        }),
        C: common_vendor.p({
          label: "\u8D70\u5931\u57CE\u5E02",
          name: "city"
        }),
        D: common_vendor.o(($event) => formData.starIndex = $event),
        E: common_vendor.p({
          mode: "tag",
          localdata: starList,
          modelValue: formData.starIndex
        }),
        F: common_vendor.p({
          label: "\u4E22\u4E86\u4EC0\u4E48",
          name: "star"
        }),
        G: common_vendor.o(($event) => formData.genderIndex = $event),
        H: common_vendor.p({
          mode: "tag",
          localdata: genderList,
          modelValue: formData.genderIndex
        }),
        I: common_vendor.p({
          label: "\u6027\u522B",
          name: "gender"
        }),
        J: formData.reward,
        K: common_vendor.o(($event) => formData.reward = $event.detail.value),
        L: common_vendor.p({
          label: "\u60AC\u8D4F\u91D1\u989D",
          name: "reward"
        }),
        M: common_vendor.sr(form, "3fdeabaf-0", {
          "k": "form"
        }),
        N: common_vendor.p({
          modelValue: formData,
          ["label-width"]: "150",
          rules
        }),
        O: common_vendor.o(confirmIssue),
        P: common_vendor.p({
          issue: "\u786E\u8BA4\u53D1\u5E03"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3fdeabaf"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Issue/FoundPet/index.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_file_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_file_picker = () => "../../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms = () => "../../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_file_picker + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const formData = common_vendor.reactive({
      content: "",
      imageList: []
    });
    const db = common_vendor.pn.database();
    const ifApply = common_vendor.ref(false);
    const topicId = common_vendor.ref();
    common_vendor.onLoad((option) => {
      if (option.id) {
        ifApply.value = true;
        topicId.value = option.id;
        db.collection("topic").where(`_id=='${option.id}'`).get({ getOne: true }).then((res) => {
          const data = res.result.data;
          formData.content = data.content;
          formData.imageList = data.image;
        });
      }
    });
    const userId = common_vendor.pn.getCurrentUserInfo().uid;
    const form = common_vendor.ref(null);
    const rules = common_vendor.reactive({
      content: {
        rules: [
          {
            required: true,
            errorMessage: "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A"
          },
          {
            maxLength: 200,
            errorMessage: "\u6700\u5927\u957F\u5EA6\u4E3A200"
          }
        ]
      },
      imageList: {
        rules: [
          {
            required: true,
            errMessage: "\u56FE\u7247\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      }
    });
    const confirmIssue = () => {
      if (!ifApply.value) {
        form.value.validate().then(() => {
          common_vendor.pn.callFunction({
            name: "topic",
            data: {
              imageList: formData.imageList,
              userId,
              content: formData.content,
              read: 0
            },
            success() {
              common_vendor.index.showToast({
                title: "\u53D1\u5E03\u6210\u529F"
              });
              common_vendor.index.navigateBack();
            },
            fail(err) {
              console.log(err);
            }
          });
        });
      } else {
        form.value.validate().then(async () => {
          await db.collection("topic").where(`_id=='${topicId.value}'`).update({
            content: formData.content,
            image: formData.imageList
          }).then(() => {
            common_vendor.index.navigateBack({
              success() {
                common_vendor.index.showToast({
                  title: "\u7F16\u8F91\u6210\u529F",
                  icon: "none"
                });
              }
            });
          });
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: formData.content,
        b: common_vendor.o(($event) => formData.content = $event.detail.value),
        c: common_vendor.p({
          name: "content"
        }),
        d: common_vendor.o(($event) => formData.imageList = $event),
        e: common_vendor.p({
          ["file-mediatype"]: "image",
          mode: "grid",
          limit: 6,
          modelValue: formData.imageList
        }),
        f: common_vendor.p({
          name: "imageList"
        }),
        g: common_vendor.sr(form, "7069cbf7-0", {
          "k": "form"
        }),
        h: common_vendor.p({
          modelValue: formData,
          rules
        }),
        i: common_vendor.o(confirmIssue)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7069cbf7"], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/pages/Home/Daily/Participation/index.vue"]]);
wx.createPage(MiniProgramPage);

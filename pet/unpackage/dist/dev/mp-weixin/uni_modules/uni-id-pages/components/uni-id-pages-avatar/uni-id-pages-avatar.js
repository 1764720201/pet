"use strict";
var common_vendor = require("../../../../common/vendor.js");
const db = common_vendor.pn.database();
const usersTable = db.collection("uni-id-users");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      isPC: false,
      hasLogin: false
    };
  },
  props: {
    width: {
      type: String,
      default() {
        return "50px";
      }
    },
    height: {
      type: String,
      default() {
        return "50px";
      }
    }
  },
  async mounted() {
    usersTable.where("'_id' == $cloudEnv_uid").field("avatar_file,mobile,nickname").get().then((res) => {
      this.userInfo = res.result.data[0] || {};
      console.log("this.userInfo", this.userInfo);
      this.hasLogin = true;
    }).catch((e) => {
      this.userInfo = {};
      this.hasLogin = false;
      console.log(e.message, e.errCode);
    });
  },
  computed: {
    avatar_file() {
      if (this.userInfo.avatar_file && this.userInfo.avatar_file.url) {
        return this.userInfo.avatar_file;
      }
    }
  },
  methods: {
    setAvatarFile(avatar_file) {
      common_vendor.index.showLoading({
        title: "\u8BBE\u7F6E\u4E2D",
        mask: true
      });
      usersTable.where("_id==$env.uid").update({
        avatar_file
      }).then((res) => {
        console.log(res);
        if (avatar_file) {
          common_vendor.index.showToast({
            icon: "none",
            title: "\u66F4\u65B0\u6210\u529F"
          });
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: "\u5220\u9664\u6210\u529F"
          });
        }
        this.$set(this.userInfo, "avatar_file", avatar_file);
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "\u8BF7\u6C42\u5931\u8D25",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    uploadAvatarImg(res) {
      if (!this.hasLogin) {
        return common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
        });
      }
      const crop = {
        quality: 100,
        width: 600,
        height: 600,
        resize: true
      };
      common_vendor.index.chooseImage({
        count: 1,
        crop,
        success: async (res2) => {
          console.log(res2);
          let tempFile = res2.tempFiles[0], avatar_file = {
            extname: tempFile.path.split(".")[tempFile.path.split(".").length - 1]
          }, filePath = res2.tempFilePaths[0];
          if (!this.isPC) {
            filePath = await new Promise((callback) => {
              common_vendor.index.navigateTo({
                url: "/uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage?path=" + filePath + `&options=${JSON.stringify(crop)}`,
                animationType: "fade-in",
                events: {
                  success: (url) => {
                    callback(url);
                  }
                },
                complete(e) {
                  console.log(e);
                }
              });
            });
          }
          console.log(this.userInfo);
          let cloudPath = this.userInfo._id + "" + Date.now();
          avatar_file.name = cloudPath;
          common_vendor.index.showLoading({
            title: "\u66F4\u65B0\u4E2D",
            mask: true
          });
          let { fileID } = await common_vendor.pn.uploadFile({
            filePath,
            cloudPath,
            fileType: "image"
          });
          avatar_file.url = fileID;
          console.log({
            avatar_file
          });
          common_vendor.index.hideLoading();
          this.setAvatarFile(avatar_file);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_cloud_image2 = common_vendor.resolveComponent("cloud-image");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_cloud_image2 + _easycom_uni_icons2)();
}
const _easycom_cloud_image = () => "../cloud-image/cloud-image.js";
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_cloud_image + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.avatar_file
  }, $options.avatar_file ? {
    b: common_vendor.p({
      src: $options.avatar_file.url,
      width: $props.width,
      height: $props.height
    })
  } : {
    c: $props.width,
    d: $props.height,
    e: $props.height,
    f: common_vendor.p({
      type: "plusempty",
      size: "30",
      color: "#dddddd"
    })
  }, {
    g: common_vendor.o((...args) => $options.uploadAvatarImg && $options.uploadAvatarImg(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/yzc/Desktop/\u65B0\u5EFA\u6587\u4EF6\u5939/pet/pet/uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.vue"]]);
wx.createComponent(Component);

"use strict";var r=require("../../../common/vendor.js"),o=require("./loginSuccess.js"),t=require("../config.js");let u={data(){return{config:t.config,isMounted:!1}},onUnload(){},mounted(){this.isMounted=!0},onLoad(e){e.is_weixin_redirect&&(r.index.showLoading({mask:!0}),window.location.href.includes("#")&&window.location.href.split("?")[1].split("&").forEach(n=>{let s=n.split("=");s[0]=="code"&&(e.code=s[1])}),this.$nextTick(i=>{console.log(this.$refs.uniFabLogin),this.$refs.uniFabLogin.login({code:e.code},"weixin")}))},computed:{needAgreements(){if(this.isMounted)return this.$refs.agreements?this.$refs.agreements.needAgreements:!1},agree:{get(){if(this.isMounted)return this.$refs.agreements?this.$refs.agreements.isAgree:!0},set(e){this.$refs.agreements?this.$refs.agreements.isAgree=e:console.log("\u4E0D\u5B58\u5728 \u9690\u79C1\u653F\u7B56\u534F\u8BAE\u7EC4\u4EF6")}}},methods:{loginSuccess(e){o.loginSuccess(e)}}};exports.mixin=u;

"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var mitt_1 = require("mitt");
var Mitt = mitt_1["default"]();
function createApp() {
    var app = vue_1.createSSRApp(App_vue_1["default"]);
    app.config.globalProperties.$Bus = Mitt;
    return {
        app: app
    };
}
exports.createApp = createApp;

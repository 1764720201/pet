"use strict";
function base64ToPath(base64) {
  return new Promise(function(resolve, reject) {
    if (typeof window === "object" && "document" in window) {
      base64 = base64.split(",");
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type })));
    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error("base64 error"));
    }
    var fileName = Date.now() + "." + extName;
    if (typeof plus === "object") {
      var bitmap = new plus.nativeObj.Bitmap("bitmap" + Date.now());
      bitmap.loadBase64Data(base64, function() {
        var filePath2 = "_doc/uniapp_temp/" + fileName;
        bitmap.save(filePath2, {}, function() {
          bitmap.clear();
          resolve(filePath2);
        }, function(error) {
          bitmap.clear();
          reject(error);
        });
      }, function(error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === "object" && wx.canIUse("getFileSystemManager")) {
      var filePath = wx.env.USER_DATA_PATH + "/" + fileName;
      wx.getFileSystemManager().writeFile({
        filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ""),
        encoding: "base64",
        success: function() {
          resolve(filePath);
        },
        fail: function(error) {
          reject(error);
        }
      });
      return;
    }
    reject(new Error("not support"));
  });
}
exports.base64ToPath = base64ToPath;

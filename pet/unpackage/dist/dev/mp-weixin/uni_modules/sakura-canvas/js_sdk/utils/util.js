"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_sakuraCanvas_js_sdk_plugins_imageTools = require("../plugins/image-tools.js");
const countTextLength = (Context, text, fontSize) => {
  const length = measureText(Context, text, fontSize);
  return length !== 0 ? length : text.length * fontSize;
};
function measureText(Context, text, fontSize) {
  var _a;
  if (Context.measureText) {
    return ((_a = Context.measureText(text)) == null ? void 0 : _a.width) || 0;
  }
  let length = 0;
  for (let i of text) {
    length += countStrLength(i);
  }
  return length * fontSize;
}
function countStrLength(t) {
  let l;
  if (/a/.test(t)) {
    l = 0.552734375;
  } else if (/b/.test(t)) {
    l = 0.638671875;
  } else if (/c/.test(t)) {
    l = 0.50146484375;
  } else if (/d/.test(t)) {
    l = 0.6396484375;
  } else if (/e/.test(t)) {
    l = 0.5673828125;
  } else if (/f/.test(t)) {
    l = 0.3466796875;
  } else if (/g/.test(t)) {
    l = 0.6396484375;
  } else if (/h/.test(t)) {
    l = 0.61572265625;
  } else if (/i/.test(t)) {
    l = 0.26611328125;
  } else if (/j/.test(t)) {
    l = 0.26708984375;
  } else if (/k/.test(t)) {
    l = 0.54443359375;
  } else if (/l/.test(t)) {
    l = 0.26611328125;
  } else if (/m/.test(t)) {
    l = 0.93701171875;
  } else if (/n/.test(t)) {
    l = 0.6162109375;
  } else if (/o/.test(t)) {
    l = 0.6357421875;
  } else if (/p/.test(t)) {
    l = 0.638671875;
  } else if (/q/.test(t)) {
    l = 0.6396484375;
  } else if (/r/.test(t)) {
    l = 0.3818359375;
  } else if (/s/.test(t)) {
    l = 0.462890625;
  } else if (/t/.test(t)) {
    l = 0.37255859375;
  } else if (/u/.test(t)) {
    l = 0.6162109375;
  } else if (/v/.test(t)) {
    l = 0.52490234375;
  } else if (/w/.test(t)) {
    l = 0.78955078125;
  } else if (/x/.test(t)) {
    l = 0.5068359375;
  } else if (/y/.test(t)) {
    l = 0.529296875;
  } else if (/z/.test(t)) {
    l = 0.49169921875;
  } else if (/A/.test(t)) {
    l = 0.70361328125;
  } else if (/B/.test(t)) {
    l = 0.62744140625;
  } else if (/C/.test(t)) {
    l = 0.6689453125;
  } else if (/D/.test(t)) {
    l = 0.76171875;
  } else if (/E/.test(t)) {
    l = 0.5498046875;
  } else if (/F/.test(t)) {
    l = 0.53125;
  } else if (/G/.test(t)) {
    l = 0.74365234375;
  } else if (/H/.test(t)) {
    l = 0.7734375;
  } else if (/I/.test(t)) {
    l = 0.2939453125;
  } else if (/J/.test(t)) {
    l = 0.39599609375;
  } else if (/K/.test(t)) {
    l = 0.634765625;
  } else if (/L/.test(t)) {
    l = 0.51318359375;
  } else if (/M/.test(t)) {
    l = 0.97705078125;
  } else if (/N/.test(t)) {
    l = 0.81298828125;
  } else if (/O/.test(t)) {
    l = 0.81494140625;
  } else if (/P/.test(t)) {
    l = 0.61181640625;
  } else if (/Q/.test(t)) {
    l = 0.81494140625;
  } else if (/R/.test(t)) {
    l = 0.65283203125;
  } else if (/S/.test(t)) {
    l = 0.5771484375;
  } else if (/T/.test(t)) {
    l = 0.5732421875;
  } else if (/U/.test(t)) {
    l = 0.74658203125;
  } else if (/V/.test(t)) {
    l = 0.67626953125;
  } else if (/W/.test(t)) {
    l = 1.017578125;
  } else if (/X/.test(t)) {
    l = 0.64501953125;
  } else if (/Y/.test(t)) {
    l = 0.603515625;
  } else if (/Z/.test(t)) {
    l = 0.6201171875;
  } else if (/[0-9]/.test(t)) {
    l = 0.58642578125;
  } else if (/[\u4e00-\u9fa5]/.test(t)) {
    l = 1;
  } else if (/ /.test(t)) {
    l = 0.2958984375;
  } else if (/\`/.test(t)) {
    l = 0.294921875;
  } else if (/\~/.test(t)) {
    l = 0.74169921875;
  } else if (/\!/.test(t)) {
    l = 0.3125;
  } else if (/\@/.test(t)) {
    l = 1.03125;
  } else if (/\#/.test(t)) {
    l = 0.63818359375;
  } else if (/\$/.test(t)) {
    l = 0.58642578125;
  } else if (/\%/.test(t)) {
    l = 0.8896484375;
  } else if (/\^/.test(t)) {
    l = 0.74169921875;
  } else if (/\&/.test(t)) {
    l = 0.8701171875;
  } else if (/\*/.test(t)) {
    l = 0.455078125;
  } else if (/\(/.test(t)) {
    l = 0.333984375;
  } else if (/\)/.test(t)) {
    l = 0.333984375;
  } else if (/\_/.test(t)) {
    l = 0.4482421875;
  } else if (/\-/.test(t)) {
    l = 0.4326171875;
  } else if (/\+/.test(t)) {
    l = 0.74169921875;
  } else if (/\=/.test(t)) {
    l = 0.74169921875;
  } else if (/\|/.test(t)) {
    l = 0.26904296875;
  } else if (/\\/.test(t)) {
    l = 0.416015625;
  } else if (/\[/.test(t)) {
    l = 0.333984375;
  } else if (/\]/.test(t)) {
    l = 0.333984375;
  } else if (/\;/.test(t)) {
    l = 0.24072265625;
  } else if (/\'/.test(t)) {
    l = 0.25634765625;
  } else if (/\,/.test(t)) {
    l = 0.24072265625;
  } else if (/\./.test(t)) {
    l = 0.24072265625;
  } else if (/\//.test(t)) {
    l = 0.42724609375;
  } else if (/\{/.test(t)) {
    l = 0.333984375;
  } else if (/\}/.test(t)) {
    l = 0.333984375;
  } else if (/\:/.test(t)) {
    l = 0.24072265625;
  } else if (/\"/.test(t)) {
    l = 0.435546875;
  } else if (/\</.test(t)) {
    l = 0.74169921875;
  } else if (/\>/.test(t)) {
    l = 0.74169921875;
  } else if (/\?/.test(t)) {
    l = 0.48291015625;
  } else {
    l = 1;
  }
  return l;
}
const conversionUnit = (params, getConvertedValue, _this) => {
  const filterAttrs = ["quality", "alpha", "deg", "zIndex", "e", "s", "drawImage"];
  const filterObject = () => {
    const result = Object.assign({}, params);
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (!filterAttrs.includes(key)) {
        if (typeof value === "number") {
          if (value !== 375.0001) {
            result[key] = getConvertedValue.call(_this, value);
          }
        } else if (typeof value === "object" && !value instanceof Array) {
          result[key] = conversionUnit(result[key], getConvertedValue, _this);
        } else if (value instanceof Array) {
          result[key] = value.map((item) => typeof item === "number" ? getConvertedValue.call(_this, item) : item);
        }
      }
    });
    return result;
  };
  if (!(params instanceof Array)) {
    return filterObject();
  } else {
    const filterArray = () => params.map((item) => conversionUnit(item, getConvertedValue, _this));
    return filterArray();
  }
};
const downloadFile = (url, options = {}) => {
  return new Promise((resolve) => {
    const { header = {} } = options;
    try {
      const download = common_vendor.index.downloadFile({
        url,
        header,
        success: (res) => {
          return resolve({
            success: true,
            data: res
          });
        },
        fail: (err) => {
          return resolve({
            success: false,
            message: `\u4E0B\u8F7D\u8D44\u6E90${url}\u5931\u8D25---${JSON.stringify(err)}`
          });
        }
      });
    } catch (e) {
      return resolve({
        success: false,
        msg: `\u4E0B\u8F7D\u8D44\u6E90${url}\u5931\u8D25---${JSON.stringify(e)}`
      });
    }
  });
};
const base64ToPathFn = (path) => {
  const reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
  if (!reg.test(path)) {
    return Promise.resolve(path);
  }
  return uni_modules_sakuraCanvas_js_sdk_plugins_imageTools.base64ToPath(path);
};
exports.base64ToPathFn = base64ToPathFn;
exports.conversionUnit = conversionUnit;
exports.countTextLength = countTextLength;
exports.downloadFile = downloadFile;

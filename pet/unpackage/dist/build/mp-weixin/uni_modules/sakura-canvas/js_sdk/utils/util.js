"use strict";var t=require("../../../../common/vendor.js"),e=require("../plugins/image-tools.js");function s(t){let e;return e=/a/.test(t)?.552734375:/b/.test(t)?.638671875:/c/.test(t)?.50146484375:/d/.test(t)?.6396484375:/e/.test(t)?.5673828125:/f/.test(t)?.3466796875:/g/.test(t)?.6396484375:/h/.test(t)?.61572265625:/i/.test(t)?.26611328125:/j/.test(t)?.26708984375:/k/.test(t)?.54443359375:/l/.test(t)?.26611328125:/m/.test(t)?.93701171875:/n/.test(t)?.6162109375:/o/.test(t)?.6357421875:/p/.test(t)?.638671875:/q/.test(t)?.6396484375:/r/.test(t)?.3818359375:/s/.test(t)?.462890625:/t/.test(t)?.37255859375:/u/.test(t)?.6162109375:/v/.test(t)?.52490234375:/w/.test(t)?.78955078125:/x/.test(t)?.5068359375:/y/.test(t)?.529296875:/z/.test(t)?.49169921875:/A/.test(t)?.70361328125:/B/.test(t)?.62744140625:/C/.test(t)?.6689453125:/D/.test(t)?.76171875:/E/.test(t)?.5498046875:/F/.test(t)?.53125:/G/.test(t)?.74365234375:/H/.test(t)?.7734375:/I/.test(t)?.2939453125:/J/.test(t)?.39599609375:/K/.test(t)?.634765625:/L/.test(t)?.51318359375:/M/.test(t)?.97705078125:/N/.test(t)?.81298828125:/O/.test(t)?.81494140625:/P/.test(t)?.61181640625:/Q/.test(t)?.81494140625:/R/.test(t)?.65283203125:/S/.test(t)?.5771484375:/T/.test(t)?.5732421875:/U/.test(t)?.74658203125:/V/.test(t)?.67626953125:/W/.test(t)?1.017578125:/X/.test(t)?.64501953125:/Y/.test(t)?.603515625:/Z/.test(t)?.6201171875:/[0-9]/.test(t)?.58642578125:/[\u4e00-\u9fa5]/.test(t)?1:/ /.test(t)?.2958984375:/\`/.test(t)?.294921875:/\~/.test(t)?.74169921875:/\!/.test(t)?.3125:/\@/.test(t)?1.03125:/\#/.test(t)?.63818359375:/\$/.test(t)?.58642578125:/\%/.test(t)?.8896484375:/\^/.test(t)?.74169921875:/\&/.test(t)?.8701171875:/\*/.test(t)?.455078125:/\(/.test(t)||/\)/.test(t)?.333984375:/\_/.test(t)?.4482421875:/\-/.test(t)?.4326171875:/\+/.test(t)||/\=/.test(t)?.74169921875:/\|/.test(t)?.26904296875:/\\/.test(t)?.416015625:/\[/.test(t)||/\]/.test(t)?.333984375:/\;/.test(t)?.24072265625:/\'/.test(t)?.25634765625:/\,/.test(t)||/\./.test(t)?.24072265625:/\//.test(t)?.42724609375:/\{/.test(t)||/\}/.test(t)?.333984375:/\:/.test(t)?.24072265625:/\"/.test(t)?.435546875:/\</.test(t)||/\>/.test(t)?.74169921875:/\?/.test(t)?.48291015625:1,e}const a=(t,e,s)=>{const r=["quality","alpha","deg","zIndex","e","s","drawImage"];if(t instanceof Array){return(()=>t.map((t=>a(t,e,s))))()}return(()=>{const n=Object.assign({},t);return Object.keys(t).forEach((o=>{const i=t[o];r.includes(o)||("number"==typeof i?375.0001!==i&&(n[o]=e.call(s,i)):"object"==typeof i&&!i instanceof Array?n[o]=a(n[o],e,s):i instanceof Array&&(n[o]=i.map((t=>"number"==typeof t?e.call(s,t):t))))})),n})()};exports.base64ToPathFn=t=>/^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(t)?e.base64ToPath(t):Promise.resolve(t),exports.conversionUnit=a,exports.countTextLength=(t,e,a)=>{const r=function(t,e,a){var r;if(t.measureText)return(null==(r=t.measureText(e))?void 0:r.width)||0;let n=0;for(let o of e)n+=s(o);return n*a}(t,e,a);return 0!==r?r:e.length*a},exports.downloadFile=(e,s={})=>new Promise((a=>{const{header:r={}}=s;try{t.index.downloadFile({url:e,header:r,success:t=>a({success:!0,data:t}),fail:t=>a({success:!1,message:`下载资源${e}失败---${JSON.stringify(t)}`})})}catch(n){return a({success:!1,msg:`下载资源${e}失败---${JSON.stringify(n)}`})}})),exports.saveImageToPhotosAlbum=e=>new Promise((s=>{t.index.showLoading({title:"保存中..."}),t.index.saveImageToPhotosAlbum({filePath:e,success:t=>{s({success:!0,data:t.file})},fail:t=>{s({success:!1,message:t})},complete:()=>{t.index.hideLoading()}})}));
"use strict";function e(e){this.key=e.key,this.requestConfig={key:e.key,s:"rsx",platform:"WXJS",appname:e.key,sdkversion:"1.2.0",logversion:"2.0"},this.MeRequestConfig={key:e.key,serviceName:"https://restapi.amap.com/rest/me"}}e.prototype.getWxLocation=function(e,t){wx.getLocation({type:"gcj02",success:function(e){e=e.longitude+","+e.latitude,wx.setStorage({key:"userLocation",data:e}),t(e)},fail:function(s){wx.getStorage({key:"userLocation",success:function(e){e.data&&t(e.data)}}),e.fail({errCode:"0",errMsg:s.errMsg||""})}})},e.prototype.getMEKeywordsSearch=function(e){if(!e.options)return e.fail({errCode:"0",errMsg:"缺少必要参数"});var t=e.options,s=this.MeRequestConfig,a={key:s.key,s:"rsx",platform:"WXJS",appname:e.key,sdkversion:"1.2.0",logversion:"2.0"};t.layerId&&(a.layerId=t.layerId),t.keywords&&(a.keywords=t.keywords),t.city&&(a.city=t.city),t.filter&&(a.filter=t.filter),t.sortrule&&(a.sortrule=t.sortrule),t.pageNum&&(a.pageNum=t.pageNum),t.pageSize&&(a.pageSize=t.pageSize),t.sig&&(a.sig=t.sig),wx.request({url:s.serviceName+"/cpoint/datasearch/local",data:a,method:"GET",header:{"content-type":"application/json"},success:function(t){(t=t.data)&&t.status&&"1"===t.status&&0===t.code?e.success(t.data):e.fail({errCode:"0",errMsg:t})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})},e.prototype.getMEIdSearch=function(e){if(!e.options)return e.fail({errCode:"0",errMsg:"缺少必要参数"});var t=e.options,s=this.MeRequestConfig,a={key:s.key,s:"rsx",platform:"WXJS",appname:e.key,sdkversion:"1.2.0",logversion:"2.0"};t.layerId&&(a.layerId=t.layerId),t.id&&(a.id=t.id),t.sig&&(a.sig=t.sig),wx.request({url:s.serviceName+"/cpoint/datasearch/id",data:a,method:"GET",header:{"content-type":"application/json"},success:function(t){(t=t.data)&&t.status&&"1"===t.status&&0===t.code?e.success(t.data):e.fail({errCode:"0",errMsg:t})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})},e.prototype.getMEPolygonSearch=function(e){if(!e.options)return e.fail({errCode:"0",errMsg:"缺少必要参数"});var t=e.options,s=this.MeRequestConfig,a={key:s.key,s:"rsx",platform:"WXJS",appname:e.key,sdkversion:"1.2.0",logversion:"2.0"};t.layerId&&(a.layerId=t.layerId),t.keywords&&(a.keywords=t.keywords),t.polygon&&(a.polygon=t.polygon),t.filter&&(a.filter=t.filter),t.sortrule&&(a.sortrule=t.sortrule),t.pageNum&&(a.pageNum=t.pageNum),t.pageSize&&(a.pageSize=t.pageSize),t.sig&&(a.sig=t.sig),wx.request({url:s.serviceName+"/cpoint/datasearch/polygon",data:a,method:"GET",header:{"content-type":"application/json"},success:function(t){(t=t.data)&&t.status&&"1"===t.status&&0===t.code?e.success(t.data):e.fail({errCode:"0",errMsg:t})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})},e.prototype.getMEaroundSearch=function(e){if(!e.options)return e.fail({errCode:"0",errMsg:"缺少必要参数"});var t=e.options,s=this.MeRequestConfig,a={key:s.key,s:"rsx",platform:"WXJS",appname:e.key,sdkversion:"1.2.0",logversion:"2.0"};t.layerId&&(a.layerId=t.layerId),t.keywords&&(a.keywords=t.keywords),t.center&&(a.center=t.center),t.radius&&(a.radius=t.radius),t.filter&&(a.filter=t.filter),t.sortrule&&(a.sortrule=t.sortrule),t.pageNum&&(a.pageNum=t.pageNum),t.pageSize&&(a.pageSize=t.pageSize),t.sig&&(a.sig=t.sig),wx.request({url:s.serviceName+"/cpoint/datasearch/around",data:a,method:"GET",header:{"content-type":"application/json"},success:function(t){(t=t.data)&&t.status&&"1"===t.status&&0===t.code?e.success(t.data):e.fail({errCode:"0",errMsg:t})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})},e.prototype.getGeo=function(e){var t=this.requestConfig,s=e.options;t={key:this.key,extensions:"all",s:t.s,platform:t.platform,appname:this.key,sdkversion:t.sdkversion,logversion:t.logversion},s.address&&(t.address=s.address),s.city&&(t.city=s.city),s.batch&&(t.batch=s.batch),s.sig&&(t.sig=s.sig),wx.request({url:"https://restapi.amap.com/v3/geocode/geo",data:t,method:"GET",header:{"content-type":"application/json"},success:function(t){(t=t.data)&&t.status&&"1"===t.status?e.success(t):e.fail({errCode:"0",errMsg:t})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})},e.prototype.getRegeo=function(e){function t(t){var a=s.requestConfig;wx.request({url:"https://restapi.amap.com/v3/geocode/regeo",data:{key:s.key,location:t,extensions:"all",s:a.s,platform:a.platform,appname:s.key,sdkversion:a.sdkversion,logversion:a.logversion},method:"GET",header:{"content-type":"application/json"},success:function(s){if(s.data.status&&"1"==s.data.status){var a=(s=s.data.regeocode).addressComponent,o=[],i=s.roads[0].name+"附近",r=t.split(",")[0],n=t.split(",")[1];if(s.pois&&s.pois[0]){i=s.pois[0].name+"附近";var c=s.pois[0].location;c&&(r=parseFloat(c.split(",")[0]),n=parseFloat(c.split(",")[1]))}a.provice&&o.push(a.provice),a.city&&o.push(a.city),a.district&&o.push(a.district),a.streetNumber&&a.streetNumber.street&&a.streetNumber.number?(o.push(a.streetNumber.street),o.push(a.streetNumber.number)):o.push(s.roads[0].name),o=o.join(""),e.success([{iconPath:e.iconPath,width:e.iconWidth,height:e.iconHeight,name:o,desc:i,longitude:r,latitude:n,id:0,regeocodeData:s}])}else e.fail({errCode:s.data.infocode,errMsg:s.data.info})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})}var s=this;e.location?t(e.location):s.getWxLocation(e,(function(e){t(e)}))},e.prototype.getWeather=function(e){function t(t){var o="base";e.type&&"forecast"==e.type&&(o="all"),wx.request({url:"https://restapi.amap.com/v3/weather/weatherInfo",data:{key:s.key,city:t,extensions:o,s:a.s,platform:a.platform,appname:s.key,sdkversion:a.sdkversion,logversion:a.logversion},method:"GET",header:{"content-type":"application/json"},success:function(t){if(t.data.status&&"1"==t.data.status)if(t.data.lives){if((t=t.data.lives)&&0<t.length){var s={city:{text:"城市",data:(t=t[0]).city},weather:{text:"天气",data:t.weather},temperature:{text:"温度",data:t.temperature},winddirection:{text:"风向",data:t.winddirection+"风"},windpower:{text:"风力",data:t.windpower+"级"},humidity:{text:"湿度",data:t.humidity+"%"}};s.liveData=t,e.success(s)}}else t.data.forecasts&&t.data.forecasts[0]&&e.success({forecast:t.data.forecasts[0]});else e.fail({errCode:t.data.infocode,errMsg:t.data.info})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})}var s=this,a=s.requestConfig;e.city?t(e.city):s.getWxLocation(e,(function(o){!function(o){wx.request({url:"https://restapi.amap.com/v3/geocode/regeo",data:{key:s.key,location:o,extensions:"all",s:a.s,platform:a.platform,appname:s.key,sdkversion:a.sdkversion,logversion:a.logversion},method:"GET",header:{"content-type":"application/json"},success:function(s){if(s.data.status&&"1"==s.data.status){if((s=s.data.regeocode).addressComponent)var a=s.addressComponent.adcode;else s.aois&&0<s.aois.length&&(a=s.aois[0].adcode);t(a)}else e.fail({errCode:s.data.infocode,errMsg:s.data.info})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})}(o)}))},e.prototype.getPoiAround=function(e){function t(t){t={key:s.key,location:t,s:a.s,platform:a.platform,appname:s.key,sdkversion:a.sdkversion,logversion:a.logversion},e.querytypes&&(t.types=e.querytypes),e.querykeywords&&(t.keywords=e.querykeywords),wx.request({url:"https://restapi.amap.com/v3/place/around",data:t,method:"GET",header:{"content-type":"application/json"},success:function(t){if(t.data.status&&"1"==t.data.status){if((t=t.data)&&t.pois){for(var s=[],a=0;a<t.pois.length;a++){var o=0==a?e.iconPathSelected:e.iconPath;s.push({latitude:parseFloat(t.pois[a].location.split(",")[1]),longitude:parseFloat(t.pois[a].location.split(",")[0]),iconPath:o,width:22,height:32,id:a,name:t.pois[a].name,address:t.pois[a].address})}e.success({markers:s,poisData:t.pois})}}else e.fail({errCode:t.data.infocode,errMsg:t.data.info})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})}var s=this,a=s.requestConfig;e.location?t(e.location):s.getWxLocation(e,(function(e){t(e)}))},e.prototype.getStaticmap=function(e){function t(t){s.push("location="+t),e.zoom&&s.push("zoom="+e.zoom),e.size&&s.push("size="+e.size),e.scale&&s.push("scale="+e.scale),e.markers&&s.push("markers="+e.markers),e.labels&&s.push("labels="+e.labels),e.paths&&s.push("paths="+e.paths),e.traffic&&s.push("traffic="+e.traffic),t="https://restapi.amap.com/v3/staticmap?"+s.join("&"),e.success({url:t})}var s=[];s.push("key="+this.key);var a=this.requestConfig;s.push("s="+a.s),s.push("platform="+a.platform),s.push("appname="+a.appname),s.push("sdkversion="+a.sdkversion),s.push("logversion="+a.logversion),e.location?t(e.location):this.getWxLocation(e,(function(e){t(e)}))},e.prototype.getInputtips=function(e){var t=Object.assign({},this.requestConfig);e.location&&(t.location=e.location),e.keywords&&(t.keywords=e.keywords),e.type&&(t.type=e.type),e.city&&(t.city=e.city),e.citylimit&&(t.citylimit=e.citylimit),wx.request({url:"https://restapi.amap.com/v3/assistant/inputtips",data:t,method:"GET",header:{"content-type":"application/json"},success:function(t){t&&t.data&&t.data.tips&&e.success({tips:t.data.tips})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})},e.prototype.getDrivingRoute=function(e){var t=Object.assign({},this.requestConfig);e.origin&&(t.origin=e.origin),e.destination&&(t.destination=e.destination),e.strategy&&(t.strategy=e.strategy),e.waypoints&&(t.waypoints=e.waypoints),e.avoidpolygons&&(t.avoidpolygons=e.avoidpolygons),e.avoidroad&&(t.avoidroad=e.avoidroad),wx.request({url:"https://restapi.amap.com/v3/direction/driving",data:t,method:"GET",header:{"content-type":"application/json"},success:function(t){t&&t.data&&t.data.route&&e.success({paths:t.data.route.paths,taxi_cost:t.data.route.taxi_cost||""})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})},e.prototype.getWalkingRoute=function(e){var t=Object.assign({},this.requestConfig);e.origin&&(t.origin=e.origin),e.destination&&(t.destination=e.destination),wx.request({url:"https://restapi.amap.com/v3/direction/walking",data:t,method:"GET",header:{"content-type":"application/json"},success:function(t){t&&t.data&&t.data.route&&e.success({paths:t.data.route.paths})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})},e.prototype.getTransitRoute=function(e){var t=Object.assign({},this.requestConfig);e.origin&&(t.origin=e.origin),e.destination&&(t.destination=e.destination),e.strategy&&(t.strategy=e.strategy),e.city&&(t.city=e.city),e.cityd&&(t.cityd=e.cityd),wx.request({url:"https://restapi.amap.com/v3/direction/transit/integrated",data:t,method:"GET",header:{"content-type":"application/json"},success:function(t){t&&t.data&&t.data.route&&(t=t.data.route,e.success({distance:t.distance||"",taxi_cost:t.taxi_cost||"",transits:t.transits}))},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})},e.prototype.getRidingRoute=function(e){var t=Object.assign({},this.requestConfig);e.origin&&(t.origin=e.origin),e.destination&&(t.destination=e.destination),wx.request({url:"https://restapi.amap.com/v3/direction/riding",data:t,method:"GET",header:{"content-type":"application/json"},success:function(t){t&&t.data&&t.data.route&&e.success({paths:t.data.route.paths})},fail:function(t){e.fail({errCode:"0",errMsg:t.errMsg||""})}})};var t={AMapWX:e};exports.amapFile=t;
"use strict";function t(t){return t<128?[t]:t<2048?[192+(t>>6),128+(63&t)]:[224+(t>>12),128+(t>>6&63),128+(63&t)]}function e(e,r){this.typeNumber=-1,this.errorCorrectLevel=r,this.modules=null,this.moduleCount=0,this.dataCache=null,this.rsBlocks=null,this.totalDataCount=-1,this.data=e,this.utf8bytes=function(e){for(var r=[],o=0;o<e.length;o++)for(var u=t(e.charCodeAt(o)),n=0;n<u.length;n++)r.push(u[n]);return r}(e),this.make()}e.prototype={constructor:e,getModuleCount:function(){return this.moduleCount},make:function(){this.getRightType(),this.dataCache=this.createData(),this.createQrcode()},makeImpl:function(t){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[e]=new Array(this.moduleCount);this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(!0,t),this.typeNumber>=7&&this.setupTypeNumber(!0),this.mapData(this.dataCache,t)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var o=-1;o<=7;o++)e+o<=-1||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&r<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=o&&o<=4)},createQrcode:function(){for(var t=0,e=0,r=null,o=0;o<8;o++){this.makeImpl(o);var u=f.getLostPoint(this);(0==o||t>u)&&(t=u,e=o,r=this.modules)}this.modules=r,this.setupTypeInfo(!1,e),this.typeNumber>=7&&this.setupTypeNumber(!1)},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0,null==this.modules[6][t]&&(this.modules[6][t]=t%2==0))},setupPositionAdjustPattern:function(){for(var t=f.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],u=t[r];if(null==this.modules[o][u])for(var n=-2;n<=2;n++)for(var s=-2;s<=2;s++)this.modules[o+n][u+s]=-2==n||2==n||-2==s||2==s||0==n&&0==s}},setupTypeNumber:function(t){for(var e=f.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o,this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o}},setupTypeInfo:function(t,e){for(var o=r[this.errorCorrectLevel]<<3|e,u=f.getBCHTypeInfo(o),n=0;n<15;n++){var s=!t&&1==(u>>n&1);n<6?this.modules[n][8]=s:n<8?this.modules[n+1][8]=s:this.modules[this.moduleCount-15+n][8]=s;s=!t&&1==(u>>n&1);n<8?this.modules[8][this.moduleCount-n-1]=s:n<9?this.modules[8][15-n-1+1]=s:this.modules[8][15-n-1]=s}this.modules[this.moduleCount-8][8]=!t},createData:function(){var t=new p,r=this.typeNumber>9?16:8;t.put(4,4),t.put(this.utf8bytes.length,r);for(var o=0,u=this.utf8bytes.length;o<u;o++)t.put(this.utf8bytes[o],8);for(t.length+4<=8*this.totalDataCount&&t.put(0,4);t.length%8!=0;)t.putBit(!1);for(;!(t.length>=8*this.totalDataCount||(t.put(e.PAD0,8),t.length>=8*this.totalDataCount));)t.put(e.PAD1,8);return this.createBytes(t)},createBytes:function(t){for(var e=0,r=0,o=0,u=this.rsBlock.length/3,n=new Array,s=0;s<u;s++)for(var i=this.rsBlock[3*s+0],h=this.rsBlock[3*s+1],l=this.rsBlock[3*s+2],a=0;a<i;a++)n.push([l,h]);for(var g=new Array(n.length),m=new Array(n.length),c=0;c<n.length;c++){var p=n[c][0],v=n[c][1]-p;r=Math.max(r,p),o=Math.max(o,v),g[c]=new Array(p);for(s=0;s<g[c].length;s++)g[c][s]=255&t.buffer[s+e];e+=p;var C=f.getErrorCorrectPolynomial(v),y=new d(g[c],C.getLength()-1).mod(C);m[c]=new Array(C.getLength()-1);for(s=0;s<m[c].length;s++){var P=s+y.getLength()-m[c].length;m[c][s]=P>=0?y.get(P):0}}var A=new Array(this.totalDataCount),B=0;for(s=0;s<r;s++)for(c=0;c<n.length;c++)s<g[c].length&&(A[B++]=g[c][s]);for(s=0;s<o;s++)for(c=0;c<n.length;c++)s<m[c].length&&(A[B++]=m[c][s]);return A},mapData:function(t,e){for(var r=-1,o=this.moduleCount-1,u=7,n=0,s=this.moduleCount-1;s>0;s-=2)for(6==s&&s--;;){for(var i=0;i<2;i++)if(null==this.modules[o][s-i]){var h=!1;n<t.length&&(h=1==(t[n]>>>u&1)),f.getMask(e,o,s-i)&&(h=!h),this.modules[o][s-i]=h,-1==--u&&(n++,u=7)}if((o+=r)<0||this.moduleCount<=o){o-=r,r=-r;break}}}},e.PAD0=236,e.PAD1=17;for(var r=[1,0,3,2],o=0,u=1,n=2,s=3,i=4,h=5,l=6,a=7,f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;f.getBCHDigit(e)-f.getBCHDigit(f.G15)>=0;)e^=f.G15<<f.getBCHDigit(e)-f.getBCHDigit(f.G15);return(t<<10|e)^f.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;f.getBCHDigit(e)-f.getBCHDigit(f.G18)>=0;)e^=f.G18<<f.getBCHDigit(e)-f.getBCHDigit(f.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return f.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case o:return(e+r)%2==0;case u:return e%2==0;case n:return r%3==0;case s:return(e+r)%3==0;case i:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case h:return e*r%2+e*r%3==0;case l:return(e*r%2+e*r%3)%2==0;case a:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new d([1],0),r=0;r<t;r++)e=e.multiply(new d([1,g.gexp(r)],0));return e},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0,u=0;u<e;u++)for(var n=0,s=t.modules[u][0],i=0;i<e;i++){var h=t.modules[u][i];if(i<e-6&&h&&!t.modules[u][i+1]&&t.modules[u][i+2]&&t.modules[u][i+3]&&t.modules[u][i+4]&&!t.modules[u][i+5]&&t.modules[u][i+6]&&(i<e-10?t.modules[u][i+7]&&t.modules[u][i+8]&&t.modules[u][i+9]&&t.modules[u][i+10]&&(r+=40):i>3&&t.modules[u][i-1]&&t.modules[u][i-2]&&t.modules[u][i-3]&&t.modules[u][i-4]&&(r+=40)),u<e-1&&i<e-1){var l=0;h&&l++,t.modules[u+1][i]&&l++,t.modules[u][i+1]&&l++,t.modules[u+1][i+1]&&l++,0!=l&&4!=l||(r+=3)}s^h?n++:(s=h,n>=5&&(r+=3+n-5),n=1),h&&o++}for(i=0;i<e;i++)for(n=0,s=t.modules[0][i],u=0;u<e;u++){h=t.modules[u][i];u<e-6&&h&&!t.modules[u+1][i]&&t.modules[u+2][i]&&t.modules[u+3][i]&&t.modules[u+4][i]&&!t.modules[u+5][i]&&t.modules[u+6][i]&&(u<e-10?t.modules[u+7][i]&&t.modules[u+8][i]&&t.modules[u+9][i]&&t.modules[u+10][i]&&(r+=40):u>3&&t.modules[u-1][i]&&t.modules[u-2][i]&&t.modules[u-3][i]&&t.modules[u-4][i]&&(r+=40)),s^h?n++:(s=h,n>=5&&(r+=3+n-5),n=1)}return r+=10*(Math.abs(100*o/e/e-50)/5)}},g={glog:function(t){if(t<1)throw new Error("glog("+t+")");return g.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return g.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},m=0;m<8;m++)g.EXP_TABLE[m]=1<<m;for(m=8;m<256;m++)g.EXP_TABLE[m]=g.EXP_TABLE[m-4]^g.EXP_TABLE[m-5]^g.EXP_TABLE[m-6]^g.EXP_TABLE[m-8];for(m=0;m<255;m++)g.LOG_TABLE[g.EXP_TABLE[m]]=m;function d(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}d.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var o=0;o<t.getLength();o++)e[r+o]^=g.gexp(g.glog(this.get(r))+g.glog(t.get(o)));return new d(e,0)},mod:function(t){var e=this.getLength(),r=t.getLength();if(e-r<0)return this;for(var o=new Array(e),u=0;u<e;u++)o[u]=this.get(u);for(;o.length>=r;){var n=g.glog(o[0])-g.glog(t.get(0));for(u=0;u<t.getLength();u++)o[u]^=g.gexp(g.glog(t.get(u))+n);for(;0==o[0];)o.shift()}return new d(o,0)}};var c=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];function p(){this.buffer=new Array,this.length=0}e.prototype.getRightType=function(){for(var t=1;t<41;t++){var e=c[4*(t-1)+this.errorCorrectLevel];if(null==e)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+this.errorCorrectLevel);for(var r=e.length/3,o=0,u=0;u<r;u++){var n=e[3*u+0];o+=e[3*u+2]*n}var s=t>9?2:1;if(this.utf8bytes.length+s<o||40==t){this.typeNumber=t,this.rsBlock=e,this.totalDataCount=o;break}}},p.prototype={get:function(t){var e=Math.floor(t/8);return this.buffer[e]>>>7-t%8&1},put:function(t,e){for(var r=0;r<e;r++)this.putBit(t>>>e-r-1&1)},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},exports.QRCodeAlg=e;
"use strict";
var citys = [
  {
    "cityCode": "110100",
    "cityName": "\u5317\u4EAC"
  },
  {
    "cityCode": "120100",
    "cityName": "\u5929\u6D25"
  },
  {
    "cityCode": "130100",
    "cityName": "\u77F3\u5BB6\u5E84\u5E02"
  },
  {
    "cityCode": "130200",
    "cityName": "\u5510\u5C71\u5E02"
  },
  {
    "cityCode": "130300",
    "cityName": "\u79E6\u7687\u5C9B\u5E02"
  },
  {
    "cityCode": "130400",
    "cityName": "\u90AF\u90F8\u5E02"
  },
  {
    "cityCode": "130500",
    "cityName": "\u90A2\u53F0\u5E02"
  },
  {
    "cityCode": "130600",
    "cityName": "\u4FDD\u5B9A\u5E02"
  },
  {
    "cityCode": "130700",
    "cityName": "\u5F20\u5BB6\u53E3\u5E02"
  },
  {
    "cityCode": "130800",
    "cityName": "\u627F\u5FB7\u5E02"
  },
  {
    "cityCode": "130900",
    "cityName": "\u6CA7\u5DDE\u5E02"
  },
  {
    "cityCode": "131000",
    "cityName": "\u5ECA\u574A\u5E02"
  },
  {
    "cityCode": "131100",
    "cityName": "\u8861\u6C34\u5E02"
  },
  {
    "cityCode": "140100",
    "cityName": "\u592A\u539F\u5E02"
  },
  {
    "cityCode": "140200",
    "cityName": "\u5927\u540C\u5E02"
  },
  {
    "cityCode": "140300",
    "cityName": "\u9633\u6CC9\u5E02"
  },
  {
    "cityCode": "140400",
    "cityName": "\u957F\u6CBB\u5E02"
  },
  {
    "cityCode": "140500",
    "cityName": "\u664B\u57CE\u5E02"
  },
  {
    "cityCode": "140600",
    "cityName": "\u6714\u5DDE\u5E02"
  },
  {
    "cityCode": "140700",
    "cityName": "\u664B\u4E2D\u5E02"
  },
  {
    "cityCode": "140800",
    "cityName": "\u8FD0\u57CE\u5E02"
  },
  {
    "cityCode": "140900",
    "cityName": "\u5FFB\u5DDE\u5E02"
  },
  {
    "cityCode": "141000",
    "cityName": "\u4E34\u6C7E\u5E02"
  },
  {
    "cityCode": "141100",
    "cityName": "\u5415\u6881\u5E02"
  },
  {
    "cityCode": "150100",
    "cityName": "\u547C\u548C\u6D69\u7279\u5E02"
  },
  {
    "cityCode": "150200",
    "cityName": "\u5305\u5934\u5E02"
  },
  {
    "cityCode": "150300",
    "cityName": "\u4E4C\u6D77\u5E02"
  },
  {
    "cityCode": "150400",
    "cityName": "\u8D64\u5CF0\u5E02"
  },
  {
    "cityCode": "150500",
    "cityName": "\u901A\u8FBD\u5E02"
  },
  {
    "cityCode": "150600",
    "cityName": "\u9102\u5C14\u591A\u65AF\u5E02"
  },
  {
    "cityCode": "150700",
    "cityName": "\u547C\u4F26\u8D1D\u5C14\u5E02"
  },
  {
    "cityCode": "150800",
    "cityName": "\u5DF4\u5F66\u6DD6\u5C14\u5E02"
  },
  {
    "cityCode": "150900",
    "cityName": "\u4E4C\u5170\u5BDF\u5E03\u5E02"
  },
  {
    "cityCode": "152200",
    "cityName": "\u5174\u5B89\u76DF"
  },
  {
    "cityCode": "152500",
    "cityName": "\u9521\u6797\u90ED\u52D2\u76DF"
  },
  {
    "cityCode": "152900",
    "cityName": "\u963F\u62C9\u5584\u76DF"
  },
  {
    "cityCode": "210100",
    "cityName": "\u6C88\u9633\u5E02"
  },
  {
    "cityCode": "210200",
    "cityName": "\u5927\u8FDE\u5E02"
  },
  {
    "cityCode": "210300",
    "cityName": "\u978D\u5C71\u5E02"
  },
  {
    "cityCode": "210400",
    "cityName": "\u629A\u987A\u5E02"
  },
  {
    "cityCode": "210500",
    "cityName": "\u672C\u6EAA\u5E02"
  },
  {
    "cityCode": "210600",
    "cityName": "\u4E39\u4E1C\u5E02"
  },
  {
    "cityCode": "210700",
    "cityName": "\u9526\u5DDE\u5E02"
  },
  {
    "cityCode": "210800",
    "cityName": "\u8425\u53E3\u5E02"
  },
  {
    "cityCode": "210900",
    "cityName": "\u961C\u65B0\u5E02"
  },
  {
    "cityCode": "211000",
    "cityName": "\u8FBD\u9633\u5E02"
  },
  {
    "cityCode": "211100",
    "cityName": "\u76D8\u9526\u5E02"
  },
  {
    "cityCode": "211200",
    "cityName": "\u94C1\u5CAD\u5E02"
  },
  {
    "cityCode": "211300",
    "cityName": "\u671D\u9633\u5E02"
  },
  {
    "cityCode": "211400",
    "cityName": "\u846B\u82A6\u5C9B\u5E02"
  },
  {
    "cityCode": "220100",
    "cityName": "\u957F\u6625\u5E02"
  },
  {
    "cityCode": "220200",
    "cityName": "\u5409\u6797\u5E02"
  },
  {
    "cityCode": "220300",
    "cityName": "\u56DB\u5E73\u5E02"
  },
  {
    "cityCode": "220400",
    "cityName": "\u8FBD\u6E90\u5E02"
  },
  {
    "cityCode": "220500",
    "cityName": "\u901A\u5316\u5E02"
  },
  {
    "cityCode": "220600",
    "cityName": "\u767D\u5C71\u5E02"
  },
  {
    "cityCode": "220700",
    "cityName": "\u677E\u539F\u5E02"
  },
  {
    "cityCode": "220800",
    "cityName": "\u767D\u57CE\u5E02"
  },
  {
    "cityCode": "222400",
    "cityName": "\u5EF6\u8FB9\u671D\u9C9C\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "230100",
    "cityName": "\u54C8\u5C14\u6EE8\u5E02"
  },
  {
    "cityCode": "230200",
    "cityName": "\u9F50\u9F50\u54C8\u5C14\u5E02"
  },
  {
    "cityCode": "230300",
    "cityName": "\u9E21\u897F\u5E02"
  },
  {
    "cityCode": "230400",
    "cityName": "\u9E64\u5C97\u5E02"
  },
  {
    "cityCode": "230500",
    "cityName": "\u53CC\u9E2D\u5C71\u5E02"
  },
  {
    "cityCode": "230600",
    "cityName": "\u5927\u5E86\u5E02"
  },
  {
    "cityCode": "230700",
    "cityName": "\u4F0A\u6625\u5E02"
  },
  {
    "cityCode": "230800",
    "cityName": "\u4F73\u6728\u65AF\u5E02"
  },
  {
    "cityCode": "230900",
    "cityName": "\u4E03\u53F0\u6CB3\u5E02"
  },
  {
    "cityCode": "231000",
    "cityName": "\u7261\u4E39\u6C5F\u5E02"
  },
  {
    "cityCode": "231100",
    "cityName": "\u9ED1\u6CB3\u5E02"
  },
  {
    "cityCode": "231200",
    "cityName": "\u7EE5\u5316\u5E02"
  },
  {
    "cityCode": "232700",
    "cityName": "\u5927\u5174\u5B89\u5CAD\u5730\u533A"
  },
  {
    "cityCode": "310100",
    "cityName": "\u4E0A\u6D77\u5E02"
  },
  {
    "cityCode": "320100",
    "cityName": "\u5357\u4EAC\u5E02"
  },
  {
    "cityCode": "320200",
    "cityName": "\u65E0\u9521\u5E02"
  },
  {
    "cityCode": "320300",
    "cityName": "\u5F90\u5DDE\u5E02"
  },
  {
    "cityCode": "320400",
    "cityName": "\u5E38\u5DDE\u5E02"
  },
  {
    "cityCode": "320500",
    "cityName": "\u82CF\u5DDE\u5E02"
  },
  {
    "cityCode": "320600",
    "cityName": "\u5357\u901A\u5E02"
  },
  {
    "cityCode": "320700",
    "cityName": "\u8FDE\u4E91\u6E2F\u5E02"
  },
  {
    "cityCode": "320800",
    "cityName": "\u6DEE\u5B89\u5E02"
  },
  {
    "cityCode": "320900",
    "cityName": "\u76D0\u57CE\u5E02"
  },
  {
    "cityCode": "321000",
    "cityName": "\u626C\u5DDE\u5E02"
  },
  {
    "cityCode": "321100",
    "cityName": "\u9547\u6C5F\u5E02"
  },
  {
    "cityCode": "321200",
    "cityName": "\u6CF0\u5DDE\u5E02"
  },
  {
    "cityCode": "321300",
    "cityName": "\u5BBF\u8FC1\u5E02"
  },
  {
    "cityCode": "330100",
    "cityName": "\u676D\u5DDE\u5E02"
  },
  {
    "cityCode": "330200",
    "cityName": "\u5B81\u6CE2\u5E02"
  },
  {
    "cityCode": "330300",
    "cityName": "\u6E29\u5DDE\u5E02"
  },
  {
    "cityCode": "330400",
    "cityName": "\u5609\u5174\u5E02"
  },
  {
    "cityCode": "330500",
    "cityName": "\u6E56\u5DDE\u5E02"
  },
  {
    "cityCode": "330600",
    "cityName": "\u7ECD\u5174\u5E02"
  },
  {
    "cityCode": "330700",
    "cityName": "\u91D1\u534E\u5E02"
  },
  {
    "cityCode": "330800",
    "cityName": "\u8862\u5DDE\u5E02"
  },
  {
    "cityCode": "330900",
    "cityName": "\u821F\u5C71\u5E02"
  },
  {
    "cityCode": "331000",
    "cityName": "\u53F0\u5DDE\u5E02"
  },
  {
    "cityCode": "331100",
    "cityName": "\u4E3D\u6C34\u5E02"
  },
  {
    "cityCode": "340100",
    "cityName": "\u5408\u80A5\u5E02"
  },
  {
    "cityCode": "340200",
    "cityName": "\u829C\u6E56\u5E02"
  },
  {
    "cityCode": "340300",
    "cityName": "\u868C\u57E0\u5E02"
  },
  {
    "cityCode": "340400",
    "cityName": "\u6DEE\u5357\u5E02"
  },
  {
    "cityCode": "340500",
    "cityName": "\u9A6C\u978D\u5C71\u5E02"
  },
  {
    "cityCode": "340600",
    "cityName": "\u6DEE\u5317\u5E02"
  },
  {
    "cityCode": "340700",
    "cityName": "\u94DC\u9675\u5E02"
  },
  {
    "cityCode": "340800",
    "cityName": "\u5B89\u5E86\u5E02"
  },
  {
    "cityCode": "341000",
    "cityName": "\u9EC4\u5C71\u5E02"
  },
  {
    "cityCode": "341100",
    "cityName": "\u6EC1\u5DDE\u5E02"
  },
  {
    "cityCode": "341200",
    "cityName": "\u961C\u9633\u5E02"
  },
  {
    "cityCode": "341300",
    "cityName": "\u5BBF\u5DDE\u5E02"
  },
  {
    "cityCode": "341500",
    "cityName": "\u516D\u5B89\u5E02"
  },
  {
    "cityCode": "341600",
    "cityName": "\u4EB3\u5DDE\u5E02"
  },
  {
    "cityCode": "341700",
    "cityName": "\u6C60\u5DDE\u5E02"
  },
  {
    "cityCode": "341800",
    "cityName": "\u5BA3\u57CE\u5E02"
  },
  {
    "cityCode": "350100",
    "cityName": "\u798F\u5DDE\u5E02"
  },
  {
    "cityCode": "350200",
    "cityName": "\u53A6\u95E8\u5E02"
  },
  {
    "cityCode": "350300",
    "cityName": "\u8386\u7530\u5E02"
  },
  {
    "cityCode": "350400",
    "cityName": "\u4E09\u660E\u5E02"
  },
  {
    "cityCode": "350500",
    "cityName": "\u6CC9\u5DDE\u5E02"
  },
  {
    "cityCode": "350600",
    "cityName": "\u6F33\u5DDE\u5E02"
  },
  {
    "cityCode": "350700",
    "cityName": "\u5357\u5E73\u5E02"
  },
  {
    "cityCode": "350800",
    "cityName": "\u9F99\u5CA9\u5E02"
  },
  {
    "cityCode": "350900",
    "cityName": "\u5B81\u5FB7\u5E02"
  },
  {
    "cityCode": "360100",
    "cityName": "\u5357\u660C\u5E02"
  },
  {
    "cityCode": "360200",
    "cityName": "\u666F\u5FB7\u9547\u5E02"
  },
  {
    "cityCode": "360300",
    "cityName": "\u840D\u4E61\u5E02"
  },
  {
    "cityCode": "360400",
    "cityName": "\u4E5D\u6C5F\u5E02"
  },
  {
    "cityCode": "360500",
    "cityName": "\u65B0\u4F59\u5E02"
  },
  {
    "cityCode": "360600",
    "cityName": "\u9E70\u6F6D\u5E02"
  },
  {
    "cityCode": "360700",
    "cityName": "\u8D63\u5DDE\u5E02"
  },
  {
    "cityCode": "360800",
    "cityName": "\u5409\u5B89\u5E02"
  },
  {
    "cityCode": "360900",
    "cityName": "\u5B9C\u6625\u5E02"
  },
  {
    "cityCode": "361000",
    "cityName": "\u629A\u5DDE\u5E02"
  },
  {
    "cityCode": "361100",
    "cityName": "\u4E0A\u9976\u5E02"
  },
  {
    "cityCode": "370100",
    "cityName": "\u6D4E\u5357\u5E02"
  },
  {
    "cityCode": "370200",
    "cityName": "\u9752\u5C9B\u5E02"
  },
  {
    "cityCode": "370300",
    "cityName": "\u6DC4\u535A\u5E02"
  },
  {
    "cityCode": "370400",
    "cityName": "\u67A3\u5E84\u5E02"
  },
  {
    "cityCode": "370500",
    "cityName": "\u4E1C\u8425\u5E02"
  },
  {
    "cityCode": "370600",
    "cityName": "\u70DF\u53F0\u5E02"
  },
  {
    "cityCode": "370700",
    "cityName": "\u6F4D\u574A\u5E02"
  },
  {
    "cityCode": "370800",
    "cityName": "\u6D4E\u5B81\u5E02"
  },
  {
    "cityCode": "370900",
    "cityName": "\u6CF0\u5B89\u5E02"
  },
  {
    "cityCode": "371000",
    "cityName": "\u5A01\u6D77\u5E02"
  },
  {
    "cityCode": "371100",
    "cityName": "\u65E5\u7167\u5E02"
  },
  {
    "cityCode": "371200",
    "cityName": "\u83B1\u829C\u5E02"
  },
  {
    "cityCode": "371300",
    "cityName": "\u4E34\u6C82\u5E02"
  },
  {
    "cityCode": "371400",
    "cityName": "\u5FB7\u5DDE\u5E02"
  },
  {
    "cityCode": "371500",
    "cityName": "\u804A\u57CE\u5E02"
  },
  {
    "cityCode": "371600",
    "cityName": "\u6EE8\u5DDE\u5E02"
  },
  {
    "cityCode": "371700",
    "cityName": "\u83CF\u6CFD\u5E02"
  },
  {
    "cityCode": "410100",
    "cityName": "\u90D1\u5DDE\u5E02"
  },
  {
    "cityCode": "410200",
    "cityName": "\u5F00\u5C01\u5E02"
  },
  {
    "cityCode": "410300",
    "cityName": "\u6D1B\u9633\u5E02"
  },
  {
    "cityCode": "410400",
    "cityName": "\u5E73\u9876\u5C71\u5E02"
  },
  {
    "cityCode": "410500",
    "cityName": "\u5B89\u9633\u5E02"
  },
  {
    "cityCode": "410600",
    "cityName": "\u9E64\u58C1\u5E02"
  },
  {
    "cityCode": "410700",
    "cityName": "\u65B0\u4E61\u5E02"
  },
  {
    "cityCode": "410800",
    "cityName": "\u7126\u4F5C\u5E02"
  },
  {
    "cityCode": "410900",
    "cityName": "\u6FEE\u9633\u5E02"
  },
  {
    "cityCode": "411000",
    "cityName": "\u8BB8\u660C\u5E02"
  },
  {
    "cityCode": "411100",
    "cityName": "\u6F2F\u6CB3\u5E02"
  },
  {
    "cityCode": "411200",
    "cityName": "\u4E09\u95E8\u5CE1\u5E02"
  },
  {
    "cityCode": "411300",
    "cityName": "\u5357\u9633\u5E02"
  },
  {
    "cityCode": "411400",
    "cityName": "\u5546\u4E18\u5E02"
  },
  {
    "cityCode": "411500",
    "cityName": "\u4FE1\u9633\u5E02"
  },
  {
    "cityCode": "411600",
    "cityName": "\u5468\u53E3\u5E02"
  },
  {
    "cityCode": "411700",
    "cityName": "\u9A7B\u9A6C\u5E97\u5E02"
  },
  {
    "cityCode": "419000",
    "cityName": "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212"
  },
  {
    "cityCode": "420100",
    "cityName": "\u6B66\u6C49\u5E02"
  },
  {
    "cityCode": "420200",
    "cityName": "\u9EC4\u77F3\u5E02"
  },
  {
    "cityCode": "420300",
    "cityName": "\u5341\u5830\u5E02"
  },
  {
    "cityCode": "420500",
    "cityName": "\u5B9C\u660C\u5E02"
  },
  {
    "cityCode": "420600",
    "cityName": "\u8944\u9633\u5E02"
  },
  {
    "cityCode": "420700",
    "cityName": "\u9102\u5DDE\u5E02"
  },
  {
    "cityCode": "420800",
    "cityName": "\u8346\u95E8\u5E02"
  },
  {
    "cityCode": "420900",
    "cityName": "\u5B5D\u611F\u5E02"
  },
  {
    "cityCode": "421000",
    "cityName": "\u8346\u5DDE\u5E02"
  },
  {
    "cityCode": "421100",
    "cityName": "\u9EC4\u5188\u5E02"
  },
  {
    "cityCode": "421200",
    "cityName": "\u54B8\u5B81\u5E02"
  },
  {
    "cityCode": "421300",
    "cityName": "\u968F\u5DDE\u5E02"
  },
  {
    "cityCode": "422800",
    "cityName": "\u6069\u65BD\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "429000",
    "cityName": "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212"
  },
  {
    "cityCode": "430100",
    "cityName": "\u957F\u6C99\u5E02"
  },
  {
    "cityCode": "430200",
    "cityName": "\u682A\u6D32\u5E02"
  },
  {
    "cityCode": "430300",
    "cityName": "\u6E58\u6F6D\u5E02"
  },
  {
    "cityCode": "430400",
    "cityName": "\u8861\u9633\u5E02"
  },
  {
    "cityCode": "430500",
    "cityName": "\u90B5\u9633\u5E02"
  },
  {
    "cityCode": "430600",
    "cityName": "\u5CB3\u9633\u5E02"
  },
  {
    "cityCode": "430700",
    "cityName": "\u5E38\u5FB7\u5E02"
  },
  {
    "cityCode": "430800",
    "cityName": "\u5F20\u5BB6\u754C\u5E02"
  },
  {
    "cityCode": "430900",
    "cityName": "\u76CA\u9633\u5E02"
  },
  {
    "cityCode": "431000",
    "cityName": "\u90F4\u5DDE\u5E02"
  },
  {
    "cityCode": "431100",
    "cityName": "\u6C38\u5DDE\u5E02"
  },
  {
    "cityCode": "431200",
    "cityName": "\u6000\u5316\u5E02"
  },
  {
    "cityCode": "431300",
    "cityName": "\u5A04\u5E95\u5E02"
  },
  {
    "cityCode": "433100",
    "cityName": "\u6E58\u897F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "440100",
    "cityName": "\u5E7F\u5DDE\u5E02"
  },
  {
    "cityCode": "440200",
    "cityName": "\u97F6\u5173\u5E02"
  },
  {
    "cityCode": "440300",
    "cityName": "\u6DF1\u5733\u5E02"
  },
  {
    "cityCode": "440400",
    "cityName": "\u73E0\u6D77\u5E02"
  },
  {
    "cityCode": "440500",
    "cityName": "\u6C55\u5934\u5E02"
  },
  {
    "cityCode": "440600",
    "cityName": "\u4F5B\u5C71\u5E02"
  },
  {
    "cityCode": "440700",
    "cityName": "\u6C5F\u95E8\u5E02"
  },
  {
    "cityCode": "440800",
    "cityName": "\u6E5B\u6C5F\u5E02"
  },
  {
    "cityCode": "440900",
    "cityName": "\u8302\u540D\u5E02"
  },
  {
    "cityCode": "441200",
    "cityName": "\u8087\u5E86\u5E02"
  },
  {
    "cityCode": "441300",
    "cityName": "\u60E0\u5DDE\u5E02"
  },
  {
    "cityCode": "441400",
    "cityName": "\u6885\u5DDE\u5E02"
  },
  {
    "cityCode": "441500",
    "cityName": "\u6C55\u5C3E\u5E02"
  },
  {
    "cityCode": "441600",
    "cityName": "\u6CB3\u6E90\u5E02"
  },
  {
    "cityCode": "441700",
    "cityName": "\u9633\u6C5F\u5E02"
  },
  {
    "cityCode": "441800",
    "cityName": "\u6E05\u8FDC\u5E02"
  },
  {
    "cityCode": "441900",
    "cityName": "\u4E1C\u839E\u5E02"
  },
  {
    "cityCode": "442000",
    "cityName": "\u4E2D\u5C71\u5E02"
  },
  {
    "cityCode": "445100",
    "cityName": "\u6F6E\u5DDE\u5E02"
  },
  {
    "cityCode": "445200",
    "cityName": "\u63ED\u9633\u5E02"
  },
  {
    "cityCode": "445300",
    "cityName": "\u4E91\u6D6E\u5E02"
  },
  {
    "cityCode": "450100",
    "cityName": "\u5357\u5B81\u5E02"
  },
  {
    "cityCode": "450200",
    "cityName": "\u67F3\u5DDE\u5E02"
  },
  {
    "cityCode": "450300",
    "cityName": "\u6842\u6797\u5E02"
  },
  {
    "cityCode": "450400",
    "cityName": "\u68A7\u5DDE\u5E02"
  },
  {
    "cityCode": "450500",
    "cityName": "\u5317\u6D77\u5E02"
  },
  {
    "cityCode": "450600",
    "cityName": "\u9632\u57CE\u6E2F\u5E02"
  },
  {
    "cityCode": "450700",
    "cityName": "\u94A6\u5DDE\u5E02"
  },
  {
    "cityCode": "450800",
    "cityName": "\u8D35\u6E2F\u5E02"
  },
  {
    "cityCode": "450900",
    "cityName": "\u7389\u6797\u5E02"
  },
  {
    "cityCode": "451000",
    "cityName": "\u767E\u8272\u5E02"
  },
  {
    "cityCode": "451100",
    "cityName": "\u8D3A\u5DDE\u5E02"
  },
  {
    "cityCode": "451200",
    "cityName": "\u6CB3\u6C60\u5E02"
  },
  {
    "cityCode": "451300",
    "cityName": "\u6765\u5BBE\u5E02"
  },
  {
    "cityCode": "451400",
    "cityName": "\u5D07\u5DE6\u5E02"
  },
  {
    "cityCode": "460100",
    "cityName": "\u6D77\u53E3\u5E02"
  },
  {
    "cityCode": "460200",
    "cityName": "\u4E09\u4E9A\u5E02"
  },
  {
    "cityCode": "460300",
    "cityName": "\u4E09\u6C99\u5E02"
  },
  {
    "cityCode": "469000",
    "cityName": "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212"
  },
  {
    "cityCode": "500100",
    "cityName": "\u91CD\u5E86"
  },
  {
    "cityCode": "510100",
    "cityName": "\u6210\u90FD\u5E02"
  },
  {
    "cityCode": "510300",
    "cityName": "\u81EA\u8D21\u5E02"
  },
  {
    "cityCode": "510400",
    "cityName": "\u6500\u679D\u82B1\u5E02"
  },
  {
    "cityCode": "510500",
    "cityName": "\u6CF8\u5DDE\u5E02"
  },
  {
    "cityCode": "510600",
    "cityName": "\u5FB7\u9633\u5E02"
  },
  {
    "cityCode": "510700",
    "cityName": "\u7EF5\u9633\u5E02"
  },
  {
    "cityCode": "510800",
    "cityName": "\u5E7F\u5143\u5E02"
  },
  {
    "cityCode": "510900",
    "cityName": "\u9042\u5B81\u5E02"
  },
  {
    "cityCode": "511000",
    "cityName": "\u5185\u6C5F\u5E02"
  },
  {
    "cityCode": "511100",
    "cityName": "\u4E50\u5C71\u5E02"
  },
  {
    "cityCode": "511300",
    "cityName": "\u5357\u5145\u5E02"
  },
  {
    "cityCode": "511400",
    "cityName": "\u7709\u5C71\u5E02"
  },
  {
    "cityCode": "511500",
    "cityName": "\u5B9C\u5BBE\u5E02"
  },
  {
    "cityCode": "511600",
    "cityName": "\u5E7F\u5B89\u5E02"
  },
  {
    "cityCode": "511700",
    "cityName": "\u8FBE\u5DDE\u5E02"
  },
  {
    "cityCode": "511800",
    "cityName": "\u96C5\u5B89\u5E02"
  },
  {
    "cityCode": "511900",
    "cityName": "\u5DF4\u4E2D\u5E02"
  },
  {
    "cityCode": "512000",
    "cityName": "\u8D44\u9633\u5E02"
  },
  {
    "cityCode": "513200",
    "cityName": "\u963F\u575D\u85CF\u65CF\u7F8C\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "513300",
    "cityName": "\u7518\u5B5C\u85CF\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "513400",
    "cityName": "\u51C9\u5C71\u5F5D\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "520100",
    "cityName": "\u8D35\u9633\u5E02"
  },
  {
    "cityCode": "520200",
    "cityName": "\u516D\u76D8\u6C34\u5E02"
  },
  {
    "cityCode": "520300",
    "cityName": "\u9075\u4E49\u5E02"
  },
  {
    "cityCode": "520400",
    "cityName": "\u5B89\u987A\u5E02"
  },
  {
    "cityCode": "520500",
    "cityName": "\u6BD5\u8282\u5E02"
  },
  {
    "cityCode": "520600",
    "cityName": "\u94DC\u4EC1\u5E02"
  },
  {
    "cityCode": "522300",
    "cityName": "\u9ED4\u897F\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "522600",
    "cityName": "\u9ED4\u4E1C\u5357\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "522700",
    "cityName": "\u9ED4\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "530100",
    "cityName": "\u6606\u660E\u5E02"
  },
  {
    "cityCode": "530300",
    "cityName": "\u66F2\u9756\u5E02"
  },
  {
    "cityCode": "530400",
    "cityName": "\u7389\u6EAA\u5E02"
  },
  {
    "cityCode": "530500",
    "cityName": "\u4FDD\u5C71\u5E02"
  },
  {
    "cityCode": "530600",
    "cityName": "\u662D\u901A\u5E02"
  },
  {
    "cityCode": "530700",
    "cityName": "\u4E3D\u6C5F\u5E02"
  },
  {
    "cityCode": "530800",
    "cityName": "\u666E\u6D31\u5E02"
  },
  {
    "cityCode": "530900",
    "cityName": "\u4E34\u6CA7\u5E02"
  },
  {
    "cityCode": "532300",
    "cityName": "\u695A\u96C4\u5F5D\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "532500",
    "cityName": "\u7EA2\u6CB3\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "532600",
    "cityName": "\u6587\u5C71\u58EE\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "532800",
    "cityName": "\u897F\u53CC\u7248\u7EB3\u50A3\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "532900",
    "cityName": "\u5927\u7406\u767D\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "533100",
    "cityName": "\u5FB7\u5B8F\u50A3\u65CF\u666F\u9887\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "533300",
    "cityName": "\u6012\u6C5F\u5088\u50F3\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "533400",
    "cityName": "\u8FEA\u5E86\u85CF\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "540100",
    "cityName": "\u62C9\u8428\u5E02"
  },
  {
    "cityCode": "542100",
    "cityName": "\u660C\u90FD\u5730\u533A"
  },
  {
    "cityCode": "542200",
    "cityName": "\u5C71\u5357\u5730\u533A"
  },
  {
    "cityCode": "542300",
    "cityName": "\u65E5\u5580\u5219\u5730\u533A"
  },
  {
    "cityCode": "542400",
    "cityName": "\u90A3\u66F2\u5730\u533A"
  },
  {
    "cityCode": "542500",
    "cityName": "\u963F\u91CC\u5730\u533A"
  },
  {
    "cityCode": "542600",
    "cityName": "\u6797\u829D\u5730\u533A"
  },
  {
    "cityCode": "610100",
    "cityName": "\u897F\u5B89\u5E02"
  },
  {
    "cityCode": "610200",
    "cityName": "\u94DC\u5DDD\u5E02"
  },
  {
    "cityCode": "610300",
    "cityName": "\u5B9D\u9E21\u5E02"
  },
  {
    "cityCode": "610400",
    "cityName": "\u54B8\u9633\u5E02"
  },
  {
    "cityCode": "610500",
    "cityName": "\u6E2D\u5357\u5E02"
  },
  {
    "cityCode": "610600",
    "cityName": "\u5EF6\u5B89\u5E02"
  },
  {
    "cityCode": "610700",
    "cityName": "\u6C49\u4E2D\u5E02"
  },
  {
    "cityCode": "610800",
    "cityName": "\u6986\u6797\u5E02"
  },
  {
    "cityCode": "610900",
    "cityName": "\u5B89\u5EB7\u5E02"
  },
  {
    "cityCode": "611000",
    "cityName": "\u5546\u6D1B\u5E02"
  },
  {
    "cityCode": "620100",
    "cityName": "\u5170\u5DDE\u5E02"
  },
  {
    "cityCode": "620200",
    "cityName": "\u5609\u5CEA\u5173\u5E02"
  },
  {
    "cityCode": "620300",
    "cityName": "\u91D1\u660C\u5E02"
  },
  {
    "cityCode": "620400",
    "cityName": "\u767D\u94F6\u5E02"
  },
  {
    "cityCode": "620500",
    "cityName": "\u5929\u6C34\u5E02"
  },
  {
    "cityCode": "620600",
    "cityName": "\u6B66\u5A01\u5E02"
  },
  {
    "cityCode": "620700",
    "cityName": "\u5F20\u6396\u5E02"
  },
  {
    "cityCode": "620800",
    "cityName": "\u5E73\u51C9\u5E02"
  },
  {
    "cityCode": "620900",
    "cityName": "\u9152\u6CC9\u5E02"
  },
  {
    "cityCode": "621000",
    "cityName": "\u5E86\u9633\u5E02"
  },
  {
    "cityCode": "621100",
    "cityName": "\u5B9A\u897F\u5E02"
  },
  {
    "cityCode": "621200",
    "cityName": "\u9647\u5357\u5E02"
  },
  {
    "cityCode": "622900",
    "cityName": "\u4E34\u590F\u56DE\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "623000",
    "cityName": "\u7518\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "630100",
    "cityName": "\u897F\u5B81\u5E02"
  },
  {
    "cityCode": "630200",
    "cityName": "\u6D77\u4E1C\u5E02"
  },
  {
    "cityCode": "632200",
    "cityName": "\u6D77\u5317\u85CF\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "632300",
    "cityName": "\u9EC4\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "632500",
    "cityName": "\u6D77\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "632600",
    "cityName": "\u679C\u6D1B\u85CF\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "632700",
    "cityName": "\u7389\u6811\u85CF\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "632800",
    "cityName": "\u6D77\u897F\u8499\u53E4\u65CF\u85CF\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "640100",
    "cityName": "\u94F6\u5DDD\u5E02"
  },
  {
    "cityCode": "640200",
    "cityName": "\u77F3\u5634\u5C71\u5E02"
  },
  {
    "cityCode": "640300",
    "cityName": "\u5434\u5FE0\u5E02"
  },
  {
    "cityCode": "640400",
    "cityName": "\u56FA\u539F\u5E02"
  },
  {
    "cityCode": "640500",
    "cityName": "\u4E2D\u536B\u5E02"
  },
  {
    "cityCode": "650100",
    "cityName": "\u4E4C\u9C81\u6728\u9F50\u5E02"
  },
  {
    "cityCode": "650200",
    "cityName": "\u514B\u62C9\u739B\u4F9D\u5E02"
  },
  {
    "cityCode": "652100",
    "cityName": "\u5410\u9C81\u756A\u5730\u533A"
  },
  {
    "cityCode": "652200",
    "cityName": "\u54C8\u5BC6\u5730\u533A"
  },
  {
    "cityCode": "652300",
    "cityName": "\u660C\u5409\u56DE\u65CF\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "652700",
    "cityName": "\u535A\u5C14\u5854\u62C9\u8499\u53E4\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "652800",
    "cityName": "\u5DF4\u97F3\u90ED\u695E\u8499\u53E4\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "652900",
    "cityName": "\u963F\u514B\u82CF\u5730\u533A"
  },
  {
    "cityCode": "653000",
    "cityName": "\u514B\u5B5C\u52D2\u82CF\u67EF\u5C14\u514B\u5B5C\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "653100",
    "cityName": "\u5580\u4EC0\u5730\u533A"
  },
  {
    "cityCode": "653200",
    "cityName": "\u548C\u7530\u5730\u533A"
  },
  {
    "cityCode": "654000",
    "cityName": "\u4F0A\u7281\u54C8\u8428\u514B\u81EA\u6CBB\u5DDE"
  },
  {
    "cityCode": "654200",
    "cityName": "\u5854\u57CE\u5730\u533A"
  },
  {
    "cityCode": "654300",
    "cityName": "\u963F\u52D2\u6CF0\u5730\u533A"
  },
  {
    "cityCode": "659000",
    "cityName": "\u81EA\u6CBB\u533A\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212"
  }
];
exports.citys = citys;

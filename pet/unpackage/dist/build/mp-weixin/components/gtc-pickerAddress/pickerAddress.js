"use strict";var a=require("./data.js"),e=require("../../common/vendor.js");let t=["","",""];const r={data:()=>({value:[0,0,0],array:[],index:0}),created(){this.initSelect()},methods:{initSelect(){this.updateSourceDate().updateAddressDate().$forceUpdate()},columnchange(a){this.updateSelectIndex(a.detail.column,a.detail.value).updateSourceDate().updateAddressDate().$forceUpdate()},updateSourceDate(){return this.array=[],this.array[0]=a.areaData.map((a=>({name:a.name}))),this.array[1]=a.areaData[this.value[0]].cityList.map((a=>({name:a.name}))),this.array[2]=a.areaData[this.value[0]].cityList[this.value[1]].areaList.map((a=>({name:a.name}))),this},updateSelectIndex(a,e){let t=JSON.parse(JSON.stringify(this.value));return t[a]=e,0===a&&(t[1]=0,t[2]=0),1===a&&(t[2]=0),this.value=t,this},updateAddressDate(){return t[0]=this.array[0][this.value[0]].name,t[1]=this.array[1][this.value[1]].name,t[2]=this.array[2][this.value[2]].name,this},bindPickerChange(a){return this.$emit("change",{index:this.value,data:t,array:this.array}),this}}};var i=e._export_sfc(r,[["render",function(a,t,r,i,n,s){return{a:e.o(((...a)=>s.bindPickerChange&&s.bindPickerChange(...a))),b:e.o(((...a)=>s.columnchange&&s.columnchange(...a))),c:n.array,d:n.value}}]]);wx.createComponent(i);

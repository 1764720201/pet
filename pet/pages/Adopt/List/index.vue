<template>
	<view class="choose">
		<view @click="chooseCity">
			<tui-icon name="gps" size="15"></tui-icon>
			<span>{{ currentCity }}</span>
			<tui-icon name="arrowdown" size="15"></tui-icon>
		</view>
		<view class="star-choose">
			<picker @change="changeStar" :range="starList">星球</picker>
			<tui-icon name="arrowdown" size="15"></tui-icon>
		</view>
		<view class="gender-choose">
			<picker @change="changeGender" :range="genderList">性别</picker>
			<tui-icon name="arrowdown" size="15"></tui-icon>
		</view>
		<view class="age-choose">
			<picker @change="changeAge" :range="ageList">年龄</picker>
			<tui-icon name="arrowdown" size="15"></tui-icon>
		</view>
	</view>
	<PetList :where="where"></PetList>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import PetList from '@/components/PetList/index.vue'

const where = ref();
const instance = getCurrentInstance();
instance?.proxy?.$Bus.on('search', (res:string) => {
	if(res){
	    where.value = `pet_name=='${res}'`
	}else{
		where.value=''
	}
});
const currentCity = ref('全部');
const starList=['全部','汪星人','喵星人','其它']
const ageList=['全部','不满1个月','1个月','2个月','3-6个月','6个月-1岁', '1岁','2岁','3岁及以上']
const genderList=['全部','男生','女生']
const starIndex=ref<string>()
const genderIndex=ref<string>()
const ageIndex=ref<string>()
const changeStar=(e)=>{
	starIndex.value=starList[e.detail.value]
	if(starIndex.value=='全部'){
		where.value=''
	}else{
		where.value=`star=='${starIndex.value}'`
	}
}
const changeGender=(e)=>{
	genderIndex.value=genderList[e.detail.value]
	if(genderIndex.value=='全部'){
		where.value=''
	}else{
		where.value=`gender=='${genderIndex.value}'`
	}
}
const changeAge=(e)=>{
	ageIndex.value=ageList[e.detail.value]
	if(ageIndex.value=='全部'){
		where.value=''
	}else{
		where.value=`age=='${ageIndex.value}'`
	}
}
onLoad(async option => {
	if (option.cityName) {
		currentCity.value = option.cityName;
		where.value = `city=='${option.cityName}'`;
	} else {
		where.value = '';
	}
});
const chooseCity = () => {
	uni.navigateTo({
		url: '/components/city-select/City/index'
	});
};
</script>

<style lang="less" scoped>
.navigate {
	position: fixed;
	bottom: 80rpx;
	right: 50rpx;
}
:deep(.uni-select) {
	border: none !important;
}
.choose {
	margin-top: 50rpx;
	width: 90%;
	margin-left: 5%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 25rpx;
	font-weight: 700;
	.star-choose,
	.gender-choose,
	.age-choose {
		display: flex;
	}
}

:deep(.uni-select) {
	border: white;
	border-bottom: white;
}
</style>

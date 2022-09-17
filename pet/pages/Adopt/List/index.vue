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
	<unicloud-db
		ref="udb"
		v-slot:default="{
			data,
			pagination,
			loading,
			error,
			hasMore
		}"
		collection="adoption"
		orderby="issueTime desc"
		field="pet_name as petName,_id,medical,city,issue_time as issueTime,gender,variety,img"
		:getone="false"
		:where="where"
		:page-size="5"
	>
		<view v-if="error" class="error">{{ error.message }}</view>
		<view v-else class="petInfoList">
			<view
				@click="goPetInfo(petInfo)"
				class="petInfo"
				v-for="petInfo in data"
				:key="petInfo._id"
			>
				<view class="upload-picture">
					<view class="wait-adopt">等待领养</view>
					<img class="picture" :src="petInfo.img[0].path" alt="" />
				</view>

				<view class="information">
					<view class="pet-name">
						{{ petInfo.petName }}
						<view class="gender">
							{{ petInfo.gender == '男生' ? '♂' : '♀' }}
						</view>
					</view>
					<view class="variety">{{ petInfo.variety }}</view>
					<view class="medicalList">
						<span class="medical" v-for="med in petInfo.medical">
							{{ med }}
						</span>
					</view>
					<view class="city">
						{{ petInfo.city[1] }} {{ petInfo.city[2] }}
					</view>
					<view class="issue-time">
						<uni-dateformat
							:date="petInfo.issueTime"
							format="yyyy-MM-dd hh:mm:ss"
						></uni-dateformat>
						擦亮
					</view>
				</view>
			</view>
			<view class="navigate" @click="navigateToTop" v-if="navigateTop">
				<uni-icons type="navigate" size="50"></uni-icons>
			</view>
		</view>
		<uni-load-more status="loading" v-if="loading" />
		<uni-load-more status="more" v-if="hasMore && !loading" />
		<uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
	</unicloud-db>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { onReachBottom } from '@dcloudio/uni-app';
const navigateTop = ref(false);
const where = ref();
const udb = ref(null);
const instance = getCurrentInstance();
instance?.proxy?.$Bus.on('search', (res:string) => {
	console.log(res);
	if(res){
	    where.value = `pet_name=='${res}'`
	}else{
		where.value=''
	}
});
onPullDownRefresh(() => {
	udb.value.loadData(() => {
		uni.stopPullDownRefresh();
	});
});
onReachBottom(() => {
	udb.value.loadMore();
	navigateTop.value = true;
});
const navigateToTop = () => {
	navigateTop.value = false;
	uni.pageScrollTo({
		scrollTop: 300,
		duration: 300
	});
};
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
const goPetInfo = (petInfo: PetInfoList) => {
	uni.navigateTo({
		url: `../Home/ApplyAdopt/index?id=${petInfo._id}`
	});
};
type PetInfoList = {
	petName: string;
	medical: string[];
	city: string[];
	issueTime: number;
	gender: string;
	variety: string;
	_id: number;
	img: [];
};

const chooseCity = () => {
	uni.navigateTo({
		url: '/pages/City/index'
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
.petInfoList {
	width: 90%;
	margin-left: 5%;
	.petInfo {
		margin-top: 50rpx;
		display: flex;
		.upload-picture {
			position: relative;
			.picture {
				width: 300rpx;
				height: 270rpx;
				border-radius: 20rpx;
			}
			.wait-adopt {
				background-color: #ea7587;
				position: absolute;
				color: white;
				font-size: 24rpx;
				padding: 8rpx 10rpx;
				border-radius: 20rpx 0rpx 13rpx 0rpx;
			}
		}
		.information {
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.pet-name {
				align-items: center;
				display: flex;
				font-weight: 900;
				.gender {
					margin-left: 30rpx;
					color: #ea7587;
				}
			}
			.variety {
				font-size: 26rpx;
				color: #ccc;
			}
			.medical {
				color: rgb(242, 157, 176);
				font-size: 25rpx;
				padding: 5rpx 15rpx;
				border-radius: 10rpx;
				background-color: rgba(242, 157, 176, 0.2);
				&:nth-child(2) {
					margin-left: 8rpx;
				}
				&:nth-child(3) {
					margin-left: 8rpx;
				}
			}
			.city {
				font-size: 25rpx;
				color: #666;
				align-items: flex-end;
			}
			.issue-time {
				display: flex;
				width: 350rpx;
				justify-content: flex-end;
				color: #666;
				font-size: 20rpx;
			}
		}
	}
}
:deep(.uni-select) {
	border: white;
	border-bottom: white;
}
</style>

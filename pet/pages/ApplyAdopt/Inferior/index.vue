<template>
	<view class="inferior">
		<view class="message" @click="goMessage">
			<uni-icons type="chatboxes" :size="25"></uni-icons>
			留言
		</view>
		<view class="online-consult">在线咨询</view>
		<view class="apply-for" @click="goApply">申请领养</view>
		<view class="collect" @click="collect">
			<uni-icons
				type="star"
				:size="25"
				:color="ifCollect ? '#d78797' : '#ccc'"
			></uni-icons>
			收藏
		</view>
	</view>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { toRefs, ref,watch,getCurrentInstance } from 'vue';
import {onShow,onLoad} from '@dcloudio/uni-app'
const instance=getCurrentInstance()
instance?.proxy?.$Bus.on('ifCollect',(res:boolean)=>{
	ifCollect.value=res
})
const goMessage = () => {
	uni.pageScrollTo({
		scrollTop: 1300,
		duration: 300
	});
};

const userInfo=reactive({
	uid:''
})
const ifCollect = ref<boolean>();
const props = defineProps<{ petInfo: PetInfomation }>();
const { petInfo } = toRefs(props);
watch(
	() => petInfo.value._id,
	newValue => {
		petInfo.value._id = newValue;
		db.collection('collect')
			.where(`user_id=='${userInfo.uid}'&&adopt_id=='${petInfo.value._id}'`)
			.get()
			.then(res => {
				if (res.result.data[0]?._id) {
					ifCollect.value = true;
				} else {
					ifCollect.value = false;
				}
			})
	}
);
type PetInfomation = {
	_id: string;
	age: string;
	city: string[];
	gender: string;
	img: [];
	medical: string[];
	name: string;
	particular: string[];
	pet_name: string;
	phone: string;
	punch: string;
	request: string[];
	source: string[];
	story: string;
	variety: string;
	wx_code: string;
	issue_time: number;
	user_id: string;
	if_adopt:boolean
};
onShow(() => {
	Object.assign(userInfo, uniCloud.getCurrentUserInfo());
});
onLoad(() => {
	Object.assign(userInfo, uniCloud.getCurrentUserInfo());

});
const db = uniCloud.database();
const collect = () => {
	if(!userInfo.uid){
		uni.navigateTo({
			url:
				'/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
		});
	}else{
		instance?.proxy?.$Bus.emit('ifCollect2',!ifCollect.value)
		if (!ifCollect.value) {
			uniCloud
				.callFunction({
					name: 'collect',
					data: {
						userId: userInfo.uid,
						adoptId: petInfo.value._id,
						type:0
					}
				})
				.then(() => {
					ifCollect.value = true;
					uni.showToast({
						title: '收藏成功',
						icon: 'none'
					});
				});
		} else {
			db.collection('collect')
				.where(`user_id=='${userInfo.uid}'&&adopt_id=='${petInfo.value._id}'`)
				.remove()
				.then(() => {
					ifCollect.value = false;
					uni.showToast({
						title: '取消收藏',
						icon: 'none'
					});
				});
		}
	}

};
const goApply=()=>{
	if(petInfo.value.if_adopt){
		uni.showToast({
			title:'已被领养',
			icon:'error'
		})
	}else if(petInfo.value.user_id==userInfo.uid){
		uni.showToast({
			title:'你不能领养自己的宠物',
			icon:'none'
		})
	}else{
	uni.navigateTo({
		url:`./Apply/index?adoptId=${petInfo.value._id}`
	})
	}
}
</script>

<style lang="less">
.inferior {
	z-index: 9999;
	margin-top: 300rpx;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
	background-color: rgba(236, 235, 236);
	padding: 30rpx 0;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	.message,
	.collect {
		align-items: center;
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
	}
	.online-consult,
	.apply-for {
		padding: 15rpx 30rpx;
		border-radius: 40rpx;
		color: white;
	}
	.online-consult {
		background-color: rgb(235, 160, 12);
	}
	.apply-for {
		background-image: linear-gradient(
			to right,
			rgb(235, 152, 191),
			rgb(239, 85, 156)
		);
	}
}
</style>

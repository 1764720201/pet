<template>
	<view class="header">
		<view class="pet-name">{{ petInfo.pet_name }}</view>
		<span class="gender">{{ petInfo.gender == '男生' ? '♂' : '♀' }}</span>
		<view class="share">
			<tui-icon name="share" :size="30" color="#d78797"></tui-icon>
		</view>
		<Collect></Collect>
		<view class="collect" @click="collect">
			<uni-icons
				type="star"
				size="30"
				:color="ifCollect ? '#d78797' : '#ccc'"
			></uni-icons>
		</view>
	</view>

	<view class="body">
		<view class="option">
			<view class="title">姓名：</view>
			<view class="name">{{ petInfo.pet_name }}</view>
		</view>
		<view class="option">
			<view class="title">年龄：</view>
			<view class="name">{{ petInfo.age }}</view>
		</view>
		<view class="option">
			<view class="title">品种：</view>
			<view class="name">{{ petInfo.variety }}</view>
		</view>
		<view class="option">
			<view class="title">性别：</view>
			<view class="name">{{ petInfo.gender }}</view>
		</view>
		<view class="option">
			<view class="title">地区：</view>
			<view class="region">
				{{ petInfo.city[1] }} {{ petInfo.city[2] }}
			</view>
		</view>
		<view class="option">
			<view class="title">领养后需要打卡：</view>
			<view class="name">
				{{ petInfo.punch ? petInfo.punch : '未设置' }}
			</view>
			<tui-icon
				@click="punch"
				name="about-fill"
				:size="15"
				color="#d78797"
				style="margin-left: 3rpx;"
			></tui-icon>
		</view>
	</view>
	<view class="description">
		<view class="title">送养描述</view>
		<view class="story">{{ petInfo.story }}</view>
	</view>
	<view class="request-list">
		<view class="request" v-for="request in petInfo.request" :key="request">
			<view class="true">√</view>
			{{ request }}
		</view>
	</view>
	<view class="issue-time">
		<view class="time">
			<tui-icon name="clock" :size="15"></tui-icon>
			<uni-dateformat
				:date="petInfo.issue_time"
				format="yyyy-MM-dd hh:mm:ss"
			></uni-dateformat>
			<span>发布</span>
		</view>
		<view class="poster"><Poster :petInfo="petInfo"></Poster></view>
	</view>
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog
			type="info"
			cancelText="取消"
			confirmText="确认"
			title="领养打卡须知"
			content="平台流程领养成功后,即可打卡,每周至少一次,反馈宠物动态"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { toRefs, ref,watch,getCurrentInstance } from 'vue';
import {onShow,onLoad} from '@dcloudio/uni-app'
import Poster from '../Poster/index.vue';
const instance=getCurrentInstance()

const userInfo=reactive({
	uid:''
})
const alertDialog = ref(null);
const ifCollect = ref<boolean>();
const punch = () => {
	alertDialog.value.open('center');
};
instance?.proxy?.$Bus.on('ifCollect2',(res:boolean)=>{
	ifCollect.value=res
})
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
			});
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
		instance?.proxy?.$Bus.emit('ifCollect',!ifCollect.value)
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
</script>

<style lang="less" scoped>
.header {
	position: relative;
	display: flex;
	align-items: center;
	margin: 20rpx 0 0 40rpx;
	.pet-name {
		font-size: 50rpx;
		font-weight: 900;
	}
	.gender {
		font-size: 30rpx;
		margin-left: 20rpx;
		color: rgb(236, 87, 158);
	}
	.collect,
	.share {
		background-color: white;
		top: -75rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
	}
	.collect {
		right: 20rpx;
	}
	.share {
		right: 150rpx;
	}
}
.body {
	margin-top: 50rpx;
	display: flex;
	flex-wrap: wrap;
	margin-left: 5%;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	.option {
		margin-top: 30rpx;
		width: 50%;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		.title {
			color: #666;
			font-size: 23rpx;
		}
		.region {
			font-weight: 900;
		}
	}
}
.description {
	margin-top: 50rpx;
	margin-left: 38rpx;
	.title {
		font-weight: 900;
	}
	.story {
		margin-top: 40rpx;
		font-size: 25rpx;
	}
}
.request-list {
	display: flex;
	flex-wrap: wrap;
	margin-top: 30rpx;
	margin-left: 20rpx;
	.request {
		display: flex;
		align-items: center;
		margin-left: 15rpx;
		color: rgb(224, 116, 134);
		font-size: 25rpx;
		.true {
			text-align: center;
			line-height: 24rpx;
			width: 24rpx;
			color: white;
			height: 24rpx;
			font-size: 16rpx;
			margin-right: 10rpx;
			border-radius: 12rpx;
			background-color: rgb(224, 116, 134);
		}
	}
}
.issue-time {
	color: #666;
	font-size: 25rpx;
	display: flex;
	margin-left: 5%;
	width: 90%;
	margin-top: 20rpx;
	justify-content: space-between;
	align-items: center;
	.poster {
		width: 150rpx;
	}
}
</style>

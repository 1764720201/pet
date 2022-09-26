<template>
	<view class="request">
		<view class="main" @click="goIssue">
			<view class="t-icon t-icon-chongwu1"></view>
			<view class="title">发布送养</view>
			<view class="already">
				你已经有
				<span class="quantity">{{ adoptQuantity }}个</span>
				发布
			</view>
		</view>
		<view class="main" @click="goApply">
			<view class="t-icon t-icon-08check"></view>
			<view class="title">申请领养</view>
			<view class="already">
				你已经有
				<span class="quantity">{{ applyQuantity }}个</span>
				申领
			</view>
		</view>
		<view class="main" @click="goReceive">
			<view class="t-icon t-icon-xinshenqing-"></view>
			<view class="title">收到申领</view>
			<view class="already">
				你已经有
				<span class="quantity">{{ receiveQuantity }}个</span>
				申领
			</view>
		</view>
		<view class="main" @click="goFound">
			<view class="t-icon t-icon-chongwu1"></view>
			<view class="title">发布寻宠</view>
			<view class="already">
				你已经有
				<span class="quantity">{{ foundQuantity }}个</span>
				发布
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
const adoptQuantity = ref<number>(0);
const applyQuantity = ref<number>(0);
const receiveQuantity = ref<number>(0);
const foundQuantity = ref<number>(0);

type Receive = {
	result: {
		data: {
			_id: {
				apply: Object[];
			};
		}[];
	};
};
onShow(async () => {
	const userId = uniCloud.getCurrentUserInfo().uid;
	const db = uniCloud.database();
	await db
		.collection('apply')
		.where(`user_id=='${userId}'`)
		.get()
		.then(res => {
			applyQuantity.value = res.result.data.length;
		});
	await db
		.collection('adoption')
		.where(`user_id=='${userId}'`)
		.get()
		.then(res => {
			adoptQuantity.value = res.result.data.length;
		});
	const adoption = db
		.collection('adoption')
		.where(`user_id=='${userId}'`)
		.getTemp();
	await db
		.collection(adoption, 'apply')
		.get()
		.then((res: Receive) => {
			receiveQuantity.value = 0;
			res.result.data.forEach(item => {
				item._id.apply.forEach(apply => {
					if (apply) {
						receiveQuantity.value++;
					}
				});
			});
		});
	await db
		.collection('foundPet')
		.where(`user_id=='${userId}'`)
		.get()
		.then(res => {
			foundQuantity.value = res.result.data.length;
		});
});

const goApply = () => {
	uni.navigateTo({
		url: '/pages/Mine/Request/Apply/index'
	});
};
const goIssue = () => {
	uni.navigateTo({
		url: '/pages/Mine/Request/Issue/index'
	});
};
const goReceive = () => {
	uni.navigateTo({
		url: '/pages/Mine/Request/Receive/index'
	});
};
const goFound = () => {
	uni.navigateTo({
		url: '/pages/Mine/Request/Found/index'
	});
};
</script>

<style lang="less" scoped>
.request {
	margin-top: 40rpx;
	padding: 25rpx;
	margin-left: 5%;
	height: 100%;
	width: 81%;
	display: flex;
	flex-wrap: wrap;
	border-radius: 20rpx;
	justify-content: space-between;
	box-shadow: 0rpx 0rpx 7rpx #ccc;
	.main {
		display: flex;
		flex-direction: column;
		height: 200rpx;
		justify-content: space-evenly;
		align-items: center;
		.title {
			margin-top: 10rpx;
			font-size: 30rpx;
			font-weight: 900;
		}
		.already {
			font-size: 22rpx;
			.quantity {
				color: red;
			}
		}
	}
}
</style>

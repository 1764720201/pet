<template>
	<view class="safe">
		<view class="title">安全</view>
		<view class="content">
			<view class="category" @click="bindPhone">
				<view class="t-icon t-icon-shouji"></view>
				<view>绑定手机</view>
			</view>
			<view class="category">
				<view class="t-icon t-icon-renzheng"></view>
				<view>实名认证</view>
			</view>
			<view class="category">
				<view class="t-icon t-icon-jubao"></view>
				<view>举报中心</view>
			</view>
			<view class="category">
				<view class="t-icon t-icon-kefu"></view>
				<view>客服中心</view>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const userId = uniCloud.getCurrentUserInfo().uid;
const db = uniCloud.database();
const mobile = ref<string>();
onLoad(() => {
	db.collection(`uni-id-users`)
		.where(`_id=='${userId}'`)
		.field('mobile')
		.get({ getOne: true })
		.then(res => {
			mobile.value = res.result.data.mobile;
		});
});
const bindPhone = () => {
	if (!mobile.value) {
		uni.navigateTo({
			url:
				'/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile'
		});
	} else {
		uni.showToast({
			title: '你已经绑定了手机号!',
			icon: 'none'
		});
	}
};
</script>

<style lang="less" scoped>
.safe {
	width: 80%;
	height: 100%;
	margin-left: 5%;
	padding: 30rpx;
	box-shadow: 0 0 7rpx #ccc;
	border-radius: 20rpx;
	margin-top: 50rpx;
	.title {
		font-weight: 900;
	}
	.content {
		display: flex;
		font-size: 25rpx;
		height: 240rpx;
		justify-content: space-evenly;
		.category {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			width: 100%;
			height: 100%;
			margin-top: 20rpx;
			:deep(.t-icon) {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
}
</style>

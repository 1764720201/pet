<template>
	<view class="inferior">
		<view class="message" @click="goMessage">
			<uni-icons type="chatboxes" :size="25"></uni-icons>
			留言
		</view>
		<view class="online-consult">在线咨询</view>
		<view class="apply-for">申请领养</view>
		<view class="collect">
			<uni-icons type="star" :size="25" color="#666"></uni-icons>
			收藏
		</view>
	</view>
</template>

<script lang="ts" setup>
const goMessage = () => {
	uni.pageScrollTo({
		scrollTop: 1300,
		duration: 300
	});
};
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

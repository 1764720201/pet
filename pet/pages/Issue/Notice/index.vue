<template>
	<view class="notice">
		<view class="category">
			<span>领养须知</span>
			<view class="t-icon t-icon-icon-test"></view>
		</view>
		<view class="category">
			<span>送养须知</span>
			<view class="t-icon t-icon-jinggao"></view>
		</view>
		<view class="category">
			<span>领养协议</span>
			<view class="t-icon t-icon-huiyi"></view>
		</view>
	</view>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped>
.notice {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 50rpx;
	.category {
		background-color: rgb(248, 244, 244);
		padding: 27rpx;
		display: flex;
		border-radius: 12rpx;
		align-items: center;
		font-size: 25rpx;
		font-weight: 400;
		:deep(.t-icon) {
			width: 45rpx;
			height: 45rpx;
			margin-left: 15rpx;
		}
	}
}
</style>

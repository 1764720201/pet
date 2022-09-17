<template>
	<view class="safe">
		<view class="title">安全</view>
		<view class="content">
			<view class="category">
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
<script setup lang="ts"></script>

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

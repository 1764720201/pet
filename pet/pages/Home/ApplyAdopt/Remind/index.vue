<template>
	<view class="remind">
		<view class="title">特别提醒</view>
		<view>
			1.未见到宠物却以任何名义（包括运费）要求打款的，请提高警惕（切勿
			异地领养）
		</view>
		<view>2.涉及有偿领养，一律下架：</view>
		<view>3.送养需谨慎.请签订领养协议并约定回访</view>
		<view class="main">
			4.坚持异地送养/领养的，请确认对方是否实名认证，转账前务必要联系客服
		</view>
	</view>
</template>

<script lang="ts" setup></script>

<style lang="less">
.remind {
	padding: 23rpx;
	width: 85%;
	margin-left: 5%;
	color: rgb(248, 135, 156);
	font-size: 25rpx;
	margin-top: 40rpx;
	border-radius: 20rpx;
	background-color: rgba(248, 135, 156, 0.1);
	.title {
		font-size: 32rpx;
		font-weight: 900;
		margin-bottom: 20rpx;
	}
	.main {
		text-decoration: underline;
		font-weight: 900;
	}
}
</style>

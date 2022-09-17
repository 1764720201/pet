<template>
	<view class="title">发表你感兴趣的内容</view>
	<view class="interest">
		<view class="content">
			<view class="t-icon t-icon-026"></view>
			<view class="message">
				<view class="adoption">发布送养</view>
				<view class="adoption-information">
					请填写真实宠物信息和个人信息
				</view>
			</view>

			<tui-button
				width="140rpx"
				height="60rpx"
				shape="circle"
				@click="goAdoption"
			>
				去发布
			</tui-button>
		</view>
		<view class="content">
			<view class="t-icon t-icon-chongwu"></view>
			<view class="message">
				<view class="adoption">发布寻宠</view>
				<view class="adoption-information">
					丢失或捡到宠物,您可以在这里发布
				</view>
			</view>
			<view>
				<tui-button
					width="140rpx"
					height="60rpx"
					shape="circle"
					@click="goFoundPet"
				>
					去发布
				</tui-button>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
const goAdoption = () => {
	uni.navigateTo({
		url: 'Adoption/index'
	});
};
const goFoundPet = () => {
	uni.navigateTo({
		url: 'FoundPet/index'
	});
};
</script>

<style lang="less" scoped>
.title {
	font-size: 20px;
	font-weight: 900;
	margin-left: 20px;
	margin-top: 60px;
}
.interest {
	display: flex;
	flex-direction: column;
	margin-top: 30rpx;
	padding: 30rpx;
	height: 150rpx;
	.content {
		box-shadow: 0 0 7rpx rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
		padding: 30rpx;
		display: flex;
		margin-top: 60rpx;
		align-items: center;
		justify-content: space-evenly;
		.message {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			width: 60%;
			margin-left: 20rpx;
			.adoption {
				font-size: 30rpx;
				font-weight: 900;
			}
			.adoption-information {
				font-size: 20rpx;
				color: #ccc;
			}
		}
	}
}
:deep(.t-icon) {
	width: 90rpx;
	height: 90rpx;
}
</style>

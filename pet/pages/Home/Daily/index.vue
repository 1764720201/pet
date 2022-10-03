<template>
	<view class="suck-cat" @click="goCatDaily">
		<div class="wait-adopt-title">
			<view class="title">
				吸猫的日常
				<view class="more">
					查看更多
					<tui-icon :size="15" name="arrowright"></tui-icon>
				</view>
			</view>
		</div>
		<view class="daily">
			<image
				class="img"
				src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/7391b4f0-8641-4de0-ae3e-129895fe4604.jpeg"
				mode="aspectFill"
			></image>

			<view class="title">吸猫的日常</view>
		</view>
	</view>
</template>
<script setup lang="ts">
const goCatDaily = () => {
	uni.navigateTo({
		url: `/pages/Home/Daily/CatDaily/index`
	});
};
</script>

<style lang="less" scoped>
.wait-adopt-title {
	margin-top: 50rpx;
	display: flex;
	width: 100%;
	justify-content: center;
	.title {
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		font-weight: 600;
		.more {
			display: flex;
			align-items: center;
			font-size: 22rpx;
			color: rgb(193, 192, 192);
		}
	}
}
.daily {
	margin-top: 30rpx;
	width: 100%;
	position: relative;
	display: flex;
	.title {
		text-align: center;
		position: absolute;
		width: 100%;
		top: 150rpx;
		font-family: '隶书';
		font-size: 90rpx;
	}
	.img {
		border-radius: 30rpx;
		height: 350rpx;
		width: 90%;
		margin-left: 5%;
		opacity: 70%;
	}
}
</style>

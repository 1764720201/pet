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
			<img class="img" :src="image" />
			<view class="title">吸猫的日常</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const image = ref();
const db = uniCloud.database();
db.collection('images')
	.where('title=="吸猫的日常"')
	.get()
	.then(res => {
		image.value = res.result.data[0].image[0].path;
	});
const goCatDaily = () => {
	uni.navigateTo({
		url: `/pages/Home/Daily/CatDaily/index?image=${image.value}`
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

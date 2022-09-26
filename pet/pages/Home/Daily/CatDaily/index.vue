<template>
	<view class="cat-daily">
		<view class="cat-daily-header">
			<img :src="image" class="cat-daily-header-image" />
			<view class="cat-daily-header-word">吸猫的日常</view>
			<view class="cat-daily-header-footer">
				<view class="cat-daily-header-footer-read">阅读：0</view>
				<view class="cat-daily-header-footer-discussion">讨论：0</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const image = ref<string>();
onLoad(option => {
	image.value = option.image;
});
</script>

<style lang="scss" scoped>
.cat-daily {
	&-header {
		position: relative;
		&-image {
			width: 100%;
			opacity: 0.7;
		}
		&-word {
			left: 130rpx;
			font-family: '隶书';
			font-size: 90rpx;
			font-weight: 900;
			top: 200rpx;
			position: absolute;
		}
		&-footer {
			padding: 20rpx;
			width: 95%;
			background-color: rgba(0, 0, 0, 0.4);
			position: absolute;
			bottom: 0;
			z-index: 999;
			color: white;
			justify-content: space-between;
			display: flex;
		}
	}
}
</style>

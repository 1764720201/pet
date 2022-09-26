<template>
	<view class="pet-image">
		<view class="wait" v-if="!petInfo.if_adopt">等待领养</view>
		<img v-else :src="alreadyAdopt" class="already" />
		<swiper
			class="swiper"
			:indicator-dots="true"
			indicator-color="white"
			indicator-active-color="#e94e93"
		>
			<swiper-item v-for="image in petInfo.img" :key="image.fileID">
				<img :src="image.url" class="image" />
			</swiper-item>
		</swiper>
		<view class="particularList">
			<span v-for="particular in petInfo.particular" :key="particular">
				<span class="particular">{{ particular }}</span>
			</span>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
const alreadyAdopt = ref<string>();
const db = uniCloud.database();
onLoad(() => {
	db.collection('images')
		.where("title=='已领养'")
		.get()
		.then(res => {
			alreadyAdopt.value = res.result.data[0].image[0].url;
		});
});
type PetInfomation = {
	_id: string;
	age: string;
	city: string[];
	gender: string;
	img: [];
	medical: string[];
	name: string;
	particular: string[];
	pet_name: string;
	phone: string;
	punch: string;
	request: string[];
	source: string[];
	story: string;
	variety: string;
	wx_code: string;
	issue_time: number;
	user_id: string;
	if_adopt: boolean;
};
const props = defineProps<{ petInfo: PetInfomation }>();
const { petInfo } = toRefs(props);
</script>

<style lang="less" scoped>
.pet-image {
	width: 100%;
	position: relative;
	.already {
		position: absolute;
		z-index: 999;
		width: 200rpx;
		height: 200rpx;
		top: -10rpx;
		right: 10rpx;
	}
	.wait {
		color: white;
		font-size: 40rpx;
		text-align: center;
		line-height: 80rpx;
		left: 20rpx;
		top: 15rpx;
		border-radius: 30rpx;
		position: absolute;
		z-index: 999;
		background-image: linear-gradient(
			to right,
			rgb(236, 156, 173),
			rgb(236, 124, 143)
		);
		width: 220rpx;
		height: 80rpx;
	}
	.particularList {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		height: 300rpx;
		position: absolute;
		right: 20rpx;
		top: 100rpx;
		.particular {
			display: flex;
			align-items: center;
			text-align: right;
			border-radius: 10rpx;
			opacity: 70%;
			justify-content: flex-end;
			color: aliceblue;
			padding: 15rpx;
			font-size: 23rpx;
			background: rgba(122, 99, 73, 0.9);
			&::before {
				content: '';
				display: block;
				width: 8rpx;
				height: 8rpx;
				background: red;
				border-radius: 50%;
				margin-right: 10rpx;
			}
		}
	}
	.image {
		width: 100%;
		height: 700rpx;
	}
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 700rpx;
	}
	:deep(.uni-swiper-dots) {
		margin-top: 100prx !important;
	}
	.u-indicator-item-number {
		width: 40px;
		padding: 6rpx 16rpx;
		line-height: 1;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 100rpx;
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.8);
		position: relative;
		left: 45%;
		top: 0;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info {
		position: absolute;
		right: 20rpx;
	}
	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
}
</style>

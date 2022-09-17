<template>
	<view class="uni-margin-wrap">
		<swiper
			class="swiper"
			circular
			:autoplay="true"
			previous-margin="30px"
			next-margin="30px"
		>
			<swiper-item v-for="(swiper, index) in swiperList" :key="index">
				<view class="swiper-item uni-bg-red">
					<img class="img" :src="swiper.path" />
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const swiperList = ref([]);
const db = uniCloud.database();
db.collection('images')
	.where('title=="首页轮播图"')
	.get()
	.then(res => {
		swiperList.value = res.result.data[0].image;
	});
</script>

<style lang="less" scoped>
.uni-margin-wrap {
	width: 690rpx;
	width: 100%;
}
.swiper {
	height: 300rpx;
}
.swiper-item {
	display: block;
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
	padding: 0 8px;
	border-radius: 20px;
	.img {
		width: 100%;
		border-radius: 20px;
		height: 150px;
	}
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
</style>

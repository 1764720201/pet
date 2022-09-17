<template>
	<view class="uni-margin-wrap">
		<swiper class="swiper" circular indicator-dots>
			<swiper-item v-for="(swiper, index) in swiperList" :key="index">
				<img :src="swiper.path" class="img" />
			</swiper-item>
		</swiper>
	</view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const swiperList = ref([]);
const db = uniCloud.database();
db.collection('images')
	.where('title=="领养轮播图"')
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
	.img {
		width: 90%;
		margin-left: 5%;
		height: 150px;
		border-radius: 10px;
	}
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
</style>

<template>
	<view class="today-knowledge">
		<view class="today">
			<view>今日</view>
			<view class="knowledge">
				<view class="knowledge-word">知识</view>
			</view>
		</view>
		<swiper class="swiper" circular :autoplay="true" :vertical="true">
			<swiper-item
				v-for="knowledge in knowledgeList"
				:key="knowledge._id"
				@click="goKnowledge(knowledge._id)"
			>
				{{ knowledge.title }}
			</swiper-item>
		</swiper>
	</view>
	<view class="options">
		<view class="option">
			<view class="t-icon t-icon-qiandao"></view>
			<span>签到</span>
		</view>
		<view class="option" @click="goPopularizationOfScience">
			<view class="t-icon t-icon-shuben-01"></view>
			<span>科普</span>
		</view>
		<view class="option">
			<view class="t-icon t-icon-huodong"></view>
			<span>活动</span>
		</view>
		<view class="option" @click="goFoundPet">
			<view class="t-icon t-icon-aichong02"></view>
			<span>寻宠</span>
		</view>
		<view class="option">
			<view class="t-icon t-icon-daojushangcheng"></view>
			<span>商城</span>
		</view>
	</view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const goFoundPet = () => {
	uni.navigateTo({
		url: '/pages/FoundPet/index'
	});
};
const goPopularizationOfScience = () => {
	uni.navigateTo({
		url: '/pages/Home/Knowledge/PopularizationOfScience/index'
	});
};
const watch = ref<number>();
const goKnowledge = (knowledgeId: string) => {
	uni.navigateTo({
		url: `/pages/Home/Knowledge/PopularizationOfScience/Knowledge/index?knowledgeId=${knowledgeId}`,
		success() {
			db.collection('petKnowledge')
				.where(`_id=='${knowledgeId}'`)
				.get({
					getOne: true
				})
				.then(res => {
					watch.value = res.result.data.watch;
				})
				.then(async () => {
					await db
						.collection('petKnowledge')
						.where(`_id=='${knowledgeId}'`)
						.update({
							watch: watch.value + 1
						});
				});
		}
	});
};
const knowledgeList = ref<any>([]);
const db = uniCloud.database();
onLoad(() => {
	db.collection('petKnowledge')
		.get()
		.then(res => {
			knowledgeList.value = res.result.data;
		});
});
</script>

<style lang="less" scoped>
.swiper {
	font-size: 30rpx;
	line-height: 50rpx;
	width: 700rpx;
	height: 50rpx;
}
.swiper-item {
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
}
.today-knowledge {
	display: flex;
	padding: 40rpx;
	font-size: 25rpx;
	.today {
		width: 40%;
		display: flex;
		align-items: center;
		font-weight: 900;
	}
	.knowledge {
		margin-left: 10rpx;
		background-color: rgb(237, 118, 136);
		color: white;
		padding: 5rpx;
		width: 80rpx;
		text-align: center;
		height: 35rpx;
		line-height: 35rpx;
		font-weight: 900;
		transform: skewX(-5deg);
		.knowledge-word {
			transform: skewX(5deg);
		}
	}
}
.options {
	width: 100%;
	display: flex;
	justify-content: space-around;
	.option {
		height: 65px;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 13px;
		text-align: center;
	}
}
</style>

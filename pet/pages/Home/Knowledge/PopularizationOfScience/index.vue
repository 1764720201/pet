<template>
	<view class="popularzation-of-science">
		<view class="recognition">
			<view class="recognition-icon">
				<uni-icons type="search" size="30" color="white"></uni-icons>
			</view>
			<view class="title">宠物识别</view>
			<view class="tips">一键识别宠物品种</view>
		</view>
		<view class="encyclopedia" @click="goEncyclopedia">
			<view class="encyclopedia-icon">
				<view class="t-icon t-icon-yiliao_jibingbaike"></view>
			</view>
			<view class="title">宠物百科</view>
			<view class="tips">宠物知识大全</view>
		</view>
	</view>
	<view class="knowledge">
		<view class="knowledge-title">科普知识</view>
		<unicloud-db
			ref="udb"
			v-slot:default="{ data, pagination, loading, error, hasMore }"
			collection="petKnowledge"
			field="_id,title,image,watch"
			:getone="false"
			:page-size="5"
		>
			<view v-if="error" class="error">{{ error.message }}</view>
			<view
				v-else
				class="knowledge-item"
				v-for="knowledge in data"
				:key="knowledge._id"
				@click="goKnowledge(knowledge._id)"
			>
				<view class="knowledge-main">
					<view class="knowledge-item-title">
						{{ knowledge.title }}
					</view>
					<view class="knowledge-watch">
						<uni-icons
							type="eye"
							size="18"
							color="#666"
						></uni-icons>
						<view class="watch-quantity">
							{{ knowledge?.watch }}
						</view>
					</view>
				</view>
				<img :src="knowledge.image" class="knowledge-image" />
			</view>
			<uni-load-more status="loading" v-if="loading" />
			<uni-load-more status="more" v-if="hasMore && !loading" />
			<uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
		</unicloud-db>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
const udb = ref(null);
const db = uniCloud.database();
onPullDownRefresh(() => {
	udb.value.loadData(() => {
		uni.stopPullDownRefresh();
	});
});
onReachBottom(() => {
	udb.value.loadMore();
});
const goEncyclopedia = () => {
	uni.navigateTo({
		url: '/pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/index'
	});
};
const watch = ref<number>(0);
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
							watch: watch.value! + 1
						});
					udb.value.refresh();
				});
		}
	});
};
</script>

<style lang="less" scoped>
.knowledge {
	margin-top: 50rpx;
	margin-left: 5%;
	width: 90%;
	&-title {
		font-weight: 900;
		font-size: 35rpx;
	}
	&-item {
		padding-bottom: 40rpx;
		border-bottom: 1px solid #ccc;
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		.knowledge-image {
			width: 200rpx;
			height: 150rpx;
		}
		.knowledge-main {
			display: flex;
			width: 70%;
			justify-content: space-between;
			display: flex;
			flex-direction: column;
			.knowledge-watch {
				display: flex;
				align-items: center;
				color: #666;
				font-size: 23rpx;
				.watch-quantity {
					margin-left: 10rpx;
				}
			}
		}
	}
}

.popularzation-of-science {
	margin-top: 20rpx;
	display: flex;
	justify-content: space-around;
	.recognition,
	.encyclopedia {
		padding-left: 40rpx;
		padding-top: 40rpx;
		display: flex;
		flex-direction: column;
		width: 300rpx;
		height: 220rpx;
		border-radius: 20rpx;
		.recognition-icon,
		.encyclopedia-icon {
			display: flex;
			margin-bottom: 10rpx;
			justify-content: center;
			align-items: center;
			height: 90rpx;
			width: 90rpx;
			border-radius: 20rpx;
		}
		.tips {
			margin-top: 10rpx;
			font-size: 25rpx;
			color: #666;
		}
	}
	.recognition {
		background-color: rgba(229, 115, 80, 0.1);
		&-icon {
			background-color: rgb(232, 123, 94);
		}
	}
	.encyclopedia {
		background-color: rgba(236, 155, 65, 0.1);
		&-icon {
			background-image: linear-gradient(
				to right,
				rgb(230, 181, 63),
				rgb(228, 162, 71)
			);
		}
	}
}
</style>

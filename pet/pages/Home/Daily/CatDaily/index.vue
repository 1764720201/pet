<template>
	<view class="cat-daily">
		<view class="cat-daily-header">
			<img
				src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/7391b4f0-8641-4de0-ae3e-129895fe4604.jpeg"
				class="cat-daily-header-image"
			/>
			<view class="cat-daily-header-word">吸猫的日常</view>
			<view class="cat-daily-header-footer">
				<view class="cat-daily-header-footer-read">
					阅读：{{ readQuantity }}
				</view>
				<view class="cat-daily-header-footer-discussion">
					讨论：{{ disscussQuantity }}
				</view>
			</view>
		</view>
		<view class="description">
			<view class="description-title">#吸猫的日常~#</view>
			<view class="description-lead">
				导语：何以解忧，唯有你身边的毛孩子们，一起来享受宠物们带来的至于瞬间吧~~
			</view>
		</view>
		<view class="tab">
			<lgd-tab
				:tabValue="tabValue"
				:tabIndex="tabIndex"
				textColor="#ec9312 "
				underlineColor="#ec9312"
				@getIndex="getIndex"
			/>
		</view>
		<CatDaily :orderby="orderby"></CatDaily>
		<view class="footer">
			<view class="attention" @click="goMyTopic">我的话题</view>
			<view class="participation" @click="goParticipation">参与讨论</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app';
import { ref, reactive } from 'vue';
import CatDaily from '@/components/Tab/CatDaily/index.vue';
const tabValue = reactive(['推荐', '综合']);
const tabIndex = ref(1);
const orderby = ref('create_time');
const getIndex = (e: number) => {
	switch (e) {
		case 0:
			orderby.value = 'read';
			break;
		case 1:
			orderby.value = 'create_time';
			break;
	}
};
const goParticipation = () => {
	uni.navigateTo({
		url: '/pages/Home/Daily/Participation/index'
	});
};
const goMyTopic = () => {
	uni.navigateTo({
		url: '/pages/Home/Daily/MyTopic/index'
	});
};
const db = uniCloud.database();
const readQuantity = ref<number>(0);
const disscussQuantity = ref<number>(0);
onShow(() => {
	db.collection('topic')
		.field('read')
		.get({
			getCount: true
		})
		.then(res => {
			disscussQuantity.value = res.result.count;
			readQuantity.value = res.result.data
				.map((value: { read: number }) => {
					return value.read;
				})
				.reduce((pre: number, cur: number) => {
					return pre + cur;
				}, 0);
		});
});
</script>

<style lang="scss" scoped>
:deep(.tabBox) {
	margin-left: 20rpx;
	width: 25%;
}
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
			bottom: 10rpx;
			padding: 20rpx;
			width: 95%;
			background-color: rgba(0, 0, 0, 0.4);
			position: absolute;
			z-index: 999;
			color: white;
			justify-content: space-between;
			display: flex;
		}
	}
	.description {
		margin-left: 5%;
		width: 90%;
		&-title {
			margin-top: 30rpx;
			font-weight: 900;
			font-size: 40rpx;
			color: rgb(236, 147, 18);
		}
		&-lead {
			font-size: 28rpx;
			margin-top: 30rpx;
		}
	}
	.tab {
		margin-top: 30rpx;
	}
	.footer {
		z-index: 999;
		align-items: center;
		height: 120rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		background-color: #e4e3e2;
		justify-content: space-around;
		.attention,
		.participation {
			width: 250rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border-radius: 50rpx;
		}
		.attention {
			background-color: rgba(115, 114, 113, 0.3);
			color: #666;
		}
		.participation {
			color: white;
			background-color: rgb(186, 141, 96);
		}
	}
}
</style>

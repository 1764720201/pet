<template>
	<view class="received">
		<view class="collect-praise" @click="goMyCollect">
			<view class="t-icon t-icon-shoucang"></view>
			<view class="word">点赞收藏({{ collectQuantity }})</view>
		</view>
		<view class="comment" @click="goMyComment">
			<view class="t-icon t-icon-pinglun"></view>
			<view class="word">评论({{ commentQuantity }})</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
const userId = uniCloud.getCurrentUserInfo().uid;
const db = uniCloud.database();
const commentQuantity = ref<number>(0);
const collectQuantity = ref<number>(0);
const goMyComment = () => {
	uni.navigateTo({
		url: './MyComment/index'
	});
};
const goMyCollect = () => {
	uni.navigateTo({
		url: './MyCollect/index'
	});
};
type Data = {
	_id: {
		comment?: string[];
		collect?: string[];
	};
};
type Res = {
	result: {
		data: Data[];
	};
};
const getQuantity = (res: Res, option: string) => {
	res.result.data.forEach(value => {
		if (option == 'collect') {
			value._id.collect.forEach(collect => {
				if (collect) {
					collectQuantity.value++;
				}
			});
		} else if (option == 'comment') {
			value._id.comment.forEach(comment => {
				if (comment) {
					commentQuantity.value++;
				}
			});
		}
	});
};
onLoad(async () => {
	const adoption = db
		.collection('adoption')
		.where(`user_id=='${userId}'`)
		.field('_id')
		.getTemp();
	const foundPet = db
		.collection('foundPet')
		.where(`user_id=='${userId}'`)
		.field('_id')
		.getTemp();
	db.collection(adoption, 'comment')
		.get()
		.then((res: Res) => {
			getQuantity(res, 'comment');
		})
		.then(() => {
			db.collection(foundPet, 'comment')
				.get()
				.then((res: Res) => {
					getQuantity(res, 'comment');
				});
		});
	db.collection(adoption, 'collect')
		.get()
		.then((res: Res) => {
			getQuantity(res, 'collect');
		})
		.then(() => {
			db.collection(foundPet, 'collect')
				.get()
				.then((res: Res) => {
					getQuantity(res, 'collect');
				});
		});
});
</script>

<style lang="less" scoped>
.received {
	margin-top: 50rpx;
	height: 250rpx;
	width: 100%;
	box-shadow: 0 0 4rpx #ccc;
	align-items: center;
	display: flex;
	justify-content: space-evenly;
	.collect-praise,
	.comment {
		display: flex;
		flex-direction: column;
		align-items: center;
		.word {
			font-size: 27rpx;
		}
		.t-icon {
			width: 80rpx;
			height: 80rpx;
		}
	}
}
</style>

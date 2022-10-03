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
import { ref, watch, toRefs } from 'vue';
import { onShow } from '@dcloudio/uni-app';
const props = defineProps<{ hasLogin: boolean; userId: string }>();
const { hasLogin, userId } = toRefs(props);
const db = uniCloud.database();
const getQuantity = async () => {
	const comment = db
		.collection('comment')
		.where(`comment_type==0||comment_user_id=='${userId.value}'`)
		.getTemp();
	const collect = db
		.collection('collect')
		.where('type==0||type==1||type==4')
		.field('adopt_id,topic_id,found_id,_id,type')
		.getTemp();
	getSum(comment, 'comment');
	await getSum(collect, 'collect');
};
watch(
	() => hasLogin.value,
	async () => {
		await getQuantity();
	}
);
onShow(async () => {
	await getQuantity();
});

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
const getSum = async (collection: any, option: string) => {
	collectQuantity.value = 0;
	commentQuantity.value = 0;
	const col = option;
	const adoption = db
		.collection('adoption')
		.where(`user_id=='${userId.value}'`)
		.getTemp();
	const foundPet = db
		.collection('foundPet')
		.where(`user_id=='${userId.value}'`)
		.getTemp();
	const topic = db
		.collection('topic')
		.where(`user_id=='${userId.value}'`)
		.getTemp();
	await db
		.collection(collection, adoption, foundPet, topic)
		.field(
			'size(adopt_id) as adopt,size(topic_id) as topic,size(found_id) as found'
		)
		.groupBy('num')
		.groupField(
			'sum(adopt) as sumAdopt,sum(found) as sumFound,sum(topic) as sumTopic'
		)
		.get({ getOne: true })
		.then(res => {
			const arr: number[] = Object.values(res.result.data);
			if (col == 'collect') {
				for (let i = 1; i < 4; i++) {
					collectQuantity.value += arr[i];
				}
			} else if (col == 'comment') {
				for (let i = 1; i < 4; i++) {
					commentQuantity.value += arr[i];
				}
			}
		})
		.catch(err => {
			console.log(err);
		});
};
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

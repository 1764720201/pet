<template>
	<view class="topic-list">
		<view v-for="topic in topicList" :key="topic.create_time">
			<view class="topic">
				<view class="user">
					<image
						:src="topic.user_id[0].avatar_file.url"
						class="user-avatar"
						mode="aspectFill"
					></image>
					<view class="user-info">
						<view class="user-info-nickname">
							{{ topic.user_id[0].nickname }}
						</view>
						<view class="user-info-time">
							<uni-dateformat
								:date="topic.create_time"
								format="MM-dd hh:mm"
							></uni-dateformat>
						</view>
					</view>
				</view>
				<view
					class="topic-content"
					@click="goTopicDetail(topic._id._value)"
				>
					{{ topic.content }}
				</view>
				<view
					class="topic-image"
					@click="goTopicDetail(topic._id._value)"
				>
					<view v-for="(image, index) in topic.image" :key="index">
						<image
							:src="image.path"
							class="topic-image-item"
							mode="aspectFill"
						></image>
					</view>
				</view>
				<view class="topic-footer">
					<view class="praise" @click="praise(topic._id._value)">
						<tui-icon
							name="agree"
							size="23"
							:color="
								praiseList.includes(topic._id._value)
									? '#ec9312'
									: '#ccc'
							"
						></tui-icon>
						<view class="praise-quantity">
							{{ topic._id.collect.length }}
						</view>
					</view>
					<view class="message">
						<tui-icon name="message" size="25"></tui-icon>
						<view class="message-quantity">
							{{ topic._id.comment.length }}
						</view>
					</view>
					<view class="share">
						<view class="t-icon t-icon-fenxiang"></view>
						<button open-type="share" class="share-quantity">
							分享
						</button>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more status="loading" v-if="ifLoading" />
		<uni-load-more status="noMore" v-if="!ifLoading" />
	</view>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import { onReachBottom, onShow, onShareAppMessage } from '@dcloudio/uni-app';
const props = defineProps<{ orderby: string }>();
const { orderby } = toRefs(props);
const userId = uniCloud.getCurrentUserInfo().uid;
const limit = ref<number>(3);
const count = ref<number>();
const ifLoading = ref<boolean>(true);
onShareAppMessage(res => {
	if (res.from === 'button') {
		// 来自页面内分享按钮
		console.log(res.target);
	}
	console.log(res);
	return {
		title: '自定义分享标题',
		path: '/pages/test/test?id=123'
	};
});
onReachBottom(() => {
	limit.value += 3;
	ifLoading.value = true;
	getPraiseList();
	if (limit.value > count.value!) {
		ifLoading.value = false;
	}
});
type Topic = {
	content: string;
	create_time: number;
	image: { path: string }[];
	read: number;
	user_id: { avatar_file: { url: string }; nickname: string }[];
	_id: {
		_value: string;
		comment: {
			avatar_url: string;
			comment: string;
			comment_type: number;
			create_time: number;
			nickname: string;
			topic_id: string;
			user_id: string;
			_id: string;
		}[];
		collect: {
			user_id: string;
			type: number;
			topic_id: string;
		}[];
	};
};
const topicList = ref<Topic[]>([]);
const getPraiseList = () => {
	db.collection(topic, 'comment', 'uni-id-users', 'collect')
		.limit(limit.value)
		.get({ getCount: true })
		.then(res => {
			count.value = res.result.count;
			topicList.value = res.result.data;
		});
};
onShow(() => {
	getPraiseList();
	getPraise();
});
const read = ref<number>();
const db = uniCloud.database();
const topic = db
	.collection('topic')
	.orderBy(orderby.value, 'desc')
	.getTemp();
const praiseList = ref<string[]>([]);
const user = db
	.collection('uni-id-users')
	.where(`_id=='${userId}'`)
	.field('_id')
	.getTemp();
const getPraise = () => {
	db.collection(user, 'collect')
		.field('_id.collect as collect')
		.get({ getOne: true })
		.then(res => {
			praiseList.value = res.result.data.collect
				.filter((value: { type: number; user_id: string }) => {
					return value.type == 4 && value.user_id == userId;
				})
				.map((value: { topic_id: string }) => {
					return value.topic_id;
				});
		});
};
const ifPraise = ref<boolean>();
const praise = async (topicId: string) => {
	const getCollect = async () => {
		await db
			.collection('collect')
			.where(`topic_id=='${topicId}'&&user_id=='${userId}'`)
			.get({ getOne: true })
			.then(res => {
				if (res.result.data) {
					ifPraise.value = true;
				} else {
					ifPraise.value = false;
				}
			});
	};
	getCollect().then(() => {
		if (!ifPraise.value) {
			uniCloud.callFunction({
				name: 'collect',
				data: {
					type: 4,
					topicId: topicId,
					userId: userId
				},
				success() {
					uni.showToast({
						title: '点赞成功'
					});
					getPraise();
					getPraiseList();
					getCollect();
				},
				fail(err) {
					console.log(err);
				}
			});
		} else {
			db.collection('collect')
				.where(`topic_id=='${topicId}'&&user_id=='${userId}'`)
				.remove()
				.then(() => {
					getPraise();
					getPraiseList();
					getCollect();
				});
		}
	});
};
const goTopicDetail = (id: string) => {
	uni.navigateTo({
		url: `/pages/Home/Daily/CatDaily/TopicDetail/index?id=${id}`,
		async success() {
			await db
				.collection('topic')
				.where(`_id=='${id}'`)
				.field('read')
				.get({ getOne: true })
				.then(res => {
					read.value = res.result.data.read;
				});
			db.collection('topic')
				.where(`_id=='${id}'`)
				.update({
					read: read.value! + 1
				});
		},
		fail(err) {
			console.log(err);
		}
	});
};
</script>

<style lang="scss" scoped>
.topic-list {
	padding-bottom: 150rpx;
}
.topic {
	padding-bottom: 60rpx;
	margin-top: 30rpx;
	margin-left: 3%;
	width: 94%;
	.user {
		display: flex;
		&-avatar {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
		}
		&-info {
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			&-time {
				color: #666;
				font-size: 25rpx;
			}
		}
	}
	&-content {
		margin-top: 30rpx;
	}
	&-image {
		margin-top: 30rpx;
		justify-content: space-between;
		display: flex;
		flex-wrap: wrap;
		&-item {
			border-radius: 30rpx;
			width: 220rpx;
			height: 220rpx;
		}
		&::after {
			content: '';
			width: 33.33%;
		}
	}
	&-footer {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		.message,
		.share,
		.praise {
			z-index: 777;
			display: flex;
			align-items: center;
			&-quantity {
				margin-left: 15rpx;
			}
			.t-icon-fenxiang {
				width: 40rpx;
				height: 40rpx;
			}
		}
		.share-quantity {
		}
	}
}
</style>

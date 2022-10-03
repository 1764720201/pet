<template>
	<view class="topic-detail">
		<view class="user">
			<image
				:src="userInfo.avatar_file.url"
				class="user-avatar"
				mode="aspectFill"
			></image>
			<view class="user-info">
				<view class="user-info-nickname">{{ userInfo.nickname }}</view>
				<view class="user-info-time">
					<uni-dateformat
						:date="topicInfo.create_time"
						format="yyyy-MM-dd hh:mm:ss"
					></uni-dateformat>
				</view>
			</view>
		</view>
		<view class="content">{{ topicInfo.content }}</view>
		<view class="image">
			<view v-for="(image, index) in topicInfo.image" :key="index">
				<image
					:src="image.path"
					class="image-item"
					mode="aspectFill"
				></image>
			</view>
		</view>
		<view class="footer">
			<view class="comment">评论</view>
			<view class="report">
				<uni-icons type="info" size="20" color="#ccc"></uni-icons>
				<view class="report-name">举报</view>
			</view>
		</view>
		<Message :commentList="commentList" :where="where"></Message>
	</view>
	<view class="send">
		<view class="send-input" @click="openInput">
			<view class="t-icon t-icon-qianbi"></view>
			在这里填写评论哦~
		</view>
		<uni-icons
			type="hand-up"
			size="26"
			:color="ifPraise ? '#ec9312' : '#ccc'"
			@click="praise"
		></uni-icons>
		<view class="share">
			<button class="t-icon t-icon-fenxiang" open-type="share"></button>
			分享
		</view>
	</view>
	<uni-popup ref="popup" type="bottom">
		<view class="comment-input">
			<view class="comment-header">
				<uni-icons
					type="closeempty"
					size="30"
					@click="cancelInput"
				></uni-icons>
				<view class="comment-title">评论</view>
				<view class="publish" @click="comment">发送</view>
			</view>
			<textarea
				v-model="commentContent"
				class="comment-textarea"
				placeholder="给你一个评论的机会"
			></textarea>
		</view>
	</uni-popup>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import Message from '@/components/Message/index.vue';
import { reactive, ref } from 'vue';
const userId = uniCloud.getCurrentUserInfo().uid;
const popup = ref(null);
const where = ref<string>('');
const topicId = ref<string>();
const commentContent = ref<string>();
const openInput = () => {
	if (!userId) {
		uni.navigateTo({
			url:
				'/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
		});
	} else {
		popup.value.open('bottom');
	}
};
const cancelInput = () => {
	popup.value.close();
};
const comment = () => {
	if (!commentContent.value) {
		uni.showToast({
			title: '请输入内容'
		});
	} else {
		uniCloud.callFunction({
			name: 'comment',
			data: {
				type: 0,
				comment: commentContent.value,
				topicId: topicId.value,
				userId: userId,
				avatarUrl: commneterInfo.avatar_file.url,
				nickname: commneterInfo.nickname
			},
			success() {
				commentContent.value = '';
				getComment();
				popup.value.close();
				uni.showToast({
					title: '评论成功',
					icon: 'none'
				});
			},
			fail(err) {
				console.log(err);
			}
		});
	}
};
type UserInfo = {
	avatar_file: {
		url: string;
	};
	nickname: string;
	_id: string;
};
type Topic = {
	content: string;
	image: { path: string }[];
	user_id: string;
	create_time: number;
};
const userInfo = reactive<UserInfo>({
	avatar_file: { url: '' },
	nickname: '',
	_id: ''
});
const commneterInfo = reactive<UserInfo>({
	avatar_file: { url: '' },
	nickname: '',
	_id: ''
});
const topicInfo = reactive<Topic>({
	content: '',
	image: [],
	user_id: '',
	create_time: 0
});
const commentList = ref([]);
const db = uniCloud.database();
const ifPraise = ref<boolean>();
const getPraise = () => {
	db.collection('collect')
		.where(`user_id=='${userId}'&&topic_id=='${topicId.value}'`)
		.get({ getOne: true })
		.then(res => {
			if (res.result.data) {
				ifPraise.value = true;
			} else {
				ifPraise.value = false;
			}
		});
};
const praise = () => {
	if (!ifPraise.value) {
		uniCloud.callFunction({
			name: 'collect',
			data: {
				type: 4,
				topicId: topicId.value,
				userId: userId
			},
			success() {
				getPraise();
				uni.showToast({
					title: '成功点赞'
				});
			}
		});
	} else {
		db.collection('collect')
			.where(`user_id=='${userId}'&&topic_id=='${topicId.value}'`)
			.remove()
			.then(() => {
				getPraise();
			});
	}
};
const getComment = () => {
	db.collection('comment')
		.where(`topic_id=='${topicId.value}'&&comment_type==0`)
		.get()
		.then(res => {
			commentList.value = res.result.data;
		});
};
onLoad(async option => {
	topicId.value = option.id;
	await db
		.collection('topic')
		.where(`_id=='${option.id}'`)
		.field('image,content,user_id,create_time')
		.get({ getOne: true })
		.then(res => {
			Object.assign(topicInfo, res.result.data);
			where.value = `topic_id=='${topicId.value}'&&comment_type==1`;
			getPraise();
		})
		.then(() => {
			db.collection('uni-id-users')
				.where(`_id=='${topicInfo.user_id}'`)
				.field('nickname,avatar_file')
				.get({ getOne: true })
				.then(res => {
					Object.assign(userInfo, res.result.data);
				});
		})
		.then(() => {
			db.collection('uni-id-users')
				.where(`_id=='${userId}'`)
				.field('nickname,avatar_file')
				.get({ getOne: true })
				.then(res => {
					Object.assign(commneterInfo, res.result.data);
				});
		})
		.then(() => {
			getComment();
		});
});
</script>

<style lang="scss" scoped>
.t-icon {
	width: 40rpx;
	height: 40rpx;
}
.topic-detail {
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
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			&-time {
				color: #666;
				font-size: 25rpx;
			}
		}
	}
	.image {
		margin-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		&-item {
			margin-top: 10rpx;
			border-radius: 30rpx;
			width: 230rpx;
			height: 230rpx;
		}
		&::after {
			content: '';
			width: 33.3%;
		}
	}
	.content {
		margin-top: 20rpx;
	}
	.footer {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		.report {
			display: flex;
			align-items: center;
			&-name {
				margin-left: 10rpx;
				font-size: 23rpx;
				color: #ccc;
			}
		}
		.comment {
			font-weight: 900;
		}
	}
}
.send {
	margin-top: 140rpx;
	height: 130rpx;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	justify-content: space-around;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	&-input {
		color: #949494;
		border-radius: 40rpx;
		padding: 15rpx 20rpx;
		padding-right: 140rpx;
		display: flex;
		align-items: center;
		background-color: rgba(157, 156, 157, 0.1);
	}
	.share {
		width: 110rpx;
		justify-content: space-between;
		display: flex;

		align-items: center;
	}
}
.comment-input {
	border-top-left-radius: 40rpx;
	border-top-right-radius: 40rpx;
	height: 400rpx;
	width: 100%;
	background-color: white;
	.comment-header {
		padding: 30rpx;
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.publish {
			padding: 15rpx 40rpx;
			border-radius: 40rpx;
			color: white;
			background-color: #ba8d60;
		}
		.comment-title {
			font-weight: 900;
		}
	}
	.comment-textarea {
		height: 150rpx;
		width: 78%;
		margin-left: 6%;
		padding: 30rpx;
		border: 1px solid #ccc;
	}
}
</style>

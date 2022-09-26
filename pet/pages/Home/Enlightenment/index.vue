<template>
	<view class="enlightenment">
		<view class="title">{{ foundInfo.title }}</view>
		<view class="time">
			<tui-icon name="clock" :size="15"></tui-icon>
			<uni-dateformat
				:date="foundInfo.createTime"
				format="yyyy-MM-dd hh:mm:ss"
			></uni-dateformat>
		</view>
		<view class="information">
			<view class="option">
				<view class="label">姓名：</view>
				{{ foundInfo.name }}
			</view>
			<view class="option">
				<view class="label">品种：</view>
				{{ foundInfo.variety }}
			</view>
			<view class="option">
				<view class="label">性别：</view>
				{{ foundInfo.gender }}
			</view>
			<view class="option">
				<view class="label">类型：</view>
				{{ foundInfo.type }}
			</view>
		</view>
		<view class="thread">
			<view class="city">
				<view class="sign">走失区域:</view>
				{{ foundInfo.city[0] }}/{{ foundInfo.city[1] }}/{{
					foundInfo.city[2]
				}}
			</view>
			<view class="author-information">
				<img :src="userInfo.imgURL" class="avatar" />
				<view class="publish">
					<view class="author-name">{{ userInfo.nickname }}</view>
					<view class="publisher">发布者</view>
				</view>
				<view class="copy-wxCode" @click="copyWxCode">复制微信号</view>
				<view class="call-phone" @click="callPhone">
					<tui-icon
						name="voipphone"
						:size="25"
						color="#ff9db1"
					></tui-icon>
					电话联系他
				</view>
			</view>
			<view class="detail">
				<view class="detail-header">
					<view class="introduce">详情</view>
					<view class="collect" @click="collect">
						<view
							class="t-icon t-icon-shoucang1"
							v-if="!ifCollect"
						></view>
						<view class="t-icon t-icon-shoucang11" v-else></view>
					</view>
				</view>
				{{ foundInfo.introduce }}
			</view>
		</view>
		<view class="pictureList">
			<view
				v-for="picture in foundInfo.uploadPicture"
				:key="picture.fileId"
			>
				<img :src="picture.path" class="picture" />
			</view>
		</view>
		<view class="comment">
			<view class="content" @click="send">
				<view class="t-icon t-icon-qianbi"></view>
				<view class="input-thread">写下你的线索吧!</view>
			</view>
			<view class="share">分享</view>
		</view>
		<view class="comment-list">
			<view class="comment-title">评论</view>
			<view
				class="comment-item"
				v-for="comment in commentList"
				:key="comment._id"
			>
				<img :src="comment.avatar_url" class="comment-avatar" />
				<view class="time-name">
					<view class="comment-name">{{ comment.nickname }}</view>
					<view class="comment-time">
						<uni-dateformat
							:date="comment.create_time"
							format="yyyy-MM-dd hh:mm:ss"
						></uni-dateformat>
					</view>
					<view class="comment-content">{{ comment.comment }}</view>
				</view>
			</view>
		</view>
	</view>
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog
			ref="inputClose"
			mode="input"
			title="输入内容"
			placeholder="写下你的线索吧"
			@confirm="sendComment"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
const db = uniCloud.database();
const userId = uniCloud.getCurrentUserInfo().uid;
const inputDialog = ref(null);
const send = () => {
	inputDialog.value.open('center');
};
const sendComment = (e: string) => {
	uniCloud.callFunction({
		name: 'comment',
		data: {
			commentContent: e,
			commentType: 2,
			userId: userId,
			foundId: foundInfo._id,
			nickname: commenterInfo.nickname,
			avatarUrl: commenterInfo.avatar_file.url
		},
		success() {
			uni.showToast({
				title: '评论成功'
			});
			getComment();
		},
		fail(err) {
			console.log(err);
		}
	});
};
const commenterInfo = reactive({
	avatar_file: {
		url: ''
	},
	nickname: ''
});
const foundInfo = reactive({
	_id: '',
	variety: '',
	name: '',
	gender: '',
	type: '',
	city: [],
	introduce: '',
	userId: '',
	uploadPicture: [],
	wxCode: '',
	title: '',
	createTime: 0,
	phone: ''
});
const userInfo = reactive({
	id: '',
	nickname: '',
	imgURL: ''
});
const callPhone = () => {
	uni.makePhoneCall({
		phoneNumber: foundInfo.phone
	});
};
const copyWxCode = () => {
	uni.setClipboardData({
		data: foundInfo.wxCode,
		success: function() {
			uni.showToast({
				title: '成功复制微信号'
			});
		}
	});
};
const ifCollect = ref<boolean>();
const commentList = ref<any>([]);
const getComment = async () => {
	await db
		.collection('comment')
		.where(`found_id=='${foundInfo._id}'&&comment_type==2`)
		.get()
		.then(res => {
			commentList.value = res.result.data;
		});
};
onLoad(async option => {
	db.collection('foundPet')
		.where(`_id == '${option.id}'`)
		.field(
			'create_time as createTime, title,variety,name,gender,type,city,introduce,user_id as userId,uploadPicture,wx_code as wxCode,phone'
		)
		.get()
		.then(res => {
			Object.assign(foundInfo, res.result.data[0]);
		})
		.then(() => {
			db.collection('uni-id-users')
				.where(`_id == '${foundInfo.userId}'`)
				.field('nickname,avatar_file')
				.get()
				.then(res => {
					userInfo.id = res.result.data[0]._id;
					userInfo.nickname = res.result.data[0].nickname;
					userInfo.imgURL = res.result.data[0].avatar_file.url;
				});
		})
		.then(() => {
			db.collection('uni-id-users')
				.where(`_id=='${userId}'`)
				.field('nickname,avatar_file')
				.get()
				.then(res => {
					Object.assign(commenterInfo, res.result.data[0]);
				});
		})
		.then(() => {
			getCollect();
			getComment();
		})
		.catch(err => {
			console.log(err.message);
		});
});
const getCollect = async () => {
	await db
		.collection('collect')
		.where(`user_id=='${userId}'&&found_id=='${foundInfo._id}'`)
		.get()
		.then(res => {
			if (!res.result.data[0]) {
				ifCollect.value = false;
			} else {
				ifCollect.value = true;
			}
		});
};
const collect = () => {
	if (!ifCollect.value) {
		uniCloud.callFunction({
			name: 'collect',
			data: {
				type: 1,
				userId: userId,
				foundId: foundInfo._id
			},
			success() {
				uni.showToast({
					title: '收藏成功'
				});
				getCollect();
			},
			fail(err) {
				console.log(err);
			}
		});
	} else {
		db.collection('collect')
			.where(`user_id=='${userId}'&&found_id=='${foundInfo._id}'`)
			.remove()
			.then(() => {
				getCollect();
			});
	}
};
</script>

<style lang="less" scoped>
.enlightenment {
	margin-top: 50rpx;
	width: 90%;
	margin-left: 5%;
	.title {
		font-size: 50rpx;
		font-weight: 900;

		width: 100%;
	}
	.time {
		display: flex;
		align-items: center;
		width: 280rpx;
		justify-content: space-between;
		margin-top: 30rpx;
		font-size: 25rpx;
		color: #666;
	}
	.information {
		margin-top: 50rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.option {
			display: flex;
			width: 50%;
			justify-content: flex-start;
			.label {
				color: #666;
			}
		}
	}
	.thread {
		height: 500rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.city {
			display: flex;
			align-items: center;
			.sign {
				color: #666;
				margin-right: 20rpx;
			}
			&::before {
				content: '';
				width: 15rpx;
				height: 15rpx;
				display: block;
				border-radius: 50%;
				background-color: orange;
				margin-right: 10rpx;
			}
		}
		.author-information {
			height: 130rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.avatar {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
			}
			.publish {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.publisher {
					padding: 5rpx 10rpx;
					font-size: 25rpx;
					border-radius: 10rpx;
					border: 3rpx solid #e0b47e;
					color: #e0b47e;
				}
			}
			.copy-wxCode {
				width: 150rpx;
				height: 60rpx;
				color: white;
				font-size: 24rpx;
				text-align: center;
				border-radius: 30rpx;
				line-height: 60rpx;
				background-color: #24a524;
			}
			.call-phone {
				display: flex;
				align-items: center;
				color: #ff9db1;
				padding: 0 15rpx;
				font-size: 24rpx;
				border-radius: 30rpx;
				border: 2px solid #ff9db1;
			}
		}
		.detail {
			width: 100%;
			&-header {
				justify-content: space-between;
				display: flex;
				.introduce {
					display: flex;
					align-items: center;
					color: #666;
					margin-bottom: 20rpx;
					&::before {
						content: '';
						display: block;
						width: 15rpx;
						height: 15rpx;
						background-color: orange;
						border-radius: 50%;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
	.pictureList {
		display: flex;
		flex-direction: column;
		.picture {
			margin-top: 20rpx;
			width: 100%;
			border-radius: 20rpx;
		}
	}
	.comment {
		background-color: white;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 20rpx 0;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-around;
		.content {
			color: #666;
			border-radius: 30rpx;
			padding: 5rpx;
			padding-right: 200rpx;
			background-color: #e2e2e2;
			display: flex;
			align-items: center;
		}
	}
	.comment-list {
		padding-bottom: 200rpx;
		.comment-title {
			display: flex;
			align-items: center;
			color: #666;
			&::before {
				content: '';
				width: 15rpx;
				height: 15rpx;
				display: block;
				border-radius: 50%;
				background-color: orange;
				margin-right: 10rpx;
			}
		}
		.comment-item {
			display: flex;
			margin-top: 30rpx;
			.comment-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
			.time-name {
				margin-left: 30rpx;
				.comment-name {
					font-size: 30rpx;
					font-weight: 900;
				}
				.comment-time {
					color: #666;
					font-size: 23rpx;
				}
				.comment-content {
					padding-top: 20rpx;
				}
			}
		}
	}
}
</style>

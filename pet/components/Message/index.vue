<template>
	<view class="messages">
		<view class="comment">
			<view
				class="comment-item"
				v-for="comment in commentList"
				:key="comment._id"
			>
				<view class="comment-item-header">
					<view class="user">
						<img :src="comment.avatar_url" class="user-avatar" />
						<view class="user-info">
							<view class="user-info-nickname">
								{{ comment.nickname }}
							</view>
							<view class="user-info-time">
								<uni-dateformat
									:date="comment.create_time"
									format="yyyy-MM-dd hh:mm:ss"
								></uni-dateformat>
							</view>
						</view>
					</view>
					<tui-icon
						name="message"
						@click="
							reply(
								comment._id,
								comment.user_id,
								comment.nickname,
								comment.adopt_id,
								comment.found_id,
								comment.topic_id
							)
						"
					></tui-icon>
				</view>
				<view class="comment-item-content">{{ comment.comment }}</view>
				<view class="reply">
					<view
						v-for="reply in replyList"
						:key="reply._id"
						v-if="replyList[0]"
					>
						<view
							class="reply-item"
							v-if="reply.comment_id == comment._id"
						>
							{{ reply.nickname }}: {{ reply.comment }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog
			title="回复"
			ref="inputClose"
			mode="input"
			:placeholder="'@' + commentInfo.commentNickname"
			@confirm="dialogInputConfirm"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script setup lang="ts">
import { toRefs, ref, reactive, watch } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { UserInfo } from "@/types/common";
type CommentList = {
  adopt_id: string;
  avatar_url: string;
  comment: string;
  comment_type: number;
  create_time: number;
  nickname: string;
  user_id: string;
  _id: string;
  topic_id: string;
  found_id: string;
};
const props = defineProps<{
  commentList: CommentList[];
  where: string;
}>();

const { commentList, where } = toRefs(props);
watch(
    () => where.value,
    () => {
      getReply();
    }
  );
const inputDialog = ref(null);
const userId = uniCloud.getCurrentUserInfo().uid;
const commentInfo = reactive({
  commentId: "",
  commentUserId: "",
  commentNickname: "",
  adoptId: "",
  foundId: "",
  topicId: "",
});
const reply = (
  commentId: string,
  commentUserId: string,
  commentNickname: string,
  adoptId: string,
  foundId: string,
  topicId: string
) => {
  commentInfo.commentId = commentId;
  commentInfo.commentNickname = commentNickname;
  commentInfo.commentUserId = commentUserId;
  commentInfo.adoptId = adoptId;
  commentInfo.foundId = foundId;
  commentInfo.topicId = topicId;
  inputDialog.value?.open("center");
};
const db = uniCloud.database();
const userInfo = reactive<UserInfo>({
  avatar_file: { url: "" },
  nickname: "",
  _id: "",
});
type Reply = {
  _id: string;
  comment_id: string;
  nickname: string;
  comment: string;
};
const replyList = ref<Reply[]>([]);

const getReply = async () => {
  await db
    .collection("comment")
    .where(where.value)
    .field("nickname,comment,comment_id")
    .get()
    .then((res) => {
      replyList.value = res.result.data;
    });
};
onLoad(async () => {
  await db
    .collection("uni-id-users")
    .where(`_id=='${userId}'`)
    .field("nickname,avatar_file")
    .get({ getOne: true })
    .then((res) => {
      Object.assign(userInfo, res.result.data);
    })
    .catch((err) => {
      console.log(err);
    });

});
const dialogInputConfirm = (e: string) => {
  uniCloud.callFunction({
    name: "comment",
    data: {
      comment: e,
      type: 1,
      userId: userId,
      adoptId: commentInfo.adoptId,
      nickname: userInfo.nickname,
      avatarUrl: userInfo.avatar_file.url,
      commentId: commentInfo.commentId,
      commentUserId: commentInfo.commentUserId,
      foundId: commentInfo.foundId,
      topicId: commentInfo.topicId,
    },
    success() {
      getReply();
      uni.showToast({
        title: "回复成功",
        icon: "none",
      });
    },
    fail(err) {
      console.log(err);
    },
  });
};
</script>

<style lang="scss" scoped>
.messages {
	padding-bottom: 200rpx;
	margin-top: 50rpx;
	width: 83%;
	margin-left: 10%;
	.comment {
		&-item {
			margin-top: 25rpx;
			&-header {
				display: flex;
				justify-content: space-between;
				.user {
					display: flex;
					&-avatar {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
					&-info {
						margin-left: 30rpx;
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						&-time {
							margin-top: 10rpx;
							font-size: 25rpx;
							color: #666;
						}
					}
				}
			}
			&-content {
				margin-left: 120rpx;
				margin-top: 20rpx;
			}
		}
	}
	.reply {
		margin-top: 10rpx;
		margin-left: 18%;
		&-item {
			padding: 20rpx;
			background-color: #f3f3f3;
		}
	}
}
</style>

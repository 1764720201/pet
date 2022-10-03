<template>
	<view class="news">
		<view v-for="chat in chatListInfo" :key="chat.userId">
			<view class="news-item">
				<unicloud-db
					v-slot:default="{ data }"
					collection="uni-id-users"
					:getone="true"
					field="nickname,avatar_file"
					:where="`_id=='${chat.userId}'`"
				>
					<view class="header" @click="goChat(chat.userId)">
						<view class="user">
							<uni-badge
								:text="chat.unread"
								absolute="rightTop"
								size="small"
								:max-num="99"
							>
								<image
									:src="data?.avatar_file.url"
									class="user-avatar"
								></image>
							</uni-badge>

							<view class="user-nickname">
								{{ data?.nickname }}
							</view>
						</view>
						<uni-icons
							type="forward"
							size="23"
							color="#bfbfbf"
						></uni-icons>
					</view>
				</unicloud-db>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { reactive, ref, watch, toRefs } from 'vue';
import { onShow } from '@dcloudio/uni-app';
const props = defineProps<{ hasLogin: boolean; userId: string }>();
const { hasLogin, userId } = toRefs(props);
watch(
	() => hasLogin.value,
	() => {
		getChat();
	}
);
const db = uniCloud.database();
const chatList = ref<string[]>([]);
type ChatListInfo = {
	userId: string;
	unread: number;
};
const chatListInfo = reactive<ChatListInfo[]>([]);
const getChat = async () => {
	await db
		.collection('chat')
		.where(`from_uid=='${userId.value}'||to_uid=='${userId.value}'`)
		.groupBy('from_uid,to_uid')
		.get()
		.then(res => {
			const set: Set<string> = new Set(
				...res.result.data.map(
					(value: { to_uid: string; from_uid: string }) => {
						return Object.values(value).filter(
							value => value != userId.value
						);
					}
				)
			);
			chatList.value = Array.from(set);
		});
	chatList.value.forEach(value => {
		db.collection('chat')
			.where(
				`from_uid=='${value}'&&to_uid==$cloudEnv_uid&&is_read==false`
			)
			.count()
			.then(res => {
				chatListInfo.length = 0;
				chatListInfo.push({
					userId: value,
					unread: res.result.total
				});
			});
	});
};
const goChat = (id: string) => {
	uni.navigateTo({
		url: `/pages/Chat/index?id=${id}`
	});
};
onShow(() => {
	getChat();
});
uni.onPushMessage(() => {
	getChat();
});
</script>

<style lang="less" scoped>
.news {
	width: 100vw;
	&-item {
		position: relative;
		.header {
			align-items: center;
			justify-content: space-between;
			margin-top: 30rpx;
			padding: 40rpx 30rpx;
			display: flex;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
			.user {
				display: flex;
				align-items: center;
				&-avatar {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>

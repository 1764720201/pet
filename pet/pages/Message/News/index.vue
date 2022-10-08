<template>
	<view class="news">
		<uni-load-more status="loading" v-if="ifLoading" />
		<view v-for="chat in result" :key="chat.userId" v-else>
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
import { onShow } from '@dcloudio/uni-app';
import { reactive, watch, toRefs, ref } from 'vue';
const props = defineProps<{ hasLogin: boolean; userId: string }>();
const { hasLogin, userId } = toRefs(props);
const ifLoading = ref<boolean>(true);

watch(
	() => hasLogin.value,
	async () => {
		await getChat();
	}
);
const db = uniCloud.database();
type ChatListInfo = {
	userId: string;
	unread: number;
};
const chatListInfo = reactive<ChatListInfo[]>([]);
const result = reactive<ChatListInfo[]>([]);
const getChat = async () => {
	result.length = 0;
	await db
		.collection('chat')
		.where(`from_uid=='${userId.value}'||to_uid=='${userId.value}'`)
		.groupBy('from_uid,to_uid')
		.orderBy('create_date', 'desc')
		.get()
		.then(res => {
			const arr = [];
			const newArr = arr.concat(res.result.data);
			for (let i = 0; i < newArr.length; i++) {
				if (newArr[i].from_id) {
					chatListInfo.push({
						userId: newArr[i].from_uid,
						unread: 0
					});
				} else {
					chatListInfo.push({ userId: newArr[i].to_uid, unread: 0 });
				}
			}
			let obj = {};
			for (let i of chatListInfo) {
				if (!obj[i.userId] && i.userId !== userId.value) {
					result.push(i);
					obj[i.userId] = 1;
				}
			}
		});
	getChatTotal();
};
const getChatTotal = () => {
	result.forEach(item => {
		db.collection('chat')
			.where(
				`from_uid=='${
					item.userId
				}'&&to_uid==$cloudEnv_uid&&is_read==false`
			)
			.count()
			.then(res => {
				item.unread = res.result.total;
			});
	});
};
const goChat = (id: string) => {
	uni.navigateTo({
		url: `/pages/Chat/index?id=${id}`
	});
};
onShow(async () => {
	ifLoading.value = true;
	await getChat();
	ifLoading.value = false;
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

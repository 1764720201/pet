<template>
	<unicloud-db
		ref="udb"
		v-slot:default="{ data, pagination, loading, error, hasMore }"
		collection="topic"
		orderby="create_time desc"
		field="content,image,user_id,create_time,read,_id"
		:where="`user_id=='${userId}'`"
		:getone="false"
		:page-size="4"
	>
		<view v-if="error" class="error">{{ error.message }}</view>
		<view v-else class="topic">
			<view v-for="topic in data" :key="topic._id">
				<view class="topic-item">
					<image
						mode="aspectFill"
						:src="topic.image[0].url"
						class="topic-item-image"
						@click="goTopic(topic._id)"
					></image>
					<view class="topic-item-content">
						<view class="topic-item-content-header">
							<view class="title">{{ topic.content }}</view>
							<uni-icons
								@click="deleteTopic(topic._id)"
								type="trash-filled"
								size="20"
							></uni-icons>
						</view>
						<view class="time">
							<uni-dateformat
								:date="topic.create_time"
								format="yyyy-MM-dd hh:mm:ss"
							></uni-dateformat>
						</view>
						<view class="topic-item-content-footer">
							<view class="read">
								<uni-icons type="eye" size="20"></uni-icons>
								<view>{{ topic.read }}</view>
							</view>
							<unicloud-db
								v-slot:default="{
									data
								}"
								collection="collect"
								:where="`topic_id=='${topic._id}'`"
							>
								<view class="praise">
									<uni-icons
										type="hand-up"
										size="20"
									></uni-icons>
									<view>{{ data.length }}</view>
								</view>
							</unicloud-db>
							<view
								class="compile"
								@click="goParticipation(topic._id)"
							>
								编辑
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</unicloud-db>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const userId = uniCloud.getCurrentUserInfo().uid;
const udb = ref(null);
const deleteTopic = (id: string) => {
	udb.value.remove(id, {
		confirmContent: '你确认要删除该话题吗'
	});
};
const goTopic = (id: string) => {
	uni.navigateTo({
		url: `/pages/Home/Daily/CatDaily/TopicDetail/index?id=${id}`
	});
};
const goParticipation = (id: string) => {
	uni.navigateTo({
		url: `/pages/Home/Daily/Participation/index?id=${id}`
	});
};
</script>

<style lang="scss" scoped>
.topic {
	margin-left: 5%;
	width: 90%;
	&-item {
		border-radius: 10rpx;
		padding: 20rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		margin-top: 30rpx;
		display: flex;
		&-image {
			border-radius: 20rpx;
			width: 250rpx;
			height: 200rpx;
		}
		&-content {
			width: 50%;
			margin-left: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.time {
				color: #666;
				font-size: 23rpx;
				margin-top: -30rpx;
			}
			&-header,
			&-footer {
				align-items: center;
				display: flex;
			}
			&-header {
				.title {
					width: 320rpx;
				}
			}
			&-footer {
				font-size: 25rpx;
				color: #666;
				width: 100%;
				justify-content: space-between;
				.read {
					display: flex;
					align-items: center;
				}
				.praise {
					display: flex;
					align-items: center;
				}
			}
		}
	}
}
</style>

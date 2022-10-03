<template>
	<view class="my-comment">
		<unicloud-db
			ref="udb"
			v-slot:default="{
				data,
				pagination,
				loading,
				error,
				hasMore
			}"
			:where="`comment_type==0||comment_user_id=='${userId}'`"
			orderby="create_time desc"
			field="adopt_id,found_id,_id,avatar_url,user_id,nickname,create_time,comment,topic_id"
			:collection="comment"
			:getone="false"
		>
			<view v-if="error" class="error">{{ error.message }}</view>

			<view v-else>
				<view
					class="comment-list"
					v-for="comment in data"
					:key="comment._id"
				>
					<view
						class="comment"
						v-if="
							comment.found_id[0] ||
								comment.topic_id[0] ||
								comment.adopt_id[0]
						"
					>
						<view class="comment-item">
							<img
								:src="comment?.avatar_url"
								class="comment-item-avatar"
								@click="goUserInfo(comment?.user_id)"
							/>
							<view class="comment-item-info">
								<view class="comment-item-info-nickname">
									{{ comment?.nickname }}
								</view>
								<view class="comment-item-info-time">
									<uni-dateformat
										:date="comment?.create_time"
										format="yyyy-MM-dd hh:mm:ss"
									></uni-dateformat>
								</view>
							</view>
							<image
								v-if="comment.adopt_id[0]"
								:src="comment.adopt_id[0].img[0].url"
								class="comment-item-image"
								@click="goAdopt(comment.adopt_id[0]._id)"
								mode="aspectFill"
							></image>
							<image
								v-if="comment.found_id[0]"
								:src="comment.found_id[0].uploadPicture[0].url"
								class="comment-item-image"
								@click="goFound(comment.found_id[0]._id)"
								mode="aspectFill"
							></image>
							<image
								v-if="comment.topic_id[0]"
								:src="comment.topic_id[0].image[0].url"
								class="comment-item-image"
								@click="goTopic(comment.topic_id[0]._id)"
								mode="aspectFill"
							></image>
						</view>
						<view class="comment-content">
							{{ comment?.comment }}
						</view>
					</view>
				</view>
			</view>
			<uni-load-more status="loading" v-if="loading" />
			<uni-load-more status="more" v-if="hasMore && !loading" />
			<uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
		</unicloud-db>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
const db = uniCloud.database();
const userId = uniCloud.getCurrentUserInfo().uid;
const goAdopt = (id: string) => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/index?id=${id}`
	});
};
const goFound = (id: string) => {
	uni.navigateTo({
		url: `/pages/Home/Enlightenment/index?id=${id}`
	});
};
const goTopic = (id: string) => {
	uni.navigateTo({
		url: `/pages/Home/Daily/CatDaily/TopicDetail/index?id=${id}`
	});
};
const goUserInfo = (userId: string) => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/UserInfo/index?userId=${userId}`
	});
};
const udb = ref(null);
onPullDownRefresh(() => {
	udb.value.loadData(() => {
		uni.stopPullDownRefresh();
	});
});
onReachBottom(() => {
	udb.value.loadMore();
});
const comment = reactive([
	db.collection('comment').getTemp(),
	db
		.collection('adoption')
		.where(`user_id=='${userId}'`)
		.field('img,user_id,_id')
		.getTemp(),
	db
		.collection('foundPet')
		.where(`user_id=='${userId}'`)
		.field('uploadPicture,user_id,_id')
		.getTemp(),
	db
		.collection('topic')
		.where(`user_id=='${userId}'`)
		.field('image,user_id,_id')
		.getTemp()
]);
</script>

<style lang="scss" scoped>
.my-comment {
	margin-left: 3%;
	width: 94%;
	.comment {
		border-radius: 30rpx;
		margin-top: 30rpx;
		padding: 20rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		&-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			&-image {
				border-radius: 20rpx;
				width: 250rpx;
				height: 180rpx;
			}
			&-avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			&-info {
				height: 120rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				&-nickname {
					font-weight: 900;
				}
				&-time {
					font-size: 23rpx;
					color: #666;
				}
			}
		}
		&-content {
			margin-left: 5%;
			width: 90%;
			margin-top: 30rpx;
		}
	}
}
</style>

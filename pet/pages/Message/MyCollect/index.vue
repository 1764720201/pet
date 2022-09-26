<template>
	<view class="my-collect">
		<unicloud-db
			ref="udb"
			v-slot:default="{
				data,
				pagination,
				loading,
				error,
				hasMore
			}"
			where="type==0||type==1"
			:collection="collect"
			:getone="false"
			:page-size="10"
		>
			<uni-load-more status="loading" v-if="loading" />
			<uni-load-more status="more" v-if="hasMore && !loading" />
			<uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
			<view v-if="error" class="error">{{ error.message }}</view>
			<view class="collect" v-else>
				<view v-for="collect in data" :key="collect._id">
					<view
						class="collect-item"
						v-if="collect.adopt_id[0] || collect.found_id[0]"
					>
						<unicloud-db
							v-slot:default="{ data }"
							collection="uni-id-users"
							:where="`_id=='${collect.user_id}'`"
							:getone="true"
							field="nickname,avatar_file"
						>
							<view class="user">
								<img
									:src="data?.avatar_file.url"
									class="user-avatar"
									@click="goUserInfo(collect.user_id)"
								/>
								<view class="user-info">
									<view class="user-info-nickname">
										{{ data?.nickname }}
									</view>
									<view class="user-info-time">
										<uni-dateformat
											:date="collect?.create_time"
											format="yyyy-MM-dd hh:mm:ss"
										></uni-dateformat>
										收藏
									</view>
								</view>
							</view>
						</unicloud-db>
						<unicloud-db
							v-if="collect.adopt_id[0]"
							v-slot:default="{ data }"
							collection="adoption"
							:getone="true"
							:where="`_id=='${collect.adopt_id[0]?._id}'`"
							field="img,_id"
						>
							<img
								:src="data?.img[0].path"
								class="pet-image"
								@click="goAdopt(collect.adopt_id[0]?._id)"
							/>
						</unicloud-db>
						<unicloud-db
							v-if="collect.found_id[0]"
							v-slot:default="{ data }"
							collection="foundPet"
							:getone="true"
							:where="`_id=='${collect.found_id[0]?._id}'`"
							field="uploadPicture,_id"
						>
							<img
								:src="data?.uploadPicture[0].path"
								class="pet-image"
								@click="goFoundPet(collect.found_id[0]?._id)"
							/>
						</unicloud-db>
					</view>
				</view>
			</view>
		</unicloud-db>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
const udb = ref(null);
onPullDownRefresh(() => {
	udb.value.loadData(() => {
		uni.stopPullDownRefresh();
	});
});
onReachBottom(() => {
	udb.value.loadMore();
});
const userId = uniCloud.getCurrentUserInfo().uid;
const db = uniCloud.database();
const collect = reactive([
	db
		.collection('collect')
		.field('adopt_id,found_id,_id,create_time,type,user_id')
		.orderBy('create_time', 'desc')
		.getTemp(),
	db
		.collection('adoption')
		.where(`user_id=='${userId}'`)
		.field('_id,img')
		.getTemp(),
	db
		.collection('foundPet')
		.where(`user_id=='${userId}'`)
		.field('_id,uploadPicture')
		.getTemp()
]);
const goAdopt = (id: string) => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/index?id=${id}`
	});
};
const goFoundPet = (id: string) => {
	uni.navigateTo({
		url: `/pages/Home/Enlightenment/index?id=${id}`
	});
};
const goUserInfo = (userId: string) => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/UserInfo/index?userId=${userId}`
	});
};
</script>

<style lang="scss" scoped>
.collect {
	margin-left: 3%;
	width: 94%;
	&-item {
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 30rpx;
		justify-content: space-between;
		display: flex;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		.user {
			display: flex;
			&-avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
			&-info {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				&-time {
					font-size: 23rpx;
					color: #666;
				}
			}
		}
		.pet-image {
			width: 200rpx;
			height: 150rpx;
		}
	}
}
</style>

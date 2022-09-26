<template>
	<unicloud-db
		ref="udb"
		v-slot:default="{
			data,
			pagination,
			loading,
			error,
			hasMore
		}"
		collection="footprint"
		orderby="create_time desc"
		field="found_id,adopt_id"
		:getone="false"
		:where="`user_id=='${userId}'`"
		:page-size="5"
		:distinct="true"
	>
		<view v-if="error" class="error">{{ error.message }}</view>
		<view v-else class="footprint">
			<view v-for="(footprint, index) in data" :key="index">
				<unicloud-db
					v-if="footprint.adopt_id"
					v-slot:default="{ data }"
					collection="adoption"
					field="pet_name,img,variety"
					:getone="true"
					:where="`_id=='${footprint?.adopt_id}'`"
				>
					<view
						class="footprint-item"
						@click="goAdopt(footprint.adopt_id)"
					>
						<img :src="data?.img[0].path" class="pet-image" />
						<view class="pet-info">
							<view class="pet-info-name">
								{{ data?.pet_name }}
							</view>
							<view class="pet-info-variety">
								{{ data?.variety }}
							</view>
						</view>
					</view>
				</unicloud-db>
				<unicloud-db
					v-if="footprint.found_id"
					v-slot:default="{ data }"
					collection="foundPet"
					field="title,uploadPicture,variety"
					:getone="true"
					:where="`_id=='${footprint?.found_id}'`"
				>
					<view
						class="footprint-item"
						@click="goFoundPet(footprint.found_id)"
					>
						<img
							:src="data?.uploadPicture[0].path"
							class="pet-image"
						/>
						<view class="pet-info">
							<view class="pet-info-name">{{ data?.title }}</view>
							<view class="pet-info-variety">
								{{ data?.variety }}
							</view>
						</view>
					</view>
				</unicloud-db>
			</view>
		</view>
		<uni-load-more status="loading" v-if="loading" />
		<uni-load-more status="more" v-if="hasMore && !loading" />
		<uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
	</unicloud-db>
</template>

<script lang="ts" setup>
const userId = uniCloud.getCurrentUserInfo().uid;
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
</script>

<style scoped lang="scss">
.footprint {
	margin-top: 15rpx;
	&-item {
		padding: 25rpx;
		border-top: 1px solid #ccc;
		width: 100%;
		display: flex;
		.pet-image {
			width: 150rpx;
			height: 150rpx;
		}
		.pet-info {
			margin-left: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			&-name {
				font-size: 35rpx;
			}
			&-variety {
				color: #666;
				font-size: 28rpx;
			}
		}
	}
}
</style>

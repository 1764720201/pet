<template>
	<unicloud-db
		v-slot:default="{ data, loading, error, options }"
		collection="collect"
		:where="`user_id=='${userId}'&&type==1`"
		field="found_id,_id"
	>
		<view
			v-for="found in data"
			:key="found._id"
			@click="goPet(found.found_id)"
		>
			<unicloud-db
				v-slot:default="{ data, loading, error, options }"
				collection="foundPet"
				:where="`_id=='${found?.found_id}'`"
				:getone="true"
			>
				<view class="adopt">
					<img
						class="adopt-image"
						:src="data?.uploadPicture[0].url"
					/>
					<view class="found">
						<view class="found-name">{{ data?.title }}</view>
						<view class="found-variety">{{ data?.variety }}</view>
					</view>
				</view>
			</unicloud-db>
		</view>
	</unicloud-db>
</template>

<script lang="ts" setup>
const userId = uniCloud.getCurrentUserInfo().uid;
const goPet = (foundId: string) => {
	uni.navigateTo({
		url: `/pages/Home/Enlightenment/index?id=${foundId}`
	});
};
</script>

<style lang="less" scoped>
.adopt {
	display: flex;
	padding: 30rpx;
	border-bottom: 1px solid #ccc;
	.adopt-image {
		width: 120rpx;
		height: 120rpx;
	}
	.found {
		margin-left: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.found-variety {
			font-size: 26rpx;
			color: #666;
		}
	}
}
.adopt:first-child {
	border-top: 1px solid #ccc;
}
</style>

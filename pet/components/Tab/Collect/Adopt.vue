<template>
	<unicloud-db
		v-slot:default="{ data, loading, error, options }"
		collection="collect"
		:where="`user_id=='${userId}'&&type==0`"
		field="adopt_id,_id"
	>
		<view
			v-for="adopt in data"
			:key="adopt._id"
			@click="goAdopt(adopt.adopt_id)"
		>
			<unicloud-db
				v-slot:default="{ data, loading, error, options }"
				collection="adoption"
				:where="`_id=='${adopt?.adopt_id}'`"
				:getone="true"
			>
				<view class="adopt">
					<img class="adopt-image" :src="data?.img[0]?.url" />
					<view class="pet">
						<view class="pet-name">{{ data?.pet_name }}</view>
						<view class="pet-variety">{{ data?.variety }}</view>
					</view>
				</view>
			</unicloud-db>
		</view>
	</unicloud-db>
</template>

<script lang="ts" setup>
const userId = uniCloud.getCurrentUserInfo().uid;
const goAdopt = (id: string) => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/index?id=${id}`
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
	.pet {
		margin-left: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.pet-variety {
			font-size: 26rpx;
			color: #666;
		}
	}
}
.adopt:first-child {
	border-top: 1px solid #ccc;
}
</style>

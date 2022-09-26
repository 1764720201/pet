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
		collection="adoption"
		orderby="issue_time desc"
		:getone="false"
		field="_id,pet_name,img,if_adopt,medical"
		:where="where"
		:page-size="5"
	>
		<view v-if="error" class="error">{{ error.message }}</view>
		<view v-else class="adoptList">
			<view v-for="adopt in data" :key="adopt._id">
				<view class="wait-adopt">
					<view class="adopt">
						<img :src="adopt.img[0].path" class="pet-image" />
						<view class="pet-info">
							<view class="pet-name">{{ adopt.pet_name }}</view>
							<unicloud-db
								class="pet-comment"
								v-slot:default="{
									data
								}"
								:where="`adopt_id=='${adopt._id}'`"
								collection="comment"
							>
								留言{{ data.length }}
							</unicloud-db>
							<view class="pet-medicalList">
								<view
									v-for="medical in adopt.medical"
									class="pet-medical"
								>
									{{ medical }}
								</view>
							</view>
						</view>
					</view>
					<view class="operate">
						<view class="polish">擦亮</view>
						<view class="compile">编辑</view>
						<uni-icons
							type="more-filled"
							size="30"
							class="more"
							color="#b4b4b4"
						></uni-icons>
					</view>
				</view>
			</view>
			<uni-load-more status="loading" v-if="loading" />
			<uni-load-more status="more" v-if="hasMore && !loading" />
			<uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
		</view>
	</unicloud-db>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
const props = defineProps<{ where: string }>();
const { where } = toRefs(props);
const udb = ref(null);
onPullDownRefresh(() => {
	udb.value.loadData(() => {
		uni.stopPullDownRefresh();
	});
});
onReachBottom(() => {
	udb.value.loadMore();
});
</script>

<style lang="less" scoped>
.adoptList {
	margin-left: 5%;
	width: 90%;
	.wait-adopt {
		border-radius: 30rpx;
		margin-top: 30rpx;
		padding: 20rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
	}
	.adopt {
		display: flex;
		.pet-image {
			border-radius: 20rpx;
			width: 300rpx;
			height: 200rpx;
		}
		.pet-info {
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.pet-comment {
				font-size: 25rpx;
				color: #ccc;
			}
			.pet-medicalList {
				display: flex;
				.pet-medical {
					border-radius: 10rpx;
					margin-left: 8rpx;
					padding: 10rpx;
					font-size: 20rpx;
					background-color: rgb(235, 226, 227);
					color: rgb(212, 159, 170);
				}
			}
		}
	}
	.operate {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.polish,
		.compile,
		.more {
			font-size: 27rpx;
			margin-right: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60rpx;
			width: 100rpx;
			border-radius: 40rpx;
			border: 1px solid #666;
		}
		.polish {
			color: #666;
			background-color: #f0f0f0;
		}
		.compile {
			color: white;
			border: 1px solid pink;
			background-color: rgb(234, 117, 135);
		}
	}
}
</style>

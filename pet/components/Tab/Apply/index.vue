<template>
	<view class="inApplyList">
		<unicloud-db
			ref="udb"
			v-slot:default="{
				data,
				pagination,
				loading,
				error,
				options,
				hasMore
			}"
			collection="apply"
			:page-size="5"
			:getone="false"
			:where="where"
		>
			<view v-if="error" class="error">{{ error.message }}</view>
			<view v-else v-for="inApply in data" :key="inApply._id">
				<unicloud-db
					v-slot:default="{ data, loading, error, options }"
					collection="adoption"
					field="_id,pet_name,img,variety,adopt_id"
					:getone="true"
					:where="`_id=='${inApply.adopt_id}'`"
				>
					<view v-if="error">{{ error.message }}</view>
					<view v-else>
						<view class="inApply">
							<view class="petInfo">
								<img
									class="pet-image"
									:src="data?.img[0].url"
								/>
								<view class="pet-name-variety">
									<view class="pet-name">
										{{ data?.pet_name }}
									</view>
									<view class="pet-variety">
										{{ data?.variety }}
									</view>
								</view>
							</view>
							<view class="operation">
								<view
									class="compile"
									@click="goApply(data?._id)"
									v-if="ifApply"
								>
									编辑
								</view>
								<view
									class="schedule"
									@click="goApplyDetail(inApply._id)"
								>
									查看申请进度
								</view>
								<view
									v-if="ifApply"
									class="cancel"
									@click="cancelApply(inApply._id)"
								>
									取消申请
								</view>
							</view>
						</view>
					</view>
				</unicloud-db>
				<uni-load-more status="loading" v-if="loading" />
				<uni-load-more status="more" v-if="hasMore && !loading" />
				<uni-load-more
					v-else-if="!hasMore && !loading"
					status="noMore"
				/>
			</view>
		</unicloud-db>
	</view>
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog
			type="warn"
			cancelText="关闭"
			confirmText="确定取消"
			title="通知"
			content="你确定要取消领养该宠物吗"
			@confirm="dialogConfirm"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { watch } from 'vue';
type inApplyList = {
	adopt_Id: string;
	_id: string;
};
const userId = uniCloud.getCurrentUserInfo().uid;
const props = defineProps<{ where: string }>();
const { where } = toRefs(props);
const ifApply = ref<boolean>(true);
watch(
	() => where.value,
	newValue => {
		where.value = newValue;
		if (where.value != `state=='申请中'&&user_id=='${userId}'`) {
			ifApply.value = false;
		} else {
			ifApply.value = true;
		}
	}
);
const db = uniCloud.database();
const goApplyDetail = (inApplyId: string) => {
	uni.navigateTo({
		url: `/pages/Mine/Request/Apply/ApplyDetail/index?inApplyId=${inApplyId}`
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
const goApply = (adoptId: string) => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/Apply/index?adoptId=${adoptId}`
	});
};
const alertDialog = ref(null);
const applyId = ref<string>();
const cancelApply = (id: string) => {
	applyId.value = id;
	alertDialog.value.open('center');
};
const inApplyList = ref<inApplyList[]>([]);
const dialogConfirm = async () => {
	await db
		.collection('apply')
		.where(`_id=='${applyId.value}'`)
		.update({
			state: '已取消'
		})
		.then(() => {
			udb.value.refresh();
			uni.showToast({
				title: '成功取消该申请',
				icon: 'none'
			});
		});
};
</script>

<style lang="less" scoped>
.inApply {
	margin-top: 30rpx;
	border-radius: 30rpx;
	width: 90%;
	margin-left: 5%;
	box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
	.petInfo {
		display: flex;
		padding: 50rpx 50rpx 30rpx 50rpx;
		.pet-image {
			width: 300rpx;
			height: 200rpx;
			border-radius: 30rpx;
		}
		.pet-name-variety {
			margin-left: 50rpx;

			.pet-name {
				font-weight: 900;
			}
			.pet-variety {
				margin-top: 30rpx;
				font-size: 25rpx;
				color: #ccc;
			}
		}
	}
	.operation {
		margin-left: 100rpx;
		padding-right: 30rpx;
		padding-bottom: 40rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 30rpx;
		.compile,
		.cancel {
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			border: 1px solid #ccc;
			color: #666;
		}

		.schedule {
			border-radius: 40rpx;
			padding: 10rpx 15rpx;
			color: white;
			background-color: rgb(234, 117, 135);
			border: 1px solid rgb(215, 108, 128);
		}
	}
}
</style>

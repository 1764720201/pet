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
		:collection="apply"
		orderby="issue_time desc"
		:getone="false"
		:page-size="25"
	>
		<view v-if="error" class="error">{{ error.message }}</view>
		<view v-else>
			<view
				class="receive"
				v-for="receive in data"
				:key="receive?._id._value"
			>
				<view
					class="apply"
					v-for="apply in receive?._id?.apply"
					:key="apply._id"
					v-if="receive?._id?.apply"
				>
					<view class="pet">
						<img :src="receive.img[0].url" class="pet-image" />
						<view class="pet-info">
							<view class="pet-info-name">
								<view class="name">{{ receive.pet_name }}</view>
								<uni-icons
									v-if="state == '申请中'"
									type="trash"
									size="25"
									color="#777"
									@click="
										cancelAdopt(apply._id, apply.adopt_id)
									"
								></uni-icons>
							</view>
							<view class="pet-info-time">
								<uni-dateformat
									:date="receive.issue_time"
									format="yyyy-MM-dd hh:mm:ss"
								></uni-dateformat>
							</view>
						</view>
					</view>
					<view class="proposer">
						<unicloud-db
							v-slot:default="{ data, loading, error, options }"
							collection="uni-id-users"
							:getone="true"
							field="avatar_file,nickname"
							:where="`_id=='${apply.user_id}'`"
						>
							<view class="proposer-info">
								<img
									:src="data?.avatar_file.url"
									class="avatar"
								/>
								<view class="nickname">
									{{ data?.nickname }}
								</view>
								<view class="city">
									{{ apply?.city[0] }}/{{ apply?.city[1] }}/{{
										apply?.city[2]
									}}
								</view>
							</view>
							<view class="proposer-sincerity">
								申请理由:{{ apply.sincerity }}
							</view>
						</unicloud-db>
					</view>
					<view class="operate">
						<view class="consult">
							<uni-icons
								type="chat"
								size="30"
								color="white"
							></uni-icons>
							在线咨询
						</view>
						<view
							class="proposer-detail"
							@click="goProposerDetail(apply._id)"
						>
							申请详情
						</view>
						<view
							v-if="state == '申请中'"
							class="allow"
							@click="allowAdopt(apply._id, apply.adopt_id)"
						>
							同意
						</view>
						<view
							v-if="state == '申请中'"
							class="refuse"
							@click="refuseAdopt(apply._id, apply.adopt_id)"
						>
							拒绝
						</view>
					</view>
				</view>
			</view>
			<uni-load-more status="loading" v-if="loading" />
			<uni-load-more status="more" v-if="hasMore && !loading" />
			<uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
		</view>
	</unicloud-db>
	<uni-popup ref="allow" type="dialog">
		<uni-popup-dialog
			type="warning"
			cancelText="取消"
			confirmText="同意"
			title="同意"
			content="你确定要将该宠物送给申请人吗"
			@confirm="confirmAllow"
		></uni-popup-dialog>
	</uni-popup>
	<uni-popup ref="refuse" type="dialog">
		<uni-popup-dialog
			type="warning"
			cancelText="关闭"
			confirmText="拒绝"
			title="拒绝"
			content="你确定要拒绝该申请吗"
			@confirm="confirmRefuse"
		></uni-popup-dialog>
	</uni-popup>
	<uni-popup ref="cancel" type="dialog">
		<uni-popup-dialog
			type="warning"
			cancelText="关闭"
			confirmText="取消申请"
			title="取消申请"
			content="你确定要取消该申请吗"
			@confirm="confirmCancel"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch, ref } from 'vue';
const props = defineProps<{ state: string }>();
const { state } = toRefs(props);
const udb = ref(null);
const userId = uniCloud.getCurrentUserInfo().uid;
const goProposerDetail = (applyId: string) => {
	uni.navigateTo({
		url: `/pages/Mine/Request/Receive/ProposerDetail/index?applyId=${applyId}`
	});
};
const db = uniCloud.database();
let apply = reactive([]);
const allow = ref(null);
const refuse = ref(null);
const cancel = ref(null);
const applyId = ref<string>();
const adoptId = ref<string>();
const confirmAllow = () => {
	db.collection('apply')
		.where(`_id=='${applyId.value}'`)
		.update({
			state: '送养成功'
		})
		.then(() => {
			db.collection('adoption')
				.where(`_id=='${adoptId.value}'`)
				.update({
					if_adopt: true
				});
		})
		.then(() => {
			udb.value.refresh();
			uni.showToast({
				title: '已成功送养'
			});
		});
};
const confirmRefuse = () => {
	db.collection('apply')
		.where(`_id=='${applyId.value}'`)
		.update({
			state: '已拒绝'
		})
		.then(() => {
			udb.value.refresh();
			uni.showToast({
				title: '已成功拒绝'
			});
		});
};
const confirmCancel = () => {
	db.collection('apply')
		.where(`_id=='${applyId.value}'`)
		.update({
			state: '已取消'
		})
		.then(() => {
			udb.value.refresh();
			uni.showToast({
				title: '已成功取消'
			});
		});
};
const allowAdopt = (apply_id: string, adopt_id: string) => {
	applyId.value = apply_id;
	adoptId.value = adopt_id;
	allow.value.open('center');
};
const refuseAdopt = (apply_id: string, adopt_id: string) => {
	applyId.value = apply_id;
	adoptId.value = adopt_id;
	refuse.value.open('center');
};
const cancelAdopt = (apply_id: string, adopt_id: string) => {
	applyId.value = apply_id;
	adoptId.value = adopt_id;
	cancel.value.open('center');
};
watch(
	() => state.value,
	newValue => {
		state.value = newValue;
		apply = [
			db
				.collection('adoption')
				.where(`user_id=='${userId}'`)
				.field('_id,img,pet_name,issue_time')
				.getTemp(),
			db
				.collection('apply')
				.where(`state=='${state.value}'`)
				.getTemp()
		];
	},
	{
		immediate: true
	}
);
</script>

<style lang="scss" scoped>
.receive {
	margin-left: 5%;
	width: 90%;
	.apply {
		margin-top: 40rpx;
		border-radius: 20rpx;
		padding: 10rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
		.pet {
			width: 100%;
			display: flex;
			&-image {
				border-radius: 20rpx;
				width: 400rpx;
				height: 300rpx;
			}
			&-info {
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				&-name {
					display: flex;
					justify-content: space-between;
					font-size: 40rpx;
					font-weight: 900;
				}
				&-time {
					margin-top: 30rpx;
					font-size: 23rpx;
					color: #666;
				}
			}
		}
		.proposer {
			&-info {
				justify-content: space-between;
				display: flex;
				align-items: center;
				.avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
			}
		}
		.operate {
			margin-top: 30rpx;
			align-items: center;
			width: 100%;
			justify-content: space-between;
			display: flex;
			.consult {
				padding: 10rpx 20rpx;
				border-radius: 30rpx;
				display: flex;
				align-items: center;
				color: white;
				background-image: linear-gradient(
					to right,
					rgb(233, 162, 194),
					rgb(233, 82, 151)
				);
			}
			.proposer-detail,
			.allow {
				color: #666;
				border-radius: 20rpx;
				padding: 10rpx 20rpx;
				background-color: rgba(0, 0, 0, 0.1);
			}
			.refuse {
				border-radius: 20rpx;
				padding: 10rpx 20rpx;
				color: white;
				background-color: #dd2e1e;
			}
		}
	}
}
</style>

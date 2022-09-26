<template>
	<view>
		<unicloud-db
			v-slot:default="{ data }"
			collection="uni-id-users"
			field="nickname,avatar_file"
			:getone="true"
			:where="`_id == '${userId}'`"
		>
			<view class="personal-information">
				<view class="person">
					<view class="name">{{ data?.nickname }}</view>
					<view class="signation">
						<button class="mini-btn" type="button" size="mini">
							+个人标签
						</button>
						<view class="authentication">未实名认证</view>
					</view>
				</view>
				<view class="avatar">
					<img class="img" :src="data?.avatar_file?.url" />
				</view>
			</view>
			<view class="footer">
				<view class="collect" @click="goCollect">
					收藏
					<span class="quantity">
						{{ collectQuantity ? collectQuantity : 0 }}
					</span>
				</view>
				<view class="foot" @click="goFootPrint">
					足迹
					<span class="quantity">
						{{ footprintQuantity ? footprintQuantity : 0 }}
					</span>
				</view>
				<view class="data">
					<button class="mini-btn" size="mini">个人资料</button>
				</view>
			</view>
		</unicloud-db>
	</view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
const userId = uniCloud.getCurrentUserInfo().uid;
const collectQuantity = ref<number>();
const db = uniCloud.database();
const footprintQuantity = ref<number>();
onShow(() => {
	db.collection('collect')
		.where(`user_id=='${userId}'`)
		.get()
		.then(res => {
			collectQuantity.value = res.result.data.length;
		});
	db.collection('footprint')
		.where(`user_id=='${userId}'`)
		.field('adopt_id,found_id')
		.orderBy('create_time', 'desc')
		.distinct()
		.get()
		.then(res => {
			footprintQuantity.value = res.result.data.length;
		});
});
const goCollect = () => {
	uni.navigateTo({
		url: '/pages/Mine/PersonalInformation/Collect/index'
	});
};
const goFootPrint = () => {
	uni.navigateTo({
		url: '/pages/Mine/PersonalInformation/Footprint/index'
	});
};
</script>

<style lang="less" scoped>
.personal-information {
	width: 100%;
	display: flex;
	margin-left: -20rpx;
	margin-top: 100rpx;
	justify-content: space-around;
	.avatar {
		.img {
			width: 150rpx;
			height: 150rpx;
			border-radius: 75rpx;
		}
	}
	.name {
		font-size: 40rpx;
		font-weight: 900;
	}
	.signation {
		width: 100%;
		display: flex;
		align-items: center;
		height: 100%;
		.mini-btn {
			background-image: linear-gradient(
				to right,
				rgb(237, 163, 181),
				rgb(237, 163, 179)
			);
			width: 150rpx;
			line-height: 50rpx;
			height: 50rpx;
			color: white;
			font-size: 20rpx;
		}
		.authentication {
			width: 130rpx;
			height: 40rpx;
			line-height: 40rpx;
			border: 1rpx solid black;
			border-radius: 12rpx;
			font-size: 20rpx;
			margin-left: 20rpx;
			text-align: center;
			font-weight: 700;
		}
	}
}
.footer {
	margin-top: 50rpx;
	display: flex;
	justify-content: space-around;
	.collect,
	.foot {
		font-size: 25rpx;
		color: rgb(91, 89, 89);
		.quantity {
			font-size: 38rpx;
			color: black;
			font-weight: 900;
			margin-left: 10rpx;
		}
	}
	.data {
		width: 35%;
		.mini-btn {
			height: 65rpx;
			width: 150rpx;
			margin-left: 80rpx;
			line-height: 65rpx;
			border-radius: 25rpx;
			font-size: 22rpx;
			font-weight: 400;
			color: white;
			background-image: linear-gradient(
				to right,
				rgb(231, 172, 186),
				rgb(230, 127, 144)
			);
		}
	}
}
</style>

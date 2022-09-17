<template>
	<div class="wait-adopt-title">
		<view class="title">
			等待领养
			<view class="more">
				<view @click="goAdopt">查看更多</view>
				<tui-icon :size="15" name="arrowright"></tui-icon>
			</view>
		</view>
	</div>
	<view class="wait-adopt">
		<swiper
			class="swiper"
			:display-multiple-items="2.4"
			:previous-margin="10"
		>
			<swiper-item
				v-for="petInfo in petInfoList"
				@click="goPetInfo(petInfo)"
			>
				<view class="petInfo">
					<img class="img" :src="petInfo.img[0].path" />
					<view class="name">{{ petInfo.petName }}</view>
					<view class="city">
						{{ petInfo.city[1] + petInfo.city[2] }}
					</view>
					<view class="adopt-btn">去领养</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const db = uniCloud.database();
const petInfoList = ref([]);
const goAdopt = () => {
	uni.switchTab({
		url: '/pages/Adopt/index'
	});
};
db.collection('adoption')
	.field('city,pet_name as petName,_id,img,issue_time')
	.orderBy('issue_time', 'desc')
	.get()
	.then(res => {
		petInfoList.value = res.result.data.slice(0, 8);
	});
const goPetInfo = petInfo => {
	uni.navigateTo({
		url: `./ApplyAdopt/index?id=${petInfo._id}`
	});
};
</script>
<style scoped lang="less">
.wait-adopt-title {
	display: flex;
	width: 100%;
	justify-content: center;
	.title {
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		font-size: 30rpx;
		font-weight: 600;
		.more {
			display: flex;
			align-items: center;
			font-size: 22rpx;
			color: rgb(193, 192, 192);
		}
	}
}
.wait-adopt {
	.petInfo {
		height: 500rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		.img {
			width: 280rpx;
			height: 280rpx;
			border-radius: 30rpx;
		}
		.name {
			font-weight: 900;
		}
		.city {
			color: #666;
			font-size: 25rpx;
		}
		.adopt-btn {
			color: white;
			border-radius: 30rpx;
			padding: 15rpx 40rpx;
			background-image: linear-gradient(
				to right,
				rgb(233, 162, 194),
				rgb(233, 82, 151)
			);
		}
	}
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 500rpx;
	}
	.swiper-item {
		width: 300rpx;
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info {
		position: absolute;
		right: 20rpx;
	}
	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
}
</style>

<template>
	<img :src="userInfo.avatarFile.url" class="bac-image" />
	<view class="user-info">
		<img :src="userInfo.avatarFile.url" class="avatar" />
		<view class="nickname">{{ userInfo.nickname }}</view>
		<view class="private">
			<uni-icons type="chat" :size="20" color="white"></uni-icons>
			<view class="private-letter">私信</view>
		</view>
	</view>
	<view class="adopt">
		<view class="title">TA的送养</view>
		<view class="adopt-num">
			<view class="wait-adopt">
				正在送养
				<text class="quantity">{{ waitAdoptList }}</text>
			</view>
			<view class="already-adopt">
				已送养
				<text class="quantity">{{ alreadyAdoptList }}</text>
			</view>
		</view>
	</view>
	<PetList :where="where"></PetList>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import PetList from '@/components/PetList/index';
import { reactive } from 'vue';
const where = ref();
const db = uniCloud.database();
const userInfo = reactive({
	avatarFile: { url: '' },
	nickname: ''
});
const waitAdoptList = ref<number>(0);
const alreadyAdoptList = ref<number>(0);
onLoad(option => {
	where.value = `user_id=='${option.userId}'`;
	db.collection('uni-id-users')
		.where(`_id=='${option.userId}'`)
		.field('avatar_file as avatarFile,nickname')
		.get()
		.then(res => {
			Object.assign(userInfo, res.result.data[0]);
		});
	db.collection('adoption')
		.where(`user_id=='${option.userId}'`)
		.field('if_adopt')
		.get()
		.then(res => {
			res.result.data.forEach((value: { if_adopt: boolean }) => {
				if (value.if_adopt == false) {
					waitAdoptList.value++;
				} else {
					alreadyAdoptList.value++;
				}
			});
		});
});
</script>

<style lang="less" scoped>
.bac-image {
	width: 100%;
	opacity: 0.7;
}
.user-info {
	height: 270rpx;
	background-color: white;
	position: relative;
	bottom: 200rpx;
	border-top-left-radius: 40rpx;
	border-top-right-radius: 40rpx;
	border-bottom: 1px solid #ccc;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	.avatar {
		margin-top: -118rpx;
		width: 175rpx;
		height: 175rpx;
		border-radius: 50%;
	}
	.private {
		font-size: 28rpx;
		color: white;
		justify-content: space-between;
		display: flex;
		align-items: center;
		padding: 12rpx 40rpx;
		border-radius: 30rpx;
		background-image: linear-gradient(
			to right,
			rgb(237, 157, 172),
			rgb(236, 123, 140)
		);
		.private-letter {
			margin-left: 10rpx;
		}
	}
}
.adopt {
	margin-left: 5%;
	width: 90%;
	justify-content: space-between;
	margin-top: -150rpx;
	display: flex;
	align-items: center;
	.title {
		font-size: 43rpx;
	}
	.adopt-num {
		display: flex;
	}
	.wait-adopt,
	.already-adopt {
		font-size: 25rpx;
		color: #666;
		.quantity {
			color: rgb(236, 123, 140);
		}
	}
	.wait-adopt {
		margin-right: 30rpx;
	}
}
</style>

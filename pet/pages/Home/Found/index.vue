<template>
	<div class="wait-adopt-title">
		<view class="title">
			寻宠启示
			<view class="more" @click="goFoundPet">
				查看更多
				<tui-icon :size="15" name="arrowright"></tui-icon>
			</view>
		</view>
	</div>
	<view class="found">
		<view
			class="found-list"
			v-for="found in foundList"
			:key="found._id"
			@click="goFound(found)"
		>
			<img class="img" :src="found.uploadPicture[0].url" />
			<view class="name">{{ found.title }}</view>
			<view class="position">
				{{ found.city[1] }}/{{ found.city[2] }}
			</view>
			<view class="author">
				<img class="avatar" :src="found.avatar_url" />
				<view class="author-name">{{ found.nickname }}</view>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const foundList = ref<[]>([]);
const db = uniCloud.database();

onLoad(() => {
	db.collection('foundPet')
		.field(
			'user_id,_id,uploadPicture,city,title,avatar_url,nickname,create_time as createTime'
		)
		.orderBy('createTime', 'desc')
		.limit(2)
		.get()
		.then((res: any) => {
			foundList.value = res.result.data.reverse();
		})
		.catch(err => {
			console.log(err.code); // 打印错误码
			console.log(err.message); // 打印错误内容
		});
});
const goFoundPet = () => {
	uni.navigateTo({
		url: '/pages/FoundPet/index'
	});
};
const goFound = petInfo => {
	uni.navigateTo({
		url: `./Enlightenment/index?id=${petInfo._id}&user_id=${
			petInfo.user_id
		}`
	});
};
</script>

<style lang="less" scoped>
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
.found {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: space-evenly;
	.found-list {
		width: 330rpx;
		height: 580rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		.name {
			font-weight: 900;
			font-size: 30rpx;
			display: inline-block;
			white-space: nowrap;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.position {
			color: #666;
			font-size: 25rpx;
		}
		.img {
			width: 330rpx;
			height: 350rpx;
			border-radius: 20rpx;
		}
		.author {
			display: flex;
			align-items: center;
			.avatar {
				width: 50rpx;
				height: 50rpx;
				border-radius: 25rpx;
			}
			.author-name {
				color: #666;
				margin-left: 10rpx;
				font-size: 23rpx;
			}
		}
	}
}
</style>

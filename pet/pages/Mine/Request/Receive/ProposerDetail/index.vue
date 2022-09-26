<template>
	<view class="proposer-detail">
		<AuthorInformation
			:nickname="userInfo.nickname"
			:avatarUrl="userInfo.avatar_file.url"
			:userId="userInfo._id"
			:wxCode="applyInfo.wx_code"
			:phone="applyInfo.phone"
			title="申请人信息"
		></AuthorInformation>
		<view class="proposer-info">
			<view class="proposer-info-title">申请人信息</view>
			<view class="proposer-info-item">年龄:{{ applyInfo.age }}</view>
			<view class="proposer-info-item">性别:{{ applyInfo.gender }}</view>
			<view class="proposer-info-item">
				养宠经验:{{ applyInfo.experience }}
			</view>
			<view class="proposer-info-item">职业:{{ applyInfo.work }}</view>
			<view class="proposer-info-item">收入:{{ applyInfo.income }}</view>
			<view class="proposer-info-item">
				所在地:{{
					applyInfo.city[0] + applyInfo.city[1] + applyInfo.city[2]
				}}
			</view>
			<view class="proposer-info-item">
				当前养宠:{{ applyInfo.present }}
			</view>
		</view>
		<view class="application">
			<view class="application-title">申请单信息</view>
			<view class="application-serial">
				申请编号:{{ applyInfo._id.toLocaleUpperCase() }}
			</view>
			<view class="application-time">
				申请时间:
				<uni-dateformat
					:date="applyInfo.create_time"
					format="yyyy-MM-dd hh:mm:ss"
				></uni-dateformat>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { reactive } from 'vue';
import AuthorInformation from '@/components/AuthorInformation/index.vue';
const db = uniCloud.database();
type ApplyInfo = {
	_id: string;
	user_id: string;
	adopt_id: string;
	age: string;
	gender: string;
	experience: string;
	present: string;
	house: string;
	marriage: string;
	income: string;
	work: string;
	city: string[];
	phone: string;
	wx_code: string;
	sincerity: string;
	state: string;
	create_time: number;
};
const applyInfo = reactive<ApplyInfo>({
	_id: '',
	user_id: '',
	adopt_id: '',
	age: '',
	gender: '',
	experience: '',
	present: '',
	house: '',
	marriage: '',
	income: '',
	work: '',
	city: [],
	phone: '',
	wx_code: '',
	sincerity: '',
	state: '',
	create_time: 0
});
type UserInfo = {
	avatar_file: {
		url: string;
	};
	nickname: string;
	_id: string;
};
const userInfo = reactive<UserInfo>({
	avatar_file: {
		url: ''
	},
	nickname: '',
	_id: ''
});
onLoad(async option => {
	await db
		.collection('apply')
		.where(`_id=='${option.applyId}'`)
		.get()
		.then(res => {
			Object.assign(applyInfo, res.result.data[0]);
			console.log(applyInfo);
		})
		.then(() => {
			db.collection('uni-id-users')
				.field('nickname,avatar_file,_id')
				.where(`_id=='${applyInfo.user_id}'`)
				.get()
				.then(res => {
					Object.assign(userInfo, res.result.data[0]);
				});
		});
});
</script>

<style lang="scss" scoped>
.proposer-detail {
	margin-top: 30rpx;
	width: 90%;
	margin-left: 5%;
	.proposer-simple-info {
		padding: 20rpx;
		display: flex;
		border-radius: 30rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		&-avatar {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
		}
		&-other {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 40rpx;
			.name {
				font-size: 50rpx;
			}
			.phone-wx {
				width: 200rpx;
				justify-content: space-between;
				display: flex;
				align-items: center;
			}
		}
	}
	.proposer-info {
		margin-top: 40rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		&-item {
			margin-top: 30rpx;
		}
	}
	.application {
		display: flex;
		flex-direction: column;
		height: 220rpx;
		justify-content: space-between;
		margin-top: 30rpx;
		padding: 20rpx;
		border-radius: 30rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		&-title {
			font-weight: 900;
		}
	}
}
</style>

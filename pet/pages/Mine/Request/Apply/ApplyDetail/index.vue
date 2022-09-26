<template>
	<view class="apply-detail">
		<view class="schedule">
			<view class="schedule-title">申请进度</view>
			<view class="schedule-state">
				<view class="sign-outer">
					<view class="sign-inner">申请</view>
				</view>
				<view class="date">
					{{ inApplyInfo.state }}
					<view class="time">
						<uni-dateformat
							:date="inApplyInfo.create_time"
							format="yyyy-MM-dd hh:mm:ss"
						></uni-dateformat>
					</view>
				</view>
			</view>
		</view>
		<AuthorInformation
			:nickname="userInfo.nickname"
			:avatarUrl="userInfo.imgURL"
			:userId="userInfo.id"
			:wxCode="petInfo.wx_code"
			:phone="petInfo.phone"
			title="送养人信息"
		></AuthorInformation>
		<view class="proposer">
			<view class="proposer-title">申请人信息</view>
			<view class="proposer-item">姓名: {{ nickname }}</view>
			<view class="proposer-item">年龄: {{ inApplyInfo.age }}</view>
			<view class="proposer-item">性别: {{ inApplyInfo.gender }}</view>
			<view class="proposer-item">
				养宠经验: {{ inApplyInfo.experience }}
			</view>
			<view class="proposer-item">
				所在地区:
				{{
					inApplyInfo.city[0] +
						inApplyInfo.city[1] +
						inApplyInfo.city[2]
				}}
			</view>
			<view class="proposer-item">住房情况: {{ inApplyInfo.house }}</view>
			<view class="proposer-item">
				婚姻情况: {{ inApplyInfo.marriage }}
			</view>
			<view class="proposer-item">职业情况: {{ inApplyInfo.work }}</view>
		</view>
		<view class="application">
			<view class="application-title">申请单信息</view>
			<view class="application-serial">
				申请编号:{{ inApplyInfo._id.toLocaleUpperCase() }}
			</view>
			<view class="application-time">
				申请时间:
				<uni-dateformat
					:date="inApplyInfo.create_time"
					format="yyyy-MM-dd hh:mm:ss"
				></uni-dateformat>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import AuthorInformation from '@/components/AuthorInformation/index.vue';
import { reactive, ref } from 'vue';
const db = uniCloud.database();
type Apply = {
	_id: string;
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
	create_time: number;
	state: string;
	user_id: string;
};
const inApplyInfo = reactive<Apply>({
	_id: '',
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
	create_time: 0,
	user_id: ''
});
const petInfo = reactive({
	user_id:'',
	wx_code:'',
	phone:''
});
type UserInfo = {
	imgURL: string;
	nickname: string;
	id:string
};
const userInfo = reactive<UserInfo>({
	nickname: '',
	imgURL: '',
	id:''
});
const nickname = ref('');
onLoad(option => {
	db.collection('apply')
		.where(`_id=='${option.inApplyId}'`)
		.get()
		.then(res => {
			Object.assign(inApplyInfo, res.result.data[0]);
		})
		.then(() => {
			db.collection('uni-id-users')
				.where(`_id=='${inApplyInfo.user_id}'`)
				.field('nickname')
				.get()
				.then(res => {
					nickname.value = res.result.data[0].nickname;
				});
		})
		.then(async () => {
			await db
				.collection('adoption')
				.where(`_id=='${inApplyInfo.adopt_id}'`)
				.field('user_id,phone,wx_code')
				.get()
				.then(res => {
					Object.assign(petInfo, res.result.data[0]);
				});
		})
		.then(async () => {
			await db
				.collection('uni-id-users')
				.where(`_id=='${petInfo?.user_id}'`)
				.get()
				.then(res => {
					userInfo.imgURL=res.result.data[0].avatar_file?.url
					userInfo.nickname=res.result.data[0].nickname
					userInfo.id=res.result.data[0]._id
				});
		});
});
</script>

<style lang="less" scoped>
.apply-detail {
	padding-bottom: 80rpx;
	width: 90%;
	margin-left: 5%;
	.schedule {
		margin-top: 30rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
		padding: 30rpx;
		padding-top: 40rpx;
		padding-bottom: 110rpx;
		&-title {
			font-weight: 900;
			font-size: 30rpx;
		}
		&-state {
			margin-top: 50rpx;
			align-items: center;
			display: flex;
			.sign-outer {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				background-color: rgb(229, 191, 201);
				border: 1rpx solid rgb(237, 127, 161);
				display: flex;
				justify-content: center;
				align-items: center;
				.sign-inner {
					width: 55rpx;
					height: 55rpx;
					border-radius: 50%;
					background-color: rgb(237, 127, 161);
					color: white;
					font-size: 20rpx;
					line-height: 55rpx;
					text-align: center;
				}
			}
			.date {
				height: 90rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 40rpx;
				font-weight: 900;
				.time {
					font-weight: normal;
					margin-left: -15rpx;
					font-size: 20rpx;
					color: #ccc;
				}
			}
		}
	}
	.proposer {
		margin-top: 40rpx;
		border-radius: 30rpx;
		padding: 30rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		&-title {
			font-size: 32rpx;
			font-weight: 900;
		}
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
		padding: 30rpx;
		border-radius: 30rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		&-title {
			font-weight: 900;
		}
	}
}
</style>

<template>
	<view class="author-information">
		<view class="title">送养人信息</view>
		<view class="main">
			<view class="avatar">
				<img :src="userInfo.imgURL" class="img" />
			</view>
			<view class="information">
				<view class="name">{{ userInfo.nickname }}</view>
				<view class="authentication">
					<view class="autonym">未实名</view>
					<view class="designation">爱心人士</view>
				</view>
				<view class="adopt">
					<view class="adopting">
						正在送养
						<span class="quantity">{{ adopting }}</span>
					</view>
					<view class="already">
						已经送养
						<span class="quantity">{{ already }}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="consult">
				<uni-icons type="chat" :size="22" color="white"></uni-icons>

				在线咨询
			</view>
			<tui-icon name="voipphone" @click="callPhone"></tui-icon>
			<tui-icon name="wechat" @click="copyWxCode"></tui-icon>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
type PetInfomation = {
	_id: string;
	age: string;
	city: string[];
	gender: string;
	img: [];
	medical: string[];
	name: string;
	particular: string[];
	pet_name: string;
	phone: string;
	punch: string;
	request: string[];
	source: string[];
	story: string;
	variety: string;
	wx_code: string;
	issue_time: number;
	user_id: string;
};
type UserInfo = {
	imgUrl: string;
	nickname: string;
};
const props = defineProps<{
	petInfo: PetInfomation;
	userInfo: UserInfo;
	adopting: number;
	already: number;
}>();
const { petInfo, userInfo, adopting, already } = toRefs(props);
const callPhone = () => {
	uni.makePhoneCall({
		phoneNumber: petInfo.value.phone
	});
};
const copyWxCode = () => {
	uni.setClipboardData({
		data: petInfo.value.wx_code,
		success: function() {
			uni.showToast({
				title: '成功复制微信号'
			});
		}
	});
};
</script>

<style lang="less" scoped>
.author-information {
	padding: 40rpx;
	border-radius: 20rpx;
	margin-top: 40rpx;
	margin-left: 5%;
	width: 80%;
	height: 400rpx;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.title {
		font-size: 35rpx;
		font-weight: 900;
	}
	.main {
		display: flex;
		.avatar {
			.img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 75rpx;
			}
		}
		.information {
			margin-left: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.name {
				font-size: 40rpx;
				font-weight: 900;
			}
			.adopt {
				display: flex;
				color: #666;
				font-size: 22rpx;
				.already {
					margin-left: 20rpx;
				}
				.quantity {
					color: #e0889b;
				}
			}
			.authentication {
				display: flex;
				align-items: center;
				.autonym {
					padding: 3rpx 10rpx;
					height: 30rpx;
					line-height: 30rpx;
					font-size: 25rpx;
					color: #666;
					border: 1px solid #000;
					border-radius: 10rpx;
				}
				.designation {
					border-radius: 10rpx;
					margin-left: 10rpx;
					height: 28rpx;
					line-height: 28rpx;
					font-size: 23rpx;
					padding: 3rpx 10rpx;
					border: 1px solid #e0889b;
					color: #e0889b;
				}
			}
		}
	}
	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.consult {
			justify-content: center;
			display: flex;
			align-items: center;
			height: 40rpx;
			width: 220rpx;
			border-radius: 30rpx;
			padding: 25rpx;
			color: white;
			background-image: linear-gradient(
				to right,
				rgb(231, 159, 177),
				rgb(237, 122, 138)
			);
		}
	}
}
</style>

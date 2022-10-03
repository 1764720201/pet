<template>
	<view class="author-information">
		<view class="title">{{ title }}</view>
		<view class="main">
			<view class="avatar" @click="goUserInfo">
				<img :src="avatarUrl" class="img" />
			</view>
			<view class="information">
				<view class="name">{{ nickname }}</view>
				<view class="authentication">
					<view class="autonym">未实名</view>
					<view class="designation">{{ label }}</view>
				</view>
				<view class="adopt">
					<view class="waitAdopt">
						正在送养
						<span class="quantity">{{ waitAdopt }}</span>
					</view>
					<view class="alreadyAdopt">
						已经送养
						<span class="quantity">{{ alreadyAdopt }}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="consult" @click="goChat">
				<uni-icons type="chat" :size="22" color="white"></uni-icons>
				在线咨询
			</view>
			<view class="t-icon t-icon-dianhua-5" @click="callPhone"></view>
			<view class="t-icon t-icon-weixindenglu" @click="copyWxCode"></view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { toRefs, ref, watch } from 'vue';

const props = defineProps<{
	userId: string;
	wxCode: string;
	phone: string;
	avatarUrl: string;
	nickname: string;
	title: string;
}>();
const { userId, wxCode, phone, avatarUrl, nickname, title } = toRefs(props);
const label = ref<string>('暂无');
const waitAdopt = ref<number>(0);
const alreadyAdopt = ref<number>(0);
const callPhone = () => {
	uni.makePhoneCall({
		phoneNumber: phone.value
	});
};
const copyWxCode = () => {
	uni.setClipboardData({
		data: wxCode.value,
		success: function() {
			uni.showToast({
				title: '成功复制微信号'
			});
		}
	});
};
const db = uniCloud.database();
const goUserInfo = () => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/UserInfo/index?userId=${userId.value}`
	});
};
watch(
	() => userId.value,
	() => {
		db.collection('adoption')
			.where(`user_id=='${userId.value}'`)
			.field('if_adopt')
			.get()
			.then(res => {
				res.result.data.forEach((value: { if_adopt: boolean }) => {
					if (value.if_adopt == false) {
						waitAdopt.value++;
					} else {
						alreadyAdopt.value++;
					}
				});
			})
			.then(() => {
				db.collection('uni-id-users')
					.where(`_id=='${userId.value}'`)
					.field('label')
					.get({ getOne: true })
					.then(res => {
						if (res.result.data.label) {
							label.value = res.result.data.label;
						}
					});
			});
	}
);
const myId = uniCloud.getCurrentUserInfo().uid;
const goChat = () => {
	if (userId.value == myId) {
		uni.showToast({
			title: '不能自我咨询',
			icon: 'none'
		});
	} else {
		uni.navigateTo({
			url: `/pages/Chat/index?id=${userId.value}`
		});
	}
};
</script>

<style lang="less" scoped>
.author-information {
	padding: 40rpx;
	border-radius: 20rpx;
	margin-top: 40rpx;
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
				.alreadyAdopt {
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
					height: 28rpx;
					line-height: 28rpx;
					font-size: 22rpx;
					color: #666;
					font-weight: 900;
					border: 1px solid #000;
					border-radius: 15rpx;
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

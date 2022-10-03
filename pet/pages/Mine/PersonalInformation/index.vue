<template>
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
					<button
						class="mini-btn"
						type="button"
						size="mini"
						@click="chooseLabel"
					>
						{{ label }}
					</button>
					<view class="authentication">未实名认证</view>
				</view>
			</view>
			<view class="avatar">
				<img class="img" :src="data?.avatar_file?.url" />
			</view>
		</view>
	</unicloud-db>
	<view class="footer">
		<view class="collect" @click="goCollect">
			收藏
			<span class="quantity">{{ collectQuantity }}</span>
		</view>
		<view class="foot" @click="goFootPrint">
			足迹
			<span class="quantity">{{ footprintQuantity }}</span>
		</view>
		<view class="data">
			<button class="mini-btn" size="mini" @click="goUserInfo">
				个人资料
			</button>
		</view>
	</view>
	<tui-actionsheet
		tips="请选择属于你的专属角色"
		:show="showActionSheet"
		:item-list="itemList"
		@click="choose"
		@cancel="cancel"
	></tui-actionsheet>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { onShow, onLoad } from '@dcloudio/uni-app';
const showActionSheet = ref<boolean>(false);
const itemList = reactive([
	{
		text: '爱心人士',
		color: '#2B2B2B'
	},
	{
		text: '爱心救助人',
		color: '#2B2B2B'
	},
	{
		text: '资深救助人',
		color: '#2B2B2B'
	},
	{
		text: '志愿者',
		color: '#2B2B2B'
	},
	{
		text: '爱心义工',
		color: '#2B2B2B'
	}
]);
const chooseLabel = () => {
	showActionSheet.value = true;
};
const cancel = () => {
	showActionSheet.value = false;
};
const choose = (e: { text: string }) => {
	db.collection('uni-id-users')
		.where(`_id==$cloudEnv_uid`)
		.update({
			label: e.text
		})
		.then(async () => {
			uni.showToast({
				title: '更改成功'
			});
			await getLabel();
			showActionSheet.value = false;
		});
};
const collectQuantity = ref<number>(0);
const footprintQuantity = ref<number>(0);
const userId = ref<string>('');
const db = uniCloud.database();
const goUserInfo = () => {
	uni.navigateTo({
		url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
	});
};
const label = ref<string>('+个人标签');
const getLabel = async () => {
	await db
		.collection('uni-id-users')
		.where(`_id==$cloudEnv_uid`)
		.field('label')
		.get({ getOne: true })
		.then(res => {
			if (res.result.data.label) {
				label.value = res.result.data.label;
			}
		});
};

onLoad(() => {
	getLabel();
});
onShow(async () => {
	userId.value = uniCloud.getCurrentUserInfo().uid;
	await db
		.collection('collect')
		.where(`user_id=='${userId.value}'&&type!=4`)
		.get()
		.then(res => {
			collectQuantity.value = res.result.data.length;
		});
	await db
		.collection('footprint')
		.where(`user_id=='${userId.value}'`)
		.field('adopt_id,found_id')
		.distinct()
		.get()
		.then((res: { result: { data: { length: number } } }) => {
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
			padding: 0 20rpx;
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
			height: 70rpx;
			width: 150rpx;
			margin-left: 80rpx;
			line-height: 70rpx;
			border-radius: 35rpx;
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

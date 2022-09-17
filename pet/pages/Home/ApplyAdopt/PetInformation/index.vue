<template>
	<view class="header">
		<view class="pet-name">{{ petInfo.pet_name }}</view>
		<span class="gender">{{ petInfo.gender == '男生' ? '♂' : '♀' }}</span>
	</view>
	<view class="body">
		<view class="option">
			<view class="title">姓名：</view>
			<view class="name">{{ petInfo.pet_name }}</view>
		</view>
		<view class="option">
			<view class="title">年龄：</view>
			<view class="name">{{ petInfo.age }}</view>
		</view>
		<view class="option">
			<view class="title">品种：</view>
			<view class="name">{{ petInfo.variety }}</view>
		</view>
		<view class="option">
			<view class="title">性别：</view>
			<view class="name">{{ petInfo.gender }}</view>
		</view>
		<view class="option">
			<view class="title">地区：</view>
			<view class="region">
				{{ petInfo.city[1] }} {{ petInfo.city[2] }}
			</view>
		</view>
		<view class="option">
			<view class="title">领养后需要打卡：</view>
			<view class="name">
				{{ petInfo.punch ? petInfo.punch : '未设置' }}
			</view>
		</view>
	</view>
	<view class="description">
		<view class="title">送养描述</view>
		<view class="story">{{ petInfo.story }}</view>
	</view>
	<view class="request-list">
		<view class="request" v-for="request in petInfo.request" :key="request">
			<view class="true">√</view>
			{{ request }}
		</view>
	</view>
	<view class="issue-time">
		<view class="time">
			<tui-icon name="clock" :size="15"></tui-icon>
			<uni-dateformat
				:date="petInfo.issue_time"
				format="yyyy-MM-dd hh:mm:ss"
			></uni-dateformat>
			<span>发布</span>
		</view>
		<view class="poster">生成海报</view>
	</view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
// import Draw from '@/uni_modules/sakura-canvas/js_sdk/index';
// const draw = new Draw({
// 	width: 375,
// 	height: 500,
// 	canvasId: 'myCanvas',
// 	_this: this,
// 	unit: 'px',
// 	background: {
// 		type: 'color',
// 		color: '#fffff',
// 		w: 375,
// 		h: 500
// 	},
// 	exportImageStyle: {
// 		// 导出图片的类型只支持 JPG/PNG
// 		fileType: 'png',
// 		// 导出图片的质量 0~1之间
// 		quality: 1
// 	},
// 	drawDelayTime: 200,
// 	exportImageDelayTime: 200,
// 	drawTipsText: '绘制中...',
// 	exportImageTips: '导出图片中...'
// });
// draw.$on('init', async () => {
// 	// 绘制画布背景
// 	await draw.drawBackground();
// });
// // background: 绘制画布背景完成，会具体返回背景的宽度高度和一个style(不需要监听时可以不监听)
// // 用于当背景为图片(mode: widthFix/heightFix)时不确定的宽度/高度，可以动态修改画布的宽
// draw.$on('background', async result => {
// 	// w: 背景宽度 h: 背景高度
// 	const { w, h } = result;
// 	// 可以在此处调用setCanvasStyle方法用于修改画布大小
// });
// // drawComplete: 用于监听绘制完成事件, 可以返回当前画布的宽度高度和已经绘制完成内容的高度, 用于当前的情况，不确定画布高度时，动态修改画布的高度
// draw.$on('drawComplete', async result => {
// 	// width: 设置的画布的宽度
// 	// height:设置的画布的高度
// 	// contentWidth: 绘制出来的内容宽度
// 	// contentWidth: 绘制出来的内容高度
// 	const { width, height, contentHeight, contentWidth } = result;
// 	// 可以在此处调用setCanvasStyle方法用于修改画布大小
// });
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
const props = defineProps<{ petInfo: PetInfomation }>();
const { petInfo } = toRefs(props);
</script>

<style lang="less" scoped>
.header {
	display: flex;
	align-items: center;
	margin: 20rpx 0 0 40rpx;
	.pet-name {
		font-size: 50rpx;
		font-weight: 900;
	}
	.gender {
		font-size: 30rpx;
		margin-left: 20rpx;
		color: rgb(236, 87, 158);
	}
}
.body {
	margin-top: 50rpx;
	display: flex;
	flex-wrap: wrap;
	margin-left: 5%;
	width: 100%;
	justify-content: space-between;
	.option {
		margin-top: 30rpx;
		width: 50%;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		.title {
			color: #666;
			font-size: 23rpx;
		}
		.region {
			font-weight: 900;
		}
	}
}
.description {
	margin-top: 50rpx;
	margin-left: 38rpx;
	.title {
		font-weight: 900;
	}
	.story {
		margin-top: 40rpx;
		font-size: 25rpx;
	}
}
.request-list {
	display: flex;
	flex-wrap: wrap;
	margin-top: 30rpx;
	margin-left: 20rpx;
	.request {
		display: flex;
		align-items: center;
		margin-left: 15rpx;
		color: rgb(224, 116, 134);
		font-size: 25rpx;
		.true {
			text-align: center;
			line-height: 24rpx;
			width: 24rpx;
			color: white;
			height: 24rpx;
			font-size: 16rpx;
			margin-right: 10rpx;
			border-radius: 12rpx;
			background-color: rgb(224, 116, 134);
		}
	}
}
.issue-time {
	color: #666;
	font-size: 25rpx;
	display: flex;
	margin-left: 5%;
	width: 90%;
	margin-top: 20rpx;
	justify-content: space-between;
	align-items: center;
	.poster {
		width: 150rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 20rpx;
		color: #e98696;
		border: 1px solid #e98696;
	}
}
</style>

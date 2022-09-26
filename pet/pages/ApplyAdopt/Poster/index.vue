<template>
	<view class="poster" @tap="drawPoster">生成海报</view>
	<canvas
		class="canvas"
		:id="canvasId"
		:canvas-id="canvasId"
		:style="[canvasStyle]"
	/>
	<u-show-poster v-model="showPoster" :image="posterImage" />
</template>
<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted, toRefs } from 'vue';
import uShowPoster from '@/components/u-show-poster/u-show-poster.vue';
import Draw from '@/uni_modules/sakura-canvas/js_sdk/index';
type PetInfomation = {
	_id: string;
	age: string;
	city: string[];
	gender: string;
	img: { url: string }[];
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
const { ctx } = getCurrentInstance();
// canvas

const canvasId = 'poster';
const canvasStyle = reactive({
	width: '600rpx',
	height: '1000rpx'
});
const showPoster = ref(false);
const posterImage = ref('');
let draw = null;
// 创建绘制对象
const createDraw = () => {
	draw = new Draw({
		width: 600,
		height: 1000,
		canvasId,
		_this: ctx,
		// 绘制单位 px/rpx
		unit: 'rpx',
		// default: 默认绘制模式 2d: 2d绘制模式(只在下小程序上使用, H5/APP会自定转成default)
		type: 'default',
		background: {
			type: 'color',
			color: '#fff'
		},
		// 绘制时的延迟时间
		drawDelayTime: 200,
		// 导出图片时的延迟时间
		exportImageDelayTime: 600
	});
	// 目前绘制需要先监听draw抛出的监听事件
	// init: 初始化完成可以绘制画布背景(现在画布背景需要自行调用方法绘制)
	draw.$on('init', async () => {
		// 绘制画布背景
		await draw.drawBackground();
	});
};
// 绘制内容
const posterData = reactive({
	image: '',
	petImg: '',
	petName: '',
	petAge: '',
	city: '',
	story: ''
});
setTimeout(() => {
	const petData = reactive({
		image: '/static/images/海报.png',
		petImg: petInfo.value.img[0].url,
		petName: '我叫' + petInfo.value.pet_name,
		petAge: '我今年' + petInfo.value.age + '了',
		city:
			'我在' +
			petInfo.value.city[0] +
			petInfo.value.city[1] +
			petInfo.value.city[2],
		story: petInfo.value.story
	});
	Object.assign(posterData, petData);
}, 1000);
const drawPoster = async () => {
	// console.log(draw)
	const { image, petImg, petName, petAge, city, story } = posterData;
	const res = await draw.drawPoster(({ ctxObj, bgObj }) => {
		const { width, height } = ctxObj;
		// 距离x轴的距离
		// 白色背景
		const background = {
			name: 'background',
			type: 'rect',
			w: width,
			h: height,
			color: '#ffffff',

			shadow: {
				show: false,
				blur: 30,
				color: 'rgba(0, 0, 0, .15)'
			}
		};
		// 商品图
		const backImg = {
			unit: 'rpx',
			type: 'image',
			drawType: 'rect',
			src: image,
			h: 1000,
			w: 600
		};
		const petInfoImg = {
			unit: 'rpx',
			type: 'image',
			drawType: 'rect',
			src: petImg,
			windowAlign: 'center',
			y: 155,
			h: 315,
			w: 370
		};
		const name = {
			type: 'text',
			text: petName,
			y: 550,
			x: 50,
			font: {
				size: 25,
				weight: 900
			}
		};
		const age = {
			type: 'text',
			text: petAge,
			y: 550,
			x: 350,
			font: {
				size: 25,
				weight: 900
			}
		};
		const petCity = {
			type: 'text',
			text: city,
			y: 600,
			x: 50,
			font: {
				size: 25,
				weight: 900
			}
		};
		const petStory = {
			type: 'text',
			text: story,
			y: 650,
			x: 35,
			w: 560,
			font: {
				size: 25,
				weight: 900
			},
			LineHeight: {
				height: 35
			}
		};
		return [background, backImg, petInfoImg, name, age, petCity, petStory];
	});
	if (!res.success) return;
	showPoster.value = true;
	posterImage.value = res.data;
};
onMounted(() => {
	createDraw();
});
</script>

<style lang="scss" scoped>
.canvas {
	position: fixed;
	left: -999999rpx;
	top: -999999rpx;
}
.poster {
	width: 150rpx;
	height: 50rpx;
	text-align: center;
	line-height: 50rpx;
	border-radius: 20rpx;
	color: #e98696;
	border: 1px solid #e98696;
}
</style>

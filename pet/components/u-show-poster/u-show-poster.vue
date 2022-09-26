<template>
	<u-popup :show="modelValue" background="transparent" @close="handleValue">
		<view class="scroll"><image :src="image" class="image" /></view>
		<view class="save" @tap="saveImage">保存到相册</view>
	</u-popup>
</template>
<script>
import { saveImageToPhotosAlbum } from '@/uni_modules/sakura-canvas/js_sdk/utils/util';
</script>
<script setup>
const props = defineProps({
	modelValue: Boolean,
	image: String
});
const emtis = defineEmits(['update:modelValue']);
const handleValue = () => emtis('update:modelValue', !props.modelValue);
// console.log(saveImageToPhotosAlbum)
const saveImage = async () => {
	// #ifdef H5
	uni.showToast({
		title: 'H5不支持API保存图片,请使用长按保存!!!',
		icon: 'none'
	});
	return;
	// #endif
	const res = await saveImageToPhotosAlbum(props.image);
	if (!res.success) {
		uni.showToast({ title: '保存图片失败!!!', icon: 'none' });
		return;
	}
	handleValue();
};
</script>

<style scoped lang="scss">
.scroll {
	width: 600rpx;
	height: 1000rpx;
}
.image {
	height: 100%;
	width: 100%;
	display: block;
}
.save {
	margin-top: 70rpx;
	text-align: center;
	line-height: 90rpx;
	color: white;
	width: 600rpx;
	height: 80rpx;
	border-radius: 50rpx;
	background-color: rgb(221, 138, 11);
}
</style>

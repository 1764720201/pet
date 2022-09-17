<template>
	<Received></Received>
	<News></News>
	<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" />
	<view class="" @click="upload">上传</view>
</template>
<script setup lang="ts">
import Received from './Received/index.vue';
import News from './News/index.vue';
import { ref } from 'vue';
const imageValue = ref([]);
const upload = () => {
	uniCloud.callFunction({
		name: 'uploadPicture',
		data: {
			image: imageValue.value
		}
	});
};
</script>

<style lang="less" scoped></style>

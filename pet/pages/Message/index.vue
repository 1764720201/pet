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
import { reactive } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
const userInfo = reactive({
	uid: 0
});
onShow(() => {
	Object.assign(userInfo, uniCloud.getCurrentUserInfo());
});
onLoad(() => {
	Object.assign(userInfo, uniCloud.getCurrentUserInfo());
	if (userInfo.uid == 0) {
		uni.navigateTo({
			url:
				'/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
		});
	}
});
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

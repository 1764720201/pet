<template>
	<div></div>
</template>
<script setup lang="ts">
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
</script>

<style lang="less" scoped></style>

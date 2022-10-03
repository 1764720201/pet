<template>
	<Received :hasLogin="hasLogin" :userId="userId"></Received>
	<News :hasLogin="hasLogin" :userId="userId"></News>
</template>
<script setup lang="ts">
import Received from './Received/index.vue';
import News from './News/index.vue';
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
const userId = ref<string>();
const db = uniCloud.database();
const hasLogin = ref<boolean>(false);
const checkLogin = async () => {
	await db
		.collection('uni-id-users')
		.where('_id==$cloudEnv_uid')
		.get({ getOne: true })
		.then(res => {
			userId.value = res.result.data._id;
			hasLogin.value = true;
		})
		.catch(() => {
			hasLogin.value = false;
		});
};
onShow(async () => {
	db.collection('chat')
		.where(`to_uid==$cloudEnv_uid&&is_read==false`)
		.count()
		.then(res => {
			if (!res.result.total) {
				uni.removeTabBarBadge({
					index: 3
				});
			}
		});
	await checkLogin();
	if (!hasLogin.value) {
		uni.navigateTo({
			url:
				'/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
		});
	}
});
</script>

<style lang="less" scoped></style>

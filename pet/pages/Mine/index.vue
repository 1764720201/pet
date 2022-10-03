<template>
	<PersonalInformation></PersonalInformation>
	<Request></Request>
	<Safe></Safe>
</template>
<script setup lang="ts">
import PersonalInformation from './PersonalInformation/index.vue';
import Request from './Request/index.vue';
import Safe from './Safe/index.vue';
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
const collect = ref<string[]>([]);
onShow(async () => {
	await checkLogin();
	if (!hasLogin.value) {
		uni.navigateTo({
			url:
				'/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
		});
	} else {
		db.collection('collect')
			.where(`user_id=='${userId.value}'`)
			.field('_id')
			.get()
			.then(res => {
				collect.value = res.result.data;
			});
	}
});
</script>

<style lang="less" scoped></style>

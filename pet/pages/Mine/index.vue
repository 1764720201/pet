<template>
	<PersonalInformation
		:userInfo="userInfo"
		:collect="collect"
	></PersonalInformation>
	<Request></Request>
	<Safe></Safe>
</template>
<script setup lang="ts">
import PersonalInformation from './PersonalInformation/index.vue';
import Request from './Request/index.vue';
import Safe from './Safe/index.vue';
import { reactive, ref, provide } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
const userInfo = reactive({
	uid: 0
});
onShow(() => {
	Object.assign(userInfo, uniCloud.getCurrentUserInfo());
});
provide('userId', userInfo.uid);
const db = uniCloud.database();
const collect = ref<string[]>([]);
onLoad(() => {
	Object.assign(userInfo, uniCloud.getCurrentUserInfo());
	if (!userInfo.uid) {
		uni.navigateTo({
			url:
				'/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
		});
	} else {
		db.collection('collect')
			.where(`user_id=='${userInfo.uid}'`)
			.field('_id')
			.get()
			.then(res => {
				collect.value = res.result.data;
			});
	}
});
</script>

<style lang="less" scoped></style>

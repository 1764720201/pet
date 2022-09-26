<template>
	<lgd-tab
		:tabValue="tabValue"
		:tabIndex="tabIndex"
		textColor="#ec8a9e "
		underlineColor="#ec8a9e"
		@getIndex="getIndex"
	/>
	<Found :where="where"></Found>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Found from '@/components/Tab/Found/index.vue';
const userId = uniCloud.getCurrentUserInfo().uid;
const tabValue = reactive(['已发布', '已找回']);
const tabIndex = ref(0);
const where = ref();
const getIndex = (e: number) => {
	tabIndex.value = e;
	switch (e) {
		case 0:
			where.value = `user_id=='${userId}'&&state=='已发布'`;
			break;
		case 1:
			where.value = `user_id=='${userId}'&&state=='已找回'`;
			break;
	}
};
</script>

<style lang="less" scoped></style>

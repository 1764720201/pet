<template>
	<lgd-tab
		:tabValue="tabValue"
		:tabIndex="tabIndex"
		textColor="#ec8a9e "
		underlineColor="#ec8a9e"
		@getIndex="getIndex"
	/>
	<Adopt :where="where"></Adopt>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Adopt from '@/components/Tab/Issue/index.vue';
const userId = uniCloud.getCurrentUserInfo().uid;
const tabValue = reactive(['待送养', '已送养']);
const tabIndex = ref(0);
const where = ref(`user_id=='${userId}'&&if_adopt==${false}`);
const getIndex = (e: number) => {
	tabIndex.value = e;
	switch (e) {
		case 0:
			where.value = `user_id=='${userId}'&&if_adopt==${false}`;
			break;
		case 1:
			where.value = `user_id=='${userId}'&&if_adopt==${true}`;
			break;
	}
};
</script>

<style lang="less" scoped></style>

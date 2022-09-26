<template>
	<lgd-tab
		:tabValue="tabValue"
		:tabIndex="tabIndex"
		textColor="#ec8a9e "
		underlineColor="#ec8a9e"
		@getIndex="getIndex"
	/>
	<Apply :where="where"></Apply>
</template>
<script lang="ts" setup>
import Apply from '@/components/Tab/Apply/index.vue';
import { reactive, ref } from 'vue';
const tabValue = reactive(['申请中', '领养成功', '已取消', '被拒绝']);
const tabIndex = ref(0);
const userId = uniCloud.getCurrentUserInfo().uid;
const where = ref(`state=='申请中'&&user_id=='${userId}'`);
const getIndex = (e: number) => {
	tabIndex.value = e;
	switch (e) {
		case 0:
			where.value = `state=='申请中'&&user_id=='${userId}'`;
			break;
		case 1:
			where.value = `state=='送养成功'&&user_id=='${userId}'`;
			break;
		case 2:
			where.value = `state=='已取消'&&user_id=='${userId}'`;
			break;
		case 3:
			where.value = `state=='已拒绝'&&user_id=='${userId}'`;
			break;
	}
};
</script>
<style lang="less" scoped></style>

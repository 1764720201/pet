<template>
	<lgd-tab
		:tabValue="tabValue"
		:tabIndex="tabIndex"
		textColor="#ec8a9e "
		underlineColor="#ec8a9e"
		@getIndex="getIndex"
	/>
	<Receive :state="state"></Receive>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Receive from '@/components/Tab/Receive/index.vue';
const tabIndex = ref(0);
const tabValue = reactive(['申请中', '送养成功', '已拒绝', '已取消']);
const state = ref('申请中');
const getIndex = (e: number) => {
	tabIndex.value = e;
	switch (e) {
		case 0:
			state.value = '申请中';
			break;
		case 1:
			state.value = '送养成功';
			break;
		case 2:
			state.value = '已拒绝';
			break;
		case 3:
			state.value = '已取消';
			break;
	}
};
</script>

<style scoped lang="less"></style>

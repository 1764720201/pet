<template>
	<lgd-tab
		:tabValue="tabValue"
		:tabIndex="tabIndex"
		textColor="#ec8a9e "
		underlineColor="#ec8a9e"
		@getIndex="getIndex"
	/>
	<Adopt v-if="tabIndex == 0"></Adopt>
	<FoundPet v-if="tabIndex == 1"></FoundPet>
	<Knowledge v-if="tabIndex == 2"></Knowledge>
	<PopularizationOfScience v-if="tabIndex == 3"></PopularizationOfScience>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Adopt from '@/components/Tab/Collect/Adopt.vue';
import FoundPet from '@/components/Tab/Collect/FoundPet.vue';
import Knowledge from '@/components/Tab/Collect/Knowledge.vue';
import PopularizationOfScience from '@/components/Tab/Collect/PopularizationOfScience.vue';
const tabValue = reactive(['领养', '寻宠', '科普', '百科']);
const tabIndex = ref(0);
const getIndex = (e: number) => {
	tabIndex.value = e;
};
</script>

<style scoped lang="less"></style>

<template>
	<uni-search-bar
		@confirm="search"
		@blur="blur"
		@cancel="cancel"
		:radius="100"
	></uni-search-bar>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue';
const instance = getCurrentInstance();
const search = res => {
	uni.showToast({
		title: '搜索：' + res.value,
		icon: 'none'
	});
};
const blur=(e:{value:string})=>{
	instance?.proxy?.$Bus.emit('search', e.value)
}
const cancel=()=>{
	instance?.proxy?.$Bus.emit('search', '')
}
</script>

<style lang="less" scoped>
.search-result {
	padding-top: 10px;
	padding-bottom: 20px;
	text-align: center;
}

.search-result-text {
	text-align: center;
	font-size: 14px;
	color: #666;
}

.example-body {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	padding: 0px;
}

.uni-mt-10 {
	margin-top: 10px;
}
</style>

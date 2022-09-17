<template>
	<div class="wait-adopt">
		<view class="title">
			<template>
				<view>
					<span @click="goAdopt"><slot name="adopt"></slot></span>
				</view>
			</template>
			<view class="more">
				<view>查看更多</view>
				<tui-icon :size="15" name="arrowright"></tui-icon>
			</view>
		</view>
	</div>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped></style>

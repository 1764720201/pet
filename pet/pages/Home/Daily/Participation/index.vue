<template>
	<view class="title">#吸猫的日常~#</view>
	<uni-forms ref="form" :modelValue="formData" :rules="rules">
		<uni-forms-item name="content">
			<textarea
				class="content"
				placeholder="请输入内容~"
				v-model="formData.content"
				maxlength="200"
			></textarea>
		</uni-forms-item>
		<uni-forms-item name="imageList">
			<uni-file-picker
				v-model="formData.imageList"
				file-mediatype="image"
				mode="grid"
				:limit="6"
			/>
		</uni-forms-item>
	</uni-forms>
	<view class="tips">最多上传6张图片</view>
	<view class="confirm-btn">
		<button class="confirm-issue" @click="confirmIssue">发布</button>
	</view>
</template>
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { nextTick, reactive, ref } from 'vue';
const formData = reactive({
	content: '',
	imageList: []
});
const db = uniCloud.database();
const ifApply = ref<boolean>(false);
const topicId = ref<string>();
onLoad(option => {
	if (option.id) {
		ifApply.value = true;
		topicId.value = option.id;
		db.collection('topic')
			.where(`_id=='${option.id}'`)
			.get({ getOne: true })
			.then(res => {
				const data = res.result.data;
				formData.content = data.content;
				formData.imageList = data.image;
			});
	}
});
const userId = uniCloud.getCurrentUserInfo().uid;
const form = ref(null);
const rules = reactive({
	content: {
		rules: [
			{
				required: true,
				errorMessage: '内容不能为空'
			},
			{
				maxLength: 200,
				errorMessage: '最大长度为200'
			}
		]
	},
	imageList: {
		rules: [
			{
				required: true,
				errMessage: '图片不能为空'
			}
		]
	}
});
const confirmIssue = () => {
	if (!ifApply.value) {
		form.value.validate().then(() => {
			uniCloud.callFunction({
				name: 'topic',
				data: {
					imageList: formData.imageList,
					userId: userId,
					content: formData.content,
					read: 0
				},
				success() {
					uni.showToast({
						title: '发布成功'
					});
					uni.navigateBack();
				},
				fail(err) {
					console.log(err);
				}
			});
		});
	} else {
		form.value.validate().then(async () => {
			await db
				.collection('topic')
				.where(`_id=='${topicId.value}'`)
				.update({
					content: formData.content,
					image: formData.imageList
				})
				.then(() => {
					uni.navigateBack({
						success() {
							uni.showToast({
								title: '编辑成功',
								icon: 'none'
							});
						}
					});
				});
		});
	}
};
</script>

<style lang="scss" scoped>
.title {
	margin-left: 10%;
	margin-top: 30rpx;
	font-size: 35rpx;
	color: rgb(236, 147, 18);
}
.tips {
	color: #666;
	margin-left: 20rpx;
}
.content {
	height: 200rpx;
	margin-top: 40rpx;
	margin-left: 10%;
	width: 100%;
}
.confirm-btn {
	padding-bottom: 280rpx;
	width: 100%;
	.confirm-issue {
		color: white;
		margin: 30rpx 0 0 5%;
		height: 80rpx;
		line-height: 80rpx;
		width: 90%;
		background-image: linear-gradient(
			to right,
			rgb(223, 154, 171),
			rgb(238, 120, 137)
		);
		border-radius: 40rpx;
	}
}
</style>

<template>
	<view class="found-pet">
		<uni-forms
			ref="form"
			:modelValue="formData"
			label-width="150"
			:rules="rules"
		>
			<view class="header">
				<uni-forms-item name="title">
					<input
						type="text"
						placeholder="请输入标题~"
						v-model="formData.title"
					/>
				</uni-forms-item>
				<uni-forms-item name="introduce">
					<uni-easyinput
						type="textarea"
						v-model="formData.introduce"
						cols="40"
						rows="5"
						placeholder="宝贝特征介绍~"
					></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="uploadPicture">
					<uni-file-picker
						limit="3"
						file-mediatype="image"
						v-model="formData.uploadPicture"
					></uni-file-picker>
				</uni-forms-item>
			</view>
			<view class="max-upload">最多上传3张图片</view>
			<view class="option">
				<uni-forms-item label="类型" name="type">
					<uni-data-checkbox
						mode="tag"
						v-model="formData.typeIndex"
						:localdata="typeList"
					></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="品种" name="variety">
					<input
						type="text"
						v-model="formData.variety"
						placeholder="请输入品种"
					/>
				</uni-forms-item>
				<uni-forms-item label="姓名" name="name">
					<input
						type="text"
						v-model="formData.name"
						placeholder="请输入联系人姓名"
					/>
				</uni-forms-item>
				<uni-forms-item label="电话" name="phone">
					<input
						type="text"
						v-model="formData.phone"
						placeholder="请输入联系电话"
					/>
				</uni-forms-item>
				<uni-forms-item label="微信号" name="wxCode">
					<input
						type="text"
						v-model="formData.wxCode"
						placeholder="请输入号码"
					/>
				</uni-forms-item>
				<uni-forms-item label="走失城市" name="city">
					<uni-data-picker
						placeholder="请选择地址"
						popup-title="请选择城市"
						collection="opendb-city-china"
						field="code as value, name as text"
						orderby="value asc"
						:step-searh="true"
						self-field="code"
						parent-field="parent_code"
						@change="changeAddress"
					></uni-data-picker>
				</uni-forms-item>
				<uni-forms-item label="丢了什么" name="star">
					<uni-data-checkbox
						mode="tag"
						v-model="formData.starIndex"
						:localdata="starList"
					></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="性别" name="gender">
					<uni-data-checkbox
						mode="tag"
						v-model="formData.genderIndex"
						:localdata="genderList"
					></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="悬赏金额" name="reward">
					<input
						maxlength="10"
						type="text"
						v-model="formData.reward"
						placeholder="0表示不悬赏"
					/>
				</uni-forms-item>
			</view>
		</uni-forms>
		<view class="confirm-btn">
			<button class="confirm-issue" @click="confirmIssue">
				确认发布
			</button>
		</view>
	</view>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
const userInfo = reactive({
	uid: 0
});
onShow(() => {
	Object.assign(userInfo, uniCloud.getCurrentUserInfo());
});
onLoad(() => {
	Object.assign(userInfo, uniCloud.getCurrentUserInfo());
	if (!userInfo.uid) {
		uni.navigateTo({
			url:
				'/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
		});
	}
});
type Choose = {
	text: string;
	value: number;
};
const formData = reactive({
	city: [],
	name: '',
	introduce: '',
	title: '',
	uploadPicture: [],
	wxCode: '',
	phone: '',
	authorName: '',
	reward: '',
	typeIndex: 0,
	starIndex: 0,
	genderIndex: 0,
	variety: '',
	avatarURL: ''
});

const rules = reactive({
	title: {
		rules: [
			{
				required: true,
				errorMessage: '标题不能为空'
			}
		]
	},
	uploadPicture: {
		rules: [
			{
				required: true,
				errorMessage: '图片不能为空'
			}
		]
	},
	name: {
		rules: [
			{
				required: true,
				errorMessage: '姓名不能为空'
			}
		]
	},
	wxCode: {
		rules: [
			{
				required: true,
				errorMessage: '微信号不能为空'
			}
		]
	},
	introduce: {
		rules: [
			{
				required: true,
				errorMessage: '介绍不能为空'
			},
			{
				maxLength: 200,
				errorMessage: '最大长度为200'
			}
		]
	},
	phone: {
		rules: [
			{
				required: true,
				errorMessage: '手机号不能为空'
			},
			{
				format: 'number',
				errorMessage: '手机号必须为数字'
			}
		]
	}
});
const form = ref(null);
const changeAddress = e => {
	formData.city.push(e.detail.value[0].text);
	formData.city.push(e.detail.value[1].text);
	formData.city.push(e.detail.value[2].text);
};
const db = uniCloud.database();

const confirmIssue = async () => {
	await db
		.collection('uni-id-users')
		.where(`_id=='${userInfo.uid}'`)
		.field('avatar_file,nickname')
		.get()
		.then(res => {
			formData.avatarURL = res.result.data[0].avatar_file.url;
			formData.authorName = res.result.data[0].nickname;
		})
		.then(() => {
			form.value.validate().then(() => {
				uniCloud.callFunction({
					name: 'foundPet',
					data: {
						type: typeList[formData.typeIndex].text,
						imageList: formData.uploadPicture,
						name: formData.name,
						star: starList[formData.starIndex].text,
						variety: formData.variety,
						gender: genderList[formData.genderIndex].text,
						introduce: formData.introduce,
						title: formData.title,
						city: formData.city,
						phone: formData.phone,
						wxCode: formData.wxCode,
						reward: formData.reward,
						avatarURL: formData.avatarURL,
						authorName: formData.authorName
					},
					success() {
						uni.showToast({
							title: '发布成功'
						});
					},
					fail(err) {
						console.log(err);
					}
				});
			});
		})
		.then(() => {
			uni.navigateBack();
		})
		.catch(err => {
			console.log(err);
		});
};
const typeList = reactive<Choose[]>([
	{
		text: '寻宠',
		value: 0
	},
	{
		text: '寻主',
		value: 1
	}
]);
const starList = reactive<Choose[]>([
	{
		text: '汪星人',
		value: 0
	},
	{
		text: '喵星人',
		value: 1
	},
	{
		text: '其他',
		value: 2
	}
]);
const genderList = reactive<Choose[]>([
	{
		text: '男生',
		value: 0
	},
	{
		text: '女生',
		value: 1
	}
]);
</script>
<style lang="less" scoped>
.found-pet {
	.max-upload {
		padding-left: 5%;
		font-size: 25rpx;
		color: #666;
		padding-bottom: 30rpx;
		border-bottom: 1px solid #ccc;
	}
	.header {
		width: 90%;
		margin-left: 5%;
	}
	:deep(.option) {
		width: 90%;
		margin-left: 5%;
		text-align: right;
		.uni-forms-item {
			padding-top: 30rpx;
			display: flex;
			align-items: center;
			border-top: 1px solid #ccc;
		}
		.uni-forms-item:first-child {
			border-top: none;
		}
		.uni-forms-item__content {
			display: flex;
			justify-content: flex-end;
		}
	}
	:deep(.uni-data-pickerview) {
		text-align: left;
	}
	:deep(.uni-forms-item__label) {
		font-size: 30rpx;
		color: black;
		font-weight: 900;
	}

	:deep(.checklist-box) {
		height: 40rpx;
		border: 1px solid #000 !important;
		border-radius: 40rpx !important;
	}
	:deep(.is-checked) {
		background-image: linear-gradient(
			to right,
			rgb(223, 154, 171),
			rgb(238, 120, 137)
		);
		border: 1px solid #e68399 !important;
	}
	.confirm-btn {
		border-top: 1px solid #ccc;
		width: 100%;
		padding: 80rpx 0;
		.confirm-issue {
			margin-bottom: 100rpx;
			width: 75%;
			height: 80rpx;
			color: white;
			line-height: 80rpx;
			border-radius: 30rpx;
			background-image: linear-gradient(
				to right,
				rgb(222, 155, 171),
				rgb(237, 118, 136)
			);
		}
	}
}
</style>

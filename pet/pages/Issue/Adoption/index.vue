<template>
	<view class="adoption">
		<uni-forms
			ref="form"
			:rules="rules"
			label-width="150"
			:modelValue="formData"
		>
			<view class="upload">
				<view class="upload-picture">请上传你的宠物图片</view>
				<uni-forms-item name="uploadPicture">
					<uni-file-picker
						v-model="formData.uploadPicture"
						limit="3"
						file-mediatype="image"
					></uni-file-picker>
				</uni-forms-item>
				<view class="tips">最多上传3张图片</view>
				<view class="choose">(可选)请上传你的宠物视频</view>
				<view class="upload-video">
					<uni-file-picker
						limit="1"
						file-mediatype="video"
						v-model="formData.video"
					>
						<button class="upload-btn">上传视频</button>
					</uni-file-picker>
				</view>
			</view>
			<view class="option-list">
				<uni-forms-item label="宠物昵称" name="petName">
					<input
						style="width: 80%;"
						v-model="formData.petName"
						maxlength="5"
						placeholder="请输入宠物的昵称(限5个字内)"
					/>
				</uni-forms-item>
				<uni-forms-item label="星球" name="star">
					<uni-data-checkbox
						mode="tag"
						v-model="formData.starIndex"
						:localdata="starList"
					></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="品种" name="variety">
					<input
						maxlength="15"
						v-model="formData.variety"
						placeholder="请输入品种"
					/>
				</uni-forms-item>
				<uni-forms-item label="性别" name="gender">
					<uni-data-checkbox
						mode="tag"
						v-model="formData.genderIndex"
						:localdata="genderList"
					></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="年龄" name="age">
					<uni-data-picker
						:localdata="ageList"
						popup-title="请选择年龄"
						v-model="formData.age"
						@change="changeAge"
					></uni-data-picker>
				</uni-forms-item>
				<uni-forms-item label="医疗" name="medical">
					<uni-data-checkbox
						mode="tag"
						multiple
						v-model="formData.medical"
						:localdata="medicalList"
					></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="宠物来源" name="source">
					<uni-data-checkbox
						mode="tag"
						multiple
						v-model="formData.source"
						:localdata="sourceList"
					></uni-data-checkbox>
				</uni-forms-item>
				<view class="particular">
					<view class="title">宠物特点</view>
					<uni-forms-item name="particular">
						<uni-data-checkbox
							mode="tag"
							multiple
							v-model="formData.particular"
							:localdata="particularList"
							max="3"
						></uni-data-checkbox>
					</uni-forms-item>
				</view>

				<view class="story">
					<view class="title">宝贝故事</view>
					<uni-forms-item name="story">
						<textarea
							maxlength="200"
							class="story-input"
							v-model="formData.story"
							placeholder-style="color:#959496"
							placeholder="请认真描述宠物的饮食偏好、行为习惯以及你要送养的原因、你和TA的过往经历等。这将有助于提高送养成功率。"
						/>
					</uni-forms-item>
				</view>

				<view class="request">
					<view class="title">领养要求</view>
					<uni-forms-item name="request">
						<uni-data-checkbox
							mode="tag"
							multiple
							v-model="formData.request"
							:localdata="requestList"
						></uni-data-checkbox>
					</uni-forms-item>
				</view>

				<uni-forms-item label="送养成功后,要求领养人打卡" name="punch">
					<uni-data-select
						v-model="formData.punchIndex"
						:localdata="punchList"
						:clear="false"
					></uni-data-select>
				</uni-forms-item>
				<view class="contact">
					<view class="method">您的联系方式</view>
					<view class="input">填写清楚 方便领养人与您联系</view>
				</view>

				<uni-forms-item label="姓名" name="name">
					<input
						v-model="formData.name"
						placeholder="请输入姓名"
						maxlength="10"
					/>
				</uni-forms-item>
				<uni-forms-item label="所在城市" name="city">
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
				<uni-forms-item label="手机号" name="phone">
					<input
						maxlength="11"
						v-model="formData.phone"
						placeholder="请输入联系方式"
					/>
				</uni-forms-item>
				<uni-forms-item label="微信号" name="wxCode">
					<input
						v-model="formData.wxCode"
						placeholder="请输入号码"
						maxlength="20"
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
import { reactive, ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
const userInfo = reactive({
	uid: 0
});
const db = uniCloud.database();
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
	} else {
		db.collection('uni-id-users')
			.where(`_id=='${userInfo.uid}'`)
			.field('nickname')
			.get()
			.then(res => {
				formData.name = res.result.data[0].nickname;
				console.log(formData.name);
			});
	}
});

const form = ref(null);
const rules = reactive({
	petName: {
		rules: [
			{
				required: true,
				errorMessage: '宠物名不能为空'
			},
			{
				maxLength: 5,
				errorMessage: '宠物名最多5个字'
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
	request: {
		rules: [
			{
				required: true,
				errorMessage: '领养要求不能为空'
			}
		]
	},
	source: {
		rules: [
			{
				required: true,
				errorMessage: '来源不能为空'
			}
		]
	},
	medical: {
		rules: [
			{
				required: true,
				errorMessage: '医疗不能为空'
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
	stroy: {
		rules: [
			{
				required: true,
				errorMessage: '领养要求不能为空'
			},
			{
				maxLength: 200,
				errorMessage: '字数最多200'
			}
		]
	},
	variety: {
		rules: [
			{
				required: true,
				errorMessage: '品种不能为空'
			}
		]
	},
	age: {
		rules: [
			{
				required: true,
				errorMessage: '年龄不能为空'
			}
		]
	},
	city: {
		rules: [
			{
				required: true,
				errorMessage: '城市不能为空'
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
type ChooseList = {
	text: string;
	value: number;
};
const formData = reactive({
	story: '',
	name: '',
	variety: '',
	phone: '',
	city: [],
	petName: '',
	genderIndex: 0,
	punchIndex: 0,
	age: '',
	wxCode: '',
	uploadPicture: [],
	medical: [],
	source: [],
	request: [],
	particular: [],
	starIndex: 1,
	video: []
});
const starList = reactive<ChooseList[]>([
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
const genderList = reactive<ChooseList[]>([
	{
		text: '男生',
		value: 0
	},
	{
		text: '女生',
		value: 1
	}
]);
const medicalList = reactive<ChooseList[]>([
	{
		text: '已绝育',
		value: 0
	},
	{
		text: '已免疫',
		value: 1
	},
	{
		text: '已驱虫',
		value: 2
	}
]);
const sourceList = reactive<ChooseList[]>([
	{
		text: '家养',
		value: 0
	},
	{
		text: '个人求助',
		value: 1
	},
	{
		text: '流浪基地',
		value: 2
	}
]);
const ageList = reactive<ChooseList[]>([
	{
		text: '不满1个月',
		value: 0
	},
	{
		text: '1个月',
		value: 1
	},
	{
		text: '2个月',
		value: 2
	},
	{
		text: '3-6个月',
		value: 3
	},
	{
		text: '6个月-1岁',
		value: 4
	},
	{
		text: '1岁',
		value: 5
	},
	{
		text: '2岁',
		value: 6
	},
	{
		text: '3岁及以上',
		value: 7
	}
]);
const particularList = reactive<ChooseList[]>([
	{
		text: '高冷',
		value: 0
	},
	{
		text: '粘人',
		value: 1
	},
	{
		text: '铁憨憨',
		value: 2
	},
	{
		text: '甜美',
		value: 3
	},
	{
		text: '温文尔雅',
		value: 4
	},
	{
		text: '乖巧',
		value: 5
	},
	{
		text: '贪玩',
		value: 6
	},
	{
		text: '胆小',
		value: 7
	},
	{
		text: '叛逆',
		value: 8
	},
	{
		text: '懒惰',
		value: 9
	},
	{
		text: '无攻击性',
		value: 10
	},
	{
		text: '不挑食',
		value: 11
	},
	{
		text: '不乱叫',
		value: 12
	},
	{
		text: '讲卫生',
		value: 13
	}
]);
const requestList = reactive<ChooseList[]>([
	{
		text: '仅限同城',
		value: 0
	},
	{
		text: '接受回访',
		value: 1
	},
	{
		text: '签订协议',
		value: 2
	},
	{
		text: '绝育',
		value: 3
	},
	{
		text: '安装纱窗',
		value: 4
	},
	{
		text: '办理狗证',
		value: 5
	},
	{
		text: '出门牵绳',
		value: 6
	}
]);
const punchList = reactive<ChooseList[]>([
	{
		text: '不需要打卡',
		value: 0
	},
	{
		text: '4周',
		value: 1
	},
	{
		text: '5周',
		value: 2
	},
	{
		text: '8周',
		value: 3
	},
	{
		text: '12周',
		value: 4
	},
	{
		text: '16周',
		value: 5
	}
]);
const changeAddress = (e: any) => {
	formData.city.push(e.detail.value[0].text);
	formData.city.push(e.detail.value[1].text);
	formData.city.push(e.detail.value[2].text);
};
const changeAge = (e: any) => {
	formData.age = e.detail.value[0].text;
};
const confirmIssue = () => {
	const medicalArr = formData.medical.map((index: number) => {
		return medicalList[index].text;
	});
	const sourceArr = formData.source.map((index: number) => {
		return sourceList[index].text;
	});
	const particularArr = formData.particular.map((index: number) => {
		return particularList[index].text;
	});
	const requestArr = formData.request.map((index: number) => {
		return requestList[index].text;
	});
	form.value
		.validate()
		.then(() => {
			uniCloud.callFunction({
				name: 'adoption',
				data: {
					user_id: userInfo.uid,
					imageList: formData.uploadPicture,
					petName: formData.petName,
					star: starList[formData.starIndex].text,
					variety: formData.variety,
					gender: genderList[formData.genderIndex].text,
					age: formData.age,
					medicalList: medicalArr,
					source: sourceArr,
					particularList: particularArr,
					story: formData.story,
					requestList: requestArr,
					punch: punchList[formData.punchIndex].text,
					name: formData.name,
					city: formData.city,
					phone: formData.phone,
					wx_code: formData.wxCode,
					video: formData.video,
					ifAdopt: false
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
		})
		.then(() => {
			uni.navigateBack();
		})
		.catch((err: any) => {
			console.log(err);
		});
};
</script>
<style lang="less" scoped>
.upload {
	margin-left: 30rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 600rpx;
	.tips {
		color: #666;
		font-size: 25rpx;
	}
	.upload-picture,
	.choose {
		color: rgb(232, 117, 141);
	}
	.upload-btn {
		margin-left: 0;
		height: 80rpx;
		font-size: 35rpx;
		line-height: 80rpx;
		color: white;
		border-radius: 40rpx;
		background-image: linear-gradient(
			to right,
			rgb(233, 196, 50),
			rgb(237, 162, 14)
		);
		width: 200rpx;
	}
}
:deep(.option-list) {
	width: 100%;
	input {
		margin-right: 20rpx;
	}
	.uni-forms-item {
		display: flex;
		align-items: center;
		width: 95%;
		margin-left: 5%;
		text-align: right;
		padding-bottom: 25rpx;
		border-bottom: 1px solid #ccc;
	}
	.contact {
		margin-bottom: 50rpx;
		height: 30rpx;
		display: flex;
		align-items: center;
		margin-left: 5%;
		font-weight: 900;
		font-size: 35rpx;
		.input {
			color: #666;
			font-size: 25rpx;
			font-weight: 900;
			margin-left: 20rpx;
		}
	}
	.request,
	.story,
	.particular {
		display: flex;
		flex-direction: column;
		.title {
			margin: 0 0 5% 5%;
			color: #000;
			font-weight: 900;
		}
		.story-input {
			height: 200rpx;
			text-align: left;
			margin-right: 50rpx;
			padding: 30rpx;
			background-color: rgb(228, 227, 228);
		}
	}
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
:deep(.uni-forms-item__content) {
	display: flex;
	justify-content: flex-end;
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
:deep(.item-text) {
	text-align: left;
}
:deep(.is-checked) {
	background-image: linear-gradient(
		to right,
		rgb(223, 154, 171),
		rgb(238, 120, 137)
	);
	border: 1px solid #e68399 !important;
}
</style>

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
						mode="grid"
						:imageStyles="imageStyles"
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
						style="width: 80%"
						v-model="formData.petName"
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
					<uni-data-select
						v-model="formData.age"
						:localdata="ageList"
					></uni-data-select>
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
					<pickerAddress @change="change">
						{{ formData.city.join('') }}
					</pickerAddress>
					<uni-icons type="right" size="20"></uni-icons>
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
		<Issue @click="confirmIssue" issue="确认发布"></Issue>
	</view>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import pickerAddress from '@/components/gtc-pickerAddress/pickerAddress.vue';
import Issue from '@/components/Issue/index.vue';
const userId = ref<string>();
const db = uniCloud.database();
const hasLogin = ref<boolean>(false);
const checkLogin = async () => {
	await db
		.collection('uni-id-users')
		.where('_id==$cloudEnv_uid')
		.get({ getOne: true })
		.then(res => {
			userId.value = res.result.data._id;
			hasLogin.value = true;
		})
		.catch(() => {
			hasLogin.value = false;
		});
};
onShow(async () => {
	await checkLogin();
	if (!hasLogin.value) {
		uni.navigateTo({
			url:
				'/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
		});
	}
	await db
		.collection('uni-id-users')
		.where(`_id=='${userId.value}'`)
		.field('nickname as name,mobile as phone,wxcode as wxCode,city')
		.get({ getOne: true })
		.then(res => {
			const data = res.result.data;
			if (data.city[0] == '请选择城市') {
				data.city == formData.city;
			}
			Object.assign(formData, data);
		});
});
const imageStyles = reactive({
	width: 74,
	height: 74,
	border: {
		color: '#afafaf',
		radio: 10
	}
});
const change = (e: any) => {
	formData.city = e.data;
};
const ifCompile = ref<boolean>();
const adoptionId = ref<string>();
onLoad(option => {
	if (option.id) {
		ifCompile.value = true;
		adoptionId.value = option.id;
	} else {
		ifCompile.value = false;
	}

	if (ifCompile.value) {
		db.collection('adoption')
			.where(`_id=='${adoptionId.value}'&&user_id=='${userId.value}'`)
			.get({ getOne: true })
			.then(res => {
				const adoptDetail = res.result.data;
				formData.uploadPicture = adoptDetail.img;
				formData.video = adoptDetail.video;
				formData.city = adoptDetail.city;
				formData.phone = adoptDetail.phone;
				formData.wxCode = adoptDetail.wx_code;
				formData.variety = adoptDetail.variety;
				formData.petName = adoptDetail.pet_name;
				formData.story = adoptDetail.story;
				formData.starIndex = newList[5].indexOf(adoptDetail.star);
				formData.genderIndex = newList[4].indexOf(adoptDetail.gender);
				formData.punchIndex = newList[0].indexOf(adoptDetail.punch);
				formData.age = newList[2].indexOf(adoptDetail.age);
				formData.medical = getNewMutiple(adoptDetail.medical, 1);
				formData.source = getNewMutiple(adoptDetail.source, 3);
				formData.request = getNewMutiple(adoptDetail.request, 6);
				formData.particular = getNewMutiple(adoptDetail.particular, 7);
			});
	}
});
const getNewList = (optionList: ChooseList[]) => {
	return optionList.map(value => {
		return value.text;
	});
};
const getNewMutiple = (option: string[], index: number) => {
	return option.map((value: string) => {
		return newList[index].indexOf(value);
	});
};
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
	story: {
		rules: [
			{
				required: true,
				errorMessage: '宝贝故事不能为空'
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
	city: ['浙江省', '宁波市', '宁海县'],
	petName: '',
	genderIndex: 0,
	punchIndex: 0,
	age: 0,
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
const newList = [
	punchList,
	medicalList,
	ageList,
	sourceList,
	genderList,
	starList,
	requestList,
	particularList
].map(value => {
	return getNewList(value);
});
const getData = (option: number[], optionList: ChooseList[]) => {
	return option.map((index: number) => {
		return optionList[index].text;
	});
};
const confirmIssue = () => {
	const medical = getData(formData.medical, medicalList);
	const source = getData(formData.source, sourceList);
	const particular = getData(formData.particular, particularList);
	const request = getData(formData.request, requestList);
	if (!ifCompile.value) {
		form.value
			.validate()
			.then(() => {
				uniCloud.callFunction({
					name: 'adoption',
					data: {
						user_id: userId.value,
						imageList: formData.uploadPicture,
						petName: formData.petName,
						star: starList[formData.starIndex].text,
						variety: formData.variety,
						gender: genderList[formData.genderIndex].text,
						age: ageList[formData.age].text,
						medicalList: medical,
						source: source,
						particularList: particular,
						story: formData.story,
						requestList: request,
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
	} else {
		form.value.validate().then(() => {
			db.collection('adoption')
				.where(`_id=='${adoptionId.value}'&&user_id=='${userId.value}'`)
				.update({
					img: formData.uploadPicture,
					pet_name: formData.petName,
					star: starList[formData.starIndex].text,
					variety: formData.variety,
					gender: genderList[formData.genderIndex].text,
					age: ageList[formData.age].text,
					medical: medical,
					source: source,
					particular: particular,
					story: formData.story,
					request: request,
					punch: punchList[formData.punchIndex].text,
					name: formData.name,
					city: formData.city,
					phone: formData.phone,
					wx_code: formData.wxCode
				})
				.then(() => {
					uni.showToast({
						title: '修改成功',
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack();
							}, 500);
						}
					});
				})
				.catch(err => {
					console.log(err);
				});
		});
	}
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
:deep(.uni-select) {
	width: 200rpx;
	text-align: center;
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

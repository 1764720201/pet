<template>
	<view class="apply">
		<uni-forms
			ref="form"
			:model="formData"
			:label-width="100"
			:rules="rules"
		>
			<view class="option">
				<uni-forms-item name="genderIndex" label="性别">
					<uni-data-checkbox
						mode="tag"
						v-model="formData.genderIndex"
						:localdata="genderList"
					></uni-data-checkbox>
				</uni-forms-item>
			</view>
			<view class="option">
				<uni-forms-item name="age" label="年龄">
					<picker
						@change="chooseAge"
						:value="ageIndex"
						:range="ageList"
					>
						<view class="choose">
							{{ ageList[ageIndex] }}
							<uni-icons
								type="right"
								size="23"
								color="#ccc"
							></uni-icons>
						</view>
					</picker>
				</uni-forms-item>
			</view>
			<view class="option">
				<uni-forms-item name="experienceIndex" label="养宠经验">
					<uni-data-checkbox
						mode="tag"
						v-model="formData.experienceIndex"
						:localdata="experienceList"
					></uni-data-checkbox>
				</uni-forms-item>
			</view>
			<view class="option">
				<uni-forms-item name="presentIndex" label="目前宠物">
					<uni-data-checkbox
						mode="tag"
						v-model="formData.presentIndex"
						:localdata="presentList"
					></uni-data-checkbox>
				</uni-forms-item>
			</view>
			<view class="option">
				<uni-forms-item name="house" label="住房情况">
					<picker
						@change="chooseHouse"
						:value="houseIndex"
						:range="houseList"
					>
						<view class="choose">
							{{ houseList[houseIndex] }}
							<uni-icons
								type="right"
								size="23"
								color="#ccc"
							></uni-icons>
						</view>
					</picker>
				</uni-forms-item>
			</view>
			<view class="option">
				<uni-forms-item name="marriageIndex" label="婚姻状况">
					<uni-data-checkbox
						mode="tag"
						v-model="formData.marriageIndex"
						:localdata="marriageList"
					></uni-data-checkbox>
				</uni-forms-item>
			</view>
			<view class="option">
				<uni-forms-item name="income" label="月收入">
					<picker
						@change="chooseIncome"
						:value="incomeIndex"
						:range="incomeList"
					>
						<view class="choose">
							{{ incomeList[incomeIndex] }}
							<uni-icons
								type="right"
								size="23"
								color="#ccc"
							></uni-icons>
						</view>
					</picker>
				</uni-forms-item>
			</view>
			<view class="option">
				<uni-forms-item name="work" label="职业">
					<input
						type="text"
						placeholder="请输入"
						v-model="formData.work"
					/>
				</uni-forms-item>
			</view>
			<view class="option">
				<uni-forms-item label="所在城市" name="city">
					<uni-data-picker
						style="text-align: left;"
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
			</view>
			<view class="option">
				<uni-forms-item name="phone" label="手机号">
					<input
						type="text"
						placeholder="请输入"
						v-model="formData.phone"
					/>
				</uni-forms-item>
			</view>
			<view class="option">
				<uni-forms-item name="wxCode" label="微信号">
					<input
						type="text"
						placeholder="请输入"
						v-model="formData.wxCode"
					/>
				</uni-forms-item>
			</view>
			<view class="sincerity">
				<uni-forms-item name="sincerity">
					<view class="sincerity-title">表达领养诚意</view>
					<textarea
						class="sincerity-input"
						v-model="formData.sincerity"
						placeholder="请尽量表述清楚想要ta的理由(选填)"
					></textarea>
				</uni-forms-item>
			</view>
			<view class="confirm-btn">
				<button class="confirm-issue" @click="sumbitApply">
					提交申请
				</button>
			</view>
		</uni-forms>
	</view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
const ageIndex = ref<number>(5);
const houseIndex = ref<number>(0);
const incomeIndex = ref<number>(2);
type Apply = {
	adoptId: string;
	age: string;
	genderIndex: number;
	experienceIndex: number;
	presentIndex: number;
	house: string;
	marriageIndex: number;
	income: string;
	work: string;
	city: string[];
	phone: string;
	wxCode: string;
	sincerity: string;
	state: string;
};
const rules = reactive({
	phone: {
		rules: [
			{
				required: true,
				errorMessage: '手机号不能为空'
			},
			{
				pattern: '^\\+?[0-9-]{3,20}$',
				errorMessage: '请输入正确的手机号'
			}
		]
	},
	city: {
		rules: [
			{
				required: true,
				errorMessage: '请选择所在的城市'
			}
		]
	},
	work: {
		rules: [
			{
				required: true,
				errorMessage: '请输入职业'
			}
		]
	},
	wxCode: {
		rules: [
			{
				required: true,
				errorMessage: '请输入微信号'
			}
		]
	}
});
type option = {
	value: number;
	text: string;
};
type Choose = {
	detail: {
		value: number;
	};
};
const chooseAge = (e: Choose) => {
	ageIndex.value = e.detail.value;
	formData.age = ageList[e.detail.value];
};
const chooseHouse = (e: Choose) => {
	houseIndex.value = e.detail.value;
	formData.house = houseList[e.detail.value];
};
const chooseIncome = (e: Choose) => {
	incomeIndex.value = e.detail.value;
	formData.income = incomeList[e.detail.value];
};
const changeAddress = (e: any) => {
	formData.city.push(e.detail.value[0].text);
	formData.city.push(e.detail.value[1].text);
	formData.city.push(e.detail.value[2].text);
};
const genderList = reactive<option[]>([
	{
		value: 0,
		text: '女铲屎官'
	},
	{
		value: 1,
		text: '男铲屎官'
	}
]);
const experienceList = reactive<option[]>([
	{
		value: 0,
		text: '有'
	},
	{
		value: 1,
		text: '无'
	}
]);
const presentList = reactive<option[]>([
	{
		value: 0,
		text: '有猫'
	},
	{
		value: 1,
		text: '有狗'
	},
	{
		value: 2,
		text: '猫狗'
	},
	{
		value: 3,
		text: '无'
	}
]);
const marriageList = reactive<option[]>([
	{
		value: 0,
		text: '单身'
	},
	{
		value: 1,
		text: '恋爱'
	},
	{
		value: 2,
		text: '已婚'
	}
]);
const ageList = [
	'40后',
	'50后',
	'60后',
	'70后',
	'80后',
	'90后',
	'00后',
	'10后'
];
const houseList = ['自有住房', '整租', '合租', '其他'];
const incomeList = ['小于3千', '3-6千', '6千-1万', '一万以上'];
const formData = reactive<Apply>({
	adoptId: '',
	age: ageList[ageIndex.value],
	genderIndex: 0,
	experienceIndex: 0,
	presentIndex: 0,
	house: houseList[houseIndex.value],
	marriageIndex: 0,
	income: incomeList[incomeIndex.value],
	work: '',
	city: [],
	phone: '',
	wxCode: '',
	sincerity: '',
	state: ''
});
const db = uniCloud.database();
const ifApplied = ref<boolean>(false);
const newGenderList = genderList.map(value => {
	return value.text;
});
const newExperienceList = experienceList.map(value => {
	return value.text;
});
const newMarriageList = marriageList.map(value => {
	return value.text;
});
const newPresentList = presentList.map(value => {
	return value.text;
});
onLoad(async option => {
	const userId = uniCloud.getCurrentUserInfo().uid;
	formData.adoptId = option.adoptId;
	await db
		.collection('apply')
		.where(
			`adopt_id=='${
				formData.adoptId
			}'&&user_id=='${userId}'&&state=='申请中'`
		)
		.get()
		.then(res => {
			if (res.result.data[0]) {
				ifApplied.value = true;
			} else {
				ifApplied.value = false;
			}
		})
		.then(() => {
			if (ifApplied.value) {
				db.collection('apply')
					.where(
						`adopt_id=='${formData.adoptId}'&&user_id=='${userId}'`
					)
					.get()
					.then(res => {
						const petDetail = res.result.data[0];
						formData.sincerity = petDetail.sincerity;
						formData.work = petDetail.work;
						formData.phone = petDetail.phone;
						ageIndex.value = ageList.indexOf(petDetail.age);
						houseIndex.value = houseList.indexOf(petDetail.house);
						incomeIndex.value = incomeList.indexOf(
							petDetail.income
						);
						formData.wxCode = petDetail.wx_code;
						formData.genderIndex = newGenderList.indexOf(
							petDetail.gender
						);
						formData.experienceIndex = newExperienceList.indexOf(
							petDetail.experience
						);
						formData.marriageIndex = newMarriageList.indexOf(
							petDetail.marriage
						);
						formData.presentIndex = newPresentList.indexOf(
							petDetail.present
						);
					});
			}
		});
});

const form = ref(null);
const sumbitApply = async () => {
	if (!ifApplied.value) {
		await form.value
			.validate()
			.then(() => {
				uniCloud.callFunction({
					name: 'apply',
					data: {
						adoptId: formData.adoptId,
						age: formData.age,
						gender: genderList[formData.genderIndex].text,
						experience:
							experienceList[formData.experienceIndex].text,
						present: presentList[formData.presentIndex].text,
						house: formData.house,
						marriage: marriageList[formData.marriageIndex].text,
						income: formData.income,
						work: formData.work,
						city: formData.city,
						phone: formData.phone,
						wxCode: formData.wxCode,
						sincerity: formData.sincerity,
						state: '申请中'
					},
					success() {
						uni.showToast({
							title: '申请成功'
						});
						uni.redirectTo({
							url: '/pages/Mine/Request/Apply/index'
						});
					},
					fail(err) {
						console.log(err);
					}
				});
			})
			.catch(err => {
				console.log(err);
			});
	} else {
		form.value
			.validate()
			.then(() => {
				db.collection('apply').update({
					adopt_id: formData.adoptId,
					age: formData.age,
					gender: genderList[formData.genderIndex].text,
					experience: experienceList[formData.experienceIndex].text,
					present: presentList[formData.presentIndex].text,
					house: formData.house,
					marriage: marriageList[formData.marriageIndex].text,
					income: formData.income,
					work: formData.work,
					city: formData.city,
					phone: formData.phone,
					wx_code: formData.wxCode,
					sincerity: formData.sincerity,
					state: '申请中'
				});
			})
			.then(() => {
				uni.navigateBack();
			});
	}
};
</script>

<style lang="less" scoped>
.apply {
	width: 100%;
	.sincerity {
		margin-left: -160rpx;
		display: flex;
		flex-direction: column;
		&-title {
			font-size: 38rpx;
			font-weight: 900;
		}
		&-input {
			margin-top: 40rpx;
			width: 87%;
			padding: 30rpx;
			background-color: rgba(228, 227, 228, 0.6);
		}
	}
	:deep(.option) {
		width: 90%;
		margin-left: 5%;
		text-align: right;
		.uni-forms-item {
			padding-top: 30rpx;
			display: flex;
			border-bottom: 1px solid #ccc;
			align-items: center;
		}
		.uni-forms-item__content {
			display: flex;
			justify-content: flex-end;
		}
		.choose {
			display: flex;
			align-items: center;
		}
	}
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
</style>

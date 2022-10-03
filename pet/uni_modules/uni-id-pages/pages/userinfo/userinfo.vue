<!-- 用户资料页 -->
<template>
	<view class="uni-content">
		<view class="avatar">
			<uni-id-pages-avatar
				width="260rpx"
				height="260rpx"
			></uni-id-pages-avatar>
		</view>
		<view class="option">
			<view class="title">昵称</view>
			<view class="content">
				<input v-model="userInfo.nickname" type="text" />
			</view>
		</view>
		<view class="option">
			<view class="title">性别</view>
			<view class="content">
				<uni-data-checkbox
					mode="tag"
					v-model="userInfo.gender"
					:localdata="genderList"
				></uni-data-checkbox>
			</view>
		</view>
		<view class="option">
			<view class="title">生日</view>
			<view class="content">
				<picker
					mode="date"
					:value="date"
					:start="startDate"
					:end="endDate"
					@change="bindDateChange"
				>
					<view class="uni-input">{{ userInfo.birthday }}</view>
				</picker>
			</view>
		</view>
		<view class="option">
			<view class="title">常住地</view>
			<view class="content" style="margin-left: 120rpx;">
				<pickerAddress @change="change">
					{{ userInfo?.city.join('') }}
				</pickerAddress>
			</view>
		</view>
		<view class="option">
			<view class="title">微信号</view>
			<view class="content" style="margin-left: 120rpx;">
				<input type="text" v-model="userInfo.wxcode" />
			</view>
		</view>
		<view class="option-introduction">
			<view class="title">简介</view>
			<view class="content">
				<textarea
					placeholder="请用一句话描述~"
					class="introduction"
					v-model="userInfo.introduction"
				></textarea>
				<view class="introductionLength">
					{{ introuctionLength }}/100
				</view>
			</view>
		</view>
		<Issue issue="保存修改" @click="saveAmend"></Issue>

		<uni-id-pages-bind-mobile
			ref="bind-mobile-by-sms"
			@success="getUserInfo"
		></uni-id-pages-bind-mobile>
	</view>
</template>
<script>
import pickerAddress from '@/components/gtc-pickerAddress/pickerAddress.vue';
import Issue from '@/components/Issue/index.vue';
const db = uniCloud.database();
const usersTable = db.collection('uni-id-users');
const uniIdCo = uniCloud.importObject('uni-id-co');
export default {
	components: {
		pickerAddress,
		Issue
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			userInfo: {
				nickname: '',
				gender: 0,
				city: ['请选择城市'],
				introduction: '',
				birthday: '请选择日期',
				wxcode: ''
			},
			introuctionLength: 0,
			genderList: [
				{
					text: '男生',
					value: 1
				},
				{
					text: '女生',
					value: 2
				}
			],
			hasLogin: false,
			date: currentDate
		};
	},
	async onLoad() {
		this.getUserInfo();
	},
	methods: {
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear() - 20;
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		bindDateChange(e) {
			this.userInfo.birthday = e.detail.value;
		},
		change(e) {
			this.userInfo.city = e.data;
		},
		login() {
			uni.navigateTo({
				url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
				complete: e => {
					console.log(e);
				}
			});
		},
		getUserInfo(e) {
			uni.showLoading({
				mask: true
			});
			usersTable
				.where("'_id' == $cloudEnv_uid")
				.field(
					'mobile,nickname,city,introduction,birthday,gender,wxcode'
				)
				.get()
				.then(res => {
					console.log(res.result.data[0]);
					const data = res.result.data[0];
					this.userInfo = Object.assign(
						this.userInfo,
						JSON.parse(JSON.stringify(data))
					);
					this.hasLogin = true;
				})
				.catch(e => {
					this.userInfo = {};
					this.hasLogin = false;
					console.log(e.message, e.errCode);
				})
				.finally(e => {
					// console.log(e);
					uni.hideLoading();
				});
		},
		saveAmend() {
			usersTable
				.where('_id==$env.uid')
				.update({
					nickname: this.userInfo.nickname,
					gender: this.userInfo.gender,
					birthday: this.userInfo.birthday,
					introduction: this.userInfo.introduction,
					city: this.userInfo.city,
					wxcode: this.userInfo.wxcode
				})
				.then(e => {
					console.log(e);
					if (e.result.updated) {
						uni.showToast({
							title: '更新成功',
							icon: 'none'
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 300);
					} else {
						uni.showToast({
							title: '没有改变',
							icon: 'none'
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	watch: {
		userInfo: {
			handler(_, newValue) {
				this.introuctionLength = newValue.introduction.length;
			},
			deep: true
		}
	}
};
</script>
<style lang="scss" scoped>
@import url('@/uni_modules/uni-id-pages/common/login-page.scss');
.option-introduction {
	display: flex;
	width: 100%;
	.title {
		width: 400rpx;
	}
	.content {
		width: 400rpx;
		margin-top: 30rpx;
		display: flex;
		margin-left: 150rpx;
		flex-direction: column;
		align-items: flex-end;
		.introduction {
			width: 400rpx;
			padding: 20rpx 30rpx;
			height: 170rpx;
			border: 1px solid #ccc;
		}
		.introductionLength {
			margin-top: 30rpx;
			color: #b4b4b4;
		}
	}
}

:deep(.is-checked) {
	background-image: linear-gradient(
		to right,
		rgb(223, 154, 171),
		rgb(238, 120, 137)
	);
	border: 1px solid #e68399 !important;
}
:deep(.checklist-box) {
	height: 40rpx;
	border: 1px solid #000 !important;
	border-radius: 40rpx !important;
}
.avatar {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 22px 0;
	width: 100%;
}

:deep(.option) {
	border-bottom: 1px solid #ccc;
	width: 100%;
	align-items: center;
	display: flex;
	.content {
		margin-left: 150rpx;
	}
}
</style>

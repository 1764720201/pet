<template>
	<view class="apply-adopt">
		<PetAppearance :petInfo="petInfo"></PetAppearance>
		<view class="pet-information">
			<PetInformation :petInfo="petInfo"></PetInformation>
			<Remind></Remind>
			<Applied :applyList="applyList"></Applied>
			<view class="author-information">
				<AuthorInformation
					:nickname="userInfo.nickname"
					:avatarUrl="userInfo.avatar_file.url"
					:userId="userInfo._id"
					:wxCode="petInfo.wx_code"
					:phone="petInfo.phone"
					title="送养人信息"
				></AuthorInformation>
			</view>
			<Explain></Explain>
			<view class="more">
				<view class="local-reflash">
					<view class="local">更多同城送养</view>
					<view class="reflash" @click="change">换一换</view>
				</view>
				<view class="localList">
					<view
						v-if="localList"
						v-for="local in localList"
						:key="local._id"
						@click="goPetInfo(local)"
					>
						<view class="local-info">
							<img
								class="local-image"
								:src="local?.img[0]?.url"
							/>
							<view class="local-pet-name">
								{{ local.petName }}
							</view>
						</view>
					</view>
					<view class="empty-local" v-if="!localList[0]">
						<image
							class="empty-image"
							src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/09cb7c8f-2752-4fab-9114-8481d05df332.jpeg"
							mode="aspectFill"
						></image>
						还没有同城的宠物
					</view>
				</view>
			</view>
			<view class="leave-message">
				<view class="message-title">留言</view>
				<view class="message-content">
					<textarea
						class="message-input uni-input"
						placeholder="请输入你的留言"
						maxlength="200"
						v-model="(adoptingComment as string)"
						cursor-spacing="180"
					></textarea>
					<view class="message-tips">可输入200字以内</view>
					<view class="publish-message" @click="commentToAdoption">
						发表
					</view>
				</view>
			</view>
			<Message :commentList="commentList" :where="where"></Message>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog
				type="warn"
				cancelText="暂不登录"
				confirmText="前往登录"
				title="提醒"
				content="您还未登录,是否要前往登录"
				@confirm="dialogConfirm"
			></uni-popup-dialog>
		</uni-popup>
	</view>
	<Inferior :petInfo="petInfo"></Inferior>
</template>

<script lang="ts" setup>
import PetInformation from './PetInformation/index.vue';
import AuthorInformation from '@/components/AuthorInformation/index.vue';
import PetAppearance from './PetAppearance/index.vue';
import Applied from './Applied/index.vue'
import Explain from './Explain/index.vue';
import Inferior from './Inferior/index.vue';
import Remind from './Remind/index.vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import Message from '@/components/Message/index.vue'
import type {UserInfo } from '@/types/common'
import {throttle} from '@/common/throttle'
const userId = ref('');
onShow(() => {
	userId.value = uniCloud.getCurrentUserInfo().uid;
});
const db = uniCloud.database();
type LocalList = {
	_id: number;
	img: any[];
	petName: string;
};
const localList=ref<LocalList[]>([])
const userInfo = reactive<UserInfo>({
	nickname: '',
	avatar_file:{url:''},
	_id:''
});
const commentUserInfo = reactive<UserInfo>({
	nickname: '',
	avatar_file:{url:''},
	_id:''
});
const petInfo = reactive({
	_id: '',
	age: '',
	city: [],
	gender: '',
	img: [],
	medical: [],
	name: '',
	particular: [],
	pet_name: '',
	phone: '',
	punch: '',
	request: [''],
	source: [''],
	story: '',
	variety: '',
	wx_code: '',
	issue_time: 0,
	user_id: '',
	if_adopt:false
});
const dialogConfirm = () => {
	uni.navigateTo({
		url:
			'/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=weixin'
	});
};
const where=ref<string>('')
const alertDialog = ref(null);
const adoptingComment = ref<string>();

const send:Function=()=>{
	uniCloud
		.callFunction({
			name: 'comment',
			data: {
				comment: adoptingComment.value,
				type: 0,
				userId: userId.value,
				adoptId: petInfo._id,
				avatarUrl: commentUserInfo.avatar_file.url,
				nickname: commentUserInfo.nickname
			}
		})
		.then(() => {
			adoptingComment.value=''
			uni.showToast({
				title: '评论成功'
			});
			getComment()
		})
		.catch(err => {
			console.log(err);
		});
}
const commentToAdoption = () => {
	userId.value = uniCloud.getCurrentUserInfo().uid;
	if (!adoptingComment.value) {
		uni.showToast({
			title: '请输入文字',
			icon: 'none'
		});
	} else {
		if (!userId.value) {
			alertDialog.value.open('center');
		} else {
			throttle(send(),3000)
		}
}
};

const goPetInfo = (local: LocalList) => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/index?id=${local._id}`
	});
};
const commentList=ref([])
const getComment=async()=>{
	await db.collection('comment')
		.where(`adopt_id=='${petInfo._id}'&&comment_type==0`)
		.orderBy('create_time','desc')
		.get()
		.then(res => {
			commentList.value=res.result.data;
		});
}
const applyList=ref([])
const getUserInfo=async(where:string,option:UserInfo)=>{
 await	db
		.collection('uni-id-users')
		.where(where)
		.field('nickname,avatar_file,_id')
		.get({getOne:true})
		.then(res => {
			Object.assign(option,res.result.data)
		});
}
onLoad(async option => {
	userId.value = uniCloud.getCurrentUserInfo().uid;
	await db
		.collection('adoption')
		.where(`_id == '${option.id}'`)
		.get()
		.then(async res => {
		    await Object.assign(petInfo, res.result.data[0]);
			where.value=`comment_type==1&&adopt_id=='${petInfo._id}'`
		})
		.then(async () => {
			reflash();
			await getUserInfo(`_id == '${userId.value}'`,commentUserInfo)
		    await getUserInfo(`_id=='${petInfo.user_id}'`,userInfo)
			getComment()
		})
		.then(()=>{
			db.collection('apply')
			.where(`adopt_id=='${petInfo._id}'&&state=='申请中'`)
			.field('user_id')
			.get()
			.then((res)=>{
				applyList.value=res.result.data
			})
		})
		.catch(err => {
			console.log(err.code);
			console.log(err.message);
		});
});

const skip = ref<number>(0);
const count = ref<number>();
const reflash = () => {
	db.collection('adoption')
		.where(`city=='${petInfo.city[1]}'&&_id!='${petInfo._id}'`)
		.field('pet_name as petName,_id,img')
		.skip(skip.value)
		.limit(3)
		.get({
			getCount: true
		})
		.then(res => {
			localList.value=res.result.data
			count.value = res.result.count;
		});
};
const change = () => {
	if (skip.value >= count.value) {
		skip.value = 0;
		uni.showToast({
			title: '没有更多了',
			icon: 'none'
		});
		reflash();
	} else {
		if (skip.value + 3 >= count.value) {
			skip.value = 0;
			uni.showToast({
				title: '没有更多了',
				icon: 'none'
			});
			reflash();
		} else {
			skip.value += 3;
			reflash();
		}
	}
};
</script>

<style lang="less" scoped>
.apply-adopt {
	width: 100%;
	.pet-information {
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		width: 100%;
		background-color: white;
		margin-top: -20rpx;
		position: absolute;
		box-shadow: 0 0 7rpx rgba(0, 0, 0, 0.3);
		.author-information {
			margin-left: 5%;
			width: 90%;
		}
		.more {
			margin-top: 50rpx;
			width: 90%;
			margin-left: 5%;
			height: 400rpx;
			.local-reflash {
				width: 100%;
				justify-content: space-between;
				align-items: center;
				display: flex;
				.local {
					font-size: 35rpx;
					font-weight: 900;
				}
				.reflash {
					color: #666;
					font-size: 28rpx;
				}
			}
			.localList {
				align-items: center;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				width: 100%;
				.empty-local {
					color: #666;
					font-size: 40rpx;
					height: 300rpx;
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					.empty-image {
						border-radius: 50%;
						width: 200rpx;
						height: 200rpx;
					}
				}
				.local-info {
					height: 250rpx;
					justify-content: space-between;
					display: flex;
					flex-direction: column;
					align-items: center;
					.local-image {
						border-radius: 30rpx;
						width: 180rpx;
						height: 180rpx;
					}
				}
			}
		}
		.leave-message {
			margin-left: 5%;
			width: 90%;
			position: relative;
			.message-title {
				font-weight: 900;
			}
			.message-content {
				margin-top: 30rpx;
				height: 320rpx;
				border-radius: 20rpx;
				border: 1px solid #666;
				.message-input {
					padding: 3% 5%;
					width: 90%;
					height: 160rpx;
				}
				.publish-message {
					z-index: 20;
					padding: 15rpx 45rpx;
					border-radius: 30rpx;
					color: white;
					font-size: 25rpx;
					background-color: rgb(235, 151, 168);
					position: absolute;
					right: 50rpx;
					top: 320rpx;
				}
				.message-tips {
					font-size: 25rpx;
					color: rgb(152, 150, 152);
					left: 40rpx;
					position: absolute;
					top: 340rpx;
				}
			}
		}
	}
}
</style>

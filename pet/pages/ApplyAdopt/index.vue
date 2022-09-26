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
					:avatarUrl="userInfo.imgURL"
					:userId="userInfo.id"
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
							<img class="local-image" :src="local.img[0].url" />
							<view class="local-pet-name">
								{{ local.petName }}
							</view>
						</view>
					</view>
					<view class="empty-local" v-if="!localList[0]">
						<img class="empty-image" :src="noLocal" />
						还没有同城的宠物
					</view>
				</view>
			</view>
			<view class="leave-message">
				<view class="message-title">留言</view>
				<textarea
					class="message-input"
					placeholder="请输入你的留言"
					maxlength="200"
					v-model="adoptingComment"
				></textarea>
				<view class="message-tips">可输入200字以内</view>
				<view class="publish-message" @click="commentToAdoption">
					发表
				</view>
			</view>
			<view class="messages">
				<view v-for="commentInfo in commentList" :key="commentInfo._id">
					<view class="messages-body">
						<view class="messages-userInfo">
							<img
								class="messages-userInfo-avatar"
								:src="commentInfo.avatar_url"
							/>
							<view class="messages-userInfo-content">
								<view class="message-userInfo-content-nickname">
									{{ commentInfo.nickname }}
								</view>
								<view class="messages-userInfo-content-time">
									<uni-dateformat
										:date="commentInfo.create_time"
										format="yyyy-MM-dd hh:mm:ss"
									></uni-dateformat>
								</view>
							</view>
						</view>
						<tui-icon
							name="message"
							@click="commentToReply(commentInfo)"
						></tui-icon>
					</view>
					<view class="messages-content">
						{{ commentInfo.comment }}
					</view>
					<view class="reply-frame">
						<view v-for="reply in replyList" :key="reply._id">
							<view
								class="reply"
								v-if="reply.comment_id == commentInfo._id"
							>
								{{ reply.nickname }} :{{ reply.comment }}
							</view>
						</view>
					</view>
				</view>
			</view>
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
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog
				title="回复"
				ref="inputClose"
				mode="input"
				:placeholder="'@' + replyTo"
				@confirm="dialogInputConfirm"
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
const localList = ref<LocalList[]>([]);
const userInfo = reactive({
	nickname: '',
	imgURL: '',
	id:''
});
const commentUserInfo = reactive({
	nickname: '',
	imgURL: ''
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
const alertDialog = ref(null);
const adoptingComment = ref();
let valid=ref(true)
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
			if(!valid.value) return
			valid.value=false
			uniCloud
				.callFunction({
					name: 'comment',
					data: {
						commentContent: adoptingComment.value,
						commentType: 0,
						userId: userId.value,
						adoptId: petInfo._id,
						avatarUrl: commentUserInfo.imgURL,
						nickname: commentUserInfo.nickname
					}
				})
				.then(() => {
					refreshMessage();
					adoptingComment.value = '';
					uni.showToast({
						title: '评论成功'
					});
					setTimeout(()=>{
					    valid.value=true
					},3000)
				})
				.catch(err => {
					console.log(err);
				});
			}
		}
};
const inputDialog=ref(null)
const replyTo=ref<string>()
const replyCommentId=ref<string>()
const commentToReply=async( comment:CommentList)=>{
	replyTo.value=comment.nickname
	replyCommentId.value=comment._id
	inputDialog.value.open('center')
}
const dialogInputConfirm=(comment:string)=>{
	userId.value = uniCloud.getCurrentUserInfo().uid;
	if(!comment){
		uni.showToast({
			title: '请输入文字',
			icon: 'none'
		});
	}else{
		if (!userId.value) {
			alertDialog.value.open('center');
		} else{
			uniCloud.callFunction({
				name:'comment',
				data:{
					commentContent:comment,
					commentType: 1,
					userId: userId.value,
					adoptId: petInfo._id,
					avatarUrl: commentUserInfo.imgURL,
					nickname: commentUserInfo.nickname,
					commentId:replyCommentId.value
				}
			}).then(()=>{
				uni.showToast({
					title:'评论成功',
					icon:'none'
				})
				refreshReply()
			})
		}
	}

}
const goPetInfo = (local: LocalList) => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/index?id=${local._id}`
	});
};
const replyList=ref([])
type CommentList = {
	adopt_id: string;
	avatar_url: string;
	comment: string;
	comment_type: number;
	create_time: number;
	nickname: string;
	user_id: string;
	_id: string;
};
let commentList = ref<CommentList[]>([]);
const refreshMessage = () => {
	const adoption = db
		.collection('adoption')
		.where(`_id=='${petInfo._id}'`)
		.field('_id')
		.getTemp();
	const comment = db
		.collection('comment')
		.where('comment_type==0')
		.orderBy('create_time', 'desc')
		.getTemp();
	db.collection(adoption, comment)
		.get()
		.then(res => {
			commentList.value = res.result.data[0]._id.comment;
		});
};
const refreshReply=()=>{
	db.collection('comment')
	.where('comment_type==1')
	.get()
	.then((res)=>{
		replyList.value=res.result.data
	})
}
const noLocal=ref()
const applyList=ref([])
onLoad(async option => {
	userId.value = uniCloud.getCurrentUserInfo().uid;
	await db
		.collection('adoption')
		.where(`_id == '${option.id}'`)
		.get()
		.then(res => {
			Object.assign(petInfo, res.result.data[0]);
		})
		.then(async () => {
			reflash();
			await db
				.collection('uni-id-users')
				.where(`_id == '${userId.value}'`)
				.field('nickname,avatar_file')
				.get()
				.then(res => {
					commentUserInfo.nickname = res.result.data[0].nickname;
					commentUserInfo.imgURL = res.result.data[0].avatar_file?.url;
				});
		}).then(()=>{
			db.collection('uni-id-users')
			.where(`_id=='${petInfo.user_id}'`)
			.get()
			.then((res)=>{
				userInfo.imgURL=res.result.data[0].avatar_file?.url
				userInfo.nickname=res.result.data[0].nickname
				userInfo.id=res.result.data[0]._id
			})
		}).then(()=>{
			db.collection('apply')
			.where(`adopt_id=='${petInfo._id}'&&state=='申请中'`)
			.field('user_id')
			.get()
			.then((res)=>{
				applyList.value=res.result.data
			})
		}).then(()=>{
			db.collection('images')
				.where("title=='没有同城'")
				.get()
				.then(res => {
					noLocal.value = res.result.data[0].image[0].url;
				});
		})
		.then(() => {
			refreshMessage();
			refreshReply()
		})
		.catch(err => {
			console.log(err.code); // 打印错误码
			console.log(err.message); // 打印错误内容
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
			localList.value = res.result.data;
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
					height: 200rpx;
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					.empty-image {
						width: 100rpx;
						height: 100rpx;
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
			.message-input {
				margin-top: 30rpx;
				padding: 3% 5%;
				width: 90%;
				border-radius: 20rpx;
				border: 1px solid #666;
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
		.messages {
			padding-bottom: 200rpx;
			margin-top: 50rpx;
			width: 83%;
			margin-left: 12%;
			.messages-body {
				margin-top: 50rpx;
				justify-content: space-between;
				align-items: center;
				display: flex;
				.messages-userInfo {
					display: flex;
					align-items: center;
					justify-content: space-between;
					&-avatar {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
					&-content {
						margin-left: 30rpx;
						&-nickname {
							font-size: 30rpx;
						}
						&-time {
							margin-top: 5rpx;
							font-size: 23rpx;
							color: #ccc;
						}
					}
				}
			}
			.messages-content {
				width: 420rpx;
				margin-left: 130rpx;
				margin-top: 5rpx;
			}
			.reply-frame {
				margin-top: 20rpx;
				width: 80%;
				margin-left: 20%;
				.reply {
					padding: 20rpx;
					background-color: rgba(227, 226, 227, 0.5);
				}
			}
		}
	}
}
</style>

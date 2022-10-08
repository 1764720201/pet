<template>
	<view class="chat">
		<view class="chat-tips">
			领养需谨慎，以任何名义要求打款的，请注意提防。涉嫌宠物买卖交易的经核实一律封号处理。
		</view>
		<view class="to-pioneer" @click="toPioneerChat" v-if="ifTopioneer">
			首条未读消息
			<view class="t-icon t-icon-jiantou_yemian_xiangshang"></view>
		</view>
		<view class="chat-list">
			<scroll-view
				@scroll="scroll"
				scroll-y="true"
				:scroll-into-view="scrollToView"
				:style="{ height: scrollHeight }"
				:scroll-with-animation="ifAnimation"
			>
				<view
					v-for="chat in chatList"
					:key="chat?._id"
					:id="'msg' + chat?._id"
				>
					<view class="self" v-if="chat.from_uid == current?._id">
						<view class="user-info">
							<view class="nickname">{{ current.nickname }}</view>
							<img
								:src="current.avatar_file.url"
								class="avatar"
							/>
						</view>
						<view class="content" v-if="chat.type == 'text'">
							{{ chat.body.text }}
						</view>
						<view v-if="chat.type == 'image'">
							<image
								class="pictures"
								:src="chat.body.image"
								mode="aspectFit"
							></image>
						</view>
					</view>
					<view class="from" v-if="chat.from_uid == opposite?._id">
						<view class="user-info">
							<img
								:src="opposite.avatar_file.url"
								class="avatar"
							/>
							<view class="nickname">
								{{ opposite.nickname }}
							</view>
						</view>
						<view class="content" v-if="chat.type == 'text'">
							{{ chat.body.text }}
						</view>
						<view v-if="chat.type == 'image'">
							<image
								class="pictures"
								:src="chat.body.image"
								mode="aspectFit"
							></image>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	<view class="footer">
		<input
			v-model="content"
			type="text"
			placeholder="请输入聊天内容.."
			class="input uni-input"
			cursor-spacing="25"
		/>
		<view class="more" @click="more">+</view>

		<view class="send" @click="send">发送</view>
	</view>
	<uni-popup ref="popup" type="bottom" backgroundColor="#fff">
		<uni-file-picker
			ref="clear"
			:del-icon="false"
			limit="6"
			@success="sendPicture"
			:imageStyles="imageStyles"
			@select="select"
		>
			图片
		</uni-file-picker>
	</uni-popup>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import type { UserInfo } from "@/types/common";
const ifAnimation = ref<boolean>(false);
let limit=50
const db = uniCloud.database();
const scrollToView = ref();
const scrollHeight = ref(`calc(100vh - 300rpx)`);
const oppositeUid = ref<string>("");

const chatList = ref<any>([]);
const content = ref<string>("");
const ifTopioneer = ref<boolean>(false);
const scroll=async(e)=>{
	const ifFresh=ref<boolean>(true)
	if(e.detail.scrollTop<1550&&ifFresh.value){
		limit+=50
		ifFresh.value=false
		await getChatList()
		ifFresh.value=true
	}
}
const opposite = reactive<UserInfo>({
  avatar_file: { url: "" },
  nickname: "",
  _id: "",
});
const current = reactive<UserInfo>({
  avatar_file: { url: "" },
  nickname: "",
  _id: "",
});
onLoad(async (option) => {
  oppositeUid.value = option.id;
  await getUserInfo(`_id=='${option.id}'`, opposite);
  await getUserInfo("_id==$cloudEnv_uid", current);
  await getChatList();
  await getPioneerChat();
  await emptyUnread()
  scrollToView.value = "msg" + chatList.value[chatList.value.length - 1]?._id;
});
const getUserInfo = async (where: string, option: UserInfo) => {
  await db
    .collection("uni-id-users")
    .where(where)
    .field("nickname,avatar_file")
    .get({ getOne: true })
    .then((res) => {
      Object.assign(option, res.result.data);
    });
};
uni.onPushMessage(async () => {
  await getChatList();
  scrollToView.value = "msg" + chatList.value[chatList.value.length - 1]?._id;
});
const emptyUnread=async()=>{
	await db.collection("chat")
	  .field("from_uid,to_uid,is_read")
	  .where(`from_uid=='${oppositeUid.value}'&&to_uid==$cloudEnv_uid&&is_read==false`)
	  .update({
	    is_read: true,
	  }).catch(err=>{
		  console.log(err)
	  })
}
const pioneerChat = ref<string>();
const getChatList = async () => {
  await db
    .collection("chat")
    .where( `(from_uid==$cloudEnv_uid&&to_uid=='${oppositeUid.value}')||(from_uid=='${oppositeUid.value}'&&to_uid==$cloudEnv_uid)`)
  	.orderBy('create_date','desc')
  	.limit(limit)
    .get()
    .then((res) => {
       chatList.value = res.result.data.reverse();
    });
};
const getPioneerChat = async () => {
 await db
    .collection("chat")
    .where( `from_uid=='${oppositeUid.value}'&&to_uid==$cloudEnv_uid&&is_read==false`)
  	.orderBy('create_date','desc')
    .get()
    .then((res) => {
      const data = res.result.data;
      if (data.length > 10) {
		ifTopioneer.value = true;
        pioneerChat.value = "msg" + res.result.data[0]?._id;
	}
});
};
const toPioneerChat =() => {
     scrollToView.value = pioneerChat.value;
     ifTopioneer.value = false;
};
const send = async () => {
  ifAnimation.value = true;
  if (!content.value) {
    uni.showToast({
      title: "请输入文字!",
      icon: "none",
    });
  } else {
    uniCloud.callFunction({
      name: "push",
      data: {
        userId: oppositeUid.value,
        content: content.value,
      },
	  fail(err) {
	  	console.log(err)
	  }
    });
    await db
      .collection("chat")
      .add({
        to_uid: oppositeUid.value,
        body: { text: content.value },
        type: "text",
      })
      .then(async () => {
        await getChatList();
        scrollToView.value =
          "msg" + chatList.value[chatList.value.length - 1]?._id;
        content.value = "";
      })
	  .catch(err=>{
		  console.log(err)
	  });
  }
};
const popup = ref(null);
const more = () => {
  popup.value.open();
};
const imageStyles = reactive({
  width: 74,
  height: 74,
  border: {
    color: "#afafaf",
    radio: 10,
  },
});
const clear = ref(null);
const select = async () => {
  await popup.value.close();
};
const sendPicture = async (e) => {
  ifAnimation.value = true;
  e.tempFilePaths.forEach(async (value) => {
    uniCloud.callFunction({
      name: "push",
      data: {
        userId: oppositeUid.value,
        content: content.value,
      },
    });
    await db
      .collection("chat")
      .add({
        to_uid: oppositeUid.value,
        body: { image: value },
        type: "image",
      })
      .then(async () => {
        await getChatList();
        scrollToView.value =
          "msg" + chatList.value[chatList.value.length - 1]?._id;
        clear.value.clearFiles();
      });
  });
};
</script>

<style scoped lang="scss">
.chat {
	position: relative;
	margin-top: 30rpx;
	width: 92%;
	margin-left: 4%;
	.to-pioneer {
		display: flex;
		align-items: center;
		position: absolute;
		right: -4%;
		z-index: 777;
		padding: 20rpx;
		background-color: #fff;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		border-top-left-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
		color: #f7ab3a;
		.t-icon {
			width: 40rpx;
			height: 40rpx;
		}
	}
	&-tips {
		height: 100rpx;
		color: #f29610;
	}
	.chat-list {
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		width: 100%;
		.self {
			margin-top: 30rpx;
			align-items: flex-end;
			display: flex;
			flex-direction: column;
			.content {
				margin-right: 45rpx;
			}
		}
		.from {
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			.content {
				margin-left: 40rpx;
			}
		}
		.content {
			margin-top: 15rpx;
			border-radius: 10rpx;
			padding: 20rpx;
			background-color: #91caef;
		}
		.user-info {
			align-items: center;
			display: flex;
			.avatar {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
		}
		.pictures {
			max-width: 80%;
			margin-top: 40rpx;
			border-radius: 40rpx;
		}
	}
}
.footer {
	width: 100%;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
	justify-content: space-around;
	display: flex;
	align-items: center;
	height: 130rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	.more {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 70rpx;
		border: 1px solid #afafaf;
		color: #afafaf;
	}
	.input {
		margin-left: 40rpx;
		padding: 25rpx;
		width: 350rpx;
		border-bottom: 1rpx solid #666;
	}
	.send {
		width: 150rpx;
		color: white;
		border-radius: 20rpx;
		text-align: center;
		line-height: 90rpx;
		height: 90rpx;
		background-image: linear-gradient(
			to right,
			rgb(235, 160, 178),
			rgb(230, 122, 141)
		);
	}
}
:deep(.file-picker__box) {
	margin-left: 50rpx;
	margin-top: 50rpx;
	margin-bottom: 50rpx;
}
</style>

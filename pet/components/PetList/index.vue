<template>
	<unicloud-db
		ref="udb"
		v-slot:default="{
			data,
			pagination,
			loading,
			error,
			hasMore
		}"
		collection="adoption"
		orderby="issueTime desc"
		field="pet_name as petName,_id,medical,city,issue_time as issueTime,gender,variety,img,if_adopt"
		:getone="false"
		:where="where"
		:page-size="5"
	>
		<view v-if="error" class="error">{{ error.message }}</view>
		<view v-else class="petInfoList">
			<view
				@click="goPetInfo(petInfo)"
				class="petInfo"
				v-for="petInfo in data"
				:key="petInfo._id"
			>
				<view class="upload-picture">
					<view v-if="!petInfo.if_adopt" class="wait-adopt">
						等待领养
					</view>
					<img v-else class="already-adopt" :src="alreadyAdopt" />
					<img class="picture" :src="petInfo.img[0].path" />
				</view>

				<view class="information">
					<view class="pet-name">
						{{ petInfo.petName }}
						<view class="gender">
							{{ petInfo.gender == '男生' ? '♂' : '♀' }}
						</view>
					</view>
					<view class="variety">{{ petInfo.variety }}</view>
					<view class="medicalList">
						<span class="medical" v-for="med in petInfo.medical">
							{{ med }}
						</span>
					</view>
					<view class="city">
						{{ petInfo.city[1] }} {{ petInfo.city[2] }}
					</view>
					<view class="issue-time">
						<uni-dateformat
							:date="petInfo.issueTime"
							format="yyyy-MM-dd hh:mm:ss"
						></uni-dateformat>
						擦亮
					</view>
				</view>
			</view>
		</view>
		<uni-load-more status="loading" v-if="loading" />
		<uni-load-more status="more" v-if="hasMore && !loading" />
		<uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
	</unicloud-db>
	<view class="navigate" @click="navigateToTop" v-if="navigateTop">
		<uni-icons type="navigate" size="50"></uni-icons>
	</view>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { onLoad } from '@dcloudio/uni-app';
const alreadyAdopt = ref<string>();
const db = uniCloud.database();
onLoad(() => {
	db.collection('images')
		.where("title=='已领养'")
		.get()
		.then(res => {
			alreadyAdopt.value = res.result.data[0].image[0].url;
		});
});
const navigateTop = ref(false);
const udb = ref(null);
const props = defineProps<{ where: string }>();
const { where } = toRefs(props);
const navigateToTop = () => {
	navigateTop.value = false;
	uni.pageScrollTo({
		scrollTop: 300,
		duration: 300
	});
};
type PetInfoList = {
	petName: string;
	medical: string[];
	city: string[];
	issueTime: number;
	gender: string;
	variety: string;
	_id: number;
	img: [];
};

const goPetInfo = (petInfo: PetInfoList) => {
	uni.navigateTo({
		url: `/pages/ApplyAdopt/index?id=${petInfo._id}`,
		success() {
			uniCloud.callFunction({
				name: 'footprint',
				data: {
					userId: userId,
					adoptId: petInfo._id
				}
			});
		}
	});
};
onPullDownRefresh(() => {
	udb.value.loadData(() => {
		uni.stopPullDownRefresh();
	});
});
onReachBottom(() => {
	navigateTop.value = true;
	udb.value.loadMore();
});
</script>

<style scoped lang="less">
.navigate {
	position: fixed;
	right: 40rpx;
	bottom: 80rpx;
}
.petInfoList {
	min-height: 100%;
	width: 90%;
	margin-left: 5%;
	.petInfo {
		margin-top: 50rpx;
		display: flex;
		.upload-picture {
			position: relative;
			.picture {
				width: 300rpx;
				height: 270rpx;
				border-radius: 20rpx;
			}
			.wait-adopt {
				background-color: #ea7587;
				position: absolute;
				color: white;
				font-size: 24rpx;
				padding: 8rpx 10rpx;
				border-radius: 20rpx 0rpx 13rpx 0rpx;
			}
			.already-adopt {
				width: 160rpx;
				height: 160rpx;
				position: absolute;
				left: 68rpx;
				top: 60rpx;
			}
		}
		.information {
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.pet-name {
				align-items: center;
				display: flex;
				font-weight: 900;
				.gender {
					margin-left: 30rpx;
					color: #ea7587;
				}
			}
			.variety {
				font-size: 26rpx;
				color: #ccc;
			}
			.medical {
				color: rgb(242, 157, 176);
				font-size: 25rpx;
				padding: 5rpx 15rpx;
				border-radius: 10rpx;
				background-color: rgba(242, 157, 176, 0.2);
				&:nth-child(2) {
					margin-left: 8rpx;
				}
				&:nth-child(3) {
					margin-left: 8rpx;
				}
			}
			.city {
				font-size: 25rpx;
				color: #666;
				align-items: flex-end;
			}
			.issue-time {
				display: flex;
				width: 350rpx;
				justify-content: flex-end;
				color: #666;
				font-size: 20rpx;
			}
		}
	}
}
</style>

<template>
	<view class="option">
		<view class="star">
			<picker @change="changeStar" :range="starList">星球</picker>
		</view>
		<view class="gender">
			<picker @change="changeGender" :range="genderList">性别</picker>
		</view>
		<view class="region">
			<pick-regions @getRegion="handleGetRegion">地区</pick-regions>
		</view>
		<view class="time">
			<picker @change="changeTime" :range="timeList">时间</picker>
		</view>
	</view>
	<view class="list">
		<unicloud-db
			ref="udb"
			v-slot:default="{
				data,
				pagination,
				loading,
				error,
				hasMore
			}"
			collection="foundPet"
			orderby="create_time desc"
			field="reward,create_time,city,title,gender,uploadPicture,_id,type,variety"
			:getone="false"
			:where="where"
			:page-size="4"
		>
			<view v-if="error" class="error">{{ error.message }}</view>
			<view v-else class="found-pet-list">
				<view
					v-for="foundInfo in data"
					:key="foundInfo._id"
					class="found-pet"
					@click="goEnlightenment(foundInfo._id)"
				>
					<view class="picture">
						<img
							:src="foundInfo.uploadPicture[0].path"
							class="found-pet-picture"
						/>
						<view class="reward" v-if="foundInfo.reward">
							{{ '酬金' + foundInfo.reward + '元' }}
						</view>
					</view>
					<view class="found-pet-infomation">
						<view class="found-pet-title">
							<view class="type">{{ foundInfo.type }}</view>
							<view class="type-title">
								{{ foundInfo.title }}
							</view>
						</view>
						<view class="found-pet-gender-variety">
							{{ foundInfo.variety }}|{{ foundInfo.gender }}
						</view>
						<view class="city">
							<tui-icon name="position" :size="24"></tui-icon>
							<view class="position">
								{{ foundInfo.city[1] }} {{ foundInfo.city[2] }}
							</view>
						</view>
						<view class="create-time">
							<uni-dateformat
								:date="foundInfo.create_time"
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
	</view>
</template>

<script lang="ts" setup>
import { ref,getCurrentInstance } from 'vue';
import pickRegions from '@/components/pick-regions/pick-regions.vue'
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { onReachBottom } from '@dcloudio/uni-app';
const where = ref('');
const starList=ref(['全部','喵星人','汪星人','其它'])
const genderList=ref(['全部','男生','女生'])
const timeList=ref(['全部','近一周','近一个月','近三个月'])
const currentTime=Date.now()
const changeStar=(e)=>{
	if(starList.value[e.detail.value]!='全部'){
		where.value=`star=='${starList.value[e.detail.value]}'`
	}else{
		where.value=''
	}
}
const changeGender=(e)=>{
	if(genderList.value[e.detail.value]!='全部'){
		where.value=`gender=='${genderList.value[e.detail.value]}'`
	}else{
		where.value=''
	}
}
const oneWeek=currentTime-604800
const oneMonth=currentTime-2678400
const thereMonth=currentTime-8035200
const changeTime=(e)=>{
		switch(timeList.value[e.detail.value]){
			case '全部':
			where.value=''
			break;
			case '近一周':
			where.value=`create_time<=${oneWeek}`;
			break;
			case '近一个月':
			where.value=`create_time<=${oneMonth}&&create_time>${oneWeek}`;
			break;
			case '近三个月':
			where.value=`create_time<=${thereMonth}&&create_time>${oneMonth}`;
			break;
			default:
			break;
		}
}
const instance=getCurrentInstance()
instance?.proxy?.$Bus.on('found-search',(e)=>{
	where.value=`variety=='${e}'||star=='${e}'||type=='${e}'||city=='${e}'||gender=='${e}'`
})
type Region={
	value:number,
	name:string
}
const handleGetRegion=(region:Region[])=>{
	where.value=`city=='${region[2].name}'`
}
const goEnlightenment = (foundId: number) => {
	uni.navigateTo({
		url: `/pages/Home/Enlightenment/index?id=${foundId}`
	});
};

const udb = ref(null);
onPullDownRefresh(() => {
	udb.value.loadData(() => {
		uni.stopPullDownRefresh();
	});
});
onReachBottom(() => {
	udb.value.loadMore();
});
</script>

<style lang="less" scoped>
.option {
	margin-top: 150rpx;
	padding-bottom: 20rpx;
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid #ccc;
	color: rgb(143, 142, 143);
	&:first-child {
		padding-left: 50rpx;
	}
	&:last-child {
		padding-right: 50rpx;
	}
}
.list {
	display: flex;
	flex-direction: column;
	.found-pet {
		padding-bottom: 20rpx;
		border-bottom: 1px solid #ccc;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-around;
		.picture {
			position: relative;
			.found-pet-picture {
				width: 250rpx;
				height: 250rpx;
			}
			.reward {
				position: absolute;
				bottom: 15px;
				color: red;
				left: 15rpx;
				font-weight: 900;
				font-size: 40rpx;
			}
		}
		.found-pet-infomation {
			width: 55%;
			margin-left: -50rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.found-pet-title {
				display: flex;
				align-items: flex-start;
				height: 80rpx;
				.type {
					text-align: center;
					margin-top: 5rpx;
					width: 60rpx;
					height: 30rpx;
					line-height: 30rpx;
					border-radius: 10rpx;
					padding: 0 10rpx;
					font-size: 22rpx;
					color: rgb(226, 155, 98);
					border: 1px rgb(226, 155, 98) solid;
				}
				.type-title {
					width: 70%;
					font-weight: 900;
					margin-left: 18rpx;
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}
			.found-pet-gender-variety,
			.create-time {
				font-size: 27rpx;
				color: #a6a6a6;
			}
			.city {
				display: flex;
				align-items: center;
				color: #666;
				font-size: 27rpx;
				.position {
					margin-left: 10rpx;
				}
			}
		}
	}
}
</style>

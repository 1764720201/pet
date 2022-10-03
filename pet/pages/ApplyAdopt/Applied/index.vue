<template>
  <view class="applied" v-if="applyList.length">
    <view class="applied-title">{{ applyList.length }}人已申请</view>
    <view v-for="appliedDetail in applyList" :key="appliedDetail?._id">
      <unicloud-db
        v-slot:default="{ data }"
        collection="uni-id-users"
        :where="`_id=='${appliedDetail?.user_id}'`"
        field="nickname,avatar_file"
        :getone="true"
      >
        <view class="applied-detail">
          <img class="avatar" :src="data?.avatar_file?.url" />
          {{ data?.nickname }}
        </view>
      </unicloud-db>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
const props = defineProps<{ applyList: { user_id: string; _id: string }[] }>();
const { applyList } = toRefs(props);
</script>

<style lang="less" scoped>
.applied {
  margin-top: 30rpx;
  margin-left: 5%;
  width: 90%;
  .applied-title {
    font-weight: 900;
  }
  .applied-detail {
    margin-left: 5rpx;
    margin-top: 30rpx;
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 10rpx;
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
    }
  }
}
</style>

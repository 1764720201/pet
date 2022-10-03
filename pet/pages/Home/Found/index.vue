<template>
  <div class="wait-adopt-title">
    <view class="title">
      寻宠启示
      <view class="more" @click="goFoundPet">
        查看更多
        <tui-icon :size="15" name="arrowright"></tui-icon>
      </view>
    </view>
  </div>
  <view class="found">
    <view
      class="found-list"
      v-for="found in foundList"
      :key="found._id"
      @click="goFound(found)"
    >
      <image
        class="img"
        :src="found.uploadPicture[0].url"
        mode="aspectFill"
      ></image>
      <view class="name">{{ found.title }}</view>
      <view class="position"> {{ found.city[1] }}/{{ found.city[2] }} </view>
      <unicloud-db
        v-slot:default="{ data }"
        collection="uni-id-users"
        :getone="true"
        :where="`_id=='${found.user_id}'`"
      >
        <view class="author">
          <img class="avatar" :src="data?.avatar_file.url" />
          <view class="author-name">{{ data?.nickname }}</view>
        </view>
      </unicloud-db>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const foundList = ref<any>([]);
const db = uniCloud.database();

onShow(() => {
  db.collection("foundPet")
    .where("state=='已发布'")
    .field(
      "user_id,_id,uploadPicture,city,title,create_time as createTime,state"
    )
    .orderBy("createTime", "desc")
    .limit(2)
    .get()
    .then((res: { result: { data: [] } }) => {
      foundList.value = res.result.data;
    })
    .catch((err) => {
      console.log(err.code); // 打印错误码
      console.log(err.message); // 打印错误内容
    });
});
const goFoundPet = () => {
  uni.navigateTo({
    url: "/pages/FoundPet/index",
  });
};
const goFound = (petInfo: { _id: string; user_id: string }) => {
  uni.navigateTo({
    url: `./Enlightenment/index?id=${petInfo._id}&user_id=${petInfo.user_id}`,
  });
};
</script>

<style lang="less" scoped>
.wait-adopt-title {
  display: flex;
  width: 100%;
  justify-content: center;
  .title {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    font-size: 30rpx;
    font-weight: 600;
    .more {
      display: flex;
      align-items: center;
      font-size: 22rpx;
      color: rgb(193, 192, 192);
    }
  }
}
.found {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  .found-list {
    width: 330rpx;
    height: 580rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .name {
      font-weight: 900;
      font-size: 30rpx;
      display: inline-block;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .position {
      color: #666;
      font-size: 25rpx;
    }
    .img {
      width: 330rpx;
      height: 350rpx;
      border-radius: 20rpx;
    }
    .author {
      display: flex;
      align-items: center;
      .avatar {
        width: 50rpx;
        height: 50rpx;
        border-radius: 25rpx;
      }
      .author-name {
        color: #666;
        margin-left: 10rpx;
        font-size: 23rpx;
      }
    }
  }
}
</style>

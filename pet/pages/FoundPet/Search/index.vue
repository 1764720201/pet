<template>
  <view class="found-pet-list">
    <image
      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/7b94e681-9e99-4d26-8c53-de9ab4b052f3.jpeg"
      class="picture"
      mode="aspectFill"
    ></image>
    <view class="title">铲屎的! 你把我弄丢了</view>
    <view class="search-bar">
      <mSearch
        @search="search"
        backgroundColor="rgba(0,0,0,0)"
        :show="false"
        placeholder="请输入..."
      ></mSearch>
    </view>
    <view class="footer">
      <view class="latest-message">最新消息</view>
      <view class="found-pet" @click="goFoundPet">
        <view class="publish">发布寻宠</view>
        <view class="tips">丢失或捡到宠物，您可以在这里发布</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import mSearch from "@/components/mehaotian-search/mehaotian-search.vue";
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const goFoundPet = () => {
  uni.navigateTo({
    url: "/pages/Issue/FoundPet/index",
  });
};
const search = (e: string) => {
  instance?.proxy?.$Bus.emit("found-search", e);
};
</script>
<style lang="less" scoped>
.found-pet-list {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  .picture {
    width: 100%;
    opacity: 0.7;
  }
  .title {
    position: absolute;
    color: white;
    top: 20%;
    font-size: 50rpx;
  }
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 40%;
  }
  .footer {
    position: absolute;
    bottom: -120rpx;
    display: flex;
    width: 96%;
    margin-left: 2%;
    justify-content: space-around;
    color: white;
    .latest-message,
    .found-pet {
      width: 260rpx;
      height: 130rpx;
      border-radius: 20rpx;
      font-size: 40rpx;
      padding: 40rpx 30rpx;
    }
    .latest-message {
      background-color: rgb(235, 165, 190);
    }
    .found-pet {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      background-color: rgb(236, 147, 12);
      flex-wrap: wrap;
      .tips {
        margin-top: 20rpx;
        font-size: 20rpx;
      }
    }
  }
}
</style>

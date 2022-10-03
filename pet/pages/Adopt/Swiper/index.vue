<template>
  <view class="uni-margin-wrap">
    <swiper class="swiper" circular indicator-dots>
      <swiper-item v-for="swiper in swiperList" :key="swiper.id">
        <image :src="swiper.url" class="img" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
  </view>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import type { Swiper } from "@/types/common";
const swiperList = reactive<Swiper[]>([
  {
    id: 0,
    url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/a9604a76-f5a8-46ba-886d-a59bb059ee76.jpeg",
  },
  {
    id: 1,
    url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/29ddc065-1587-44b6-ba34-75771c27e396.jpeg",
  },
  {
    id: 2,
    url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/cdc01a15-8b2d-46ec-bc6c-465d9f135388.jpeg",
  },
]);
</script>

<style lang="less" scoped>
.uni-margin-wrap {
  width: 690rpx;
  width: 100%;
}
.swiper {
  height: 300rpx;
  .img {
    width: 90%;
    margin-left: 5%;
    height: 150px;
    border-radius: 10px;
  }
}
.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}
.swiper-list {
  margin-top: 40rpx;
  margin-bottom: 0;
}
.uni-common-mt {
  margin-top: 60rpx;
  position: relative;
}
.info {
  position: absolute;
  right: 20rpx;
}
.uni-padding-wrap {
  width: 550rpx;
  padding: 0 100rpx;
}
</style>

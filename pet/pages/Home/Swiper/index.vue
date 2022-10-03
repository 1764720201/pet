<template>
  <view class="uni-margin-wrap">
    <swiper
      class="swiper"
      circular
      :autoplay="true"
      previous-margin="30px"
      next-margin="30px"
    >
      <swiper-item v-for="swiper in swiperList" :key="swiper.id">
        <view class="swiper-item uni-bg-red">
          <image class="img" :src="swiper.url" mode="aspectFill"></image>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import type { Swiper } from "@/types/common.js";
const swiperList = reactive<Swiper[]>([
  {
    id: 0,
    url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/0b4346a4-b894-4e94-bcf3-2e4a1c8e7eb2.jpeg",
  },
  {
    id: 1,
    url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/b727b6ca-ae3a-4483-9e6a-627e32b9d773.jpeg",
  },
  {
    id: 2,
    url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/a2e8a92d-6ae8-4e90-acab-69b782e35d62.jpeg",
  },
  {
    id: 3,
    url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f46f8a1d-9332-4f0e-9666-910073387c9b/406cb3a0-8ff1-48bd-9e6a-d2afe7154fea.jpeg",
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
}
.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  padding: 0 8px;
  border-radius: 20px;
  .img {
    width: 100%;
    border-radius: 20px;
    height: 150px;
  }
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

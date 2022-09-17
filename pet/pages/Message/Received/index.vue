<template>
  <view class="received">
    <view class="collect-praise">
      <view class="t-icon t-icon-shoucang"></view>
      <view class="word">点赞收藏(0)</view>
    </view>
    <view class="comment">
      <view class="t-icon t-icon-pinglun"></view>
      <view class="word">评论(0)</view>
    </view>
  </view>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped>
.received {
  margin-top: 50rpx;
  height: 250rpx;
  width: 100%;
  box-shadow: 0 0 4rpx #ccc;
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  .collect-praise,
  .comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    .word {
      font-size: 27rpx;
    }
    .t-icon {
      width: 80rpx;
      height: 80rpx;
    }
  }
}
</style>

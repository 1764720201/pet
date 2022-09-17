<template>
  <view class="today-knowledge">
    <view class="today">
      <view>今日</view>
      <view class="knowledge"><view class="knowledge-word">知识</view> </view>
    </view>
    <view></view>
  </view>
  <view class="options">
    <view class="option">
      <view class="t-icon t-icon-qiandao"></view>
      <span>签到</span>
    </view>
    <view class="option">
      <view class="t-icon t-icon-shuben-01"></view>
      <span>科普</span>
    </view>
    <view class="option">
      <view class="t-icon t-icon-huodong"></view>
      <span>活动</span>
    </view>
    <view class="option">
      <view class="t-icon t-icon-aichong02"></view>
      <span>寻宠</span>
    </view>
    <view class="option">
      <view class="t-icon t-icon-daojushangcheng"></view>
      <span>商城</span>
    </view>
  </view>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped>
.today-knowledge {
  padding: 40rpx;
  font-size: 25rpx;

  .today {
    display: flex;
    align-items: center;
    font-weight: 900;
  }
  .knowledge {
    margin-left: 10rpx;
    background-color: rgb(237, 118, 136);
    color: white;
    padding: 5rpx;
    width: 80rpx;
    text-align: center;
    height: 35rpx;
    line-height: 35rpx;
    font-weight: 900;
    transform: skewX(-5deg);
    .knowledge-word {
      transform: skewX(5deg);
    }
  }
}
.options {
  width: 100%;
  display: flex;
  justify-content: space-around;
  .option {
    height: 65px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-size: 13px;
    text-align: center;
  }
}
</style>

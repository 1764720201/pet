<template>
  <view class="request">
    <view class="main">
      <view class="t-icon t-icon-chongwu1"></view>
      <view class="title">发布送养</view>
      <view class="already"
        >你已经有 <span class="quantity">0个</span>发布
      </view></view
    >
    <view class="main">
      <view class="t-icon t-icon-08check"></view>
      <view class="title">申请领养</view>
      <view class="already">
        你已经有 <span class="quantity">0个</span>申领
      </view></view
    >
    <view class="main">
      <view class="t-icon t-icon-xinshenqing-"></view>
      <view class="title">发布申领</view>
      <view class="already"
        >你已经有 <span class="quantity">0个</span>申领
      </view></view
    >
    <view class="main">
      <view class="t-icon t-icon-chongwu1"></view>
      <view class="title">发布寻宠</view>
      <view class="already"
        >你已经有 <span class="quantity">0个</span>发布
      </view></view
    >
  </view>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped>
.request {
  margin-top: 40rpx;
  padding: 30rpx;
  margin-left: 5%;
  height: 100%;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 20rpx;
  justify-content: space-between;
  box-shadow: 0rpx 0rpx 7rpx #ccc;
  .main {
    display: flex;
    flex-direction: column;
    height: 200rpx;
    justify-content: space-evenly;
    margin-left: 20rpx;
    align-items: center;
    .title {
      margin-top: 10rpx;
      font-size: 30rpx;
      font-weight: 900;
    }
    .already {
      font-size: 22rpx;
      .quantity {
        color: red;
      }
    }
  }
}
</style>

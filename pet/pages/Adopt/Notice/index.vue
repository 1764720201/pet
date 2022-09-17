<template>
  <view class="notice">
    <view class="understand">
      <view class="t-icon t-icon-yudingxuzhi"></view>
      <span>领养须知</span>
    </view>
    <view class="agreement">
      <view class="t-icon t-icon-zulinxieyi"></view>
      <span>领养协议</span>
    </view>
    <view class="blacklist">
      <view class="t-icon t-icon-heimingdan"></view>
      <span>领养黑名单</span>
    </view>
    <view class="punch-card">
      <view class="t-icon t-icon-daka"></view>
      <span> 领养打卡</span>
    </view>
  </view>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped>
.notice {
  display: flex;
  width: 95%;
  margin-left: 2.5%;
  margin-top: 30rpx;
  justify-content: space-around;
  .understand,
  .agreement,
  .blacklist,
  .punch-card {
    display: flex;
    height: 140rpx;
    width: 140rpx;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 20rpx;
    font-weight: 900;
    font-size: 25rpx;
  }
  .understand {
    background-color: rgba(75, 154, 252, 0.1);
    color: rgb(75, 154, 252);
  }
  .agreement {
    background-color: rgba(252, 193, 101, 0.1);
    color: rgb(252, 193, 101);
  }
  .blacklist {
    background-color: rgba(255, 105, 116, 0.1);
    color: rgb(255, 105, 116);
  }
  .punch-card {
    background-color: rgba(91, 169, 238, 0.1);
    color: rgb(91, 169, 238);
  }
}
</style>

<template>
  <view class="confirm-btn" @click="$emit('click', $event)">
    <button class="confirm-issue">{{ issue }}</button>
  </view>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
const props = defineProps<{ issue: string }>();
const { issue } = toRefs(props);
</script>
<style scoped lang="scss">
.confirm-btn {
  padding-bottom: 280rpx;
  width: 100%;
  .confirm-issue {
    color: white;
    margin: 30rpx 0 0 5%;
    height: 80rpx;
    line-height: 80rpx;
    width: 90%;
    background-image: linear-gradient(
      to right,
      rgb(223, 154, 171),
      rgb(238, 120, 137)
    );
    border-radius: 40rpx;
  }
}
</style>

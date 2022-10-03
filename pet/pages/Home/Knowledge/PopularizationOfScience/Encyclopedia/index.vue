<template>
  <view class="encylopedia">
    <view class="tabs">
      <view
        class="category"
        v-for="category in categoryList"
        :key="category.value"
        @click="choose(category.value)"
        :class="{ active: currentIndex == category.value }"
      >
        {{ category.text }}
      </view>
    </view>
    <Encyclopedia :where="where"></Encyclopedia>
  </view>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Encyclopedia from "@/components/Tab/Encyclopedia/index";
import { reactive } from "vue";
const categoryList = reactive([
  {
    text: "猫猫",
    value: 0,
  },
  {
    text: "狗狗",
    value: 1,
  },
  {
    text: "爬行类",
    value: 2,
  },
  {
    text: "小宠物类",
    value: 3,
  },
]);
const where = ref("pettype==0");
const currentIndex = ref<number>(0);
const choose = (index: number) => {
  currentIndex.value = index;
  where.value = `pettype==${index}`;
};
</script>
<style scoped lang="less">
.encylopedia {
  width: 100%;
  display: flex;
  .tabs {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    text-align: center;
    width: 200rpx;
    border-right: 1px solid #ccc;
    .category {
      line-height: 100rpx;
      height: 100rpx;
    }
    .active {
      font-size: 45rpx;
      color: white;
      background-color: rgb(237, 116, 135);
    }
  }
}
</style>

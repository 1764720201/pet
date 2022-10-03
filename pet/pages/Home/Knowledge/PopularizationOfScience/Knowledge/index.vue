<template>
  <view class="knowledge">
    <view class="knowledge-title">{{ knowledge.title }}</view>
    <view class="knowledge-header">
      <view class="knowledge-header-watch">
        <uni-icons type="eye" size="18" color="#666"></uni-icons>
        {{ knowledge.watch }}
      </view>
      <view class="knowledge-header-collect" @click="collect">
        <uni-icons
          type="star"
          size="20"
          :color="ifCollect ? '#e6612c' : '#666'"
        ></uni-icons>
        <view v-if="!ifCollect">收藏</view>
        <view v-else style="color: #e6612c">已收藏</view>
      </view>
    </view>
    <view class="knowledge-main">{{ knowledge.main }}</view>
    <img :src="knowledge.image" class="knowledge-image" />
    <view
      class="knowledge-item"
      v-for="(knowledgeContent, index) in knowledge.content"
      :key="index"
    >
      <view class="knowledge-item-title">{{ knowledgeContent[0] }}</view>
      <view class="knowledge-item-content">
        {{ knowledgeContent[1] }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
type Knowledge = {
  title: string;
  watch: number;
  content: [];
  main: string;
  image: string;
  _id: string;
};
const knowledge = reactive<Knowledge>({
  title: "",
  watch: 0,
  content: [],
  main: "",
  image: "",
  _id: "",
});
const userId = uniCloud.getCurrentUserInfo().uid;
const db = uniCloud.database();
const collect = () => {
  if (!ifCollect.value) {
    uniCloud.callFunction({
      name: "collect",
      data: {
        userId: userId,
        type: 2,
        knowledgeId: knowledge._id,
      },
      success() {
        uni.showToast({
          title: "收藏成功",
        });
        getCollect();
      },
    });
  } else {
    db.collection("collect")
      .where(`knowledge_id=='${knowledge._id}'&&type==${2}`)
      .remove()
      .then(() => {
        getCollect();
      });
  }
};
const ifCollect = ref<boolean>();
const getCollect = async () => {
  await db
    .collection("collect")
    .where(`knowledge_id=='${knowledge._id}'&&type==${2}`)
    .get({
      getOne: true,
    })
    .then((res) => {
      if (res.result.data) {
        ifCollect.value = true;
      } else {
        ifCollect.value = false;
      }
    });
};
onLoad((option) => {
  db.collection("petKnowledge")
    .where(`_id=='${option.knowledgeId}'`)
    .get({
      getOne: true,
    })
    .then((res) => {
      Object.assign(knowledge, res.result.data);
    })
    .then(() => {
      getCollect();
    });
});
</script>

<style lang="scss" scoped>
.knowledge {
  color: #666;
  margin-left: 5%;
  width: 90%;
  &-title {
    color: black;
    margin-top: 40rpx;
    font-size: 40rpx;
    font-weight: 900;
  }
  &-header {
    margin-top: 40rpx;
    align-items: center;
    justify-content: space-between;
    display: flex;
    &-collect {
      font-size: 26rpx;
      display: flex;
      align-items: center;
    }
  }
  &-main {
    margin-top: 40rpx;
  }
  &-image {
    margin-top: 40rpx;
    width: 100%;
  }
  &-item {
    margin-top: 40rpx;
    &-title {
      margin-left: 10rpx;
      font-size: 40rpx;
    }
    &-content {
      margin-top: 30rpx;
    }
  }
}
</style>

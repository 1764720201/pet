<template>
  <unicloud-db
    v-slot:default="{ data, loading, error, options }"
    collection="collect"
    :where="`user_id=='${userId}'&&type==2`"
    field="knowledge_id,_id"
  >
    <view
      v-for="knowledge in data"
      :key="knowledge._id"
      @click="goKnowledge(knowledge.knowledge_id)"
    >
      <unicloud-db
        v-slot:default="{ data, loading, error, options }"
        collection="petKnowledge"
        :where="`_id=='${knowledge?.knowledge_id}'`"
        :getone="true"
      >
        <view class="knowledge">
          <img class="knowledge-image" :src="data?.image" />
          <view class="pet">
            <view class="pet-name">{{ data?.title }}</view>
            <view class="pet-variety">{{ data?.main }}</view>
          </view>
        </view>
      </unicloud-db>
    </view>
  </unicloud-db>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const watch = ref<number>();
const db = uniCloud.database();
const userId = uniCloud.getCurrentUserInfo().uid;
const goKnowledge = (knowledgeId: string) => {
  uni.navigateTo({
    url: `/pages/Home/Knowledge/PopularizationOfScience/Knowledge/index?knowledgeId=${knowledgeId}`,
    success() {
      db.collection("petKnowledge")
        .where(`_id=='${knowledgeId}'`)
        .get({
          getOne: true,
        })
        .then((res) => {
          watch.value = res.result.data.watch;
        })
        .then(async () => {
          await db
            .collection("petKnowledge")
            .where(`_id=='${knowledgeId}'`)
            .update({
              watch: watch.value! + 1,
            });
        });
    },
  });
};
</script>

<style lang="less" scoped>
.knowledge {
  display: flex;
  padding: 30rpx;
  border-bottom: 1px solid #ccc;
  .knowledge-image {
    width: 120rpx;
    height: 120rpx;
  }
  .pet {
    width: 550rpx;
    margin-left: 40rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .pet-variety {
      font-size: 26rpx;
      color: #666;
    }
  }
}
.knowledge:first-child {
  border-top: 1px solid #ccc;
}
</style>

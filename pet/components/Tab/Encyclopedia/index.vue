<template>
  <unicloud-db
    ref="udb"
    v-slot:default="{ data, pagination, loading, error, hasMore }"
    :where="where"
    collection="pet"
    field="_id,pettype,name,coverURL"
    :getone="false"
    :page-size="18"
  >
    <view v-if="error" class="error">{{ error.message }}</view>
    <view v-else class="petList">
      <view
        class="pet"
        v-for="pet in data"
        @click="goEncyclopediaDetail(pet._id)"
      >
        <img :src="pet.coverURL" class="pet-image" />
        <view class="pet-variety">{{ pet.name }}</view>
      </view>
    </view>
    <uni-load-more status="loading" v-if="loading" />
    <uni-load-more status="more" v-if="hasMore && !loading" />
    <uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
  </unicloud-db>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
const udb = ref(null);
const props = defineProps<{ where: string }>();
const { where } = toRefs(props);
const goEncyclopediaDetail = (petId: string) => {
  uni.navigateTo({
    url: `/pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/EncylopediaDetail/index?petId=${petId}`,
  });
};

onPullDownRefresh(() => {
  udb.value?.loadData(() => {
    uni.stopPullDownRefresh();
  });
});
onReachBottom(() => {
  udb.value?.loadMore();
});
</script>

<style lang="less" scoped>
.petList {
  margin-left: 200rpx;
  width: 550rpx;
  justify-content: space-evenly;
  display: flex;
  flex-wrap: wrap;
  .pet {
    margin-top: 40rpx;
    display: flex;
    width: 150rpx;
    flex-direction: column;
    align-items: center;
    &-image {
      width: 100%;
      height: 150rpx;
      border-radius: 20rpx;
    }
    &-variety {
      width: 150rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>

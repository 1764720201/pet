<template>
  <unicloud-db
    v-slot:default="{ data }"
    collection="collect"
    :where="`user_id=='${userId}'&&type==3`"
    field="pet_id,_id"
  >
    <view v-for="pet in data" :key="pet._id" @click="goPet(pet.pet_id)">
      <unicloud-db
        v-slot:default="{ data }"
        collection="pet"
        :where="`_id=='${pet?.pet_id}'`"
        :getone="true"
      >
        <view class="adopt">
          <img class="adopt-image" :src="data?.coverURL" />
          <view class="pet">
            <view class="pet-name">{{ data?.name }}</view>
            <view class="pet-variety">{{ data?.characters }}</view>
          </view>
        </view>
      </unicloud-db>
    </view>
  </unicloud-db>
</template>

<script lang="ts" setup>
const userId = uniCloud.getCurrentUserInfo().uid;
const goPet = (petId: string) => {
  uni.navigateTo({
    url: `/pages/Home/Knowledge/PopularizationOfScience/Encyclopedia/EncylopediaDetail/index?petId=${petId}`,
  });
};
</script>

<style lang="less" scoped>
.adopt {
  display: flex;
  padding: 30rpx;
  border-bottom: 1px solid #ccc;
  .adopt-image {
    width: 120rpx;
    height: 120rpx;
  }
  .pet {
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
.adopt:first-child {
  border-top: 1px solid #ccc;
}
</style>

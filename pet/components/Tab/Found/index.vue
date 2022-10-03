<template>
  <view class="found">
    <unicloud-db
      ref="udb"
      v-slot:default="{ data, pagination, loading, error, options, hasMore }"
      collection="foundPet"
      :page-size="5"
      :getone="false"
      :where="where"
      field="_id,uploadPicture,title,state,introduce"
    >
      <view v-if="error" class="error">{{ error.message }}</view>
      <view v-else v-for="found in data" :key="found._id" class="found-list">
        <view class="found-item">
          <image
            :src="found.uploadPicture[0].path"
            class="found-item-image"
            mode="aspectFill"
          ></image>
          <view class="found-item-content">
            <view class="found-title">{{ found.title }}</view>
            <view class="found-introduce">
              {{ found.introduce }}
            </view>
          </view>
        </view>
        <view class="found-operate">
          <view class="polish">擦亮</view>
          <view class="compile" @click="goFoundPet(found._id)"> 编辑 </view>
          <uni-icons
            @click="more(found._id)"
            type="more-filled"
            size="30"
            class="more"
            color="#b4b4b4"
          ></uni-icons>
        </view>
      </view>
      <uni-load-more status="loading" v-if="loading" />
      <uni-load-more status="more" v-if="hasMore && !loading" />
      <uni-load-more v-else-if="!hasMore && !loading" status="noMore" />
    </unicloud-db>
    <tui-actionsheet
      :show="showActionSheet"
      :item-list="itemList"
      @cancel="cancel"
      @click="choose"
    ></tui-actionsheet>
  </view>
</template>

<script setup lang="ts">
import { toRefs, ref } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { reactive } from "vue";
const udb = ref(null);
const foundId = ref<string>();
onPullDownRefresh(() => {
  udb.value.loadData(() => {
    uni.stopPullDownRefresh();
  });
});
onReachBottom(() => {
  udb.value.loadMore();
});
const cancel = () => {
  showActionSheet.value = false;
};
const choose = (e: { index: number }) => {
  switch (e.index) {
    case 0:
      udb.value.remove(foundId.value, {
        confirmContent: "你确定要取消寻回宠物吗",
      });
      break;
    case 1:
      udb.value.update(
        foundId.value,
        {
          state: "已找回",
        },
        {
          toastTitle: "已成功找回",
          success() {
            udb.value.refresh();
            showActionSheet.value = false;
          },
        }
      );
      break;
    case 2:
      uni.navigateTo({
        url: `/pages/Home/Enlightenment/index?id=${foundId.value}`,
      });
      break;
  }
};
const goFoundPet = (id: string) => {
  uni.navigateTo({
    url: `/pages/Issue/FoundPet/index?id=${id}`,
  });
};
const props = defineProps<{ where: string }>();
const { where } = toRefs(props);
const showActionSheet = ref<boolean>(false);
const itemList = reactive([
  { text: "放弃", color: "#2B2B2B" },
  { text: "已找回", color: "#2B2B2B" },
  { text: "去分享", color: "#ea7587" },
]);
const more = (id: string) => {
  foundId.value = id;
  showActionSheet.value = true;
};
</script>

<style scoped lang="scss">
.found {
  margin-left: 3%;
  width: 94%;
  &-list {
    border-radius: 20rpx;
    margin-top: 40rpx;
    padding: 20rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  }
  &-item {
    display: flex;
    &-image {
      width: 300rpx;
      height: 200rpx;
      border-radius: 30rpx;
    }
    &-content {
      margin-left: 40rpx;
      width: 40%;
      .found-title {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .found-introduce {
        margin-top: 40rpx;
        color: #666;
        font-size: 25rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
  &-operate {
    margin-top: 40rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .polish,
    .compile,
    .more {
      font-size: 27rpx;
      margin-right: 30rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60rpx;
      width: 100rpx;
      border-radius: 40rpx;
      border: 1px solid #666;
    }
    .polish {
      color: #666;
      background-color: #f0f0f0;
    }
    .compile {
      color: white;
      border: 1px solid pink;
      background-color: rgb(234, 117, 135);
    }
  }
}
</style>

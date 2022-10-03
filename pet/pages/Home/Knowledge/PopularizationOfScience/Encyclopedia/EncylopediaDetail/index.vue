<template>
  <view class="petDetail">
    <img :src="petDetail.coverURL" class="petDetail-image" />
    <view class="petDetail-variety">
      {{ petDetail.name }}
      <view class="collect" @click="collect">
        <uni-icons
          type="star"
          size="15"
          :color="ifCollect ? 'red' : '#ccc'"
        ></uni-icons>
        收藏
      </view>
    </view>
    <view class="petDetail-variety-english">
      英文名:{{ petDetail.engName }}
    </view>
    <view class="petDetail-info">
      <view class="characters">性格:{{ petDetail.characters }}</view>
      <view class="nation">原产地:{{ petDetail.nation }}</view>
      <view class="easy-of-disease">
        易得病:{{ petDetail.easyOfDisease }}
      </view>
    </view>
    <view class="petDetail-body">
      <view class="price">价格:{{ petDetail.price }}</view>
      <view class="life">寿命:{{ petDetail.life }}</view>
    </view>
  </view>
  <view class="tab">
    <lgd-tab
      :tabValue="tabValue"
      :tabIndex="tabIndex"
      textColor="#ec8a9e "
      underlineColor="#ec8a9e"
      @getIndex="getIndex"
    />
  </view>

  <PetDetail :petId="petDetail._id" :field="field"></PetDetail>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import PetDetail from "@/components/Tab/Encyclopedia/PetDetail.vue";
import { reactive, ref, watch } from "vue";

const tabValue = ["描述", "特点", "性格特征", "核心信息", "喂养要点"];
const tabIndex = ref(0);
const field = ref<string>("");
const getIndex = (index: number) => {
  switch (index) {
    case 0:
      field.value = "desc";
      break;
    case 1:
      field.value = "feature";
      break;
    case 2:
      field.value = "characterFeature";
      break;
    case 3:
      field.value = "careKnowledge";
      break;
    case 4:
      field.value = "feedPoints";
      break;
  }
};
type PetDetail = {
  _id: string;
  pettype: number;
  name: string;
  engName: string;
  characters: string;
  nation: string;
  easyOfDisease: string;
  life: string;
  price: string;
  desc: string;
  feature: string;
  characterFeature: string;
  careKnowledge: string;
  feedPoints: string;
  url: string;
  coverURL: string;
};
const petDetail = reactive<PetDetail>({
  _id: "",
  pettype: 0,
  name: "",
  engName: "",
  characters: "",
  nation: "",
  easyOfDisease: "",
  life: "",
  price: "",
  desc: "",
  feature: "",
  characterFeature: "",
  careKnowledge: "",
  feedPoints: "",
  url: "",
  coverURL: "",
});
const db = uniCloud.database();
const userId = uniCloud.getCurrentUserInfo().uid;
const ifCollect = ref<boolean>();
const collect = () => {
  if (!ifCollect.value) {
    uniCloud
      .callFunction({
        name: "collect",
        data: {
          type: 3,
          petId: petDetail._id,
          userId: userId,
        },
      })
      .then(() => {
        checkCollect();
        uni.showToast({
          title: "收藏成功",
        });
      });
  } else {
    db.collection("collect")
      .where(`user_id=='${userId}'&&pet_id=='${petDetail._id}'`)
      .remove();
    checkCollect();
  }
};
const checkCollect = () => {
  db.collection("collect")
    .where(`user_id=='${userId}'&&pet_id=='${petDetail._id}'`)
    .get()
    .then((res) => {
      if (res.result.data[0]) {
        ifCollect.value = true;
      } else {
        ifCollect.value = false;
      }
    });
};
watch(
  () => petDetail._id,
  () => {
    checkCollect();
  }
);
onLoad((option) => {
  db.collection("pet")
    .where(`_id=='${option.petId}'`)
    .get()
    .then((res) => {
      Object.assign(petDetail, res.result.data[0]);
    });
});
</script>

<style lang="less" scoped>
.tab {
  margin-top: 50rpx;
}
.petDetail {
  margin-left: 5%;
  width: 90%;
  &-image {
    margin-left: -5%;
    width: 110%;
  }
  &-variety {
    margin-top: 30rpx;
    font-size: 40rpx;
    font-weight: 900;
    display: flex;
    justify-content: space-between;
    .collect {
      font-weight: normal;
      padding: 8rpx 40rpx;
      border-radius: 30rpx;
      border: 1px solid #ccc;
      font-size: 20rpx;
      display: flex;
      align-items: center;
    }
  }
  &-variety-english {
    margin-top: 20rpx;
    color: #666;
  }
  &-info {
    border-radius: 15rpx;
    margin-top: 20rpx;
    height: 250rpx;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 20rpx;
    color: rgb(224, 140, 154);
    background-color: rgba(224, 140, 154, 0.1);
  }
  &-body {
    border-radius: 20rpx;
    margin-top: 50rpx;

    padding: 20rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
  }
}
</style>

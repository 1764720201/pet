<template>
  <view class="choose">
    <view @click="chooseCity" class="city-choose">
      <view class="t-icon t-icon-weizhi"></view>
      <span>{{ currentCity }}</span>
      <view class="t-icon t-icon-xiala"></view>
    </view>
    <view class="star-choose">
      <picker @change="changeStar" :range="starList">
        {{ starIndex }}
      </picker>
      <view class="t-icon t-icon-xiala"></view>
    </view>
    <view class="gender-choose">
      <picker @change="changeGender" :range="genderList">
        {{ genderIndex }}
      </picker>
      <view class="t-icon t-icon-xiala"></view>
    </view>
    <view class="age-choose">
      <picker @change="changeAge" :range="ageList">{{ ageIndex }}</picker>
      <view class="t-icon t-icon-xiala"></view>
    </view>
  </view>
  <PetList :where="where.filter((v: string) => v).join('&&')"></PetList>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import PetList from "@/components/PetList/index.vue";

const where = ref<string[]>([]);
const instance = getCurrentInstance();
instance?.proxy?.$Bus.on("search", (res) => {
  if (res) {
    where.value[0] = `pet_name=='${res}'||city=='${res}'||gender=='${res}'||star=='${res}'||variety=='${res}'`;
  } else {
    where.value = [];
    currentCity.value = "地区";
    starIndex.value = "星球";
    genderIndex.value = "性别";
    ageIndex.value = "年龄";
  }
});
const currentCity = ref("地区");
const starList = ["全部", "汪星人", "喵星人", "其它"];
const ageList = [
  "全部",
  "不满1个月",
  "1个月",
  "2个月",
  "3-6个月",
  "6个月-1岁",
  "1岁",
  "2岁",
  "3岁及以上",
];
const genderList = ["全部", "男生", "女生"];
const starIndex = ref<string>("星球");
const genderIndex = ref<string>("性别");
const ageIndex = ref<string>("年龄");
type Choose = {
  detail: {
    value: string;
  };
};
const changeStar = (e: Choose) => {
  starIndex.value = starList[e.detail.value];
  if (starIndex.value == "全部") {
    where.value[1] = "";
  } else {
    where.value[1] = `star=='${starIndex.value}'`;
  }
};
const changeGender = (e: Choose) => {
  genderIndex.value = genderList[e.detail.value];
  if (genderIndex.value == "全部") {
    where.value[2] = "";
  } else {
    where.value[2] = `gender=='${genderIndex.value}'`;
  }
};
const changeAge = (e: Choose) => {
  ageIndex.value = ageList[e.detail.value];
  if (ageIndex.value == "全部") {
    where.value[3] = "";
  } else {
    where.value[3] = `age=='${ageIndex.value}'`;
  }
};
onLoad(async (option) => {
  if (option.cityName) {
    currentCity.value = option.cityName;
    where.value[0] = `city=='${option.cityName}'`;
  } else {
    where.value[0] = "";
  }
});
const chooseCity = () => {
  uni.navigateTo({
    url: "/components/city-select/City/index",
  });
};
</script>

<style lang="less" scoped>
.t-icon-xiala {
  width: 30rpx;
  height: 30rpx;
  margin-left: 15rpx;
}
.t-icon-weizhi {
  margin-right: 5rpx;
  width: 30rpx;
  height: 30rpx;
}
.navigate {
  position: fixed;
  bottom: 80rpx;
  right: 50rpx;
}
:deep(.uni-select) {
  border: none !important;
}
.choose {
  margin-top: 50rpx;
  width: 90%;
  margin-left: 5%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 25rpx;
  font-weight: 700;
  .star-choose,
  .city-choose,
  .gender-choose,
  .age-choose {
    display: flex;
    align-items: center;
  }
}

:deep(.uni-select) {
  border: white;
  border-bottom: white;
}
</style>

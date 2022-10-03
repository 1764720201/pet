<template>
  <view class="pet-introduce">{{ petIntroduce[field] }}</view>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch } from "vue";
const props = defineProps<{ petId: string; field: string }>();
const { petId, field } = toRefs(props);
const db = uniCloud.database();
const petIntroduce = reactive({});
watch(
  () => [field.value, petId.value],
  () => {
    db.collection("pet")
      .where(`_id=='${petId.value}'`)
      .field(field.value)
      .get()
      .then((res) => {
        Object.assign(petIntroduce, res.result.data[0]);
      });
  }
);
</script>

<style lang="less" scoped>
.pet-introduce {
  margin-left: 5%;
  width: 90%;
  text-indent: 2rem;
}
</style>

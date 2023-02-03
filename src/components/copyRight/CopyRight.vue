<template>
  <div class="copyRight">
    <h2>Copyright ({{ gitRight }}) {{ time }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const gitRight = ref<string>("");
const time = ref<string>("2023-02-02 01:44:03");

gitRight.value = GLOBAL_VAR.GIT_COMMIT_ID;
// console.log(GLOBAL_VAR);
console.log(time)
watch(gitRight, () => {
  time.value = getNowTime();
  console.log('first')
});

function getNowTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var time =
    year +
    "-" +
    addZero(month) +
    "-" +
    addZero(day) +
    " " +
    addZero(hour) +
    ":" +
    addZero(minute) +
    ":" +
    addZero(second);
  return time;
}
function addZero(s) {
  return s < 10 ? "0" + s : s;
}
</script>

<style lang="less" scoped>
.copyRight {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%);
  color: dimgray;
  font-size: 12px;
}
</style>

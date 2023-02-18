<template>
  <div class="copyRight">
    <h2>Copyright © {{ gitTime }} {{ gitRight }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const gitRight = ref<string>("");
const gitTime = ref<string>("");

gitRight.value = GLOBAL_VAR.GIT_COMMIT_ID;
gitTime.value = GLOBAL_VAR.GIT_COMMIT_TIME;

</script>

<style lang="less" scoped>
.copyRight {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  color: dimgray;
  font-size: 12px;
}
</style>

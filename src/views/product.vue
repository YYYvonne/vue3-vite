<template>
  <div class="pro">
    <h2>实验室</h2>
    <span>{{ state.hello }}</span>
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
  import { useStorage } from '@vueuse/core';

  const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' });
  const text = JSON.stringify(state.value);
  console.log('%c [ text ]-14', 'font-size:13px; background:pink; color:#bf2c9f;', text, state.value);
  // state.value = null;
</script>

<style lang="less" scoped></style>

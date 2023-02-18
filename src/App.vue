<template>
  <div class="wrapper">
    <tab-bar />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <copy-right />
  </div>
</template>

<script setup lang="ts">
import CopyRight from "@/components/copyRight/CopyRight.vue";
import TabBar from "@/components/tabBar/TabBar.vue";
import usePanelStore from "./stores/panelData";

const panelStore = usePanelStore();
panelStore.getPanelLib({});
</script>

<style lang="less" scoped>
.wrapper {
  margin-top: 10px;
}
</style>
<template>
    <div class="tabBar">
      <a-tabs v-model:activeKey="activeKey" @change="changeRoute">
        <a-tab-pane v-for="(item, index) in tabBarData" :tab="item.tab" :key="index">
        </a-tab-pane>
      </a-tabs>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from "vue";
  import { useRouter } from "vue-router";
  
  const tabBarData = ref([
    {
      tab: "面板管理",
      path: "/PanelCommand",
    },
    {
      tab: "数据管理",
      path: "/DataManagement",
    },
  ]);
  const activeKey = ref();
  
  //tabBar路由索引
  const router = useRouter();
  function changeRoute(activeIndex: any) {
    router.push({
      path: tabBarData.value[activeIndex].path,
    });
  }
  watch(
    () => router.currentRoute.value,
    (newRoute: any) => {
      const index = tabBarData.value.findIndex(
        (item) => item.path === newRoute.path
      );
      if (index !== -1) {
        return (activeKey.value = index);
      }
    }
  );
  </script>
  
  <style lang="less" scoped>
  .tabBar {
    margin-left: 1%;
  
    :deep(.ant-tabs-tab) {
      font-size: 20px;
      font-weight: 600;
    }
  }
  </style>
  
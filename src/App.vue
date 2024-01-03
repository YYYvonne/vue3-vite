<template>
  <a-layout style="height: 100vh">
    <a-layout-header>
      <template v-for="route in routes">
        <router-link class="router" v-if="route.path !== '/'" active-class="active" :to="route.path">
          {{ route.name }}
        </router-link>
      </template>
    </a-layout-header>

    <a-layout-content style="background-color: #fff">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </a-layout-content>

    <a-layout-footer> this is a footer </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
  import { routes } from '@/router/index';
  // const { COMMIT_ID, COMMIT_TIMES, BRANCH, COMMIT_TIME } = GLOBAL_VAR;
</script>

<style scoped>
  .router {
    font-size: 20px;
    font-weight: bolder;
    display: inline-block;
    padding: 0 20px;
  }
  .active {
    background-color: #1890ff;
  }
</style>

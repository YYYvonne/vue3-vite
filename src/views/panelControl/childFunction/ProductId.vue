<template>
  <div class="productId">
    <!-- 搜索框 -->
    <div class="searchBar">
      <a-input-search
        placeholder="请输入产品ID"
        enter-button
        allow-clear
        style="width: 90%"
        @search="onSearch"
        @change="inputChange"
      />
    </div>

    <!-- 产品ID -->
    <template v-for="(productId, index) in idFilter" :key="productId">
      <div
        class="productIdMap"
        :class="{ active: index === currentIndex }"
        @click="idClick(productId, index)"
      >
        {{ productId }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import usePanelStore from "@/stores/panelData";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const id = ref<any>([]);
const idFilter = ref([]);
const currentIndex = ref<number>(0);
const emits = defineEmits(["getProductId"]);

//对idmap数据进行处理
const panelStore = usePanelStore();
const { panel_lib } = storeToRefs(panelStore);
panelStore.getPanel;
let { idmap } = panel_lib.value
if (idmap) {
  const keys = Object.keys(idmap);
  id.value = [...keys];
  idFilter.value = id.value;
}

//搜索框搜索功能
function onSearch(searchValue: string) {
  if (searchValue)
    idFilter.value = id.value.filter((item: string) =>
      item.includes(searchValue.toLocaleUpperCase())
    );
}
function inputChange(value: any) {
  if (value.data === null || value.data === undefined) {
    idFilter.value = id.value;
  } else {
    idFilter.value = id.value.filter((item: string) =>
      item.includes(value.data.toLocaleUpperCase())
    );
  }
}

//处理productId点击事件
function idClick(iId: string, index: number) {
  currentIndex.value = index;
  emits("getProductId", iId);
}
</script>
<style lang="less" scoped>
.productId {
  width: 240px;
  height: 75%;
  border: 1px solid var(--border-color);
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 2%;

  .searchBar {
    position: sticky;
    top: -1px;
    height: 7%;
    width: 100%;
    margin-left: 5%;
    margin-top: 7%;
    margin-bottom: -15px;

    .ant-btn-primary {
      border-color: var(--primary-color);
      background-color: var(--primary-color);
    }

    .ant-input-suffix {
      margin-right: -15px;
    }
  }

  .productIdMap {
    height: 35px;
    font-size: 14px;
    margin-top: 10px;
    padding-left: 10px;
    padding-top: 6px;
  }

  .active {
    transition: background-color 0.3s ease;
    background-color: var(--primary-color);
  }
}
</style>

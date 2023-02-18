<template>
  <div class="panelControl">
    <produc-id @get-product-id="getId" />
    <middle-function :productId="productId ? productId : ''" :panelId="panelId ? panelId : ''"
      :panelArray="panelArray ? panelArray : []" />
    <panel-component />
  </div>
</template>

<script setup lang="ts">
import ProducId from "@/views/panelCommand/childFunction/ProductId.vue";
import MiddleFunction from "@/views/panelCommand/childFunction/MiddleFunction.vue";
import PanelComponent from "@/views/panelCommand/childFunction/PanelComponent.vue";
import usePanelStore from "@/stores/panelData";
import { ref } from "vue";
import deepObj from "@/utils/getDeepObject";

const productId = ref<string>("MAC3LC - 8CB16GS4XS - V2");
const panelId = ref<string>("RTL_8CB20GS_1");
const panelArray = ref([
  [
    { hwtype: "None" },
    { hwtype: "None" },
    { hwtype: "SFP", id: 27 },
    { hwtype: "SFP", id: 25 },
    { hwtype: "None" },
    { hwtype: "SFP", id: 23 },
    { hwtype: "SFP", id: 21 },
    { hwtype: "SFP", id: 19 },
    { hwtype: "SFP", id: 17 },
    { hwtype: "None" },
    { hwtype: "SFP", id: 15 },
    { hwtype: "SFP", id: 13 },
    { hwtype: "SFP", id: 11 },
    { hwtype: "SFP", id: 9 },
    { hwtype: "None" },
    { hwtype: "SFP", id: 7 },
    { hwtype: "SFP", id: 5 },
    { hwtype: "SFP", id: 3 },
    { hwtype: "SFP", id: 1 },
    { hwtype: "None" },
    { hwtype: "RJ45", id: 7 },
    { hwtype: "RJ45", id: 5 },
    { hwtype: "RJ45", id: 3 },
    { hwtype: "RJ45", id: 1 },
  ],
  [
    { hwtype: "None" },
    { hwtype: "None" },
    { hwtype: "SFP", id: 28 },
    { hwtype: "SFP", id: 26 },
    { hwtype: "None" },
    { hwtype: "SFP", id: 24 },
    { hwtype: "SFP", id: 22 },
    { hwtype: "SFP", id: 20 },
    { hwtype: "SFP", id: 18 },
    { hwtype: "None" },
    { hwtype: "SFP", id: 16 },
    { hwtype: "SFP", id: 14 },
    { hwtype: "SFP", id: 12 },
    { hwtype: "SFP", id: 10 },
    { hwtype: "None" },
    { hwtype: "SFP", id: 8 },
    { hwtype: "SFP", id: 6 },
    { hwtype: "SFP", id: 4 },
    { hwtype: "SFP", id: 2 },
    { hwtype: "None" },
    { hwtype: "RJ45", id: 8 },
    { hwtype: "RJ45", id: 6 },
    { hwtype: "RJ45", id: 4 },
    { hwtype: "RJ45", id: 2 },
  ],
]);

const panelStore = usePanelStore();
function getId(id: string) {
  productId.value = id;
  panelId.value = deepObj(panelStore.panel_lib, id);
  panelArray.value = deepObj(panelStore.panel_lib, panelId.value);
}
</script>

<style lang="less" scoped>
.panelControl {
  display: flex;
  justify-content: space-between;
  height: 100vh;
}
</style>
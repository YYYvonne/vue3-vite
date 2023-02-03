<template>
  <div class="middleFunction">
    <!-- 面板预览区 -->
    <div class="panelPreview">
      <div class="panel">
        <table>
          <tbody>
            <tr v-for="(row, index) in props.panelArray" :key="index">
              <td v-for="(port, index2) in row" :key="index2">
                <div class="text" v-if="index % 2 === 0">{{ port["id"] }}</div>
                <port-icon :port="{ ...port as any, pos: index % 2 === 0 ? 'upside' : 'downside' }" />
                <div class="text" v-if="index % 2 === 1">{{ port["id"] }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 面板标题区 -->
    <div class="panelTitle">
      <div class="type">
        <span class="typeTitle">型号：</span>
        <div class="editText" v-if="appear">{{ props.productId }}</div>
        <div class="editText" v-else>
          <a-input v-model:value="propductValue" @pressEnter="editPlusEnter" placeholder="请输入产品ID"></a-input>
        </div>
        <div class="button">
          <a class="icon" href="javascript:" @click="handlePlus">
            <plus-outlined :style="{ fontSize: '18px' }" />
          </a>
          <a class="icon" href="javascript:" @click="handleDelete">
            <close-outlined :style="{ fontSize: '18px' }" /></a>
          <a class="icon" href="javascript:" @click="handleEdit">
            <edit-outlined :style="{ fontSize: '18px' }" /></a>
        </div>
      </div>
      <div class="type">
        <span class="typeTitle">面板：</span>
        <div class="editText" v-if="appear">
          {{ props.panelId ? props.panelId : "" }}
        </div>
        <div class="editText" v-else>
          <a-input v-model:value="panelValue" @pressEnter="editPlusEnter" placeholder="请输入面板ID"></a-input>
        </div>
      </div>
    </div>
    <!-- 面板数据区 -->
    <div class="panelData">
      <template v-for="(item, index) in props.panelArray" :key="index">
        <div class="data" v-for="panelRow in item">
          {{ panelRow }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import PortIcon from "@/components/portIcon/PortIcon.vue";
import usePanelStore from "@/stores/panelData";
import deepObj from "@/utils/getDeepObject"
import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const props = defineProps({
  productId: { type: String, required: true },
  panelId: { type: String, required: true },
  panelArray: { type: Array, required: true },
});

const propductValue = ref<string>("");
const panelValue = ref<string>("");
const appear = ref<boolean>(true);
const idmapItem = ref({});

const panelStore = usePanelStore();
const { panel_lib } = storeToRefs(panelStore);
let idmap = deepObj(panel_lib.value, "idmap");

//处理新增事件
function handlePlus() {
  appear.value = false;
  propductValue.value = "";
  panelValue.value = ""
}
//处理input事件
function editPlusEnter(e: any) {
  appear.value = true;
  // console.log(propductValue.value);
  if (propductValue.value && panelValue.value) {
    let propductItem = propductValue.value;
    let panelItem = panelValue.value;
    idmapItem.value[propductItem] = panelItem;
    console.log(idmapItem);
    // if (idmap) Object.assign(idmap, idmapItem);
    // console.log(idmap);
  } else {
    window.alert("请同时添加产品ID与面板ID");
  }
  propductValue.value = "";
  panelValue.value = "";
}
//处理删除事件
function handleDelete() {
  appear.value = true
  // let idmap2 = omit(idmap, props.productId);
  delete idmap[props.productId]
}
//处理编辑事件
function handleEdit() {
  appear.value = false;
  propductValue.value = props.productId;
  panelValue.value = props.panelId;
}

</script>
<style lang="less" scoped>
.middleFunction {
  flex: 1;
  height: 75%;

  .panelPreview {
    height: 30%;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;

    .panel {
      height: auto;
    }

    .text {
      text-align: center;
    }
  }

  .panelTitle {
    height: 15%;
    display: flex;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;

    .type {
      height: 40%;
      display: flex;
      align-items: center;

      .typeTitle {
        margin-left: 20px;
        font-weight: 600;
      }

      .ant-input {
        width: 100%;
      }

      .button {
        width: 20%;
        margin-left: 10px;
        padding-top: 3px;

        .icon {
          margin-right: 10px;
        }
      }
    }
  }

  .panelData {
    height: 40%;
    border-bottom: 1px solid var(--border-color);
    text-align: center;
    padding: 10px 15px 0 15px;
    overflow-y: auto;
  }
}
</style>

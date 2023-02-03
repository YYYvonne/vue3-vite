<template>
    <div class="tabBar">
        <a-tabs v-model:activeKey="activeKey" @change="changeRoute">
            <template v-for="(item, index) in tabBarData" :key="index">
                <a-tab-pane :tab=item.tab></a-tab-pane>
            </template>
        </a-tabs>
    </div>
</template>

<script setup lang="ts">
import usePanelStore from '@/stores/panelData';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const tabBarData = ref([
    {
        tab: '数据管理',
        path: '/DataManagement'
    },
    {
        tab: '面板管理',
        path: '/PanelControl'
    }
])
const activeKey = ref(0)

const panelStore = usePanelStore()
const { panel_lib } = storeToRefs(panelStore)

console.log(panel_lib.value === undefined)
//tabBar路由索引
const router = useRouter()
function changeRoute(index: any) {
    if (panel_lib.value === undefined) {
        router.push({
            path: '/DataManagement'
        })
        window.alert('请上传文件')
        activeKey.value = 0
    } else {
        router.push({
            path: tabBarData.value[index].path
        })
    }
}

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
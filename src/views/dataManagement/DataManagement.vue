<template>
  <div class="dataManagement">
    <!-- 拖拽导入数据 -->
    <div class="loadTitle">导入数据：</div>
    <div class="dragger">
      <a-upload-dragger
        accept=".json, application/JSON"
        :customRequest="upload_json"
        :maxCount="1"
        v-model:file-list="fileList"
      >
        <p class="ant-upload-drag-icon"><upload-outlined /></p>
        <p>Click or drag JSON file to this area to upload</p>
        <p>The file must be JSON file.</p>
      </a-upload-dragger>
    </div>

    <!-- 导出数据 -->
    <div class="download">
      <div class="loadTitle">导入数据：</div>
      <a-button @click="down_json">
        <download-outlined />
        Download JSON
      </a-button>
    </div>

    <!-- 展示上传文件数据 -->
    <div class="preview" v-if="Object.keys(root).length">
      <pre>{{ JSON.stringify(root, null, 2) }} </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { custom_upload, str2file } from '@/utils/strUtils';
  import { ref, watch } from 'vue';
  import { UploadOutlined, DownloadOutlined } from '@ant-design/icons-vue';
  import usePanelStore from '@/stores/panelData';

  const root = ref({});
  const jsonExt = '.json';
  const indentSpace = 4;
  const fileList = ref([]);

  //导入导出文件处理，获取文件数据
  function do_file_combine(file: any, parent: any) {
    if (file.path.slice(-jsonExt.length) !== jsonExt) return;
    const p = file.path.slice(0, -jsonExt.length);
    for (const d of p.split('/')) {
      if (!parent[d]) parent[d] = {};
      parent = parent[d];
    }
    Object.assign(parent, file.data);
  }
  const upload_json = async (info: any) =>
    await custom_upload(info, (res: any) =>
      do_file_combine(
        { path: info.file.name, data: JSON.parse(res) },
        root.value,
      ),
    );
  const down_json = () =>
    Object.keys(root.value).length &&
    str2file(
      JSON.stringify(root.value[Object.keys(root.value)[0]], null, indentSpace),
      Object.keys(root.value)[0] + jsonExt,
    );
  //发送数据到store获取panel数据
  const panelStore = usePanelStore();
  watch(
    root,
    () => {
      panelStore.getPanelLib(root.value);
    },
    { deep: true },
  );
</script>

<style lang="less" scoped>
  .dataManagement {
    margin-left: 1%;
    margin-right: 1%;
    height: 100%;

    .loadTitle {
      font-size: 16px;
      font-weight: 600;
      display: inline-block;
      margin-right: 5px;
    }

    .dragger {
      margin-top: 5px;
      margin-bottom: 50px;
    }

    .preview {
      height: 50%;
      width: 100%;
      margin-top: 15px;
      position: absolute;
      overflow-y: auto;

      pre {
        margin-left: 50%;
        transform: translate(-50%);
      }
    }
  }
</style>

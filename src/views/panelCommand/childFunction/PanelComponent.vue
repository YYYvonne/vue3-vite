<template>
  <div class="panelComponent">
    <!-- svg拖拽区 -->
    <span class="title">拖拽区:</span>
    <div class="port">
      <table cellpadding="5">
        <tbody>
          <tr ref="portDrag">
            <td
              :data-id="'item' + index"
              v-for="(port, index) in portData"
              :key="index"
            >
              <div v-if="port.pos == 'upside'">{{ port.id }}</div>
              <port-icon :port="port"></port-icon>
              <div v-if="port.pos == 'downside'">{{ port.id }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 回收站区 -->
    <div class="delete">
      <div class="recycle">
        <div class="zone" ref="deleteDrag"></div>
        <span>You can recycle the panel preview data</span>
      </div>
      <span>回收站</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PortIcon from '@/components/portIcon/PortIcon.vue';
  import { ref, onMounted } from 'vue';
  import Sortable from 'sortablejs';

  const portData = ref([
    { hwtype: 'SFP', id: 1, pos: 'upside' },
    { hwtype: 'SFP', id: 2, pos: 'downside' },
    { hwtype: 'RJ45', id: 3, pos: 'upside' },
    { hwtype: 'RJ45', id: 4, pos: 'downside' },
  ]);
  const portDrag = ref();
  const deleteDrag = ref();

  onMounted(() => {
    handleDrag(portDrag.value);
    handleDeleteDrag(deleteDrag.value);
  });

  function handleDrag(portDrag) {
    Sortable.create(portDrag, {
      animation: 200,
      group: {
        name: 'portAdd',
        pull: 'clone',
        put: false,
      },
      sort: false,
      forceFallback: true,
      removeCloneOnHide: true,
    });
  }

  function handleDeleteDrag(deleteDrag) {
    Sortable.create(deleteDrag, {
      group: {
        name: 'portDelete',
        put: ['portChange0', 'portChange1'],
      },
      sort: false,
      forceFallback: true,
      onAdd: function (evt) {
        evt.item.parentNode.removeChild(evt.item);
      },
    });
  }
</script>

<style lang="less" scoped>
  .panelComponent {
    width: 18%;
    height: 75%;
    border: 1px solid var(--border-color);
    padding: 10px 15px 0;

    .title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .port {
      display: flex;
      align-items: center;
      justify-content: center;

      table {
        text-align: center;
        margin-top: 20px;
      }
    }

    .delete {
      margin: 50px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .recycle {
        border: 1px dashed black;
        height: 200px;
        width: 90%;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 8px;

        .zone {
          border: 1px dashed var(--border-color);
          height: 40%;
          width: 100%;
          margin-top: 10px;
        }

        span {
          margin-top: 10px;
          text-align: center;
          color: rgba(0, 0, 0, 0.65);
          font-size: 16px;
        }
      }

      span {
        font-weight: 600;
      }
    }
  }
</style>

import { defineStore } from 'pinia';
import { getJsonDataApi } from '@/service/GetJsonData';

const usePanelStore = defineStore('panel', {
  state: () => ({
    panel_lib: <any>{},
  }),
  actions: {
    async getPanelLib(payload: any) {
      // console.log("pinia", payload)
      if (JSON.stringify(payload) === '{}') {
        const res = await getJsonDataApi();
        this.panel_lib = res;
        // console.log('pinia2', this.panel_lib)
      } else {
        // console.log("this step over", payload)
        this.panel_lib = payload;
      }
    },
    persist: {
      enabled: true, // 开启数据缓存
    },
  },
});

export default usePanelStore;

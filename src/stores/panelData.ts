import { defineStore } from "pinia";

const usePanelStore = defineStore("panel", {
    state: () => ({
        jsonData: <any>{},
        panel_lib: <any>{},
    }),

    getters: {
        getPanel(state) {
            state.panel_lib = state.jsonData.panel_lib
        },
    }
});

export default usePanelStore; 
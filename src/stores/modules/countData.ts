import { defineStore } from "pinia";

const useCountStore = defineStore("count", {
    state: () => ({
        count: 0
    }),

    getters: {
        getPanel(state) {
            state.count++
        },
    }
});

export default useCountStore; 
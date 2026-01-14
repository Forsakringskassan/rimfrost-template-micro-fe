import { defineStore } from "pinia";

export const useProductStore = defineStore("ExempelStore", {
  state: () => ({
    count: 0,
  }),
  actions: {
  increaseCount() {
    this.count += 1;
  }
  },
});

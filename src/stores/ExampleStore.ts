import { defineStore } from "pinia";
import { ref } from "vue";

interface TaskData {
  [key: string]: unknown;
}

export const useProductStore = defineStore('ExampleStore', () => {
  const count = ref(0);
  // Update with types as needed
  const task = ref<TaskData | null>(null);
  const loading = ref(false);
  const uppgiftsbeskrivning = ref("");

  function increaseCount() {
    count.value += 1;
  }

  function setTask(newTask: any) {
    task.value = newTask;
  }

  function setDescriptionLoading(isLoading: boolean) {
    loading.value = isLoading;
  }

  function setUppgiftsbeskrivning(beskrivning: string) {
    uppgiftsbeskrivning.value = beskrivning;
  }

  return {
    count,
    task,
    loading,
    uppgiftsbeskrivning,
    setDescriptionLoading,
    setUppgiftsbeskrivning,
    increaseCount,
    setTask,
  };
})

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useProductStore } from '../stores/ExempelStore';
  import { FButton } from '@fkui/vue';

  const productStore = useProductStore();
  const count = computed(() => productStore.count);

  const toDoTitle = ref('');
  const loading = ref(false);
  const error = ref('');

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  async function fetchTestData() {
    loading.value = true;
    error.value = '';

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const responseData = await response.json();
      toDoTitle.value = responseData.title
    } catch (err) {
      error.value = 'Ett fel uppstod vid hämtning av datan';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <div class="container">
    <div>
      <p>Räknare: {{ count }}</p>
      <p>|</p>
      <p>Att göra: {{ capitalizeFirstLetter(toDoTitle) }}</p>
    </div>
    <div>
      <FButton @click="productStore.increaseCount">Öka räknare</FButton>
      <FButton @click="fetchTestData" :disabled="loading">Hämta Att-göra</FButton>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    display: flex;
    gap: 0.75rem;
  }
}
</style>

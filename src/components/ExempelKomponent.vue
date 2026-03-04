<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useProductStore } from '../stores/ExempelStore';
  import { FButton } from '@fkui/vue';

  const productStore = useProductStore();
  const count = computed(() => productStore.count);

  const toDoTitle = ref('');
  const loading = ref(false);
  const error = ref('');
  // Stores the cat fact text retrieved from the meowfacts API
  const catFact = ref('');
  // Loading state for the cat fact fetch operation
  const catLoading = ref(false);

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

   // Fetches a random cat fact from the API
  async function fetchCatFact() {
    catLoading.value = true;
    error.value = '';

    try {
      // Use the BFF URL from environment variables, with a fallback to localhost
      const bffUrl = import.meta.env.VITE_BFF_URL || 'http://localhost:9002';
      const response = await fetch(`${bffUrl}/api/cat-fact`);
      if (!response.ok) {
        throw new Error('Failed to fetch cat fact');
      }
      const responseData = await response.json();
      // Assuming the API returns an array of cat facts, we take the first one
      catFact.value = responseData.data[0];
    } catch (err) {
      error.value = 'Ett fel uppstod vid hämtning av kattfakta';
      console.error(err);
    } finally {
      catLoading.value = false;
    }
  }
</script>

<template>
  <div class="container">
    <div>
      <p>Räknare: {{ count }}</p>
      <p>|</p>
      <p>Att göra: {{ capitalizeFirstLetter(toDoTitle) }}</p>
      <p>|</p>
      <!-- Display the cat fact retrieved from the API -->
      <p>Kattfakta: {{ catFact }}</p>
    </div>
    <div>
      <FButton @click="productStore.increaseCount">Öka räknare</FButton>
      <FButton @click="fetchTestData" :disabled="loading">Hämta Att-göra</FButton>
    <!-- Button to fetch a random cat fact, disabled while loading -->
      <FButton @click="fetchCatFact" :disabled="catLoading">Hämta Kattfakta</FButton>
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

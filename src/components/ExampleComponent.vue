<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useProductStore } from '../stores/ExampleStore';
  import { FButton } from '@fkui/vue';
  import ProgressBar from './ProgressBar.vue';

  const productStore = useProductStore();
  const count = computed(() => productStore.count);
  const error = ref('');

  const catFact = ref('');
  const catLoading = ref(false);

  async function fetchCatFact() {
    catLoading.value = true;
    error.value = '';

    try {
      const bffUrl = import.meta.env.VITE_BFF_URL || 'http://localhost:9003';
      const response = await fetch(`${bffUrl}/api/cat-fact`);
      if (!response.ok) {
        throw new Error('Failed to fetch cat fact');
      }
      const responseData = await response.json();
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
      <ProgressBar />
      <p>Räknare: {{ count }}</p>
      <p>Kattfakta: {{ catFact }}</p>
    <div>
      <FButton @click="productStore.increaseCount" style="margin-right: 0.5rem;">Öka räknare</FButton>
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
